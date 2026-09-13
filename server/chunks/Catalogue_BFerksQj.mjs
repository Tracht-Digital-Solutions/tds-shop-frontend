import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { i as itemListSchema, o as websiteSchema, r as collectionPageSchema, s as $$ProductGrid, t as asGraph } from "./jsonld_D6GNhKYC.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Layout } from "./Layout_xvF1Gooe.mjs";
import { c as tx, i as homePath, n as categoryLabel, r as categoryPath } from "./i18n_CAi8x9tF.mjs";
import { s as site } from "./demoContent_DmC0ycm4.mjs";
import { n as listCategories, r as listProducts } from "./content-api_NeVbVIBp.mjs";
import { t as describe } from "./metaDescription_CJLBlKxJ.mjs";
//#region src/components/Catalogue.astro
createAstro("https://shop.tracht-digital.de");
var $$Catalogue = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Catalogue;
	const { lang, category = null } = Astro.props;
	const t = tx(lang);
	const [page, categories] = await Promise.all([listProducts({
		lang,
		limit: 24,
		category
	}), listCategories(lang)]);
	const heading = category ? categoryLabel(category) : t.catalogue;
	const headline = category ? categoryLabel(category) : t.catalogueHeadline;
	const description = describe(category ? lang === "de" ? `Kuratierte Technik aus der Kategorie ${categoryLabel(category)}: mit eigener Einschätzung statt Herstellertext.` : `Curated technology in the ${categoryLabel(category)} category, with our own assessment rather than vendor copy.` : site.description[lang], site.description[lang]);
	const path = category ? categoryPath(category, lang) : homePath(lang);
	const total = categories.reduce((sum, c) => sum + c.total, 0);
	const hasAffiliate = page.products.some((p) => p.offers.some((o) => o.kind === "affiliate"));
	const jsonLd = asGraph([
		websiteSchema(lang),
		collectionPageSchema(heading, path, lang),
		itemListSchema(page.products, lang)
	]);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": heading,
		"description": description,
		"lang": lang,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="shop-intro tds-wash" aria-labelledby="catalogue-heading"><h1 class="shop-title shop-intro__title" id="catalogue-heading">${headline}</h1><span class="tds-brandbar tds-brandbar--sm shop-intro__bar" aria-hidden="true"></span><p class="shop-lede">${site.description[lang]}</p>${categories.length > 0 ? renderTemplate`<nav class="shop-catnav"${addAttribute(t.categories, "aria-label")}><a class="shop-chip"${addAttribute(homePath(lang), "href")}${addAttribute(category === null ? "page" : void 0, "aria-current")}>${t.allCategories} <span class="shop-chip__count">${total}</span></a>${categories.map(({ category: name, total: count }) => renderTemplate`<a class="shop-chip"${addAttribute(categoryPath(name, lang), "href")}${addAttribute(name === category ? "page" : void 0, "aria-current")}>${categoryLabel(name)} <span class="shop-chip__count">${count}</span></a>`)}</nav>` : null}${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</section>${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": page.products,
		"lang": lang
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Catalogue.astro", void 0);
//#endregion
export { $$Catalogue as t };
