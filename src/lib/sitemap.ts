import { listAllProducts, listCategories } from "./content-api";
import { categoryPath, homePath, legalPath, productPath, LANGS, type Lang } from "./i18n";
import { publishedLegalSlugs } from "./legal";
import { isIndexable } from "./indexing";
import { canonical } from "./seo";
import { escapeXml, newestDay, renderSectionedSitemapIndex } from "@tracht-digital-solutions/tds-shared/site";
import { SITEMAP_SECTIONS, sectionPath, type SitemapSection } from "./sitemapSections";

/**
 * The sitemap, written by hand.
 *
 * `@astrojs/sitemap` derives its entries from the routes a build EMITS, and
 * under `output: "server"` a build emits nothing — it would have shipped a
 * sitemap containing only the pages its own filter excluded, and nothing
 * anywhere would have gone red.
 *
 * Two rules this file exists to keep:
 *
 * 1. **Only indexable products.** `isIndexable()` is the same function the page
 *    itself uses for its `<meta name="robots">`, so a URL can never be
 *    submitted for indexing while the page it names says `noindex`.
 * 2. **`lastmod` is a real date.** It is the newest publication date the URL
 *    actually shows, not "today". A sitemap that claims every page changed
 *    this morning teaches a crawler to ignore the field.
 */

export interface SitemapEntry {
  loc: string;
  /** Which child sitemap lists it. */
  section: SitemapSection;
  /** The product photo, for image search and image-aware answer engines. */
  image?: { loc: string; title: string };
  lastmod?: string;
  alternates?: { lang: Lang; href: string }[];
}

const isoDay = (value: string | null | undefined): string | undefined => {
  if (!value) return undefined;
  const ts = Date.parse(value);
  return Number.isNaN(ts) ? undefined : new Date(ts).toISOString().slice(0, 10);
};

const newest = (dates: (string | null | undefined)[]): string | undefined => {
  const days = dates.map(isoDay).filter((d): d is string => Boolean(d));
  return days.length === 0 ? undefined : days.sort().at(-1);
};

export async function buildEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];
  /**
   * Language-neutral key per URL, so the two trees can be paired afterwards.
   *
   * `SitemapEntry.alternates` has been declared since the file was written and
   * was never filled or rendered, so the sitemap offered no locale pairing at
   * all — the same gap as the missing hreflang in the markup, in the other
   * document a crawler reads.
   *
   * A product keys on its SLUG, which pairs only when the translation uses the
   * same one. The API pairs translations on the product id and the payload
   * carries neither that id nor the counterpart slug, so a product published
   * under a different slug per language stays unpaired here — exactly as it
   * stays unpaired in `alternates.ts`. The two have to agree: a sitemap that
   * claims a pairing the page does not emit is a contradiction a crawler
   * resolves against us.
   */
  const keyed = new Map<string, { lang: Lang; loc: string }[]>();
  const remember = (key: string, lang: Lang, loc: string) => {
    const bucket = keyed.get(key);
    if (bucket) bucket.push({ lang, loc });
    else keyed.set(key, [{ lang, loc }]);
  };

  for (const lang of LANGS) {
    const [products, categories, legal] = await Promise.all([
      listAllProducts({ lang }),
      listCategories(lang),
      publishedLegalSlugs(lang),
    ]);
    const indexable = products.filter(isIndexable);

    const home = canonical(homePath(lang));
    entries.push({ loc: home, section: "pages", lastmod: newest(indexable.map((p) => p.publishedAt ?? null)) });
    remember("home", lang, home);

    for (const { category } of categories) {
      const inCategory = indexable.filter((p) => p.category === category);
      // A category whose products are all unwritten has nothing indexable on
      // it, so it is not a page worth submitting either.
      if (inCategory.length === 0) continue;
      const loc = canonical(categoryPath(category, lang));
      entries.push({ loc, section: "categories", lastmod: newest(inCategory.map((p) => p.publishedAt ?? null)) });
      remember(`cat:${category}`, lang, loc);
    }

    for (const product of indexable) {
      const loc = canonical(productPath(product.slug, lang));
      entries.push({
        loc,
        section: "products",
        lastmod: isoDay(product.publishedAt ?? null),
        ...(product.imageUrl?.startsWith("http") ? { image: { loc: product.imageUrl, title: product.title } } : {}),
      });
      remember(`prod:${product.slug}`, lang, loc);
    }

    // The legal pages are indexable (a consumer looking for the withdrawal
    // policy should find it) and were in no sitemap. Listed only where a text
    // exists — the page says `noindex` otherwise. No lastmod: the CMS override
    // carries no date, and "today" would be the lie rule 2 forbids.
    for (const slug of legal) {
      const loc = canonical(legalPath(slug, lang));
      entries.push({ loc, section: "legal" });
      remember(`legal:${slug}`, lang, loc);
    }
  }

  // Pair the two trees. Only a key present in BOTH gets alternates: a single
  // dangling alternate invalidates the whole set, the other side included.
  const byLoc = new Map(entries.map((entry) => [entry.loc, entry]));
  for (const bucket of keyed.values()) {
    if (bucket.length < 2) continue;
    const alternates = bucket.map(({ lang, loc }) => ({ lang, href: loc }));
    for (const { loc } of bucket) {
      const entry = byLoc.get(loc);
      if (entry) entry.alternates = alternates;
    }
  }

  return entries;
}


/** The locale a sitemap alternate declares. Matches the markup's hreflang. */
const hreflang = (lang: Lang): string => (lang === "en" ? "en-GB" : "de-DE");

export function renderUrlset(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
      // Every alternate of the group is listed on EVERY member, including the
      // URL itself, plus `x-default` on the German one — that is what makes
      // the set reciprocal rather than one-directional.
      const alternates = (entry.alternates ?? [])
        .flatMap(({ lang, href }) => {
          const link = `\n    <xhtml:link rel="alternate" hreflang="${hreflang(lang)}" href="${escapeXml(href)}"/>`;
          return lang === "de"
            ? [link, `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(href)}"/>`]
            : [link];
        })
        .join("");
      const image = entry.image
        ? `\n    <image:image><image:loc>${escapeXml(entry.image.loc)}</image:loc><image:title>${escapeXml(entry.image.title)}</image:title></image:image>`
        : "";
      return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${alternates}${image}${lastmod}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
}

export function renderIndex(sitemaps: string[]): string {
  const items = sitemaps
    .map((loc) => `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

/**
 * The sectioned index (2026-10-06): one child per non-empty section, each with
 * the newest real date inside it (none for the legal texts, which carry no date).
 */
export function renderSectionIndex(entries: readonly SitemapEntry[], origin: string): string {
  return renderSectionedSitemapIndex(
    SITEMAP_SECTIONS.flatMap((section) => {
      const inSection = entries.filter((e) => e.section === section);
      if (inSection.length === 0) return [];
      return [{ loc: `${origin}${sectionPath(section)}`, lastmod: newestDay(inSection.map((e) => e.lastmod)) }];
    }),
  );
}
