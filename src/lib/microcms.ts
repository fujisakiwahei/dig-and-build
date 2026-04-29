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

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
  };
};

export type BlogResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};
