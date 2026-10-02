import type { Lang } from "./i18n";

/** Anything with a scheme (`https:`) is absolute; everything else stays site-relative. */
const ABSOLUTE = /^[a-z][a-z\d+.-]*:/i;

/**
 * Append the click attribution to an offer URL.
 *
 * `offer.url` already points at this site's `/go/{id}` redirect — the API
 * builds it, so the partner tag lives in one row rather than in every card.
 * Only the attribution is added here, because only the rendering context knows
 * which surface and slot the click came from.
 *
 * One helper for the product page and the grid: the two used to build this
 * separately — one by string concatenation that dropped `placement` and would
 * have produced `?a=1?source=…` on a URL that already carried a query.
 */
export function attributedOfferUrl(url: string, lang: Lang, placement?: string | null): string {
  const parsed = new URL(url, "https://shop.invalid");
  parsed.searchParams.set("source", "shop");
  parsed.searchParams.set("lang", lang);
  if (placement) parsed.searchParams.set("placement", placement);
  return ABSOLUTE.test(url) ? parsed.toString() : `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

/** The same, over every offer of a product. */
export function withAttribution<T extends { offers: Array<{ url: string }> }>(
  product: T,
  lang: Lang,
  placement?: string | null,
): T {
  return {
    ...product,
    offers: product.offers.map((offer) => ({ ...offer, url: attributedOfferUrl(offer.url, lang, placement) })),
  };
}
