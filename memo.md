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

<BaseLayout title="Dig and Build">
  <h1>Dig and Build</h1>
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
