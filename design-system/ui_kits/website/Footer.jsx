// Tabular footer — matches the souzouno-mori reference layout the user pinned:
//   left: rows with [heading | inline items] separated by hairlines
//   right: a tall contact panel with an outlined arrow CTA
// On engi background. No decorative city names.

function FooterRow({ heading, items, onNav, withInline = true, isFirst = false }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(180px, 1fr) 3fr",
        alignItems: "center",
        borderTop: isFirst ? "none" : "1px solid var(--color-engi-rule)",
        padding: "22px 4px",
        gap: 24,
      }}
    >
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); items?.[0] && onNav?.(items[0].to); }}
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 15,
          color: "var(--color-engi-ink)",
          textDecoration: "none",
          letterSpacing: "0.08em",
          fontWeight: 500,
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {heading}
        {withInline && items && items.length > 1 && (
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 14, opacity: 0.7 }}>→</span>
        )}
      </a>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 28px", alignItems: "baseline" }}>
        {withInline && items && items.length > 1 && items.slice(1).map((it, i) => (
          <a
            key={it.label}
            href="#"
            onClick={(e) => { e.preventDefault(); onNav?.(it.to); }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 14,
              color: "var(--color-engi-ink)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              display: "inline-flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            {it.numeral && (
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 11,
                  color: "var(--color-engi-ink-2)",
                  letterSpacing: "0.1em",
                }}
              >
                {it.numeral}
              </span>
            )}
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Footer({ onNav }) {
  const rows = [
    {
      heading: "カテゴリー",
      items: [{ label: "カテゴリー", to: "categories" }],
      withInline: false,
    },
    {
      heading: "エリア",
      items: [{ label: "エリア", to: "areas" }],
      withInline: false,
    },
    {
      heading: "広告掲載・タイアップ",
      items: [{ label: "広告掲載・タイアップ", to: "contact" }],
      withInline: false,
    },
    {
      heading: "プライバシーポリシー",
      items: [{ label: "プライバシーポリシー", to: "contact" }],
      withInline: false,
    },
  ];

  return (
    <footer className="engi-band" style={{ padding: "64px var(--gutter) 40px", background: "#2a0c10" }}>
      <div
        style={{
          maxWidth: "var(--content-wide)",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr minmax(220px, 280px)",
            gap: 56,
            alignItems: "stretch",
          }}
        >
          {/* Left: tabular link rows */}
          <div>
            {rows.map((r, i) => (
              <FooterRow
                key={r.heading}
                heading={r.heading}
                items={r.items}
                withInline={r.withInline}
                onNav={onNav}
                isFirst={i === 0}
              />
            ))}
            <div
              style={{
                borderTop: "1px solid var(--color-engi-rule)",
                marginTop: 12,
                paddingTop: 18,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 12,
                letterSpacing: "0.18em",
                color: "var(--color-engi-ink-2)",
              }}
            >
              © 2026 DIG &amp; BUILD
            </div>
          </div>

          {/* Right: contact panel */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNav?.("contact"); }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "36px 28px",
              border: "1px solid var(--color-engi-rule)",
              textDecoration: "none",
              color: "var(--color-engi-ink)",
              minHeight: 460,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                writingMode: "vertical-rl",
                fontSize: 38,
                letterSpacing: "0.3em",
                lineHeight: 1,
                fontWeight: 500,
                color: "var(--color-engi-ink)",
                alignSelf: "flex-end",
              }}
            >
              お問い合わせ
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 13.5,
                  lineHeight: 1.85,
                  color: "var(--color-engi-ink-2)",
                  margin: "0 0 28px",
                  letterSpacing: "0.04em",
                }}
              >
                取材のご依頼、特集タイアップのご相談、
                広告掲載のお問い合わせはこちらから。
              </p>
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  border: "1px solid var(--color-engi-ink-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 160ms ease",
                }}
              >
                <svg width="36" height="14" viewBox="0 0 36 14" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                  <line x1="0" y1="7" x2="34" y2="7" />
                  <polyline points="28,1 34,7 28,13" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
