/**
 * Languages, route segments and UI strings.
 *
 * German is the root tree, English lives under `/en/`. The two are **not** a
 * prefix mirror: the taxonomy segments differ per language, exactly as they do
 * on the journal (`kategorie` ↔ `category`). Deriving an alternate by pasting
 * `/en/` in front of a German path therefore produces a 404 for every listing
 * page, which is why `alternates.ts` looks the counterpart up instead.
 *
 * The one thing that IS shared is a product's identity, and even there the
 * slugs may differ — the API pairs translations on the product id, not on the
 * slug. That is a deliberate improvement over the journal's 1:1 rule; do not
 * "fix" it back.
 */

export const LANGS = ["de", "en"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** Path segments, per language. Each module that builds URLs keeps its own copy. */
export const SEGMENTS = {
  de: { product: "produkt", category: "kategorie", tag: "thema", page: "seite", legal: "rechtliches" },
  en: { product: "product", category: "category", tag: "topic", page: "page", legal: "legal" },
} as const;

/** The prefix a language's tree hangs under. German is the root. */
export const prefix = (lang: Lang): string => (lang === "en" ? "/en" : "");

export const productPath = (slug: string, lang: Lang): string =>
  `${prefix(lang)}/${SEGMENTS[lang].product}/${slug}`;

export const categoryPath = (category: string, lang: Lang): string =>
  `${prefix(lang)}/${SEGMENTS[lang].category}/${category}`;

export const tagPath = (tag: string, lang: Lang): string =>
  `${prefix(lang)}/${SEGMENTS[lang].tag}/${tag}`;

export const pagePath = (n: number, lang: Lang): string =>
  `${prefix(lang)}/${SEGMENTS[lang].page}/${n}`;

export const homePath = (lang: Lang): string => `${prefix(lang)}/` as const;

export const TX = {
  de: {
    brand: "TDShop",
    tagline: "Technik und Digitalisierung, kuratiert.",
    nav: { home: "Start", categories: "Kategorien", about: "Über TDShop" },
    catalogue: "Produkte",
    categories: "Kategorien",
    noProducts: "Hier steht noch nichts.",
    older: "Ältere",
    newer: "Neuere",
    page: "Seite",
    relatedCategory: "Mehr aus dieser Kategorie",
    ourAssessment: "Unsere Einschätzung",
    adLabel: "Anzeige",
    affiliateNotice:
      "Einige Links auf dieser Seite sind Partnerlinks. Kaufst du darüber, erhalten wir eine Provision — für dich ändert sich der Preis nicht.",
    priceUnavailable: "Preis beim Anbieter prüfen",
    backToCatalogue: "Zurück zum Katalog",
    notFound: "Diese Seite gibt es nicht.",
    notFoundBody: "Vielleicht ist das Produkt umgezogen oder wurde zurückgezogen.",
  },
  en: {
    brand: "TDShop",
    tagline: "Technology and digitalisation, curated.",
    nav: { home: "Home", categories: "Categories", about: "About TDShop" },
    catalogue: "Products",
    categories: "Categories",
    noProducts: "Nothing here yet.",
    older: "Older",
    newer: "Newer",
    page: "Page",
    relatedCategory: "More in this category",
    ourAssessment: "Our assessment",
    adLabel: "Advertisement",
    affiliateNotice:
      "Some links on this page are affiliate links. If you buy through them we earn a commission — the price is the same for you.",
    priceUnavailable: "Check price at the merchant",
    backToCatalogue: "Back to the catalogue",
    notFound: "This page does not exist.",
    notFoundBody: "The product may have moved or been withdrawn.",
  },
} as const;

export const tx = (lang: Lang) => TX[lang];
