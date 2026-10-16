//#region src/lib/sitemapSections.ts
/**
* The sections of the sitemap (2026-10-06): one child sitemap per kind of page
* — the catalogue home, the categories, the products, the legal texts — listed
* by `/sitemap-index.xml` with each child's own newest date. A crawler re-reads
* only the section that moved, and Search Console reports coverage per section.
*
* No imports — `cache.ts` needs the paths without the content readers.
*/
var SITEMAP_SECTIONS = [
	"pages",
	"categories",
	"products",
	"legal"
];
function isSitemapSection(value) {
	return SITEMAP_SECTIONS.includes(value ?? "");
}
function sectionPath(section) {
	return `/sitemap-${section}.xml`;
}
/** Every sitemap document a rebuild must refresh (index, sections, legacy single file). */
var SITEMAP_PATHS = [
	"/sitemap-index.xml",
	"/sitemap-0.xml",
	...SITEMAP_SECTIONS.map(sectionPath)
];
//#endregion
export { sectionPath as i, SITEMAP_SECTIONS as n, isSitemapSection as r, SITEMAP_PATHS as t };
