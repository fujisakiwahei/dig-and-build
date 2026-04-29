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

- `<style>`タグでSCSSかける！Astro
