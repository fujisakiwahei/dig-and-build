import { Resend } from "resend";

// フォーム側の選択肢とAPI側の許可リストを一致させる。
// ここにない値は改ざんされた送信として拒否する。
const INQUIRY_TYPES = ["取材依頼", "広告掲載", "寄稿", "その他"] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

// API内部で扱う正規化済みの問い合わせデータ。
type ContactPayload = {
  name: string;
  email: string;
  organization: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  website: string;
};

type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; message: string };

type ContactEnv = {
  resendApiKey: string;
  contactFromEmail: string;
  contactToEmail: string;
  bccEmail: string;
};

type ContactEnvResult =
  | { ok: true; data: ContactEnv }
  | { ok: false };

// Resendに渡す前に入力サイズを制限し、長すぎる本文や件名を弾く。
const FIELD_LIMITS = {
  name: 80,
  email: 254,
  organization: 120,
  subject: 120,
  message: 4000,
};

export default async function contact(request: Request): Promise<Response> {
  // Vercel Functionは公開URLになるため、フォーム送信用のPOSTだけを受け付ける。
  if (request.method !== "POST") {
    return jsonResponse(
      { ok: false, message: "POSTメソッドで送信してください。" },
      405,
      { Allow: "POST" },
    );
  }

  // 想定外の形式を早めに拒否して、JSON解析エラーや曖昧な入力を避ける。
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonResponse(
      { ok: false, message: "JSON形式で送信してください。" },
      415,
    );
  }

  // 送信先やAPIキーはVercelの環境変数から読む。未設定ならメール送信へ進まない。
  const env = readContactEnv();
  if (!env.ok) {
    return jsonResponse(
      { ok: false, message: "送信設定に不備があります。時間をおいて再度お試しください。" },
      500,
    );
  }

  // request.json()は壊れたJSONで例外になるため、ユーザー向けの400に変換する。
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      { ok: false, message: "送信内容を読み取れませんでした。" },
      400,
    );
  }

  // フロント側のrequiredやmaxlengthは補助なので、API側で必ず再検証する。
  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return jsonResponse({ ok: false, message: validation.message }, 400);
  }

  // honeypot項目に値が入っている場合はbotとみなし、成功風に返して送信しない。
  if (validation.data.website) {
    return jsonResponse({ ok: true }, 200);
  }

  // 受信メールで問い合わせ種別がすぐ分かるよう、件名に分類を含める。
  const resend = new Resend(env.data.resendApiKey);
  const subject = `[Dig&Build][${validation.data.inquiryType}] ${validation.data.subject}`;
  const text = buildTextEmail(validation.data);

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
      return jsonResponse(
        { ok: false, message: "メール送信に失敗しました。時間をおいて再度お試しください。" },
        502,
      );
    }

    return jsonResponse({ ok: true }, 200);
  } catch (error) {
    // 予期しない失敗はログに残し、利用者には詳細を出さない。
    console.error("Contact email unexpected error:", error);
    return jsonResponse(
      { ok: false, message: "メール送信に失敗しました。時間をおいて再度お試しください。" },
      502,
    );
  }
}

// Vercelに設定した問い合わせフォーム用の環境変数をまとめて取得する。
function readContactEnv(): ContactEnvResult {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const bccEmail = process.env.BCC_EMAIL?.trim();

  // どれか1つでも欠けると送信品質が落ちるため、フォーム送信自体を止める。
  if (!resendApiKey || !contactFromEmail || !contactToEmail || !bccEmail) {
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
    name: normalizeString(payload.name),
    email: normalizeString(payload.email),
    organization: normalizeString(payload.organization),
    inquiryType: normalizeString(payload.inquiryType),
    subject: normalizeString(payload.subject),
    message: normalizeString(payload.message),
    website: normalizeString(payload.website),
  };

  // 空白だけの入力も未入力扱いにする。
  if (!data.name || !data.email || !data.inquiryType || !data.subject || !data.message) {
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

  if (data.subject.length > FIELD_LIMITS.subject) {
    return { ok: false, message: `件名は${FIELD_LIMITS.subject}文字以内で入力してください。` };
  }

  if (data.message.length > FIELD_LIMITS.message) {
    return { ok: false, message: `お問い合わせ内容は${FIELD_LIMITS.message}文字以内で入力してください。` };
  }

  // ここまで通った値だけを、型付きの問い合わせデータとして後続へ渡す。
  return {
    ok: true,
    data: {
      name: data.name,
      email: data.email,
      organization: data.organization,
      inquiryType: data.inquiryType,
      subject: data.subject,
      message: data.message,
      website: data.website,
    },
  };
}

// HTMLメールが読めない環境でも内容を確認できるよう、text本文も必ず作る。
function buildTextEmail(data: ContactPayload): string {
  return [
    "Dig&Buildの問い合わせフォームから送信がありました。",
    "",
    `問い合わせ項目: ${data.inquiryType}`,
    `お名前: ${data.name}`,
    `メールアドレス: ${data.email}`,
    `所属・会社名: ${data.organization || "未入力"}`,
    `件名: ${data.subject}`,
    "",
    "お問い合わせ内容:",
    data.message,
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
