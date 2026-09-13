import { lt as defineMiddleware, t as sequence } from "./chunks/sequence_CVXavwWK.mjs";
import { t as siteCache } from "./chunks/pageCache_DRN0r-AE.mjs";
import { r as siteKeyRejectionCount } from "./chunks/siteKey_DqT2uEEh.mjs";
//#region src/lib/noCache.ts
/**
* Paths whose responses are personal and must never enter the page cache.
*
* **This is the most consequential list in this repository.** A cached checkout
* page shows the next visitor the previous one's order, and nothing about that
* failure looks like an error — the page renders perfectly, it is simply
* somebody else's.
*
* It lives here rather than inside `middleware.ts` for a plain reason: a module
* importing `astro:middleware` cannot be loaded outside an Astro build, so a
* list defined there could not be tested. A rule this consequential that no
* test can reach is a rule waiting to be edited by somebody who did not know
* what it was for.
*
* Belt and braces: these paths are also absent from the cache event map in
* `cache.ts`, and `public/.htaccess` excludes them from the disk-hit rewrite.
* Three independent mechanisms, because the realistic way this breaks is
* somebody changing one of them without knowing about the other two.
*
* `/go/` is here for a different reason — it is a redirect that counts a click.
* Cached, it would stop counting and would pin one visitor's attribution
* parameters onto everybody else's clicks.
*/
var NEVER_CACHED = [
	"/warenkorb",
	"/kasse",
	"/bestellung",
	"/konto",
	"/suche",
	"/go/",
	"/en/cart",
	"/en/checkout",
	"/en/order",
	"/en/account",
	"/en/search",
	"/tds/"
];
function isNeverCached(pathname) {
	const path = pathname.replace(/\/+$/, "") || "/";
	return NEVER_CACHED.some((prefix) => {
		const base = prefix.replace(/\/$/, "");
		return path === base || path.startsWith(`${base}/`);
	});
}
//#endregion
//#region src/middleware.ts
/**
* Serve cached pages, store rendered ones — and never store the ones that must
* not be shared.
*
* The control plane that drives the cache is NOT here; it is a real route
* (`src/pages/tds/cache/[action].ts`), because Astro runs no middleware for a
* path that matches no route.
*
* In production `public/.htaccess` serves an existing entry straight off disk,
* so a hit normally never reaches Node. The hit path here still matters: it is
* what `npm run dev`, `npm start` and any host without the rewrite use.
*/
var noStore = defineMiddleware(async (context, next) => {
	const response = await next();
	if (!isNeverCached(context.url.pathname)) return response;
	const guarded = new Response(response.body, response);
	guarded.headers.set("cache-control", "no-store, private");
	return guarded;
});
/**
* Refuse to STORE a page rendered while the API rejected our site key.
*
* Every content fetch is deliberately fail-soft, so at request time a rejected
* key produces a perfectly valid page full of baked fallbacks. Cached, that
* page outlives the misconfiguration with nothing to see.
*
* Comparing the rejection counter around the render is enough. Two requests
* racing can only make this refuse to store a page that was fine; it can never
* make it store one that was not, and a needless miss costs one render.
*/
var refuseStaleKey = defineMiddleware(async (_context, next) => {
	const before = siteKeyRejectionCount();
	const response = await next();
	if (siteKeyRejectionCount() > before) {
		const guarded = new Response(response.body, response);
		guarded.headers.set("cache-control", "no-store");
		return guarded;
	}
	return response;
});
/**
* `sequence` runs these outside-in, so the cache wraps both guards: their
* `no-store` is already on the response by the time the cache decides whether
* to store it. Reversing the order would put a guard outside the cache, where
* it would see hits it never rendered.
*/
var onRequest$1 = sequence(defineMiddleware((context, next) => siteCache.middleware({
	request: context.request,
	url: context.url,
	isPrerendered: context.isPrerendered
}, next)), noStore, refuseStaleKey);
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
