import {
  createGenerationCache,
  forLanguages,
  type CacheEvent,
  type EventMap,
} from "@tracht-digital-solutions/tds-shared/cache";

import { categoryPath, prefix, productPath, type Lang } from "./i18n";

/**
 * This site's half of the page cache: which pages a change dates, and the memo
 * a rebuild throws away.
 *
 * The API sends *what changed* (`{type:"product", id:"fritzbox-7590-ax"}`);
 * this file answers *which of my pages that is*. Only the site knows its own
 * route table, which is why the mapping lives here and not in the API.
 */

/**
 * The one memo every content fetch on this site shares.
 *
 * A module-level promise would be right for a static build — one process, one
 * fetch, then exit — and becomes *permanent* under SSR: a product published in
 * the panel would never reach a visitor however often the cache was rebuilt,
 * and nothing would log.
 */
export const contentCache = createGenerationCache();

/** Entry points rebuilt whatever changed. */
export const alwaysPaths: string[] = ["/", "/en/", "/sitemap-0.xml", "/sitemap-index.xml"];

/** The listing pages a product appears on, in one language. */
function listingPages(lang: Lang, category?: string): string[] {
  const pages = [`${prefix(lang)}/`, "/sitemap-0.xml"];
  if (category) pages.push(categoryPath(category, lang));
  return pages;
}

export const cacheEvents: EventMap = {
  /**
   * A product was saved, published or withdrawn.
   *
   * The category comes along in the event when the API knows it; without it we
   * rebuild the entry points only. Guessing every category page instead would
   * be a rebuild of the whole site for one edit.
   */
  product: (event: CacheEvent) =>
    forLanguages(event, (lang) => {
      const slug = event.id;
      const category = (event as { category?: string }).category;
      const pages = listingPages(lang as Lang, category);
      return slug ? [productPath(slug, lang as Lang), ...pages] : pages;
    }),

  /**
   * A price or availability changed — the offer sync's event.
   *
   * Deliberately narrow: it rebuilds only the product's own pages, never the
   * listings. A price tick that rebuilt every listing page would, on a
   * catalogue of any size, mean the sync spends its budget invalidating pages
   * whose visible content did not change. Listing cards carry no price.
   */
  offer: (event: CacheEvent) =>
    forLanguages(event, (lang) => (event.id ? [productPath(event.id, lang as Lang)] : [])),

  /** A slot was re-filled. Placements can appear anywhere, so rebuild the lot. */
  placement: () => alwaysPaths,

  /** The legal texts live in the website-CMS and are shared across properties. */
  legal: () => ["/rechtliches/agb", "/rechtliches/widerruf", "/en/legal/agb", "/en/legal/widerruf"],

  sitemap: () => ["/sitemap-0.xml", "/sitemap-index.xml"],

  /** These belong to the sibling sites. Naming them keeps a typo visible. */
  post: () => [],
  block: () => [],
  tool: () => [],
};
