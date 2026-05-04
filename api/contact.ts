import { Resend } from "resend";

// フォーム側の選択肢とAPI側の許可リストを一致させる。
// ここにない値は改ざんされた送信として拒否する。
const INQUIRY_TYPES = ["取材してほしい", "広告を掲載したい", "寄稿したい・してほしい", "その他"] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

// API内部で扱う正規化済みの問い合わせデータ。
type ContactPayload = {
  name: string;
  email: string;
  organization: string;
  inquiryType: InquiryType;
  message: string;
  website: string;
  turnstileToken: string;
};

type ValidationResult = { ok: true; data: ContactPayload } | { ok: false; message: string };

type ContactEnv = {
  resendApiKey: string;
  contactFromEmail: string;
  contactToEmail: string;
  bccEmail: string;
  turnstileSecretKey: string;
};

type ContactEnvResult = { ok: true; data: ContactEnv } | { ok: false };

// Resendに渡す前に入力サイズを制限し、長すぎる本文を弾く。
const FIELD_LIMITS = {
  name: 80,
  email: 254,
  organization: 120,
  message: 4000,
};

// JSON解析前に大きすぎるリクエストを弾くための上限。
const MAX_REQUEST_BODY_BYTES = 32 * 1024;

export default {
  fetch: handleContactRequest,
};

async function handleContactRequest(request: Request): Promise<Response> {
  // Vercel Functionは公開URLになるため、フォーム送信用のPOSTだけを受け付ける。
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: "POSTメソッドで送信してください。" }, 405, { Allow: "POST" });
  }

  // Content-Lengthが分かる場合は、JSON解析前に大きすぎる送信を拒否する。
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_REQUEST_BODY_BYTES) {
    return jsonResponse({ ok: false, message: "送信内容が大きすぎます。" }, 413);
  }

  // 想定外の形式を早めに拒否して、JSON解析エラーや曖昧な入力を避ける。
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse({ ok: false, message: "JSON形式で送信してください。" }, 415);
  }

  // 送信先やAPIキーはVercelの環境変数から読む。未設定ならメール送信へ進まない。
  const env = readContactEnv();
  if (!env.ok) {
    return jsonResponse({ ok: false, message: "送信設定に不備があります。時間をおいて再度お試しください。" }, 500);
  }

  // request.json()は壊れたJSONで例外になるため、ユーザー向けの400に変換する。
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, message: "送信内容を読み取れませんでした。" }, 400);
  }

  // フロント側のrequiredやmaxlengthは補助なので、API側で必ず再検証する。
  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return jsonResponse({ ok: false, message: validation.message }, 400);
  }

  // Turnstileはクライアント表示だけでは不十分なので、メール送信前に必ずサーバー側で検証する。
  const turnstile = await verifyTurnstileToken(validation.data.turnstileToken, env.data.turnstileSecretKey, request);
  if (!turnstile.ok) {
    return jsonResponse({ ok: false, message: "認証に失敗しました。再度お試しください。" }, 400);
  }

  // honeypot項目に値が入っている場合はbotとみなし、成功風に返して送信しない。
  if (validation.data.website) {
    return jsonResponse({ ok: true }, 200);
  }

  // 受信メールで問い合わせ種別がすぐ分かるよう、件名に分類を含める。
  const resend = new Resend(env.data.resendApiKey);
  const subject = `[Dig&Build][${validation.data.inquiryType}] お問い合わせ`;
  const text = buildNotificationEmail(validation.data);

  try {
    const result = await resend.emails.send({
      from: env.data.contactFromEmail,
      to: env.data.contactToEmail,
      bcc: [env.data.bccEmail],
      replyTo: validation.data.email,
      subject,
      text,
    });

    // Resend SDKはHTTP的に成功してもerrorを返すことがあるため明示的に見る。
    if (result.error) {
      console.error("Resend contact email error:", result.error);
      return jsonResponse({ ok: false, message: "メール送信に失敗しました。時間をおいて再度お試しください。" }, 502);
    }

    const autoReplyResult = await resend.emails.send({
      from: env.data.contactFromEmail,
      to: validation.data.email,
      subject: "【Dig&Build】お問い合わせを受け付けました",
      text: buildAutoReplyEmail(validation.data),
    });

    // 自動返信に失敗しても、運営側への通知は完了しているためフォーム送信は成功扱いにする。
    if (autoReplyResult.error) {
      console.error("Resend auto reply email error:", autoReplyResult.error);
    }

    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    // 予期しない失敗はログに残し、利用者には詳細を出さない。
    console.error("Contact email unexpected error:", error);
    return jsonResponse({ ok: false, message: "メール送信に失敗しました。時間をおいて再度お試しください。" }, 502);
  }
}

// Vercelに設定した問い合わせフォーム用の環境変数をまとめて取得する。
function readContactEnv(): ContactEnvResult {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const bccEmail = process.env.BCC_EMAIL?.trim();
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY?.trim();

  // どれか1つでも欠けると送信品質が落ちるため、フォーム送信自体を止める。
  if (!resendApiKey || !contactFromEmail || !contactToEmail || !bccEmail || !turnstileSecretKey) {
    console.error("Missing contact form environment variables.");
    return { ok: false };
  }

  return {
    ok: true,
    data: {
      resendApiKey,
      contactFromEmail,
      contactToEmail,
      bccEmail,
      turnstileSecretKey,
    },
  };
}

