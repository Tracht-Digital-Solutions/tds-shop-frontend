import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
// Shared CSS minify settings, including the cssTarget that stops lightningcss
// from dropping the header's backdrop-filter prefix.
import { tdsViteBuild } from "@tracht-digital-solutions/tds-shared/astro";

export default defineConfig({
  site: "https://shop.tracht-digital.de",

  // ─── Server-rendered, behind a file-backed page cache ───────────────────
  //
  // The catalogue is panel-editable and its prices are refreshed by a sync, so
  // a static build would mean a full deploy for a price change. A cache hit
  // costs exactly what a static file cost, because it is one — the webserver
  // serves it off disk before Node is ever invoked.
  //
  // The cart, checkout and order pages are excluded from that cache by
  // `src/middleware.ts`. That exclusion is the single most consequential line
  // in this repository: a cached checkout page shows the next visitor the
  // previous one's order.
  output: "server",
  adapter: node({
    mode: "standalone",
    // The cache writer needs a complete body before it can store a page.
    experimentalDisableStreaming: true,
  }),
  integrations: [
    react(),
    // @astrojs/sitemap is deliberately absent. It derives entries from the
    // routes a build EMITS, and under output:"server" nothing is emitted — it
    // would ship a sitemap containing only the pages its own filter excluded,
    // with nothing red anywhere. `src/lib/sitemap.ts` replaces it.
    //
    // There is no build-time site-key guard either, and that is current
    // practice rather than an omission: the key is paired at RUNTIME through
    // `/tds/connect` and read from a file outside the checkout, so a build
    // never holds one to check.
  ],
  trailingSlash: "ignore",
  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
  },
  vite: {
    build: { ...tdsViteBuild },
    ssr: {
      // Bundle first-party and pure-JS packages INTO dist/server so the host
      // never needs a GitHub Packages token to boot.
      //
      // Rule of thumb from the sibling sites: bundle a leaf, ship a tree.
      noExternal: [/^@tracht-digital-solutions\//, "zod"],
      // Native addons cannot be bundled.
      external: ["sharp"],
    },
  },
});
