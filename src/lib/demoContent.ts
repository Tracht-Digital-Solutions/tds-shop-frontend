import type { CatalogProduct, ProductPage } from "./types";

import { productPath, type Lang } from "./i18n";
import { site } from "./seo";

/**
 * Whether this build serves demo content INSTEAD of asking the API.
 *
 * Set by `dev.yml` for the `dev` branch artifact, so that tree can be checked
 * out and started without a site key, without the API being up, and with no
 * chance of a developer build reaching production. Distinct from the outage
 * fallback below, which is what happens when a real build cannot get an answer.
 *
 * Read through `import.meta.env` because Astro inlines `PUBLIC_*` names at
 * build time — this is a build-time decision, not a runtime one, and the value
 * has to survive into the bundle.
 */
export const DEMO_MODE = import.meta.env.PUBLIC_DEMO_MODE === "true";

/**
 * What the site renders when the API cannot be reached.
 *
 * ### Two rules learned elsewhere
 *
 * **No prices, and no offers at all.** A fallback product carries an empty
 * `offers` array, so no card can show a figure that came from nowhere. A demo
 * price is a wrong price with a confident timestamp, which is worse than an
 * outage.
 *
 * **Nothing here is indexable.** Every entry is `editorialStatus: "none"`, so
 * `isIndexable()` refuses it and the sitemap omits it. Otherwise an outage
 * during a crawl would submit placeholder pages for indexing under real
 * slugs — and those outlive the outage.
 */

const DEMO: Record<Lang, { slug: string; title: string; teaser: string; category: string }[]> = {
  de: [
    {
      slug: "beispiel-netzwerkspeicher",
      title: "Netzwerkspeicher fürs Büro",
      teaser:
        "Beispieleintrag. Der Katalog ist gerade nicht erreichbar — sobald die Verbindung wieder steht, stehen hier die echten Produkte.",
      category: "netzwerk",
    },
    {
      slug: "beispiel-dokumentenscanner",
      title: "Dokumentenscanner für den Papierberg",
      teaser:
        "Beispieleintrag. Der Katalog ist gerade nicht erreichbar — sobald die Verbindung wieder steht, stehen hier die echten Produkte.",
      category: "peripherie",
    },
  ],
  en: [
    {
      slug: "example-network-storage",
      title: "Network storage for the office",
      teaser:
        "Placeholder entry. The catalogue is currently unreachable — the real products appear here as soon as the connection is back.",
      category: "netzwerk",
    },
    {
      slug: "example-document-scanner",
      title: "Document scanner for the paper pile",
      teaser:
        "Placeholder entry. The catalogue is currently unreachable — the real products appear here as soon as the connection is back.",
      category: "peripherie",
    },
  ],
};

function toRef(
  entry: { slug: string; title: string; teaser: string; category: string },
  lang: Lang,
): CatalogProduct {
  return {
    slug: entry.slug,
    lang,
    title: entry.title,
    teaser: entry.teaser,
    category: entry.category,
    imageUrl: null,
    url: `${site.url}${productPath(entry.slug, lang)}`,
    // Empty on purpose — see the module note.
    offers: [],
  };
}

export function demoProducts(lang: Lang, category?: string): CatalogProduct[] {
  const all = DEMO[lang].map((entry) => toRef(entry, lang));
  return category ? all.filter((p) => p.category === category) : all;
}

export function demoProduct(slug: string, lang: Lang): ProductPage | null {
  const entry = DEMO[lang].find((p) => p.slug === slug);
  if (!entry) return null;
  return {
    ...toRef(entry, lang),
    body: "",
    bodyFormat: "blocks",
    tags: [],
    metaDescription: null,
    publishedAt: null,
    updatedAt: null,
    machineTranslated: false,
    // Never indexable — an outage must not put placeholders into an index.
    editorialStatus: "none",
  };
}

export function demoCategories(lang: Lang): { category: string; total: number }[] {
  const counts = new Map<string, number>();
  for (const product of demoProducts(lang)) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }
  return [...counts].map(([category, total]) => ({ category, total }));
}
