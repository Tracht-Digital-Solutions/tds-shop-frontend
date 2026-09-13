import { i as homePath, r as categoryPath, s as productPath, t as LANGS } from "./i18n_CAi8x9tF.mjs";
import { a as canonical } from "./demoContent_DmC0ycm4.mjs";
import { n as isIndexable } from "./indexing_p4klDT6G.mjs";
import { n as listCategories, r as listProducts } from "./content-api_NeVbVIBp.mjs";
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
	for (const lang of LANGS) {
		const [{ products }, categories] = await Promise.all([listProducts({
			lang,
			limit: 48
		}), listCategories(lang)]);
		const indexable = products.filter(isIndexable);
		entries.push({
			loc: canonical(homePath(lang)),
			lastmod: newest(indexable.map((p) => p.publishedAt ?? null))
		});
		for (const { category } of categories) {
			const inCategory = indexable.filter((p) => p.category === category);
			if (inCategory.length === 0) continue;
			entries.push({
				loc: canonical(categoryPath(category, lang)),
				lastmod: newest(inCategory.map((p) => p.publishedAt ?? null))
			});
		}
		for (const product of indexable) entries.push({
			loc: canonical(productPath(product.slug, lang)),
			lastmod: isoDay(product.publishedAt ?? null)
		});
	}
	return entries;
}
var escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function renderUrlset(entries) {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((entry) => {
		const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
		return `  <url>\n    <loc>${escape(entry.loc)}</loc>${lastmod}\n  </url>`;
	}).join("\n")}\n</urlset>\n`;
}
function renderIndex(sitemaps) {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps.map((loc) => `  <sitemap>\n    <loc>${escape(loc)}</loc>\n  </sitemap>`).join("\n")}\n</sitemapindex>\n`;
}
//#endregion
export { renderIndex as n, renderUrlset as r, buildEntries as t };
