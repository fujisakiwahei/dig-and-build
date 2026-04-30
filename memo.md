- `npm create astro@latest`でastroをセットアップ
- CLIでGitリポジトリを作って接続
- [ ] マニュアル化すべき。フレームワークでのセットアップを（NuxtのインストールからGitの接続、Prettierなどのインストール、ブランチ作成、リセットCSSまで）
- AstroはTypeScriptネイティブ対応なので追加のインストールは不要。
- `npm install sass`だけでscss使えるようになる。
- `npm install -D stylelint stylelint-order stylelint-config-standard-scss postcss-scss`で、SCSSの並び替え設定と依存関係をインストール。これで、保存時にPrettierと両方走るのかな？
  - [ ] これもマニュアルに入れる
- Prettier入れた。

## Astro固有

- `astro.config.mjs`で、プロジェクト設定をする。SSRなど。
  - `output: "static",`でssgにした。
- グローバルに読み込みたいSCSSやJSは、layoutsファイル（`src/layouts/BaseLayout.astro`など）にインポートすると良い。Nuxtとは違い、「各ページでレイアウトを明示的に指定」。

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Dig&Build">
  <h1>Dig&Build</h1>
</BaseLayout>

```

- `<style>`タグでSCSS書ける！Astro
- `src/components/Header.astro`みたいにコンポーネント使って他所からよびだしできる。
- 動的ルーティングもNuxtと一緒！わかりやすい。`src/pages/areas/[prefecture]/[area].astro`など。
- microCMSはAstro専用のモジュールなし。SDKを使った。`npm install microcms-js-sdk`
  - [https://zenn.dev/nishina__n/articles/1b97195b79f1df]を参考に。
  - Blogの方とかクライアントを作るメソッドなどがSDKに入っているみたい。
  - SCKの`createClient`に、envから環境変数を読み取って使っている。

  ```ts
  export const client = createClient({
    serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: import.meta.env.MICROCMS_API_KEY,
  });
  ```

- フロントマター（.astroファイル冒頭の`___{contents}___`）に書いたJSはサーバーサイドで実行される。一方、Scriptタグで書いたらクライアントサイドで実行される。
- SSGモードでも、開発時はアクセス毎にビルドが入るイメージなので快適に実装を進められる。
- [ ] `index.astro`じゃないのか。各ディレクトリのページは？ページネーションも関連してややこしくなっていそう

## microCMS

- microCMSでは、WordPressのように`-1`で記事数を指定できない。上限が100。
- webhookめっちゃ簡単だった。以下の手順で、記事の保存時にvercelの再ビルドを行うように設定。（SSGなので必要）

```txt
1. Vercelで対象プロジェクトを開く
2. Settings → Git → Deploy Hooks を開く
3. Hook名を入力する
    例：microcms
4. 対象ブランチを選ぶ
    例：main
5. Create Hook を押す
6. 発行されたDeploy Hook URLをコピーする
7. microCMS管理画面で対象APIを開く
8. API設定 → Webhook → 追加
9. 連携先に Vercel を選ぶ
10. VercelのDeploy Hook URLを貼り付ける
11. 通知タイミングを設定して保存
```

- [画像最適化（公式）](https://help.microcms.io/ja/knowledge/reduce-data-costs)

## JSの仕様

- `slice(0, 8)`にすると、8投稿目まで取られる。イメージとしては、8でカットするから7まで使う感じで排他。

## ネットワーク・インフラ

- おなまえ.comでドメインをとって、ネームサーバをVercelに向ける運用。レンタルサーバは借りておらず、メールなども使う予定がないので。

## AstroファイルのCSSの自動並び替えとlinterを追加

### 目的

.astro内のstyleタグも整形し、CSSプロパティ順を自動で揃え、保存時に実行される状態にする。

### 入れたパッケージ

stylelint：CSSのルールチェック本体。  
stylelint-config-standard-scss：SCSS向けの基本ルール。  
stylelint-order：CSSプロパティの並び順を制御。  
postcss-scss：SCSS構文をStylelintが読めるようにする。  
postcss-html：.astro内のstyleタグだけを解析できるようにする。  
prettier：改行・スペース・インデントなどの見た目を整える。

### Stylelintでやったこと

.astroはpostcss-htmlで解析する。  
.scssはpostcss-scssで解析する。  
Astro独自の:globalは例外として許可する。  
BEM形式のクラス名を使うため、selector-class-patternは無効化する。

### VSCodeでやったこと

AstroのdefaultFormatterをPrettierにした。

    "[astro]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }

保存時にStylelintとESLintのfixを走らせるようにした。

### 保存時の流れ

保存すると、Prettierで全体整形され、ESLintでJS/TS周りが修正され、StylelintでCSS/SCSSのルール修正とプロパティ順の並び替えが行われる。

### ハマったポイント

.astroをそのままStylelintに読ませると、AstroのフロントマターやTypeScript部分をCSSとして誤認する。  
postcss-htmlを入れることで、styleタグの中だけを安全に処理できるようになった。  
また、:globalは通常のCSSではないため、Stylelint側で明示的に許可する必要があった。

### まとめ

Astroでstyleタグ内のCSSまで整形したい場合は、postcss-htmlを入れる。  
AstroのフォーマッタはPrettierに統一する。  
CSSプロパティ順はPrettierではなくStylelintで管理する。

## AstroのSEO対策

- `@astrojs/sitemap`をinstallしてサイトマップ作成
  - astro.config.mjs に integration を追加することで、ビルド時にサイトマップが作成される
  - サイトマップは初回送信したら2回目以降は自動でやってくれる
- Search Consoleの認証は、headへのメタタグ埋め込み。今回は環境変数に入れておいた
- public/robots.txtを作成した
- GA4のタグを変わった方法でつけた。共通レイアウトのheadの下に。

```astro
const googleTagManagerScript = `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QWRQ17Y1KS"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QWRQ17Y1KS');
</script>`;
```
