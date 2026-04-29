// Soft, warm placeholder thumbnails — the brand calls for crafted imagery
// per featured article, but list cards stay light. We use deterministic
// gradient compositions tinted to the paper palette so nothing reads as
// "stock photo".
function Thumb({ seed = 0, ratio = "4 / 3", style = {} }) {
  const palettes = [
    ["#c9b8a3", "#7a6a58"],
    ["#a89684", "#5e4f3f"],
    ["#b8a690", "#3a3937"],
    ["#d4c2a8", "#8a7868"],
    ["#9e8b78", "#4a3f34"],
    ["#c0ad96", "#6b5847"],
  ];
  const [a, b] = palettes[seed % palettes.length];
  const angles = [120, 135, 150, 165, 110, 145];
  const angle = angles[seed % angles.length];
  return (
    <div
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(${angle}deg, ${a}, ${b})`,
        border: "1px solid var(--color-border)",
        ...style,
      }}
    />
  );
}

// Renders "東京 / 日本橋" with the prefecture small and faded so the
// area name carries the visual priority. Used as the badge label.
function LocationLabel({ prefecture, area }) {
  const pref = prefecture && prefecture.replace(/[都府県]$/, "");
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 4 }}>
      {pref && (
        <span
          style={{
            fontSize: "0.78em",
            opacity: 0.7,
            letterSpacing: "0.08em",
          }}
        >
          {pref} /
        </span>
      )}
      <span>{area}</span>
    </span>
  );
}

// New meta row: [エリアバッジ(エンジ地に白文字)] [#カテゴリ] [日付]
function ArticleMeta({ article }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "6px 12px",
        fontFamily: "var(--font-serif)",
        fontSize: 12,
        color: "var(--color-muted)",
        letterSpacing: "0.04em",
      }}
    >
      <span
        style={{
          background: "var(--color-engi)",
          color: "var(--color-engi-ink)",
          padding: "3px 9px",
          fontSize: 11,
          letterSpacing: "0.06em",
          lineHeight: 1.4,
          fontWeight: 500,
        }}
      >
        <LocationLabel prefecture={article.prefecture} area={article.area} />
      </span>
      <span style={{ color: "var(--color-text)" }}>#{article.category}</span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.08em" }}>
        {article.date}
      </span>
    </div>
  );
}

function ArticleCard({ article, onOpen, layout = "stack" }) {
  const handle = (e) => { e.preventDefault(); onOpen?.(article); };
  if (layout === "row") {
    return (
      <a
        href="#"
        onClick={handle}
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 24,
          textDecoration: "none",
          color: "inherit",
          padding: "20px 0",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Thumb seed={article.seed} ratio="3 / 2" />
        <div>
          <ArticleMeta article={article} />
          <div style={{ ...titleStyle, fontSize: 18, marginTop: 12 }}>{article.title}</div>
          <div style={excerptStyle}>{article.excerpt}</div>
        </div>
      </a>
    );
  }
  return (
    <a href="#" onClick={handle} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <Thumb seed={article.seed} />
      <div style={{ marginTop: 14 }}>
        <ArticleMeta article={article} />
      </div>
      <div style={titleStyle}>{article.title}</div>
      <div style={excerptStyle}>{article.excerpt}</div>
    </a>
  );
}

const titleStyle = {
  marginTop: 10,
  fontFamily: "var(--font-serif)",
  fontSize: 17,
  lineHeight: 1.5,
  color: "var(--color-accent)",
  letterSpacing: "0.04em",
  fontWeight: 500,
};

const excerptStyle = {
  marginTop: 6,
  fontFamily: "var(--font-serif)",
  fontSize: 13,
  lineHeight: 1.85,
  color: "var(--color-text)",
  letterSpacing: "0.03em",
};

window.Thumb = Thumb;
window.ArticleCard = ArticleCard;
window.ArticleMeta = ArticleMeta;
window.LocationLabel = LocationLabel;
