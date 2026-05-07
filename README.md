# Dig&Build Media Stack

都市・建築・再開発を扱うメディア「Dig&Build」のために構築した、Astro + microCMS ベースの高速メディア実装です。

記事追加後の PageSpeed Insights では、モバイルで 85 / 100 / 100 / 100、PC で 94 / 100 / 100 / 100 を記録しました。
microCMSによりコンテンツ管理のしやすさを保ちながら、WordPress で起きやすいプラグイン由来のバンドル肥大化を避け、軽量なフロントエンドとして成立させることを重視しています。

![PageSpeed Insights mobile score](./readme-assets/pagespeed-mobile.png)
![PageSpeed Insights desktop score](./readme-assets/pagespeed-desktop.png)

## 主な機能

- Astro の静的生成による高速なメディアサイト
- microCMS による記事、カテゴリ、エリア、著者情報の管理
- 記事一覧、カテゴリ別一覧、エリア別一覧のページネーション（Astro標準のページネーションを利用）
- microCMS 画像の WebP 変換、品質指定、srcset 生成
- ページ遷移の体感時間を減らすための、Astro View Transitionsによるトランジションアニメーション
- GA4 page_view の手動送信（Astro View Transitionsによる遷移時）
- Vercel Functions による問い合わせ API
- Resend を使った問い合わせ通知と自動返信
- Cloudflare Turnstile、サーバー側バリデーションによるフォーム保護

## Why This Template?（なぜ作ったか）

とにかく速いメディアを作るために構築しました。

メディアサイトやコーポレートサイトにはWordPressを主に活用していましたが、テーマやプラグインの影響で不要な CSS / JavaScript が増えやすく、PageSpeed Insights の改善が難しくなることがありました。そこで、表示側は Astro の静的生成に寄せ、CMS は microCMS に分離しました。

問い合わせ機能も外部フォームサービスに依存せず、Vercel Functions 上に自前実装しています。送信には Resend を使い、フォーム入力の検証、bot 対策、運営通知、自動返信までを含めています。

## Tech Stack

- Astro
- TypeScript
- microCMS
- Sass
- Vercel Functions
- Resend
- Cloudflare Turnstile
- Astro Sitemap
- GA4

## Development

```sh
pnpm install
pnpm run dev
```

本番ビルドは microCMS から記事データを取得するため、`MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` が必要です。

```sh
pnpm run build
```
