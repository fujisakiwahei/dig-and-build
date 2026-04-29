function FeaturedHero({ article, onOpen }) {
  return (
    <section
      style={{
        maxWidth: "var(--content-wide)",
        margin: "0 auto",
        padding: "48px var(--gutter) 32px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          letterSpacing: "0.14em",
          fontSize: 18,
          color: "var(--color-accent)",
          fontWeight: 500,
          marginBottom: 32,
        }}
      >
        【 注目の記事 】
      </div>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onOpen?.(article); }}
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 56,
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Thumb seed={article.seed} ratio="4 / 3" />
        <div>
          <ArticleMeta article={article} />
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 3vw, 38px)",
              lineHeight: 1.3,
              color: "var(--color-accent)",
              fontWeight: 500,
              letterSpacing: "0.04em",
              margin: "16px 0 18px",
            }}
          >
            {article.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 15,
              lineHeight: 1.9,
              color: "var(--color-text)",
              letterSpacing: "0.03em",
              margin: 0,
              maxWidth: 460,
            }}
          >
            {article.excerpt}
          </p>
          <div
            style={{
              marginTop: 28,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-text)",
              borderBottom: "1px solid var(--color-accent)",
              display: "inline-block",
              paddingBottom: 4,
            }}
          >
            記事を読む →
          </div>
        </div>
      </a>
    </section>
  );
}

window.FeaturedHero = FeaturedHero;
