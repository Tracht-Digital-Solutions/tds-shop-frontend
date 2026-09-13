import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as siteCache } from "./pageCache_DRN0r-AE.mjs";
//#region src/pages/tds/cache/[action].ts
var _action__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
/**
* The page-cache control plane: `status`, `rebuild`, `purge`.
*
* Must be a real route rather than middleware — Astro answers 404 for an
* unmatched path before middleware runs — and cannot live under `_cache/`,
* because Astro excludes `_`-prefixed segments from routing. A POST must carry
* `Content-Type: application/json` or `security.checkOrigin` rejects it.
*/
var handle = ({ params, request, url }) => siteCache.control(String(params.action ?? ""), request, url);
var GET = handle;
var POST = handle;
//#endregion
//#region \0virtual:astro:page:src/pages/tds/cache/[action]@_@ts
var page = () => _action__exports;
//#endregion
export { page };
