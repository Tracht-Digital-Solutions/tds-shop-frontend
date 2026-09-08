import {
  emptyPlacement,
  type ShopPlacement,
} from "@tracht-digital-solutions/tds-shared/schemas";

import type { CatalogProduct, ProductPage } from "./types";

import { contentApiBase } from "./connection";
import { assertKeyAccepted, siteKeyHeaders } from "./siteKey";
import { DEMO_MODE, demoCategories, demoProduct, demoProducts } from "./demoContent";
import type { Lang } from "./i18n";

/**
 * Reads against the composed API's `/content/shop*` routes.
 *
 * ### Every call is fail-soft, with exactly one exception
 *
 * A catalogue page that cannot reach the API renders demo content rather than
 * failing: an outage on the API host must not take the shop offline, and a
 * 500 here would be cached as a 500. The one thing that must NOT be swallowed
 * is a **rejected site key** — that is a configuration fault whose symptom is
 * otherwise a perfectly rendered page full of fallbacks, which then gets
 * stored in the page cache and outlives the fix. `assertKeyAccepted` throws,
 * and `middleware.ts` refuses to cache anything rendered after one.
 *
 * ### Prices are already stripped when they arrive
 *
 * The API removes a quote older than 24 hours before it answers, and clears
 * its timestamp with it. Nothing here needs to re-check — but nothing here may
 * "helpfully" restore a price either.
 */

export interface CatalogPage {
  products: CatalogProduct[];
  nextCursor: string | null;
}

async function readJson<T>(path: string, fallback: T, label: string): Promise<T> {
  // In a demo build there is nothing to ask. Returning the fallback WITHOUT a
  // request is the point: the dev-branch artifact must run with no site key,
  // no API, and no chance of reaching production. Relying on the outage path
  // instead would mean every page waited for a connection to fail first.
  if (DEMO_MODE) return fallback;

  const url = `${contentApiBase()}${path}`;
  try {
    const res = await fetch(url, { headers: siteKeyHeaders() });
    assertKeyAccepted(res, url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
    console.warn(`[tds-shop] ${label} unreachable — serving fallback:`, err);
    return fallback;
  }
}

export interface CatalogQuery {
  lang: Lang;
  limit?: number;
  cursor?: string | null;
  category?: string | null;
  tag?: string | null;
}

export async function listProducts(query: CatalogQuery): Promise<CatalogPage> {
  const params = new URLSearchParams({ lang: query.lang });
  if (query.limit) params.set("limit", String(query.limit));
  if (query.cursor) params.set("cursor", query.cursor);
  if (query.category) params.set("category", query.category);
  if (query.tag) params.set("tag", query.tag);

  return readJson<CatalogPage>(
    `/shop?${params}`,
    { products: demoProducts(query.lang, query.category ?? undefined), nextCursor: null },
    "catalogue",
  );
}

export async function getProduct(slug: string, lang: Lang): Promise<ProductPage | null> {
  // A demo build answers from the fixtures, and a slug that is not among them
  // is a genuine 404 — not an outage to fall back from.
  if (DEMO_MODE) return demoProduct(slug, lang);

  const url = `${contentApiBase()}/shop/${encodeURIComponent(slug)}?lang=${lang}`;
  try {
    const res = await fetch(url, { headers: siteKeyHeaders() });
    assertKeyAccepted(res, url);
    // A 404 is an ANSWER, not a failure: the product genuinely does not exist
    // in this language, and the page must 404 rather than fall back to a demo
    // product under a slug nobody published.
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as ProductPage;
  } catch (err) {
    if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
    console.warn(`[tds-shop] product ${slug} unreachable — serving fallback:`, err);
    return demoProduct(slug, lang);
  }
}

export interface CategoryCount {
  category: string;
  total: number;
}

export async function listCategories(lang: Lang): Promise<CategoryCount[]> {
  const body = await readJson<{ categories: CategoryCount[] }>(
    `/shop/categories?lang=${lang}`,
    { categories: demoCategories(lang) },
    "categories",
  );
  return body.categories;
}

/**
 * A resolved advertising slot.
 *
 * Falls back to an EMPTY placement rather than to demo products: an
 * advertising slot that invents its own contents during an outage is showing
 * a visitor something nobody chose to advertise.
 */
export async function getPlacement(
  key: string,
  lang: Lang,
  category?: string,
): Promise<ShopPlacement> {
  const params = new URLSearchParams({ lang });
  if (category) params.set("category", category);
  return readJson<ShopPlacement>(
    `/shop/placement/${encodeURIComponent(key)}?${params}`,
    emptyPlacement(key, lang),
    `placement ${key}`,
  );
}

/**
 * Resolve an offer's outbound target, counting the click on the way.
 *
 * Returns null when the offer is unknown, so `/go/{id}` can 404 rather than
 * redirect somewhere arbitrary. Deliberately NOT fail-soft to a guessed URL:
 * an affiliate redirect that goes to the wrong place is worse than one that
 * does not go at all.
 */
export async function resolveOfferTarget(
  id: number,
  attribution: { source?: string; placement?: string | null; lang: Lang },
): Promise<string | null> {
  // A demo build has no real offers, so every click redirect 404s rather than
  // sending somebody to a partner under an id that means nothing here.
  if (DEMO_MODE) return null;

  const params = new URLSearchParams({ lang: attribution.lang });
  if (attribution.source) params.set("source", attribution.source);
  if (attribution.placement) params.set("placement", attribution.placement);

  const url = `${contentApiBase()}/shop/offer/${id}/target?${params}`;
  try {
    const res = await fetch(url, { headers: siteKeyHeaders() });
    assertKeyAccepted(res, url);
    if (!res.ok) return null;
    const body = (await res.json()) as { url?: string };
    const target = (body.url ?? "").trim();
    // Only absolute http(s). A relative or javascript: target here would be an
    // open redirect on our own domain.
    return /^https?:\/\//i.test(target) ? target : null;
  } catch (err) {
    if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
    console.warn(`[tds-shop] offer ${id} unreachable:`, err);
    return null;
  }
}
