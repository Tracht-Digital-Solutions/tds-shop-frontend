import type { APIRoute } from "astro";

import { buildEntries, renderUrlset } from "../lib/sitemap";

export const prerender = false;

export const GET: APIRoute = async () => {
  const body = renderUrlset(await buildEntries());
  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
};