// 外部入力をContactPayloadへ正規化し、送信してよい内容か検証する。
function validateContactPayload(payload: unknown): ValidationResult {
  // JSONのトップレベルはオブジェクトだけを許可する。
  if (!isRecord(payload)) {
    return { ok: false, message: "送信内容が正しくありません。" };
  }

  // 文字列以外は空文字にし、前後の空白を落としてから判定する。
  const data = {
    name: normalizeSingleLineString(payload.name),
    email: normalizeString(payload.email),
    organization: normalizeSingleLineString(payload.organization),
    inquiryType: normalizeString(payload.inquiryType),
    message: normalizeString(payload.message),
    website: normalizeString(payload.website),
    turnstileToken: normalizeString(payload.turnstileToken),
  };

  // 空白だけの入力も未入力扱いにする。
  if (!data.name || !data.email || !data.inquiryType || !data.message || !data.turnstileToken) {
    return { ok: false, message: "必須項目を入力してください。" };
  }

  // selectの値はクライアント側で改ざんできるため、API側でも許可リストを確認する。
  if (!isAllowedInquiryType(data.inquiryType)) {
    return { ok: false, message: "問い合わせ項目を正しく選択してください。" };
  }

  // replyToに使う値なので、最低限メールアドレスとして成立する形式だけ通す。
  if (!isValidEmail(data.email)) {
    return { ok: false, message: "メールアドレスを正しく入力してください。" };
  }

  // 各フィールドの上限を個別に返し、フォーム側で理由を表示しやすくする。
  if (data.name.length > FIELD_LIMITS.name) {
    return { ok: false, message: `お名前は${FIELD_LIMITS.name}文字以内で入力してください。` };
  }

  if (data.email.length > FIELD_LIMITS.email) {
    return { ok: false, message: `メールアドレスは${FIELD_LIMITS.email}文字以内で入力してください。` };
  }

  if (data.organization.length > FIELD_LIMITS.organization) {
    return { ok: false, message: `所属・会社名は${FIELD_LIMITS.organization}文字以内で入力してください。` };
  }

  if (data.message.length > FIELD_LIMITS.message) {
    return { ok: false, message: `お問い合わせ内容は${FIELD_LIMITS.message}文字以内で入力してください。` };
  }

  if (data.turnstileToken.length > 2048) {
    return { ok: false, message: "認証に失敗しました。再度お試しください。" };
  }

  // ここまで通った値だけを、型付きの問い合わせデータとして後続へ渡す。
  return {
    ok: true,
    data: {
      name: data.name,
      email: data.email,
      organization: data.organization,
      inquiryType: data.inquiryType,
      message: data.message,
      website: data.website,
      turnstileToken: data.turnstileToken,
    },
  };
}

async function verifyTurnstileToken(token: string, secretKey: string, request: Request): Promise<{ ok: boolean }> {
  const remoteIp = getClientIp(request);
  const params = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp) {
    params.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    const result = (await response.json()) as { success?: boolean; "error-codes"?: string[] };

    if (!result.success) {
      console.error("Turnstile verification failed:", result["error-codes"] ?? []);
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { ok: false };
  }
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

  return request.headers.get("cf-connecting-ip") ?? firstForwardedIp ?? "";
}

// 運営側が問い合わせ内容を確認するための通知メール本文を作る。
function buildNotificationEmail(data: ContactPayload): string {
  return [
    "Dig&Buildの問い合わせフォームから送信がありました。",
    "",
    `問い合わせ項目: ${data.inquiryType}`,
    `お名前: ${data.name}`,
    `メールアドレス: ${data.email}`,
    `所属・会社名: ${data.organization || "未入力"}`,
    "",
    "お問い合わせ内容:",
    data.message,
  ].join("\n");
}

// 送信者へ受付完了を知らせる自動返信メール本文を作る。
function buildAutoReplyEmail(data: ContactPayload): string {
  return [
    `${data.name} 様`,
    "",
    "Dig&Buildへお問い合わせいただきありがとうございます。",
    "以下の内容でお問い合わせを受け付けました。",
    "内容を確認のうえ、通常3営業日以内にご連絡いたします。",
    "",
    "------------------------------",
    `問い合わせ項目: ${data.inquiryType}`,
    `お名前: ${data.name}`,
    `メールアドレス: ${data.email}`,
    `所属・会社名: ${data.organization || "未入力"}`,
    "",
    "お問い合わせ内容:",
    data.message,
    "------------------------------",
    "",
    "このメールは自動送信です。",
    "お心当たりがない場合は、このメールを破棄してください。",
    "",
    "Dig&Build",
  ].join("\n");
}

// APIレスポンスをJSONに統一し、問い合わせ送信結果がキャッシュされないようにする。
function jsonResponse(body: { ok: boolean; message?: string }, status: number, headers?: HeadersInit): Response {
  return Response.json(body, {
    status,
    headers: {
      ...headers,
      "Cache-Control": "no-store",
    },
  });
}

// 外部入力を安全に文字列化する。文字列以外は未入力として扱う。
function normalizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

// メール内の1行項目は、改行による表示崩れを避けるため空白1つに潰す。
function normalizeSingleLineString(value: unknown): string {
  return normalizeString(value).replace(/[\r\n]+/g, " ");
}

// unknownをRecordとして扱う前に、配列やnullではないことを確認する。
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// 問い合わせ項目が定義済みの選択肢かを判定し、TypeScriptにも型を伝える。
function isAllowedInquiryType(value: string): value is InquiryType {
  return INQUIRY_TYPES.includes(value as InquiryType);
}

// 実務上の入力チェックとして、空白や@不足などの明らかな不正だけを拒否する。
function isValidEmail(value: string): boolean {
  return value.length <= FIELD_LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
