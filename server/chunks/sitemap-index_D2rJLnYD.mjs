import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { s as site } from "./demoContent_DmC0ycm4.mjs";
import { n as renderIndex } from "./sitemap_Bx9HUrtA.mjs";
//#region src/pages/sitemap-index.xml.ts
var sitemap_index_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = () => new Response(renderIndex([`${site.url}/sitemap-0.xml`]), { headers: { "content-type": "application/xml; charset=utf-8" } });
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap-index.xml@_@ts
var page = () => sitemap_index_xml_exports;
//#endregion
export { page };
