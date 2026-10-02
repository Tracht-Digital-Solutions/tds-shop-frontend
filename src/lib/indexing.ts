import type { CatalogProduct, EditorialStatus } from "./types";
import { matchesPathPrefix, NEVER_CACHED } from "./noCache";

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

/**
 * Paths that never belong in an index: everything never cached (basket,
 * checkout, order, account, search, `/go/`, `/tds/`) plus the install page.
 * Derived, so the two lists cannot drift apart.
 */
const NEVER_INDEXED = [...NEVER_CACHED, "/install"];

export function isExcludedPath(pathname: string): boolean {
  return matchesPathPrefix(pathname, NEVER_INDEXED);
}
