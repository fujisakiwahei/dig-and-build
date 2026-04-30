# Astroのページネーションの仕組み

## 何ができるのか

1ファイル `src/pages/articles/[...page].astro` から、

    /articles       (1ページ目)
    /articles/2     (2ページ目)
    /articles/3     (3ページ目)
    ...

のような複数ページを **ビルド時に自動生成** できる。

## キーになる仕組みは3つ

### 1. ファイル名の `[...page]`（rest パラメータ）

`[...page].astro` という rest パラメータ付きのファイル名にしておくと、ページ1だけは URL の末尾なし (`/articles`)、ページ2以降は番号付き (`/articles/2`) で出してくれる。

`[page].astro` (rest なし) にすると、ページ1も `/articles/1` になってしまい、`/articles` に来た人が 404 になる。これがハマりポイント。

### 2. `getStaticPaths({ paginate })`

Astro が用意してくれているヘルパー `paginate()` を `getStaticPaths` の引数経由で受け取る。

    export const getStaticPaths = (async ({ paginate }) => {
      const res = await client.get({
        endpoint: "articles",
        queries: { orders: "-publishedAt", limit: 100, depth: 2 },
      });
      return paginate(res.contents, { pageSize: 18 });
    }) satisfies GetStaticPaths;

`paginate(items, { pageSize })` は、配列を `pageSize` 件ずつに切り分けて、それぞれを「1ページ分の path + props」として返してくれる。

### 3. `Astro.props.page` で現在ページの情報を受け取る

    const { page } = Astro.props;

`page` は Astro が用意してくれている `Page<T>` 型のオブジェクト。中身はこんな感じ。

    page.data           // 今のページ分の配列 (18件)
    page.currentPage    // 1, 2, 3, ...
    page.lastPage       // 最後のページ番号
    page.total          // 全件数
    page.size           // pageSize で渡した数 (18)
    page.start          // この範囲の開始 index
    page.end            // この範囲の終了 index
    page.url.current    // /articles/2
    page.url.prev       // /articles  (ない場合は undefined)
    page.url.next       // /articles/3 (ない場合は undefined)
    page.url.first      // 最初のページの URL
    page.url.last       // 最後のページの URL

`url.prev` / `url.next` を信頼すれば、前後リンクは自前で URL を組み立てる必要がない。

## トレードオフ・注意点

### microCMS の limit=100 の壁

SSG は **ビルド時に全件取得して** から `paginate()` に渡す前提。

microCMS は `limit` の上限が 100。記事が 100 件を超えるとそのままでは取りこぼす。

対策: 100 件を超える前に `offset` ループで全件取りに行くヘルパー関数を作る。

    async function fetchAll() {
      const all = [];
      const limit = 100;
      let offset = 0;
      while (true) {
        const res = await client.get({
          endpoint: "articles",
          queries: { limit, offset, orders: "-publishedAt", depth: 2 },
        });
        all.push(...res.contents);
        if (offset + limit >= res.totalCount) break;
        offset += limit;
      }
      return all;
    }

### 全ページがビルド時に生成される

記事が 100 件あって pageSize=18 なら、`/articles/1` から `/articles/6` までの全 HTML が `dist/` に書き出される。

→ 記事が増えるとビルド時間も増える。SSG の宿命。

## このプロジェクトでの実装

- ルート: `src/pages/articles/[...page].astro`
- ページネーション UI: `src/components/Pagination.astro`
- 1ページあたり: 18記事
- 並び順: `-publishedAt` (公開日の新しい順)

## ハマりポイントまとめ

- ファイル名は **必ず `[...page]`**（3点リーダ付き）。`[page]` だと `/articles` が 404。
- ページ番号リンクの URL は、Astro 流に合わせて 1 ページ目だけ `/articles`、2ページ目以降は `/articles/N`。`page.url.prev/next` を使えば自分で組まなくていい。
- `paginate()` は配列を渡す。**取得結果のオブジェクトそのもの** を渡しても動かないので `res.contents` を渡す。
