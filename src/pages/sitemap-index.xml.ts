import type { APIRoute } from "astro";

import { renderIndex } from "../lib/sitemap";
import { site } from "../lib/seo";

export const prerender = false;

// One shard today. The index exists anyway so the URL submitted to search
// consoles never has to change when a second one is needed.
export const GET: APIRoute = () =>
  new Response(renderIndex([`${site.url}/sitemap-0.xml`]), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
