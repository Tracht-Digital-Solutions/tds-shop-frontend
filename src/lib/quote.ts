import { formatPrice } from "@tracht-digital-solutions/tds-shared/format";
import { displayPrice } from "@tracht-digital-solutions/tds-shared/schemas";
import type { ShopProductRef } from "@tracht-digital-solutions/tds-shared/schemas";
import type { Lang } from "./i18n";
import { site } from "./seo";

/**
 * "Angebot anfordern": our own services are quoted, not bought from a card.
 *
 * The contact form lives on the marketing site, so the prepared text travels in
 * the query string (`?anfrage=`, read by its `lib/quoteRequest.ts`). It is only a
 * draft in the message field and is never sent by itself.
 */
export const contactBase = (lang: Lang): string => `${site.mainUrl}${lang === "en" ? "/en/" : "/"}`;

export const quoteUrl = (lang: Lang, message: string): string =>
  `${contactBase(lang)}?anfrage=${encodeURIComponent(message)}#contact`;

export function quoteMessage(lang: Lang, title: string, price: string | null): string {
  if (lang === "en") {
    const from = price ? ` (from ${price} incl. VAT)` : "";
    return `Hello,\n\nI am interested in "${title}"${from}. Please send me a quote.\n\nAbout my business:\n\n\nKind regards`;
  }
  const from = price ? ` (ab ${price} inkl. MwSt.)` : "";
  return `Guten Tag,\n\nich interessiere mich für „${title}“${from}. Bitte senden Sie mir ein Angebot.\n\nZu meinem Betrieb:\n\n\nViele Grüße`;
}

/** The link behind one product's "Angebot anfordern". */
export const quoteHref =
  (lang: Lang) =>
  (product: ShopProductRef): string => {
    const own = product.offers.find((offer) => offer.kind === "own");
    const price = own ? displayPrice(own) : null;
    return quoteUrl(lang, quoteMessage(lang, product.title, price ? formatPrice(price.cents, price.currency, lang) : null));
  };
