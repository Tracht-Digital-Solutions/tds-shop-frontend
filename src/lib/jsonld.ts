import type { CatalogProduct, ProductPage } from "./types";
import { displayPrice } from "@tracht-digital-solutions/tds-shared/schemas";

import { canonical, site } from "./seo";
import { productCategoryName, productPath, type Lang } from "./i18n";

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

/**
 * The organisation as a described entity, not just an `@id`.
 *
 * Emitted on the two front pages only; every subpage keeps referencing it with
 * {@link organizationRef}, which is the pattern the journal already uses. The
 * `@id` stays on the marketing origin on purpose — minting
 * `shop.tracht-digital.de/#organization` would describe a SECOND business, and
 * the whole point of the shared anchor is that there is one.
 *
 * It carries what identifies the publisher and nothing more. Address, VAT ID
 * and phone stay on the marketing site, where the Impressum is; this shop's
 * Impressum links there.
 */
export function organizationSchema(): Node {
  return {
    "@type": "Organization",
    "@id": site.organizationId,
    name: "Tracht Digital Solutions",
    legalName: site.legalName,
    url: site.mainUrl,
    founder: { "@id": site.personId },
    logo: {
      "@type": "ImageObject",
      url: site.logo.url,
      width: site.logo.width,
      height: site.logo.height,
    },
    sameAs: [...site.socials],
  };
}

export function websiteSchema(lang: Lang): Node {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: lang === "en" ? "en-GB" : "de-DE",
    description: site.description[lang],
    publisher: organizationRef(),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[], id?: string): Node {
  return {
    "@type": "BreadcrumbList",
    // Optional so a page node can point at it by `@id`. Without one a
    // `WebPage.breadcrumb` reference would dangle, which tells a parser the
    // list belongs to nothing.
    ...(id ? { "@id": id } : {}),
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

/**
 * The questions a category page shows, as `FAQPage`.
 *
 * Emitted only where `categoryCopy.ts` has written answers, and built from the
 * SAME objects the page renders — Google withdraws a FAQ rich result when the
 * structured answer differs from the visible one, and two hand-kept copies of
 * a sentence diverge on the first edit.
 */
export function faqPageSchema(items: { q: string; a: string }[]): Node | null {
  if (items.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function collectionPageSchema(name: string, path: string, lang: Lang): Node {
  return {
    "@type": "CollectionPage",
    "@id": canonical(path),
    url: canonical(path),
    name,
    inLanguage: lang === "en" ? "en-GB" : "de-DE",
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

/**
 * The product PAGE as an entity, beside the product itself.
 *
 * `Product` describes the thing; this describes the page about it — who
 * published it, and when its assessment was last revised. `dateModified` comes
 * from `product.updatedAt`, which the payload has carried the whole time and
 * which nothing read: not the sitemap's `lastmod`, not the markup, not a line
 * on the page. Freshness is one of the few things an answer engine weighs
 * besides the content, and this site had it and threw it away.
 *
 * The page shows the same date in a `<time datetime>`; the audit fails a
 * `dateModified` with no visible counterpart, which is what keeps the two
 * from drifting apart.
 */
export function webPageSchema(
  opts: { path: string; name: string; lang: Lang; dateModified?: string | null; breadcrumbId?: string },
): Node {
  const url = canonical(opts.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    inLanguage: opts.lang === "en" ? "en-GB" : "de-DE",
    isPartOf: { "@id": `${site.url}/#website` },
    publisher: organizationRef(),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.breadcrumbId ? { breadcrumb: { "@id": opts.breadcrumbId } } : {}),
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
    // The name, not the slug: "netzwerk" is an address segment, and the
    // English page's markup used to say it in German.
    category: productCategoryName(product),
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
