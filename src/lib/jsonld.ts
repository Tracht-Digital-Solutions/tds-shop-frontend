import type { CatalogProduct, ProductPage } from "./types";
import { displayPrice } from "@tracht-digital-solutions/tds-shared/schemas";

import { canonical, site } from "./seo";
import { productPath, type Lang } from "./i18n";

/**
 * Structured data.
 *
 * ### The one decision that matters here
 *
 * **`Product` + `Offer` is emitted for OUR OWN products only.** For a pure
 * affiliate entry we publish `Product` *without* `offers`, plus `ItemList` and
 * `BreadcrumbList`.
 *
 * Two independent reasons, and either alone would be enough:
 *
 * 1. Google's merchant-listing markup is meant for a page where the reader can
 *    buy. On an affiliate page the marked-up price regularly disagrees with the
 *    merchant's actual one, which costs the rich result and can earn a manual
 *    action for mismatched price data.
 * 2. The 24-hour licence rule makes a permanently correct affiliate price
 *    *structurally impossible*: the price legitimately disappears from the page
 *    overnight, so any `Offer` we emitted would be stale by construction.
 *
 * A cautious `Product` with no price is a trade — a lost rich-snippet chance
 * against a penalty risk — and the trade is worth taking.
 *
 * `asGraph` is the sole owner of `@context`. Organization and Person are
 * referenced by `@id` into `tracht-digital.de`, so the marketing site, the
 * journal, the tools and this shop resolve to ONE entity rather than four.
 */

type Node = Record<string, unknown>;

export function asGraph(nodes: (Node | null | undefined)[]): Node {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((n): n is Node => Boolean(n)),
  };
}

export const organizationRef = (): Node => ({ "@id": site.organizationId });

export function websiteSchema(lang: Lang): Node {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: lang === "en" ? "en" : "de",
    description: site.description[lang],
    publisher: organizationRef(),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: canonical(step.path),
    })),
  };
}

export function itemListSchema(products: CatalogProduct[], lang: Lang): Node {
  return {
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: canonical(productPath(product.slug, lang)),
      name: product.title,
    })),
  };
}

export function collectionPageSchema(name: string, path: string, lang: Lang): Node {
  return {
    "@type": "CollectionPage",
    "@id": canonical(path),
    url: canonical(path),
    name,
    inLanguage: lang === "en" ? "en" : "de",
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

/**
 * A product node.
 *
 * `offers` is attached ONLY when we are the seller and the price is currently
 * publishable. See the module note — this is the whole point of the file.
 */
export function productSchema(product: ProductPage, lang: Lang, now = Date.now()): Node {
  const url = canonical(productPath(product.slug, lang));
  const node: Node = {
    "@type": "Product",
    "@id": url,
    url,
    name: product.title,
    description: product.teaser,
    category: product.category,
  };
  if (product.imageUrl) node.image = product.imageUrl;

  const ownOffers = (product.offers ?? []).filter((offer) => offer.kind === "own");
  const priced = ownOffers
    .map((offer) => ({ offer, price: displayPrice(offer, now) }))
    .filter((entry): entry is { offer: (typeof ownOffers)[number]; price: { cents: number; currency: string } } =>
      entry.price !== null,
    );

  if (priced.length > 0) {
    node.offers = priced.map(({ offer, price }) => ({
      "@type": "Offer",
      url,
      price: (price.cents / 100).toFixed(2),
      priceCurrency: price.currency,
      availability:
        offer.availability === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: organizationRef(),
    }));
  }
  return node;
}
