function TopNav({ onNav, active }) {
  const items = [
    { id: "home", label: "ホーム" },
    { id: "articles", label: "記事一覧" },
    { id: "categories", label: "カテゴリー" },
    { id: "areas", label: "エリア" },
    { id: "about", label: "このメディアについて" },
  ];
  return (
    <nav
      style={{
        maxWidth: "var(--content-wide)",
        margin: "0 auto",
        padding: "28px var(--gutter) 18px",
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 24,
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNav("home"); }}
        style={{ textDecoration: "none" }}
      >
        <Wordmark size="md" />
      </a>
      <div style={{ display: "flex", gap: 28, alignItems: "baseline" }}>
        {items.slice(1).map((it) => (
          <a
            key={it.id}
            href="#"
            onClick={(e) => { e.preventDefault(); onNav(it.id); }}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12.5,
              letterSpacing: "0.06em",
              color: active === it.id ? "var(--color-engi)" : "var(--color-text)",
              textDecoration: "none",
            }}
          >
            {it.label}
          </a>
        ))}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onNav("contact"); }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 13,
            letterSpacing: "0.08em",
            color: "var(--color-engi-ink)",
            background: "var(--color-engi)",
            textDecoration: "none",
            padding: "10px 20px",
            marginLeft: 8,
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          問い合わせる
        </a>
      </div>
    </nav>
  );
}

window.TopNav = TopNav;
