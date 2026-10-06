import type { APIRoute } from "astro";

import { buildEntries, renderSectionIndex } from "../lib/sitemap";
import { site } from "../lib/seo";

export const prerender = false;

// Since 2026-10-06: one child per section (src/lib/sitemapSections.ts) — home,
// categories, products, legal texts — each with the newest real date in it.
// The URL submitted to search consoles stays this one.
export const GET: APIRoute = async () =>
  new Response(renderSectionIndex(await buildEntries(), site.url), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
