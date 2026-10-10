import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_gsNi_lIw.mjs";
import { t as createComponent } from "./compiler_BqOQTrwP.mjs";
import { t as $$Layout } from "./Layout_CEK1ovz2.mjs";
import { S as homePath, b as categoryName, h as site, k as tx, x as categoryPath } from "./siteKey_C6JEtaJE.mjs";
import { n as listAllProducts, r as listCategories } from "./content-api_CvYjQIre.mjs";
import { a as breadcrumbSchema, c as itemListSchema, i as asGraph, l as organizationSchema, m as $$ProductGrid, n as homeAlternate, o as collectionPageSchema, p as websiteSchema, s as faqPageSchema, t as categoryAlternate } from "./alternates_D7KE_17F.mjs";
import { t as describe } from "./metaDescription_CJLBlKxJ.mjs";
import { t as categoryCopy } from "./categoryCopy_xnPk24ct.mjs";
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
	const current = category ? categories.find((c) => c.category === category) : void 0;
	const copy = categoryCopy(category, lang, current);
	const description = describe(copy?.answer ?? (currentName ? lang === "de" ? `${currentName} bei Tracht Digital Solutions: Leistungen zum Festpreis und Technik mit eigener Einschätzung.` : `${currentName} at Tracht Digital Solutions: fixed-price services and technology with our own assessment.` : site.description[lang]), site.description[lang]);
	const path = category ? categoryPath(category, lang) : homePath(lang);
	const total = categories.reduce((sum, c) => sum + c.total, 0);
	const hasAffiliate = products.some((p) => p.offers.some((o) => o.kind === "affiliate"));
	const altUrl = category ? await categoryAlternate(category, lang) : homeAlternate(lang);
	const SHELF_SIZE = 4;
	const grouped = category === null && products.length > 12;
	const shelves = grouped ? categories.map((c) => ({
		...c,
		name: categoryName(c.category, c.label),
		items: products.filter((p) => p.category === c.category).slice(0, SHELF_SIZE)
	})).filter((shelf) => shelf.items.length > 0) : [];
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="shop-intro tds-wash" aria-labelledby="catalogue-heading"><h1 class="shop-title shop-intro__title" id="catalogue-heading">${headline}</h1><span class="tds-brandbar tds-brandbar--sm shop-intro__bar" aria-hidden="true"></span><p class="shop-lede">${site.description[lang]}</p>${copy && renderTemplate`<p class="shop-answer">${copy.answer}</p>`}${categories.length > 0 ? renderTemplate`<nav class="shop-catnav"${addAttribute(t.categories, "aria-label")}><a class="shop-chip"${addAttribute(homePath(lang), "href")}${addAttribute(category === null ? "page" : void 0, "aria-current")}>${t.allCategories} <span class="shop-chip__count">${total}</span></a>${categories.map(({ category: name, label, total: count }) => renderTemplate`<a class="shop-chip"${addAttribute(categoryPath(name, lang), "href")}${addAttribute(name === category ? "page" : void 0, "aria-current")}>${categoryName(name, label)} <span class="shop-chip__count">${count}</span></a>`)}</nav>` : null}${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</section>${grouped ? shelves.map((shelf) => renderTemplate`<section class="shop-shelf"${addAttribute(`shelf-${shelf.category}`, "aria-labelledby")}><div class="shop-shelf__head"><h2 class="shop-section-title shop-shelf__title"${addAttribute(`shelf-${shelf.category}`, "id")}><a${addAttribute(categoryPath(shelf.category, lang), "href")}>${shelf.name}</a></h2>${shelf.total > shelf.items.length ? renderTemplate`<a class="shop-shelf__more link-underline"${addAttribute(categoryPath(shelf.category, lang), "href")}>${t.showAll(shelf.total)}</a>` : null}</div>${shelf.intro ? renderTemplate`<p class="shop-shelf__intro">${shelf.intro}</p>` : null}${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": shelf.items,
		"lang": lang
	})}</section>`) : renderTemplate`${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"lang": lang
	})}`}${copy && renderTemplate`<section class="shop-faq" aria-labelledby="category-faq-heading"><h2 id="category-faq-heading" class="shop-faq__title">${t.faqHeading}</h2>${copy.faq.map((item) => renderTemplate`<details class="shop-faq__item"><summary>${item.q}</summary><p>${item.a}</p></details>`)}</section>`}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Catalogue.astro", void 0);
//#endregion
export { $$Catalogue as t };
