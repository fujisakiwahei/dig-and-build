// 共通型
export type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

export type MicroCMSBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// prefectures
export type Prefecture = MicroCMSBase & {
  name: string;
  slug: string;
  description?: string;
};

// areas
export type Area = MicroCMSBase & {
  name: string;
  slug: string;
  description?: string;
  prefecture: Prefecture;
};

// categories
export type Category = MicroCMSBase & {
  name: string;
  slug: string;
  description?: string;
};

// authors
export type Author = MicroCMSBase & {
  name: string;
  slug: string;
  bio?: string;
  avatar?: MicroCMSImage;
  xUrl?: string;
  websiteUrl?: string;
};

// articles
export type Article = MicroCMSBase & {
  title: string;
  slug: string;
  description: string;
  body: string;
  eyecatch?: MicroCMSImage;
  isFeatured: boolean;

  areas: Area[];
  category: Category;
  author: Author;
};

// レスポンス型
export type ArticleResponse = MicroCMSListResponse<Article>;
export type AreaResponse = MicroCMSListResponse<Area>;
export type CategoryResponse = MicroCMSListResponse<Category>;
export type PrefectureResponse = MicroCMSListResponse<Prefecture>;
export type AuthorResponse = MicroCMSListResponse<Author>;
