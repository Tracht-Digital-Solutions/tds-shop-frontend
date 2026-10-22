import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { r as isSitemapSection } from "./sitemapSections_D6bKxAQ9.mjs";
import { r as renderUrlset, t as buildEntries } from "./sitemap_CD0-fK4M.mjs";
// src/pages/sitemap-[section].xml.ts
var sitemap__section__xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params }) => {
	if (!isSitemapSection(params.section)) return new Response(null, { status: 404 });
	const entries = (await buildEntries()).filter((e) => e.section === params.section);
	if (entries.length === 0) return new Response(null, { status: 404 });
	return new Response(renderUrlset(entries), { headers: { "content-type": "application/xml; charset=utf-8" } });
};
// \0virtual:astro:page:src/pages/sitemap-[section].xml@_@ts
var page = () => sitemap__section__xml_exports;
export { page };
