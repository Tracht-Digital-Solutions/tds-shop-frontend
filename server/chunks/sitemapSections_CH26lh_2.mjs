import { a as defineSitemapSections } from "./siteKey_D6bmHM0Q.mjs";
// src/lib/sitemapSections.ts
/**
* The sections of the sitemap (2026-10-06): one child sitemap per kind of page
* — the catalogue home, the categories, the products, the legal texts — listed
* by `/sitemap-index.xml` with each child's own newest date. A crawler re-reads
* only the section that moved, and Search Console reports coverage per section.
*
* No imports — `cache.ts` needs the paths without the content readers.
*/
var sections = defineSitemapSections([
	"pages",
	"categories",
	"products",
	"legal"
]);
var SITEMAP_SECTIONS = sections.sections;
var isSitemapSection = sections.isSection;
/** `/sitemap-<section>.xml`. */
var sectionPath = sections.sectionPath;
/** Every sitemap document the page cache rebuilds: index, legacy `sitemap-0.xml`, each section. */
var SITEMAP_PATHS = sections.paths;
export { sectionPath as i, SITEMAP_SECTIONS as n, isSitemapSection as r, SITEMAP_PATHS as t };
