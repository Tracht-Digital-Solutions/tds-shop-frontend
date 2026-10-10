import { O as productPath, S as homePath, T as legalPath, i as escapeXml, o as newestDay, p as canonical, s as renderSectionedSitemapIndex, x as categoryPath, y as LANGS } from "./siteKey_C6JEtaJE.mjs";
import { a as publishedLegalSlugs } from "./legal_D-gXMnso.mjs";
import { i as sectionPath, n as SITEMAP_SECTIONS } from "./sitemapSections_mGb1ZQHg.mjs";
import { n as listAllProducts, r as listCategories } from "./content-api_CvYjQIre.mjs";
import { n as isIndexable } from "./indexing_D0dmov63.mjs";
//#region src/lib/sitemap.ts
var isoDay = (value) => {
	if (!value) return void 0;
	const ts = Date.parse(value);
	return Number.isNaN(ts) ? void 0 : new Date(ts).toISOString().slice(0, 10);
};
var newest = (dates) => {
	const days = dates.map(isoDay).filter((d) => Boolean(d));
	return days.length === 0 ? void 0 : days.sort().at(-1);
};
async function buildEntries() {
	const entries = [];
	/**
	* Language-neutral key per URL, so the two trees can be paired afterwards.
	*
	* `SitemapEntry.alternates` has been declared since the file was written and
	* was never filled or rendered, so the sitemap offered no locale pairing at
	* all — the same gap as the missing hreflang in the markup, in the other
	* document a crawler reads.
	*
	* A product keys on its SLUG, which pairs only when the translation uses the
	* same one. The API pairs translations on the product id and the payload
	* carries neither that id nor the counterpart slug, so a product published
	* under a different slug per language stays unpaired here — exactly as it
	* stays unpaired in `alternates.ts`. The two have to agree: a sitemap that
	* claims a pairing the page does not emit is a contradiction a crawler
	* resolves against us.
	*/
	const keyed = /* @__PURE__ */ new Map();
	const remember = (key, lang, loc) => {
		const bucket = keyed.get(key);
		if (bucket) bucket.push({
			lang,
			loc
		});
		else keyed.set(key, [{
			lang,
			loc
		}]);
	};
	for (const lang of LANGS) {
		const [products, categories, legal] = await Promise.all([
			listAllProducts({ lang }),
			listCategories(lang),
			publishedLegalSlugs(lang)
		]);
		const indexable = products.filter(isIndexable);
		const home = canonical(homePath(lang));
		entries.push({
			loc: home,
			section: "pages",
			lastmod: newest(indexable.map((p) => p.publishedAt ?? null))
		});
		remember("home", lang, home);
		for (const { category } of categories) {
			const inCategory = indexable.filter((p) => p.category === category);
			if (inCategory.length === 0) continue;
			const loc = canonical(categoryPath(category, lang));
			entries.push({
				loc,
				section: "categories",
				lastmod: newest(inCategory.map((p) => p.publishedAt ?? null))
			});
			remember(`cat:${category}`, lang, loc);
		}
		for (const product of indexable) {
			const loc = canonical(productPath(product.slug, lang));
			entries.push({
				loc,
				section: "products",
				lastmod: isoDay(product.publishedAt ?? null),
				...product.imageUrl?.startsWith("http") ? { image: {
					loc: product.imageUrl,
					title: product.title
				} } : {}
			});
			remember(`prod:${product.slug}`, lang, loc);
		}
		for (const slug of legal) {
			const loc = canonical(legalPath(slug, lang));
			entries.push({
				loc,
				section: "legal"
			});
			remember(`legal:${slug}`, lang, loc);
		}
	}
	const byLoc = new Map(entries.map((entry) => [entry.loc, entry]));
	for (const bucket of keyed.values()) {
		if (bucket.length < 2) continue;
		const alternates = bucket.map(({ lang, loc }) => ({
			lang,
			href: loc
		}));
		for (const { loc } of bucket) {
			const entry = byLoc.get(loc);
			if (entry) entry.alternates = alternates;
		}
	}
	return entries;
}
/** The locale a sitemap alternate declares. Matches the markup's hreflang. */
var hreflang = (lang) => lang === "en" ? "en-GB" : "de-DE";
function renderUrlset(entries) {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.map((entry) => {
		const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
		const alternates = (entry.alternates ?? []).flatMap(({ lang, href }) => {
			const link = `\n    <xhtml:link rel="alternate" hreflang="${hreflang(lang)}" href="${escapeXml(href)}"/>`;
			return lang === "de" ? [link, `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(href)}"/>`] : [link];
		}).join("");
		const image = entry.image ? `\n    <image:image><image:loc>${escapeXml(entry.image.loc)}</image:loc><image:title>${escapeXml(entry.image.title)}</image:title></image:image>` : "";
		return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${alternates}${image}${lastmod}\n  </url>`;
	}).join("\n")}\n</urlset>\n`;
}
/**
* The sectioned index (2026-10-06): one child per non-empty section, each with
* the newest real date inside it (none for the legal texts, which carry no date).
*/
function renderSectionIndex(entries, origin) {
	return renderSectionedSitemapIndex(SITEMAP_SECTIONS.flatMap((section) => {
		const inSection = entries.filter((e) => e.section === section);
		if (inSection.length === 0) return [];
		return [{
			loc: `${origin}${sectionPath(section)}`,
			lastmod: newestDay(inSection.map((e) => e.lastmod))
		}];
	}));
}
//#endregion
export { renderSectionIndex as n, renderUrlset as r, buildEntries as t };
