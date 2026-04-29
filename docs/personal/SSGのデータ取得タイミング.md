# SSGの理解メモ

## 何が起きているか

AstroのSSGでは、microCMSのデータ取得はブラウザ上ではなく、ビルド時に実行される。

つまり、以下のようなコードはユーザーのブラウザで動いているのではなく、npm run build や npm run dev の処理中にサーバー側で実行されている。

    const data = await client.get({
      endpoint: 'articles',
    });

## 処理の流れ

    npm run build
      ↓
    Astroが静的ページを生成する
      ↓
    生成中にmicroCMS APIを叩く
      ↓
    取得した記事データをHTMLに埋め込む
      ↓
    dist/ に完成済みHTMLを書き出す

## ユーザーアクセス時の動き

ユーザーがサイトにアクセスした時点では、基本的にmicroCMS APIは叩かれない。

すでに生成済みのHTMLが配信される。

    ユーザーアクセス
      ↓
    dist/index.html を返す
      ↓
    すぐ表示される

## SSRやSPAとの違い

### SSR / SPAの場合

    ユーザーアクセス
      ↓
    APIを叩く
      ↓
    データを取得する
      ↓
    画面に表示する

### SSGの場合

    ビルド時にAPIを叩く
      ↓
    HTMLを完成させる
      ↓
    ユーザーアクセス時は完成済みHTMLを返すだけ

## 今回のログの意味

    contents: [
      {
        title: '丸の内テスト記事',
        slug: 'test-marunouchi',
        description: '丸の内テスト',
        body: '<p>丸の内テスト</p>',
        isFeatured: false
      }
    ]

これは、ビルド中にmicroCMSから記事データを取得できたという意味。

つまり、microCMS接続は成功している。

## SSGのメリット

- 表示が速い
- SEOに強い
- サーバー負荷が小さい
- セキュリティ的にも比較的安全
- microCMSへのアクセス回数を抑えられる

## SSGの注意点

記事を追加・更新しても、公開済みサイトにはすぐ反映されない。

反映には再ビルドが必要。

    microCMSで記事更新
      ↓
    Vercelで再ビルド
      ↓
    静的HTMLが更新される
      ↓
    サイトに反映

## Dig
