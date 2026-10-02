/**
 * The locale counterpart of a page, looked up rather than derived.
 *
 * ### Why this file exists
 *
 * `i18n.ts` has referred to "`alternates.ts` looks the counterpart up instead"
 * since the shop was built. The file never existed, and the consequence was
 * not a missing nicety: `Layout.astro` emits hreflang ONLY when it is handed
 * an `altUrl`, and the only pages that handed it one were the four `noindex`
 * cart and checkout pages. Every indexable page — home, every category, every
 * product — shipped no hreflang at all, and `Header.astro` fell back to
 * `homePath()`, so the language switch on a product page sent the reader to
 * the front page instead of to the same product.
 *
 * ### Why a twin is confirmed and never derived
 *
 * The two trees are not a prefix mirror: the taxonomy segments differ per
 * language (`produkt` ↔ `product`), and a product's slug MAY differ too,
 * because the API pairs translations on the product id. Pasting `/en/` in
 * front of a German path therefore produces a 404 on every listing page, and
 * `Layout.astro`'s own doc comment says why that is worse than nothing: one
 * dangling alternate invalidates the whole set, the German side included.
 *
 * So every function here returns `null` unless the counterpart is known to
 * answer. For a category that is a count in the other language; for a product
 * it costs one extra read, which the page cache absorbs.
 *
 * ### The gap this cannot close
 *
 * `ShopProduct` carries no product id and no counterpart slug, so a product
 * whose translation lives under a DIFFERENT slug cannot be paired from here —
 * the probe looks for the same slug and correctly finds nothing. Closing that
 * needs a field from the API (tds-ext-shop + tds-core-frontend-api); until
 * then such a product ships no hreflang, which is the honest outcome rather
 * than a guess.
 */

import { getProduct, listCategories } from "./content-api";
import { canonical } from "./seo";
import { categoryPath, homePath, productPath, type Lang } from "./i18n";

/** The other language. */
export const otherLang = (lang: Lang): Lang => (lang === "de" ? "en" : "de");

/** Absolute URL of the home page in the other language. Always exists. */
export function homeAlternate(lang: Lang): string {
  return canonical(homePath(otherLang(lang)));
}

/**
 * Absolute URL of this category in the other language, or `null`.
 *
 * Category slugs are shared across the trees — only the segment differs — so
 * the question is whether the other language has anything in it. An empty
 * category is not a page: `sitemap.ts` leaves it out, so linking an alternate
 * at it would point at a route the sitemap does not list.
 */
export async function categoryAlternate(category: string, lang: Lang): Promise<string | null> {
  const other = otherLang(lang);
  const counts = await listCategories(other);
  const match = counts.find((entry) => entry.category === category);
  if (!match || match.total < 1) return null;
  return canonical(categoryPath(category, other));
}

/**
 * Absolute URL of this product in the other language, or `null`.
 *
 * Confirmed with a second read, because a guess here is a 404. A real 404 from
 * the API gives `null` and the page then ships without hreflang.
 *
 * It uses the same client the page itself uses, which means it inherits the
 * same fail-soft behaviour: on a network error `getProduct` answers from the
 * demo fixtures. That is deliberate and consistent — in that state the PAGE is
 * demo content too, so its alternate describes the same thing the page does.
 * What must never happen is a confident alternate for a product the API says
 * does not exist in that language, and a 404 is passed through.
 */
export async function productAlternate(slug: string, lang: Lang): Promise<string | null> {
  const other = otherLang(lang);
  const twin = await getProduct(slug, other);
  if (!twin) return null;
  // The API may serve the translation under its own slug; trust what came
  // back rather than the slug we asked for.
  return canonical(productPath(twin.slug, other));
}
