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
}

export function renderLlmsTxt(input: LlmsInput): string {
  const lines: string[] = [];
  const out = (line = "") => lines.push(line);

  out(`# ${site.name}`);
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
      out(`- **${product.title}** — ${product.summary?.trim() || product.teaser}`);
      // German URL only. A product's English slug is its own (the API pairs
      // translations by id, not by slug), so `/en/product/<german-slug>` was a
      // 404 for every product whose slugs differ — and a dead link is worse
      // than none in a file an assistant reads as ground truth.
      out(`  ${canonical(productPath(product.slug, "de"))}`);
    }
    out();
  }

  out("## Maschinenlesbare Quellen");
  if (input.legal && input.legal.length > 0) {
    out();
    out("## Rechtliches");
    out();
    // The shop sells in its own name, so its terms, privacy notice and imprint
    // are its own pages — and every URL the sitemap lists is named here
    // (geo-audit `llmsCovers`), so an answer engine can cite the right text.
    for (const doc of input.legal) out(`- ${doc.title}: ${doc.url}`);
  }
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
