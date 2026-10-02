import { C as legalPath, E as productPath, _ as LANGS, b as homePath, d as canonical, i as escapeXml, y as categoryPath } from "./siteKey_lIZ3umxo.mjs";
import { a as publishedLegalSlugs } from "./legal_BHF2EXBp.mjs";
import { n as isIndexable } from "./indexing_D0dmov63.mjs";
import { n as listAllProducts, r as listCategories } from "./content-api_CGpShfay.mjs";
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
			lastmod: newest(indexable.map((p) => p.publishedAt ?? null))
		});
		remember("home", lang, home);
		for (const { category } of categories) {
			const inCategory = indexable.filter((p) => p.category === category);
			if (inCategory.length === 0) continue;
			const loc = canonical(categoryPath(category, lang));
			entries.push({
				loc,
				lastmod: newest(inCategory.map((p) => p.publishedAt ?? null))
			});
			remember(`cat:${category}`, lang, loc);
		}
		for (const product of indexable) {
			const loc = canonical(productPath(product.slug, lang));
			entries.push({
				loc,
				lastmod: isoDay(product.publishedAt ?? null)
			});
			remember(`prod:${product.slug}`, lang, loc);
		}
		for (const slug of legal) {
			const loc = canonical(legalPath(slug, lang));
			entries.push({ loc });
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
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.map((entry) => {
		const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
		const alternates = (entry.alternates ?? []).flatMap(({ lang, href }) => {
			const link = `\n    <xhtml:link rel="alternate" hreflang="${hreflang(lang)}" href="${escapeXml(href)}"/>`;
			return lang === "de" ? [link, `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(href)}"/>`] : [link];
		}).join("");
		return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>${alternates}${lastmod}\n  </url>`;
	}).join("\n")}\n</urlset>\n`;
}
function renderIndex(sitemaps) {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps.map((loc) => `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n  </sitemap>`).join("\n")}\n</sitemapindex>\n`;
}
//#endregion
export { renderIndex as n, renderUrlset as r, buildEntries as t };
