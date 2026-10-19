import type { APIRoute } from "astro";
import { listAllProducts, listCategories } from "~/lib/content-api";
import { isIndexable } from "~/lib/indexing";
import { renderLlmsTxt } from "~/lib/llmsTxt";
import { LEGAL_TITLES, publishedLegalSlugs } from "../lib/legal";
import { legalPath } from "../lib/i18n";
import { canonical } from "../lib/seo";

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
  // German is the root tree and this file is German. The English tree is read
  // too, because its product slugs are its own: a German slug says nothing
  // about whether `/en/product/<slug>` exists. Paired by slug, as the sitemap
  // pairs its alternates; the rest is listed on its own.
  const [all, allEn, categories] = await Promise.all([
    listAllProducts({ lang: "de" }),
    listAllProducts({ lang: "en" }),
    listCategories("de"),
  ]);

  const english = new Set(allEn.filter(isIndexable).map((product) => product.slug));
  const products = all.filter(isIndexable).map((product) => ({
    slug: product.slug,
    title: product.title,
    teaser: product.teaser,
    summary: product.summary ?? null,
    category: product.category,
    english: english.has(product.slug),
  }));
  const german = new Set(products.map((product) => product.slug));
  const englishOnly = allEn
    .filter((product) => isIndexable(product) && !german.has(product.slug))
    .map((product) => ({ slug: product.slug, title: product.title }));

  const body = renderLlmsTxt({
    categories: categories.map((entry) => ({
      slug: entry.category,
      label: entry.label ?? null,
      total: entry.total,
    })),
    products,
    englishOnly,
    legal: (await publishedLegalSlugs("de")).map((slug) => ({
      title: LEGAL_TITLES.de[slug],
      url: canonical(legalPath(slug, "de")),
    })),
  });

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
