import { contentApiBase } from "./connection";
import { DEMO_MODE } from "./demoContent";
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
 * ### Every document has a committed fallback
 *
 * The texts under `src/content/legal/` are the ones that ship. The CMS
 * OVERRIDES them; it does not supply them. That is the opposite of how the rest
 * of this site reads content, and deliberately so: a marketing page that goes
 * quiet is an inconvenience, whereas a shop whose withdrawal policy is blank
 * because an API was slow is a shop that cannot lawfully take an order. The
 * fallback lives in git, is reviewed like code, and cannot be unavailable.
 *
 * `null` therefore means something is genuinely wrong — a document with no
 * committed text at all. The page renders a plain notice rather than an empty
 * document: a blank legal page reads as a legal page with nothing IN it, which
 * is a worse claim than admitting it is missing.
 */

/** The documents this site publishes, and their URL segments per language. */
export const LEGAL_KEYS = {
  agb: "legal_agb",
  widerruf: "legal_widerruf",
  zahlung: "legal_zahlung",
  // Split out of `zahlung` when the shop started selling things that have to
  // be delivered. Art. 246a EGBGB wants delivery terms and payment terms both
  // stated before the order; one page called "Zahlung und Lieferung" satisfied
  // that when nothing was ever shipped, and stops being honest once something
  // is.
  versand: "legal_versand",
  // BFSG / BFSGV. Required of an e-commerce service for consumers, and the one
  // legal page that has to describe THIS site rather than restate a statute.
  barrierefreiheit: "legal_barrierefreiheit",
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
    zahlung: "Zahlungsarten",
    versand: "Versand und Lieferung",
    barrierefreiheit: "Erklärung zur Barrierefreiheit",
    affiliate: "Hinweis zu Partnerlinks",
    datenschutz: "Datenschutzerklärung",
    impressum: "Impressum",
  },
  en: {
    agb: "Terms and Conditions",
    widerruf: "Right of withdrawal",
    zahlung: "Payment methods",
    versand: "Shipping and delivery",
    barrierefreiheit: "Accessibility statement",
    affiliate: "About affiliate links",
    datenschutz: "Privacy policy",
    impressum: "Legal notice",
  },
};

interface BlockResponse {
  blocks?: Record<string, { markdown?: string } | undefined>;
}

/**
 * The committed texts, bundled at build time.
 *
 * `import.meta.glob` with `eager` and `?raw` inlines them into the server
 * bundle, so nothing is read from disk at runtime — which matters because the
 * production host receives `release/` without `src/`, exactly the trap the
 * marketing site hit with its AGB PDF.
 */
const BUNDLED = import.meta.glob("../content/legal/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

/**
 * The header every committed text carries.
 *
 * These documents are **templates**. They are written to be complete and to
 * cite the right provisions, and they are still not a lawyer's advice — the
 * operator has to have them reviewed before going live, and then publish their
 * own through the CMS, which overrides the committed one.
 *
 * The marker is stripped before rendering. It is a note to whoever runs the
 * shop, and a customer reading the withdrawal policy has no use for it — a
 * banner saying "this may be wrong" on a page whose whole purpose is to be
 * relied on would be worse than useless.
 */
const FRONT_MATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;

/** Raw file contents including the marker, or null. */
function bundledRaw(slug: LegalSlug, lang: Lang): string | null {
  const text = BUNDLED[`../content/legal/${slug}.${lang}.md`];
  return typeof text === "string" && text.trim() !== "" ? text : null;
}

/** The committed text for a document, marker stripped, or null if none exists. */
export function bundledLegal(slug: LegalSlug, lang: Lang): string | null {
  const raw = bundledRaw(slug, lang);
  if (raw === null) return null;
  const body = raw.replace(FRONT_MATTER, "").trim();
  return body === "" ? null : body;
}

/**
 * Is this document still the committed template rather than a reviewed text?
 *
 * Not used to change what a visitor sees. It exists so the state is
 * *inspectable* — `legal.test.ts` asserts every document has one, and an
 * operator checklist can list what is still owed. A template that nobody
 * remembers is a template that goes live.
 */
export function isLegalTemplate(slug: LegalSlug, lang: Lang): boolean {
  return /^---\r?\n[\s\S]*?\btemplate:\s*true\b/.test(bundledRaw(slug, lang) ?? "");
}

/** Every document that still ships as a template, for a checklist. */
export function legalTemplates(): Array<{ slug: LegalSlug; lang: Lang }> {
  const out: Array<{ slug: LegalSlug; lang: Lang }> = [];
  for (const slug of Object.keys(LEGAL_KEYS) as LegalSlug[]) {
    for (const lang of ["de", "en"] as Lang[]) {
      if (isLegalTemplate(slug, lang)) out.push({ slug, lang });
    }
  }
  return out;
}

/**
 * Fetch one legal text as markdown, or null.
 *
 * Reads `/content/landing`, which serves the blocks of the site this site key
 * is bound to. That is why the shop needs its own `cms_site` row: bound to the
 * marketing site's, it would serve the marketing site's Impressum here.
 */
export async function getLegalMarkdown(slug: LegalSlug, lang: Lang): Promise<string | null> {
  const fallback = bundledLegal(slug, lang);

  // A demo build shows the committed text. It is the real one — there is no
  // fixture to invent, and a demo of a shop with no terms is not a useful demo.
  if (DEMO_MODE) return fallback;

  const url = `${contentApiBase()}/landing?lang=${lang}`;
  try {
    const res = await fetch(url, { headers: siteKeyHeaders() });
    assertKeyAccepted(res, url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as BlockResponse;
    const markdown = body.blocks?.[LEGAL_KEYS[slug]]?.markdown ?? "";
    return markdown.trim() === "" ? fallback : markdown;
  } catch (err) {
    if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
    // Fail SOFT onto the committed text rather than to null. An unreachable
    // CMS must not be able to take a shop's withdrawal policy off the internet.
    console.warn(`[tds-shop] legal ${slug} unreachable, serving the committed text:`, err);
    return fallback;
  }
}
