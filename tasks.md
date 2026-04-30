## 1. 初期セットアップ

- [x] pnpmでAstroプロジェクトを作成する
- [x] TypeScriptを有効化する
- [x] ESLintを導入する
- [ ] Prettierを導入する
- [x] Vitestを導入する
- [x] Playwrightを導入する(Claude CodeとMCPで実行することに。)
- [x] Sassを導入する（`pnpm add -D sass`）
- [x] Stylelintを導入する
  - `pnpm add -D stylelint stylelint-config-standard-scss stylelint-order`
- [x] `.env` を作成する
- [ ] Vercel用の環境変数を整理する

---

## 2. SCSS / デザイン基盤

- [x] `src/styles/global.scss` を作成する
- [x] BaseLayoutで `global.scss` を読み込む
- [x] CSSをSCSSに移行する

- [x] SCSS構成を作成する

- [x] デザイントークンを実装する（色・フォント）

---

## 3. microCMS設計

- [x] `articles` APIを作成する
- [x] `prefectures` APIを作成する
- [x] `areas` APIを作成する
- [x] `categories` APIを作成する
- [x] `authors` APIを作成する
- [x] サンプルデータを登録する
- [x] `isFeatured` を設定する

---

## 4. 基本レイアウト

- [x] BaseLayoutを作成する
- [x] Headerを作成する
- [x] Footerを作成する

---

## 5. コンポーネント

- [x] 記事カードを作成する
- [x] 記事グリッドを作成する
- [x] 記事メタ情報を作成する
- [x] フィーチャー記事を作成する
- [x] ページヒーローを作成する
- [x] ページタイトルを作成する
- [x] カテゴリーリストを作成する
- [x] エリアリストを作成する
- [x] サイドバー用カテゴリーリストを作成する
- [x] サイドバー用エリアリストを作成する
- [x] ページネーションを作成する
- [x] 問い合わせCTAを作成する

---

## 6. ページ実装

- [x] トップページ `/` を作成する
- [x] 記事一覧 `/articles/page/` を作成する
- [x] 記事詳細 `/articles/[slug]/` を作成する
- [x] カテゴリー一覧 `/categories/` を作成する
- [x] カテゴリー `/categories/[category]/` を作成する
- [ ] 都道府県 `/prefectures/[slug]/` を作成する
- [x] エリア一覧 `/areas/` を作成する
- [x] エリア `/areas/[prefecture]/[area]/` を作成する
- [ ] 著者 `/authors/[slug]/` を作成する
- [ ] About `/about/` を作成する
- [ ] Contact `/contact/` を作成する
- [ ] Advertise `/advertise/` を作成する
- [x] Privacy Policy `/privacy-policy/` を作成する
- [x] 404ページを作成する（中央寄せ・大きな404・トップへの導線）
- [x] 記事詳細ページのデザイン調整を反映する
  - タイトルサイズ調整
  - 地域ラベルの表示調整
  - description / separator / blockquote / list / link / share文言調整

---

## 7. microCMS接続

- [x] microCMSクライアントを作成する
- [x] 記事一覧取得を実装する
- [x] 記事詳細取得を実装する
- [x] 各マスタ取得（categories, areas, prefectures）
- [ ] authors取得を利用するページを実装する
- [x] getStaticPathsを実装する
- [x] SSGで全ページ生成を確認する

---

## 8. 画像最適化

- [x] microCMS画像URLのクエリ調整方針を決める
  - `w`, `h`, `fit`, `fm`, `q` などで軽量化できるか確認する
- [x] 画像URL生成関数を作成する
- [x] 一覧画像をクエリ調整で軽量化する
- [x] 詳細画像をクエリ調整で最適化する
- [x] OGP画像を設定する

---

## 9. 目次生成

- [ ] h2 / h3抽出ロジックを作成する
- [ ] 見出しにID付与する
- [ ] 目次コンポーネントを表示する

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

- [x] ESLint設定
- [x] Prettier設定
- [x] Stylelint設定（SCSS順序）
- [x] スクリプト追加

  "lint": "eslint ."
  "lint:style": "stylelint \"src/**/\*.{scss,astro}\""
  "fix:style": "stylelint \"src/**/\*.{scss,astro}\" --fix"

---

## 13. SEO・公開準備

- [x] title / description設定
- [x] OGP設定
- [x] canonical設定
- [x] sitemap生成
- [x] robots.txt作成
- [x] Search Console設定（コード側のmeta tag対応 + Vercel環境変数登録済。最終的なverify確認とサイトマップ送信は再デプロイ後に実施）
- [x] プライバシーポリシー整備

---

## 14. デプロイ

- [x] GitHub作成
- [x] Vercel連携
- [x] 環境変数設定
- [x] Preview確認
- [x] 本番デプロイ
- [x] 独自ドメイン接続
- [x] PageSpeed確認
