import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { r as renderUrlset, t as buildEntries } from "./sitemap_C4t0Vssl.mjs";
//#region src/pages/sitemap-0.xml.ts
var sitemap_0_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	const body = renderUrlset(await buildEntries());
	return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap-0.xml@_@ts
var page = () => sitemap_0_xml_exports;
//#endregion
export { page };
