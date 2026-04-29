function ContactPage({ onBack }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [topic, setTopic] = React.useState("取材依頼");
  const [body, setBody] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    background: "var(--color-bg-soft)",
    border: "1px solid var(--color-border)",
    fontFamily: "var(--font-serif)",
    fontSize: 14,
    color: "var(--color-text)",
    letterSpacing: "0.03em",
    outline: "none",
  };
  const labelStyle = {
    fontFamily: "var(--font-sans)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--color-muted)",
    display: "block",
    marginBottom: 8,
  };

  return (
    <div>
      <section style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "48px var(--gutter) 24px" }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontSize: 11,
            color: "var(--color-muted)",
          }}
        >
          Contact
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 3.2vw, 38px)",
            color: "var(--color-accent)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            margin: "12px 0 18px",
            lineHeight: 1.35,
          }}
        >
          お問い合わせ・取材依頼
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.95, letterSpacing: "0.03em", color: "var(--color-text)", margin: 0 }}>
          取材のご依頼、特集タイアップのご相談、広告掲載に関するお問い合わせは、
          以下のフォームよりお寄せください。三営業日以内にご返信いたします。
        </p>
      </section>

      <section style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "16px var(--gutter) 56px" }}>
        {sent ? (
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              lineHeight: 1.9,
              padding: "32px",
              background: "var(--color-bg-soft)",
              border: "1px solid var(--color-border)",
              color: "var(--color-accent)",
            }}
          >
            お問い合わせを受け付けました。{name || "ご担当者"} 様、ご連絡ありがとうございます。
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            style={{ display: "flex", flexDirection: "column", gap: 22 }}
          >
            <div>
              <label style={labelStyle}>お名前</label>
              <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="山田 太郎" />
            </div>
            <div>
              <label style={labelStyle}>メールアドレス</label>
              <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="taro@example.jp" />
            </div>
            <div>
              <label style={labelStyle}>お問い合わせ種別</label>
              <select style={inputStyle} value={topic} onChange={(e) => setTopic(e.target.value)}>
                <option>取材依頼</option>
                <option>広告掲載・タイアップ</option>
                <option>その他</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>本文</label>
              <textarea
                style={{ ...inputStyle, minHeight: 140, fontFamily: "var(--font-serif)", lineHeight: 1.85 }}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="ご相談内容をお書きください。"
              />
            </div>
            <button
              type="submit"
              style={{
                alignSelf: "flex-start",
                marginTop: 8,
                borderRadius: 999,
                background: "var(--color-engi)",
                color: "var(--color-engi-ink)",
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontSize: 13,
                padding: "16px 32px",
                border: 0,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              SEND  →
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

window.ContactPage = ContactPage;
