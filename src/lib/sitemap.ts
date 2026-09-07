import { listCategories, listProducts } from "./content-api";
import { categoryPath, homePath, productPath, LANGS, type Lang } from "./i18n";
import { isIndexable } from "./indexing";
import { canonical } from "./seo";

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

  for (const lang of LANGS) {
    const [{ products }, categories] = await Promise.all([
      listProducts({ lang, limit: 48 }),
      listCategories(lang),
    ]);
    const indexable = products.filter(isIndexable);

    entries.push({
      loc: canonical(homePath(lang)),
      lastmod: newest(indexable.map((p) => p.publishedAt ?? null)),
    });

    for (const { category } of categories) {
      const inCategory = indexable.filter((p) => p.category === category);
      // A category whose products are all unwritten has nothing indexable on
      // it, so it is not a page worth submitting either.
      if (inCategory.length === 0) continue;
      entries.push({
        loc: canonical(categoryPath(category, lang)),
        lastmod: newest(inCategory.map((p) => p.publishedAt ?? null)),
      });
    }

    for (const product of indexable) {
      entries.push({
        loc: canonical(productPath(product.slug, lang)),
        lastmod: isoDay(product.publishedAt ?? null),
      });
    }
  }

  return entries;
}

const escape = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function renderUrlset(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${escape(entry.loc)}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function renderIndex(sitemaps: string[]): string {
  const items = sitemaps
    .map((loc) => `  <sitemap>\n    <loc>${escape(loc)}</loc>\n  </sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}
