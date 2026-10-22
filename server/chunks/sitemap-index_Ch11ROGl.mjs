import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { _ as site } from "./siteKey_D6bmHM0Q.mjs";
import { n as renderSectionIndex, t as buildEntries } from "./sitemap_BhkBcAHV.mjs";
// src/pages/sitemap-index.xml.ts
var sitemap_index_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async () => new Response(renderSectionIndex(await buildEntries(), site.url), { headers: { "content-type": "application/xml; charset=utf-8" } });
// \0virtual:astro:page:src/pages/sitemap-index.xml@_@ts
var page = () => sitemap_index_xml_exports;
export { page };
