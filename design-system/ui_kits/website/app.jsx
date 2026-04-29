function App() {
  const { ARTICLES, CATEGORIES, PREFECTURES } = window.SAMPLE;
  const [route, setRoute] = React.useState({ name: "home" });

  const go = (name, params = {}) => {
    setRoute({ name, ...params });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  let body;
  if (route.name === "home") {
    body = (
      <React.Fragment>
        <FeaturedHero article={featured} onOpen={(a) => go("article", { article: a })} />
        <section style={{ maxWidth: "var(--content-wide)", margin: "0 auto", padding: "32px var(--gutter)" }}>
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
            【 最新の記事 】
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px 32px" }}>
            {rest.slice(0, 6).map((a) => (
              <ArticleCard key={a.id} article={a} onOpen={(a) => go("article", { article: a })} />
            ))}
          </div>
        </section>
        <CategoryStrip
          categories={CATEGORIES}
          onPick={(id) => go("category", { categoryId: id })}
        />
        <AreaList
          prefectures={PREFECTURES}
          onPick={(p, a) => go("area", { prefecture: p, area: a })}
        />
        <ContactBand onContact={() => go("contact")} />
      </React.Fragment>
    );
  } else if (route.name === "article") {
    body = <ArticleDetail article={route.article} onBack={() => go("home")} />;
  } else if (route.name === "category") {
    const cat = CATEGORIES.find((c) => c.id === route.categoryId);
    const filtered = ARTICLES.filter((a) => a.category === cat.label);
    body = (
      <ArchiveView
        eyebrow="Category"
        title={cat.label}
        subtitle={`${cat.label} に分類された記事`}
        articles={filtered.length ? filtered : ARTICLES}
        onOpen={(a) => go("article", { article: a })}
      />
    );
  } else if (route.name === "area") {
    const pref = PREFECTURES.find((p) => p.slug === route.prefecture);
    const area = pref.areas.find((a) => a.slug === route.area);
    const filtered = ARTICLES.filter((a) => a.area === area.label);
    body = (
      <ArchiveView
        eyebrow={pref.label}
        title={area.label}
        subtitle={`${pref.label} ${area.label} の記事`}
        articles={filtered.length ? filtered : ARTICLES.slice(0, 4)}
        onOpen={(a) => go("article", { article: a })}
      />
    );
  } else if (route.name === "articles") {
    body = (
      <ArchiveView
        eyebrow="Archive"
        title="記事一覧"
        subtitle="新しい順に並んでいます"
        articles={ARTICLES}
        onOpen={(a) => go("article", { article: a })}
      />
    );
  } else if (route.name === "categories") {
    body = (
      <CategoryStrip
        categories={CATEGORIES}
        onPick={(id) => go("category", { categoryId: id })}
      />
    );
  } else if (route.name === "areas") {
    body = (
      <AreaList
        prefectures={PREFECTURES}
        onPick={(p, a) => go("area", { prefecture: p, area: a })}
      />
    );
  } else if (route.name === "about") {
    body = <AboutPage />;
  } else if (route.name === "contact") {
    body = <ContactPage onBack={() => go("home")} />;
  }

  return (
    <React.Fragment>
      <TopNav onNav={(id) => go(id)} active={route.name} />
      <main>{body}</main>
      <Footer onNav={(id) => go(id)} />
    </React.Fragment>
  );
}

function ArchiveView({ eyebrow, title, subtitle, articles, onOpen }) {
  return (
    <React.Fragment>
      <section style={{ maxWidth: "var(--content-wide)", margin: "0 auto", padding: "48px var(--gutter) 16px" }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontSize: 11,
            color: "var(--color-muted)",
          }}
        >
          {eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 3.2vw, 40px)",
            color: "var(--color-accent)",
            fontWeight: 500,
            letterSpacing: "0.05em",
            margin: "12px 0 8px",
          }}
        >
          {title}
        </h1>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 14, color: "var(--color-muted)", letterSpacing: "0.04em" }}>{subtitle}</div>
      </section>
      <section style={{ maxWidth: "var(--content-wide)", margin: "0 auto", padding: "16px var(--gutter) 80px" }}>
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} onOpen={onOpen} layout="row" />
        ))}
      </section>
      <ContactBand />
    </React.Fragment>
  );
}

function AboutPage() {
  return (
    <article style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "48px var(--gutter) 96px" }}>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontSize: 11,
          color: "var(--color-muted)",
        }}
      >
        About
      </div>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(28px, 3.4vw, 42px)",
          color: "var(--color-accent)",
          fontWeight: 500,
          letterSpacing: "0.05em",
          margin: "14px 0 28px",
          lineHeight: 1.35,
        }}
      >
        都市の余白を読む
      </h1>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.95, letterSpacing: "0.04em", color: "var(--color-text)" }}>
        DIG &amp; BUILD は、日本の都市を「いま」と「過去」の二層から読み解く編集媒体です。
        再開発、建築、都市構造、歴史、商業施設、考察 ― 六つの編集軸と、東京・大阪・福岡・沖縄を中心とした地域軸で、街の細部を記録していきます。
      </p>
      <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.95, letterSpacing: "0.04em", color: "var(--color-text)" }}>
        紙の本のような読み心地を目指して設計しています。情報密度は高すぎず、余白を大きく取り、装飾を控えました。
      </p>
    </article>
  );
}

window.App = App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
