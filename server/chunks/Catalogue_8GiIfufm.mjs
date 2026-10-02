import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_CulRNmGV.mjs";
import { t as createComponent } from "./compiler_nZpybwjH.mjs";
import { t as $$Layout } from "./Layout_C_UXvuB5.mjs";
import { D as tx, b as homePath, p as site, v as categoryName, y as categoryPath } from "./siteKey_lIZ3umxo.mjs";
import { a as breadcrumbSchema, c as itemListSchema, f as websiteSchema, i as asGraph, l as organizationSchema, n as homeAlternate, o as collectionPageSchema, p as $$ProductGrid, s as faqPageSchema, t as categoryAlternate } from "./alternates_fJNdW2F6.mjs";
import { n as listAllProducts, r as listCategories } from "./content-api_CGpShfay.mjs";
import { t as describe } from "./metaDescription_CJLBlKxJ.mjs";
import { t as categoryCopy } from "./categoryCopy_hliT-c1S.mjs";
//#region src/components/Catalogue.astro
createAstro("https://shop.tracht-digital.de");
var $$Catalogue = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Catalogue;
	const { lang, category = null } = Astro.props;
	const t = tx(lang);
	const [products, categories] = await Promise.all([listAllProducts({
		lang,
		category
	}), listCategories(lang)]);
	const currentName = category ? categoryName(category, categories.find((c) => c.category === category)?.label) : null;
	const heading = currentName ?? t.catalogue;
	const headline = currentName ?? t.catalogueHeadline;
	const description = describe(currentName ? lang === "de" ? `Kuratierte Technik aus der Kategorie ${currentName}: mit eigener Einschätzung statt Herstellertext.` : `Curated technology in the ${currentName} category, with our own assessment rather than vendor copy.` : site.description[lang], site.description[lang]);
	const path = category ? categoryPath(category, lang) : homePath(lang);
	const total = categories.reduce((sum, c) => sum + c.total, 0);
	const hasAffiliate = products.some((p) => p.offers.some((o) => o.kind === "affiliate"));
	const altUrl = category ? await categoryAlternate(category, lang) : homeAlternate(lang);
	const copy = categoryCopy(category, lang);
	const jsonLd = asGraph([
		websiteSchema(lang),
		...category ? [] : [organizationSchema()],
		collectionPageSchema(heading, path, lang),
		...category ? [breadcrumbSchema([{
			name: t.catalogue,
			path: homePath(lang)
		}, {
			name: heading,
			path
		}])] : [],
		itemListSchema(products, lang),
		...copy ? [faqPageSchema(copy.faq)] : []
	]);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": heading,
		"description": description,
		"lang": lang,
		"altUrl": altUrl,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="shop-intro tds-wash" aria-labelledby="catalogue-heading"><h1 class="shop-title shop-intro__title" id="catalogue-heading">${headline}</h1><span class="tds-brandbar tds-brandbar--sm shop-intro__bar" aria-hidden="true"></span><p class="shop-lede">${site.description[lang]}</p>${copy && renderTemplate`<p class="shop-answer">${copy.answer}</p>`}${categories.length > 0 ? renderTemplate`<nav class="shop-catnav"${addAttribute(t.categories, "aria-label")}><a class="shop-chip"${addAttribute(homePath(lang), "href")}${addAttribute(category === null ? "page" : void 0, "aria-current")}>${t.allCategories} <span class="shop-chip__count">${total}</span></a>${categories.map(({ category: name, label, total: count }) => renderTemplate`<a class="shop-chip"${addAttribute(categoryPath(name, lang), "href")}${addAttribute(name === category ? "page" : void 0, "aria-current")}>${categoryName(name, label)} <span class="shop-chip__count">${count}</span></a>`)}</nav>` : null}${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</section>${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"lang": lang
	})}${copy && renderTemplate`<section class="shop-faq" aria-labelledby="category-faq-heading"><h2 id="category-faq-heading" class="shop-faq__title">${t.faqHeading}</h2>${copy.faq.map((item) => renderTemplate`<details class="shop-faq__item"><summary>${item.q}</summary><p>${item.a}</p></details>`)}</section>`}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Catalogue.astro", void 0);
//#endregion
export { $$Catalogue as t };
