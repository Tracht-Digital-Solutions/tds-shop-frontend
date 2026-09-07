import type { ShopProduct, ShopProductRef } from "@tracht-digital-solutions/tds-shared/schemas";

/**
 * Repo-local widenings of the shared read model.
 *
 * `editorialStatus` is served by the API but is **not** in `tds-shared`'s
 * schema, and that is deliberate. It answers one question — may this page be
 * indexed — which only this site asks: the journal's inline product block and
 * the portal's placement widget render a card either way. Putting it in the
 * shared schema would cost a shared minor and a repin round across seven
 * repositories to carry a field six of them ignore.
 *
 * Same reasoning the journal uses for `FullPost`, which widens `BlogPost`
 * locally rather than patching the shared package for a field only it reads.
 */

export type EditorialStatus = "none" | "stub" | "published";

export type CatalogProduct = ShopProductRef & {
  /** Absent on a payload from an older API build; treated as `none`. */
  editorialStatus?: EditorialStatus;
  /**
   * Also served on list rows, and also outside the shared schema — for the
   * same reason: the sitemap's `lastmod` is this site's concern alone. A
   * placement card has no use for a publication date.
   */
  publishedAt?: string | null;
  tags?: string[];
};

export type ProductPage = ShopProduct & {
  editorialStatus?: EditorialStatus;
};
