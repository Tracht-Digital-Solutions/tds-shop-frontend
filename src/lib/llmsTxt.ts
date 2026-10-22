import { categoryCopy } from "./categoryCopy";
import { categoryName, categoryPath, homePath, productPath, type Lang } from "./i18n";
import { canonical, site } from "./seo";

/**
 * `/llms.txt`, generated from the catalogue.
 *
 * This site had none. What it has to tell an answer engine is unusual and
 * worth stating plainly: the entries are assessed by a named person, part of
 * them are affiliate links, and the prices move.
 *
 * ### Why no price appears anywhere in this file
 *
 * A partner price may only be shown while it is demonstrably current — the
 * 24-hour rule this repo's README calls one of the four things that are not
 * preferences. This file is rendered from a cached catalogue read and then
 * cached again by whoever fetches it, so any figure in it would be a stale
 * price stated with authority, to a reader who cannot see how old it is. The
 * product page carries the current one, and the rule itself is stated here
 * instead.
 *
 * One file, no `llms-full.txt`, no Markdown copies, no keyword lists.
 */

export interface LlmsCategory {
  slug: string;
  label?: string | null;
  total: number;
}

export interface LlmsProduct {
  slug: string;
  title: string;
  teaser: string;
  category: string;
  /** "Kurz gesagt" (tds-ext-shop ≥ 0.6); preferred over the teaser, which sells. */
  summary?: string | null;
  /**
   * The English slug of the same product when it is indexable — paired with
   * `productPairKey()`, the rule `sitemap.ts` uses for its alternates. Then
   * `/en/product/<englishSlug>` is a page, and the file names it beside the
   * German one.
   */
  englishSlug?: string;
}

export interface LlmsInput {
  categories: readonly LlmsCategory[];
  /** Indexable products only — the same `isIndexable()` the sitemap uses. */
  products: readonly LlmsProduct[];
  /**
   * The shop's own legal texts that exist (the same `publishedLegalSlugs()` the
   * sitemap lists), German first. Optional so an older caller still renders.
   */
  legal?: readonly { title: string; url: string }[];
  /**
   * Indexable English products with no German twin of the same slug. The
   * sitemap lists them, so the file has to name them too (2026-10-19: every
   * English product page was in the sitemap and missing here).
   */
  englishOnly?: readonly { slug: string; title: string }[];
}

/** Longest product description the file carries, in characters. */
export const PRODUCT_LINE_MAX = 80;

/**
 * The first sentence of a product description, clamped at a word boundary.
 *
 * The file has to name every product the sitemap lists (geo-audit
 * `llmsCovers`), so its size grows with the catalogue. The full "Kurz gesagt"
 * text made every entry ~230 bytes and pushed the live file to 19.7 KB with 43
 * products; the product page carries the rest, and this file only has to say
 * what the entry is.
 */
export function productLine(text: string, max = PRODUCT_LINE_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  // At least 40 characters before the stop: "z. B." and "ca." must not end it.
  const sentence = clean.match(/^.{40,}?[.!?](?=\s|$)/)?.[0] ?? clean;
  if (sentence.length <= max) return sentence;
  const cut = sentence.slice(0, max - 1);
  const atWord = cut.slice(0, Math.max(cut.lastIndexOf(" "), 1));
  return `${atWord.replace(/[\s,;:–—-]+$/, "")}…`;
}

