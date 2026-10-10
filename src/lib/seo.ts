import { propertyHome } from "@tracht-digital-solutions/tds-shared/nav";

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
  /**
   * The marketing origin, and the few values the front page needs in order to
   * describe the organisation rather than only point at it.
   *
   * Until 2026-10-02 `organizationRef()` was the ONLY organisation markup on
   * this site, so every page named a publisher with no name and no logo. A
   * shared `@id` is the right design — one business, four properties — but it
   * only resolves for a consumer that also fetches the marketing site, and an
   * answer engine reading one product page does not.
   *
   * Deliberately NOT copied here: street address, VAT ID, phone, geo. Those
   * belong where the Impressum is, and this shop's Impressum is a link to the
   * marketing site. A fifth copy of the NAP is exactly the drift this file's
   * header refuses.
   */
  mainUrl: "https://tracht-digital.de",
  legalName: "Julian Tracht",
  logo: { url: "https://tracht-digital.de/images/logo.webp", width: 713, height: 483 },
  socials: [
    "https://www.linkedin.com/in/julian-tracht/",
    "https://github.com/Tracht-Digital-Solutions",
  ],
  description: {
    de: "Digitale Leistungen zum Festpreis für Selbstständige und kleine Betriebe: Website, SEO, E-Mail, Wartung und Schulung. Dazu Technik mit eigener Einschätzung.",
    en: "Digital services at a fixed price for freelancers and small businesses: websites, SEO, email, maintenance and training, plus technology we assess ourselves.",
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
export function pageTitle(subject: string): string {
  const trimmed = subject.trim();
  if (trimmed === "") return site.name;
  const combined = `${trimmed} — ${site.name}`;
  if (combined.length <= TITLE_BUDGET) return combined;
  return trimmed;
}

/**
 * The sibling TDS properties this site links to, in the reader's language.
 *
 * One function rather than URLs inline in the header, footer and empty state:
 * the journal links here from its own `nav.ts` (`SHOP_URL`), and a property
 * that is only ever linked TO is a dead end for a reader and an orphan for a
 * crawler. The origins come from tds-shared's `PROPERTY_ORIGINS`, the list
 * every public header reads, so a moved host is changed once.
 */
export function siteLinks(lang: Lang): { main: string; blog: string; tools: string } {
  return {
    main: propertyHome("main", lang),
    blog: propertyHome("journal", lang),
    tools: propertyHome("tools", lang),
  };
}

/** The absolute canonical for a path. */
export function canonical(pathname: string): string {
  return new URL(pathname, site.url).toString();
}
