import { contentApiBase } from "./connection";
import { assertKeyAccepted, siteKeyHeaders } from "./siteKey";
import type { Lang } from "./i18n";

/**
 * The legal texts.
 *
 * They live in the website CMS as `cms_block` rows carrying markdown, under
 * this shop's own `cms_site` row — the same mechanism the marketing site's
 * Impressum and Datenschutzerklärung use. Not `cms_legal_doc`: that stores
 * uploaded PDF **bytes**, which is right for an AGB handed over as a document
 * and wrong for a shop, where a consumer has to be able to read the terms on
 * the page before ordering (§ 312i BGB) and a screen reader has to get at them.
 *
 * ### Empty is not the same as unreachable
 *
 * `null` means the API could not be asked or has no such block. The page then
 * renders a plain "not published yet" notice rather than an empty document —
 * a legal page that renders blank looks like a legal page with nothing in it,
 * which is a worse claim than admitting it is missing.
 */

/** The documents this site publishes, and their URL segments per language. */
export const LEGAL_KEYS = {
  agb: "legal_agb",
  widerruf: "legal_widerruf",
  zahlung: "legal_zahlung",
  affiliate: "legal_affiliate",
  datenschutz: "legal_datenschutz",
  impressum: "legal_impressum",
} as const;

export type LegalSlug = keyof typeof LEGAL_KEYS;

export function isLegalSlug(value: string): value is LegalSlug {
  return Object.prototype.hasOwnProperty.call(LEGAL_KEYS, value);
}

export const LEGAL_TITLES: Record<Lang, Record<LegalSlug, string>> = {
  de: {
    agb: "Allgemeine Geschäftsbedingungen",
    widerruf: "Widerrufsbelehrung",
    zahlung: "Zahlung und Lieferung",
    affiliate: "Hinweis zu Partnerlinks",
    datenschutz: "Datenschutzerklärung",
    impressum: "Impressum",
  },
  en: {
    agb: "Terms and Conditions",
    widerruf: "Right of withdrawal",
    zahlung: "Payment and delivery",
    affiliate: "About affiliate links",
    datenschutz: "Privacy policy",
    impressum: "Legal notice",
  },
};

interface BlockResponse {
  blocks?: Record<string, { markdown?: string } | undefined>;
}

/**
 * Fetch one legal text as markdown, or null.
 *
 * Reads `/content/landing`, which serves the blocks of the site this site key
 * is bound to. That is why the shop needs its own `cms_site` row: bound to the
 * marketing site's, it would serve the marketing site's Impressum here.
 */
export async function getLegalMarkdown(slug: LegalSlug, lang: Lang): Promise<string | null> {
  const url = `${contentApiBase()}/landing?lang=${lang}`;
  try {
    const res = await fetch(url, { headers: siteKeyHeaders() });
    assertKeyAccepted(res, url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as BlockResponse;
    const markdown = body.blocks?.[LEGAL_KEYS[slug]]?.markdown ?? "";
    return markdown.trim() === "" ? null : markdown;
  } catch (err) {
    if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
    console.warn(`[tds-shop] legal ${slug} unreachable:`, err);
    return null;
  }
}
