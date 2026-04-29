function ArticleDetail({ article, onBack }) {
  return (
    <article style={{ paddingTop: 8 }}>
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "32px var(--gutter) 0",
        }}
      >
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onBack?.(); }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11.5,
            letterSpacing: "0.1em",
            color: "var(--color-muted)",
            textDecoration: "none",
          }}
        >
          ← 一覧に戻る
        </a>
        <div style={{ marginTop: 32 }}>
          <ArticleMeta article={article} />
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 3.4vw, 42px)",
            lineHeight: 1.35,
            color: "var(--color-accent)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            margin: "18px 0 28px",
          }}
        >
          {article.title}
        </h1>
      </div>
      <div style={{ maxWidth: "var(--content-wide)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <Thumb seed={article.seed} ratio="16 / 9" />
      </div>
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "48px var(--gutter) 96px",
          fontFamily: "var(--font-serif)",
          fontSize: 16,
          lineHeight: 1.95,
          letterSpacing: "0.04em",
          color: "var(--color-text)",
        }}
      >
        <p>{article.excerpt}</p>
        <p>
          高速道路の地下化が進む日本橋では、川面の景観が再び姿を現しはじめている。
          欄干に刻まれた獅子の像、橋脚に残るリベットの痕、午後遅くに差す柔らかな影。
          かつては首都高の影に隠れていた細部が、ふたたび人の目に触れる距離に戻りつつある。
        </p>
        <p>
          再開発という言葉は、しばしば「壊して建てる」ことと同義に語られる。
          しかしこの一帯で進行しているのは、むしろ古い層を慎重に取り除き、
          下に眠っていた風景を呼び戻す作業に近い。建築は前に出ず、川と橋を主役に戻す。
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22,
            color: "var(--color-accent)",
            margin: "40px 0 18px",
            letterSpacing: "0.05em",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          川と橋、二つの線
        </h2>
        <p>
          地図の上で、日本橋は二本の線の交点として描かれる。一本は川、一本は街道。
          再開発の設計者たちは、この交点をどう静かに保つかに腐心してきたという。
        </p>
      </div>
    </article>
  );
}

window.ArticleDetail = ArticleDetail;
