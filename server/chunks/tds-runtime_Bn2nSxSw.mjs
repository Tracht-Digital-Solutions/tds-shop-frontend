import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { o as publicRuntimeResponse } from "./connection_DX96xLP5.mjs";
//#region src/pages/tds-runtime.json.ts
var tds_runtime_json_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
/**
* The runtime config the browser reads.
*
* Carries the API base, the login URL and the live-chat frontend id — and
* deliberately NOT the site key or the cache token. This file sits in the
* public document root; a secret in it would be published.
*/
var GET = () => publicRuntimeResponse();
//#endregion
//#region \0virtual:astro:page:src/pages/tds-runtime.json@_@ts
var page = () => tds_runtime_json_exports;
//#endregion
export { page };
