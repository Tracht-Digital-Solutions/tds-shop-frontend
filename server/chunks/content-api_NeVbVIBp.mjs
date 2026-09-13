import { a as contentApiBase } from "./connection_BxSDNEzk.mjs";
import { n as siteKeyHeaders, t as assertKeyAccepted } from "./siteKey_CGym-S_8.mjs";
import { i as demoProducts, n as demoCategories, r as demoProduct, t as DEMO_MODE } from "./demoContent_DmC0ycm4.mjs";
//#region src/lib/content-api.ts
async function readJson(path, fallback, label) {
	if (DEMO_MODE) return fallback;
	const url = `${contentApiBase()}${path}`;
	try {
		const res = await fetch(url, { headers: siteKeyHeaders() });
		assertKeyAccepted(res, url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return await res.json();
	} catch (err) {
		if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
		console.warn(`[tds-shop] ${label} unreachable — serving fallback:`, err);
		return fallback;
	}
}
async function listProducts(query) {
	const params = new URLSearchParams({ lang: query.lang });
	if (query.limit) params.set("limit", String(query.limit));
	if (query.cursor) params.set("cursor", query.cursor);
	if (query.category) params.set("category", query.category);
	if (query.tag) params.set("tag", query.tag);
	return readJson(`/shop?${params}`, {
		products: demoProducts(query.lang, query.category ?? void 0),
		nextCursor: null
	}, "catalogue");
}
async function getProduct(slug, lang) {
	if (DEMO_MODE) return demoProduct(slug, lang);
	const url = `${contentApiBase()}/shop/${encodeURIComponent(slug)}?lang=${lang}`;
	try {
		const res = await fetch(url, { headers: siteKeyHeaders() });
		assertKeyAccepted(res, url);
		if (res.status === 404) return null;
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return await res.json();
	} catch (err) {
		if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
		console.warn(`[tds-shop] product ${slug} unreachable — serving fallback:`, err);
		return demoProduct(slug, lang);
	}
}
async function listCategories(lang) {
	return (await readJson(`/shop/categories?lang=${lang}`, { categories: demoCategories(lang) }, "categories")).categories;
}
/**
* Resolve an offer's outbound target, counting the click on the way.
*
* Returns null when the offer is unknown, so `/go/{id}` can 404 rather than
* redirect somewhere arbitrary. Deliberately NOT fail-soft to a guessed URL:
* an affiliate redirect that goes to the wrong place is worse than one that
* does not go at all.
*/
async function resolveOfferTarget(id, attribution) {
	if (DEMO_MODE) return null;
	const params = new URLSearchParams({ lang: attribution.lang });
	if (attribution.source) params.set("source", attribution.source);
	if (attribution.placement) params.set("placement", attribution.placement);
	const url = `${contentApiBase()}/shop/offer/${id}/target?${params}`;
	try {
		const res = await fetch(url, { headers: siteKeyHeaders() });
		assertKeyAccepted(res, url);
		if (!res.ok) return null;
		const target = ((await res.json()).url ?? "").trim();
		return /^https?:\/\//i.test(target) ? target : null;
	} catch (err) {
		if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
		console.warn(`[tds-shop] offer ${id} unreachable:`, err);
		return null;
	}
}
//#endregion
export { resolveOfferTarget as i, listCategories as n, listProducts as r, getProduct as t };
