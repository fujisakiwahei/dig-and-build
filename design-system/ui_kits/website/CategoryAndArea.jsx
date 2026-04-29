function CategoryStrip({ categories, onPick, active }) {
  return (
    <section
      style={{
        maxWidth: "var(--content-wide)",
        margin: "0 auto",
        padding: "48px var(--gutter) 24px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          letterSpacing: "0.14em",
          fontSize: 18,
          color: "var(--color-accent)",
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        【 カテゴリー 】
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 28px",
          fontFamily: "var(--font-serif)",
          fontSize: 17,
          color: "var(--color-text)",
          letterSpacing: "0.05em",
          paddingBottom: 28,
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {categories.map((c, i) => (
          <React.Fragment key={c.id}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onPick?.(c.id); }}
              style={{
                textDecoration: "none",
                color: active === c.id ? "var(--color-engi)" : "var(--color-text)",
              }}
            >
              {c.label}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "var(--color-muted)",
                  marginLeft: 6,
                  letterSpacing: "0.04em",
                }}
              >
                ({c.count})
              </span>
            </a>
            {i < categories.length - 1 && (
              <span style={{ color: "var(--color-border)" }}>·</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function AreaList({ prefectures, onPick }) {
  return (
    <section
      style={{
        maxWidth: "var(--content-wide)",
        margin: "0 auto",
        padding: "48px var(--gutter) 64px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          letterSpacing: "0.14em",
          fontSize: 18,
          color: "var(--color-accent)",
          fontWeight: 500,
          marginBottom: 24,
        }}
      >
        【 エリア 】
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 40,
        }}
      >
        {prefectures.map((p) => (
          <div key={p.slug}>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 17,
                color: "var(--color-accent)",
                margin: "0 0 12px",
                letterSpacing: "0.05em",
                fontWeight: 500,
                paddingBottom: 8,
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {p.label}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {p.areas.map((a) => (
                <a
                  key={a.slug}
                  href="#"
                  onClick={(e) => { e.preventDefault(); onPick?.(p.slug, a.slug); }}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 14,
                    color: "var(--color-text)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    lineHeight: 1.8,
                  }}
                >
                  {a.label}
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      color: "var(--color-muted)",
                      marginLeft: 6,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ({a.count})
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.CategoryStrip = CategoryStrip;
window.AreaList = AreaList;
