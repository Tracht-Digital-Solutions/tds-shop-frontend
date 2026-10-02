import type { APIRoute } from "astro";
import { listCategories, listProducts } from "~/lib/content-api";
import { isIndexable } from "~/lib/indexing";
import { renderLlmsTxt } from "~/lib/llmsTxt";

/**
 * `/llms.txt`, derived from the catalogue.
 *
 * Server-rendered, like the sitemap: the catalogue is editorial state that
 * changes without a deploy, and a prerendered file would keep advertising a
 * product whose assessment was withdrawn.
 *
 * `isIndexable()` is the same gate the page's own `<meta name="robots">` and
 * the sitemap use, so this file can never name a URL whose page says
 * `noindex` — the rule that already governs every other machine-readable
 * surface here.
 *
 * There is no `public/llms.txt` and there must not be one: a static asset
 * shadows a route of the same path, so the file would win and this endpoint
 * would never answer. `llmsTxt.test.ts` asserts the absence.
 *
 * NOT on a cache event: the page cache stores no `text/plain`, so a hit is
 * impossible and warming it would render a document per rebuild and discard
 * it.
 */
export const prerender = false;

export const GET: APIRoute = async () => {
  // German is the root tree and this file is German; the English URLs are
  // derived per entry, so one language's read is enough.
  const [page, categories] = await Promise.all([
    listProducts({ lang: "de", limit: 48 }),
    listCategories("de"),
  ]);

  const products = page.products.filter(isIndexable).map((product) => ({
    slug: product.slug,
    title: product.title,
    teaser: product.teaser,
    category: product.category,
  }));

  const body = renderLlmsTxt({
    categories: categories.map((entry) => ({
      slug: entry.category,
      label: entry.label ?? null,
      total: entry.total,
    })),
    products,
  });

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
