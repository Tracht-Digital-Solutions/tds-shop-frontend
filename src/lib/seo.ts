import type { Lang } from "./i18n";

/**
 * Site identity and the two text budgets.
 *
 * A fourth hand-written copy of this file now exists across the properties
 * (landingpage, journal, tools, shop). Extracting it into `tds-shared` is the
 * right move and is deliberately NOT done here: it would mean a shared minor,
 * a repin round across seven repositories, and a new site going live in the
 * same window. Two risks in one change. It belongs in its own pass, once this
 * site has run for a while — and by then there will be two live
 * implementations to extract FROM rather than one to guess at.
 */

export const site = {
  name: "TDShop",
  url: "https://shop.tracht-digital.de",
  /** The canonical identity lives on the marketing site; we reference it by @id. */
  organizationId: "https://tracht-digital.de/#organization",
  personId: "https://tracht-digital.de/#person",
  description: {
    de: "Kuratierte Technik für Digitalisierung im Betrieb: Hardware, Netzwerk und Software mit eigener Einschätzung statt Herstellertext.",
    en: "Curated technology for digitalising a business: hardware, networking and software with our own assessment rather than vendor copy.",
  },
} as const;

const TITLE_BUDGET = 60;

/**
 * Compose a page title within the budget a search result actually shows.
 *
 * When the combined form is too long the BRAND is dropped, never the subject —
 * a truncated title that keeps "— TDShop" and loses the product name is a
 * result nobody can identify.
 */
export function pageTitle(subject: string, lang: Lang = "de"): string {
  const trimmed = subject.trim();
  if (trimmed === "") return site.name;
  const combined = `${trimmed} — ${site.name}`;
  if (combined.length <= TITLE_BUDGET) return combined;
  void lang;
  return trimmed;
}

/**
 * The sibling TDS properties this site links to, in the reader's language.
 *
 * One function rather than URLs inline in the header, footer and empty state:
 * the journal links here from its own `nav.ts` (`SHOP_URL`), and a property
 * that is only ever linked TO is a dead end for a reader and an orphan for a
 * crawler. Absolute on purpose — these are separate hosts, and a site-relative
 * path would resolve against this one and 404. Every sibling serves its English
 * edition under `/en/`.
 */
export function siteLinks(lang: Lang): { main: string; blog: string; tools: string } {
  const suffix = lang === "en" ? "/en/" : "/";
  return {
    main: `https://tracht-digital.de${suffix}`,
    blog: `https://blog.tracht-digital.de${suffix}`,
    tools: `https://tools.tracht-digital.de${suffix}`,
  };
}

/** The absolute canonical for a path. */
export function canonical(pathname: string): string {
  return new URL(pathname, site.url).toString();
}
