import type { CatalogProduct, EditorialStatus } from "./types";

/**
 * What may be indexed — the answer to the thin-affiliate problem.
 *
 * A catalogue of restated manufacturer copy wrapped around partner links is
 * precisely the pattern search engines demote, and no amount of technical SEO
 * fixes it. The answer is editorial, so the gate is editorial: a product is
 * indexable only once somebody has written their own assessment of it
 * (`editorialStatus === "published"`).
 *
 * Everything else still RENDERS and is still reachable — it is a real page for
 * a reader who follows a link — it simply carries `noindex, follow` and stays
 * out of the sitemap. The `follow` half matters: the links out of that page
 * are still worth crawling.
 *
 * This is what stops a bulk import of three hundred ASINs from turning the
 * domain into a link farm. It is one function so that the sitemap and the
 * page's own robots meta cannot drift apart — the failure where a URL is
 * submitted for indexing while the page it names says `noindex` is a
 * self-inflicted crawl-budget hole that reports nothing.
 */

export type Indexable = Pick<CatalogProduct, "slug"> & {
  editorialStatus?: EditorialStatus;
};

export function isIndexable(product: Indexable | null | undefined): boolean {
  if (!product) return false;
  return product.editorialStatus === "published";
}

/** Paths that never belong in an index, whatever they contain. */
const NEVER_INDEXED = [
  "/go/",
  "/install",
  "/tds/",
  "/suche",
  "/en/search",
  "/warenkorb",
  "/en/cart",
  "/kasse",
  "/en/checkout",
  "/bestellung",
  "/en/order",
  "/konto",
  "/en/account",
];

export function isExcludedPath(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return NEVER_INDEXED.some((prefix) => path === prefix.replace(/\/$/, "") || path.startsWith(prefix));
}
