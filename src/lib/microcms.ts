import { createClient } from "microcms-js-sdk";

if (!import.meta.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!import.meta.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export type Eyecatch = {
  url: string;
  height: number;
  width: number;
};

type MicroCMSImageFit =
  | "clip"
  | "crop"
  | "fill"
  | "fillmax"
  | "max"
  | "min"
  | "scale";

type MicroCMSImageFormat = "webp";

type MicroCMSImageOptions = {
  width?: number;
  height?: number;
  fit?: MicroCMSImageFit;
  format?: MicroCMSImageFormat;
  quality?: number;
};

type MicroCMSImageSrcSetOptions = MicroCMSImageOptions & {
  aspectRatio?: {
    width: number;
    height: number;
  };
};

export const MICROCMS_IMAGE_QUALITY = {
  list: 50,
  detail: 80,
} as const;

export type Prefecture = {
  id: string;
  name: string;
  slug: string;
};

export type Area = {
  id: string;
  name: string;
  slug: string;
  prefecture: Prefecture[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Author = {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: Eyecatch;
  xUrl?: string;
  igUrl?: string;
  websiteUrl?: string;
};

export type Article = {
  id: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  eyecatch?: Eyecatch;
  isFeatured: boolean;
  area: Area[];
  category: Category;
  author?: Author;
};

export type ListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

export function buildMicroCMSImageUrl(
  imageUrl: string,
  options: MicroCMSImageOptions = {},
): string {
  try {
    const url = new URL(imageUrl);

    if (options.width) {
      url.searchParams.set("w", String(options.width));
    }

    if (options.height) {
      url.searchParams.set("h", String(options.height));
    }

    if (options.fit) {
      url.searchParams.set("fit", options.fit);
    }

    if (options.format) {
      url.searchParams.set("fm", options.format);
    }

    if (options.quality) {
      url.searchParams.set("q", String(options.quality));
    }

    return url.toString();
  } catch {
    return imageUrl;
  }
}

export function buildMicroCMSImageSrcSet(
  imageUrl: string,
  widths: number[],
  options: MicroCMSImageSrcSetOptions = {},
): string {
  return widths
    .map((width) => {
      const height = options.aspectRatio
        ? Math.round(
            (width * options.aspectRatio.height) / options.aspectRatio.width,
          )
        : options.height;
      const src = buildMicroCMSImageUrl(imageUrl, {
        ...options,
        width,
        height,
      });

      return `${src} ${width}w`;
    })
    .join(", ");
}
