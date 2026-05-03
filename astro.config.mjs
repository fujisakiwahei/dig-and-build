// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import path from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://dig-and-build.com",
  output: "static",
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
});
