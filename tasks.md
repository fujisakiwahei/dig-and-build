## 1. 初期セットアップ

- [x] pnpmでAstroプロジェクトを作成する
- [ ] TypeScriptを有効化する
- [ ] ESLintを導入する
- [ ] Prettierを導入する
- [ ] Vitestを導入する
- [ ] Playwrightを導入する
- [ ] Sassを導入する（`pnpm add -D sass`）
- [ ] Stylelintを導入する
  - `pnpm add -D stylelint stylelint-config-standard-scss stylelint-order`
- [ ] `.env` を作成する
- [ ] Vercel用の環境変数を整理する

---

## 2. SCSS / デザイン基盤

- [ ] `src/styles/global.scss` を作成する
- [ ] BaseLayoutで `global.scss` を読み込む
- [ ] CSSをSCSSに移行する

- [ ] SCSS構成を作成する

  src/styles/
  global.scss
  foundation/
  \_tokens.scss
  \_base.scss
  \_typography.scss
  components/
  \_header.scss
  \_footer.scss
  \_article.scss
  \_archive.scss

- [ ] デザイントークンを実装する（色・フォント）
- [ ] 赤みのある紙背景をCSSで実装する
- [ ] 明朝ベースのタイポグラフィを適用する

---

## 3. microCMS設計

- [ ] `articles` APIを作成する
- [ ] `prefectures` APIを作成する
- [ ] `areas` APIを作成する
- [ ] `categories` APIを作成する
- [ ] `authors` APIを作成する
- [ ] サンプルデータを登録する
- [ ] `isFeatured` を設定する

---

## 4. 基本レイアウト

- [ ] BaseLayoutを作成する
- [ ] Headerを作成する
- [ ] Footerを作成する

---

## 5. コンポーネント

- [ ] FeaturedArticleを作成する
- [ ] ArticleListを作成する
- [ ] ArticleMetaを作成する
- [ ] CategoryListを作成する
- [ ] AreaListを作成する
- [ ] TableOfContentsを作成する
- [ ] EyecatchImageを作成する

---

## 6. ページ実装

- [ ] トップページ `/` を作成する
- [ ] 記事詳細 `/articles/[slug]/` を作成する
- [ ] カテゴリー `/categories/[slug]/` を作成する
- [ ] 都道府県 `/prefectures/[slug]/` を作成する
- [ ] エリア `/areas/[prefecture]/[area]/` を作成する
- [ ] 著者 `/authors/[slug]/` を作成する
- [ ] About `/about/` を作成する
- [ ] Contact `/contact/` を作成する
- [ ] Advertise `/advertise/` を作成する
- [ ] Privacy Policy `/privacy-policy/` を作成する
- [ ] 404ページを作成する

---

## 7. microCMS接続

- [ ] microCMSクライアントを作成する
- [ ] 記事一覧取得を実装する
- [ ] 記事詳細取得を実装する
- [ ] 各マスタ取得（categories, areas, prefectures, authors）
- [ ] getStaticPathsを実装する
- [ ] SSGで全ページ生成を確認する

---

## 8. 画像最適化

- [ ] 画像URL生成関数を作成する
- [ ] 一覧画像を軽量化する
- [ ] 詳細画像を最適化する
- [ ] WebP / AVIF対応を検討する
- [ ] OGP画像を設定する

---

## 9. 目次生成

- [ ] h2 / h3抽出ロジックを作成する
- [ ] 見出しにID付与する
- [ ] 目次コンポーネントを表示する

---

## 10. ヘッダー挙動

- [ ] 固定ヘッダーを実装する
- [ ] 下スクロールで非表示
- [ ] 上スクロールで表示
- [ ] JS最小化

---

## 11. テスト

- [ ] Vitest
  - [ ] 画像URL生成
  - [ ] 目次生成
  - [ ] URL生成

- [ ] Playwright
  - [ ] トップページ表示
  - [ ] 記事遷移
  - [ ] カテゴリー表示
  - [ ] 都道府県表示
  - [ ] エリア表示

---

## 12. Lint / Format

- [ ] ESLint設定
- [ ] Prettier設定
- [ ] Stylelint設定（SCSS順序）
- [ ] スクリプト追加

  "lint": "eslint ."
  "lint:style": "stylelint \"src/**/\*.{scss,astro}\""
  "fix:style": "stylelint \"src/**/\*.{scss,astro}\" --fix"

- [ ] checkスクリプト統合

  "check": "astro check && pnpm lint && pnpm lint:style && pnpm test"

---

## 13. SEO・公開準備

- [ ] title / description設定
- [ ] OGP設定
- [ ] canonical設定
- [ ] sitemap生成
- [ ] robots.txt作成
- [ ] Search Console設定
- [ ] プライバシーポリシー整備

---

## 14. デプロイ

- [ ] GitHub作成
- [ ] Vercel連携
- [ ] 環境変数設定
- [ ] Preview確認
- [ ] 本番デプロイ
- [ ] 独自ドメイン接続
- [ ] PageSpeed確認

---

## 15. 初期コンテンツ

- [ ] 日本橋記事
- [ ] 丸の内記事
- [ ] 虎ノ門記事
- [ ] 大阪比較記事
- [ ] About作成
- [ ] Advertise作成