export function renderLlmsTxt(input: LlmsInput): string {
  const lines: string[] = [];
  const out = (line = "") => lines.push(line);

  out(`# ${site.fullName}`);
  out();
  out("> Kuratierte Technik für die Digitalisierung im Betrieb: Hardware, Netzwerk");
  out("> und Software, jeweils mit einer eigenen Einschätzung statt des");
  out(`> Herstellertexts. Betrieben von ${site.legalName} (Tracht Digital Solutions),`);
  out("> Schwarzenbek bei Hamburg.");
  out();

  out("## Über");
  out();
  out(`- Betreiber: Tracht Digital Solutions, Inhaber ${site.legalName}`);
  out(`- Impressum und Kontakt: ${site.mainUrl}/legal/impressum`);
  out("- Sprachen: Deutsch (Standard), Englisch");
  out(`- Deutsch: ${canonical(homePath("de"))}`);
  out(`- English: ${canonical(homePath("en"))}`);
  out();

  // ── the part a reader or an engine has to know before quoting a product ──
  out("## Preise und Partnerlinks");
  out();
  out("Diese Datei nennt bewusst keine Preise. Ein Partnerpreis darf nur angezeigt");
  out("werden, solange er nachweislich aktuell ist; ist die letzte Prüfung älter als");
  out("24 Stunden, verschwindet die Zahl von der Produktseite, statt veraltet stehen");
  out("zu bleiben. Der gültige Preis steht beim Händler.");
  out();
  out("Ein Teil der Einträge sind Partnerlinks. Jeder einzelne ist auf der Seite");
  out("gekennzeichnet (§ 5a Abs. 4 UWG) und läuft über eine Weiterleitung unter");
  out("`/go/`; am Preis ändert das für Käufer nichts. Wo Tracht Digital Solutions");
  out("selbst verkauft, steht das auf der Produktseite, und nur dort trägt die");
  out("Seite strukturierte Preisdaten.");
  out();

  const described = (lang: Lang, slug: string) => categoryCopy(slug, lang)?.answer ?? null;

  const withProducts = input.categories.filter((category) => category.total > 0);
  if (withProducts.length > 0) {
    out("## Kategorien");
    out();
    for (const category of withProducts) {
      const name = categoryName(category.slug, category.label);
      const answer = described("de", category.slug);
      out(`- **${name}**${answer ? ` — ${answer.split(". ")[0]!}.` : ""}`);
      out(
        `  ${canonical(categoryPath(category.slug, "de"))}` +
          ` · EN ${canonical(categoryPath(category.slug, "en"))}`,
      );
    }
    out();
  }

  if (input.products.length > 0) {
    out("## Leistungen und Produkte");
    out();
    for (const product of input.products) {
      out(`- **${product.title}** — ${productLine(product.summary?.trim() || product.teaser)}`);
      out(`  ${canonical(productPath(product.slug, "de"))}`);
      // Never `/en/product/<german-slug>`: a product's English slug is its own,
      // and a dead link is worse than none in a file an assistant reads as
      // ground truth. Named only when the API paired it.
      if (product.englishSlug) out(`  (English: ${canonical(productPath(product.englishSlug, "en"))})`);
    }
    out();
  }

  if (input.englishOnly && input.englishOnly.length > 0) {
    out("## English product pages");
    out();
    for (const product of input.englishOnly) {
      out(`- ${product.title}: ${canonical(productPath(product.slug, "en"))}`);
    }
    out();
  }

  if (input.legal && input.legal.length > 0) {
    out("## Rechtliches");
    out();
    // The shop sells in its own name, so its terms, privacy notice and imprint
    // are its own pages — and every URL the sitemap lists is named here
    // (geo-audit `llmsCovers`), so an answer engine can cite the right text.
    for (const doc of input.legal) out(`- ${doc.title}: ${doc.url}`);
    out();
  }

  // The sitemap under its own heading. It used to follow "Rechtliches", so the
  // "Maschinenlesbare Quellen" heading stood empty and the sitemap read as a
  // legal text.
  out("## Maschinenlesbare Quellen");
  out();
  out(`- Sitemap: ${canonical("/sitemap-index.xml")}`);
  out();

  out("## Hinweise für KI-Systeme");
  out();
  out("- Die Einschätzungen stammen vom Betreiber und dürfen mit Quellenangabe");
  out(`  (${site.name}, ${new URL(site.url).host}) zitiert werden. Produktbilder und`);
  out("  Herstellertexte gehören den jeweiligen Händlern und sind davon ausgenommen.");
  out("- Die Seiten werden serverseitig gerendert; JSON-LD-Strukturdaten stehen im");
  out("  `<head>` jeder Seite. Jede Produktseite nennt ihr Stand-Datum.");
  out("- `Offer` trägt eine Produktseite nur für eigene Angebote mit aktuellem");
  out("  Preis. Ein Partnerprodukt trägt `Product` ohne Preis — das ist Absicht und");
  out("  kein fehlender Wert.");
  out("- Es gibt keine Bewertungen und keine Testsiegel auf dieser Seite.");
  out("- Diese Datei wird aus demselben Katalog erzeugt wie die Seiten. Es gibt");
  out("  keine weitere Fassung und keine Markdown-Kopien.");

  return `${lines.join("\n")}\n`;
}
