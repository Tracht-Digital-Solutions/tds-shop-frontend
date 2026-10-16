import { C as templateExit, D as Fragment, E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead, S as templateEnter } from "./sequence_DETo48yF.mjs";
import { n as createComponent, t as createAstro } from "./compiler_CyuNpeFc.mjs";
import { d as renderScript, t as $$Layout, u as translations } from "./Layout_DvqBPI7A.mjs";
import { S as homePath, _ as propertyContact, b as categoryName, g as siteLinks, h as site, k as tx, x as categoryPath } from "./siteKey_Csgii0xf.mjs";
import { i as listCategories, r as listAllProducts } from "./content-api_BDJSei-C.mjs";
import { a as breadcrumbSchema, c as itemListSchema, i as asGraph, l as organizationSchema, m as $$ProductGrid, n as homeAlternate, o as collectionPageSchema, p as websiteSchema, s as faqPageSchema, t as categoryAlternate } from "./alternates_C20pZB6Q.mjs";
import { t as describe } from "./metaDescription_CJLBlKxJ.mjs";
import { t as categoryCopy } from "./categoryCopy_xnPk24ct.mjs";
//#region src/components/ShopFilterBar.astro
createAstro("https://shop.tracht-digital.de");
var $$ShopFilterBar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShopFilterBar;
	const { lang } = Astro.props;
	const f = tx(lang).filter;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tds-filterbar__panel" id="catalogue-filter" data-shop-filter${addAttribute(lang, "data-lang")}${addAttribute(f.shown(1), "data-shown-one")}${addAttribute(f.shown(2).replace("2", "{n}"), "data-shown-many")}${addAttribute(f.none, "data-none")} hidden><input type="search" class="field-boxed tds-filterbar__search" data-filter-search${addAttribute(f.search, "placeholder")}${addAttribute(f.search, "aria-label")} autocomplete="off"><fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${f.kind}</legend><div class="tds-toolbar">${[
		"all",
		"own",
		"affiliate"
	].map((k) => renderTemplate`<button type="button" class="chip" data-filter-group="kind"${addAttribute(k, "data-value")}${addAttribute(k === "all" ? "true" : "false", "aria-pressed")}>${f.kinds[k]}</button>`)}</div></fieldset><fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${f.sort}</legend><div class="tds-toolbar">${[
		"default",
		"new",
		"az"
	].map((k) => renderTemplate`<button type="button" class="chip" data-filter-group="sort"${addAttribute(k, "data-value")}${addAttribute(k === "default" ? "true" : "false", "aria-pressed")}>${f.sorts[k]}</button>`)}</div></fieldset><button type="button" class="tds-filterbar__reset" data-filter-reset>${f.reset}</button></div>${renderScript($$result, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ShopFilterBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ShopFilterBar.astro", void 0);
//#endregion
//#region src/components/ShopFilterToggle.astro
createAstro("https://shop.tracht-digital.de");
var $$ShopFilterToggle = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShopFilterToggle;
	const { lang } = Astro.props;
	const f = tx(lang).filter;
	return renderTemplate`${maybeRenderHead($$result)}<button type="button" class="btn btn-primary tds-filterbar__toggle shop-intro__filter" data-filter-toggle aria-expanded="false" aria-controls="catalogue-filter"><svg class="tds-filterbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"></path></svg><span class="tds-filterbar__label">${f.toggle}</span><span class="tds-filterbar__count"></span></button>`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ShopFilterToggle.astro", void 0);
//#endregion
//#region src/lib/editorialImages.ts
/** Decorative category scenes; never substitute these for product photography. */
var categories = {
	netzwerk: "network",
	peripherie: "workplace",
	technik: "network",
	webauftritt: "web",
	"seo-sichtbarkeit": "planning",
	"e-mail-domain": "documents",
	"wartung-betrieb": "backup",
	"recht-datenschutz": "legal",
	digitalisierung: "process",
	leistungspakete: "planning",
	ausstattung: "workplace",
	datensicherung: "backup",
	"mobiles-arbeiten": "mobile"
};
var soonArtwork = [
	"web",
	"planning",
	"documents",
	"backup",
	"legal",
	"process",
	"planning",
	"network"
];
function categoryArtwork(category) {
	return category === null ? "hero" : categories[category] ?? null;
}
var editorialSrc = (id, width = 960) => `/images/editorial/${id}-2026-${width}.webp`;
var editorialSrcset = (id) => [
	480,
	960,
	1440
].map((w) => `${editorialSrc(id, w)} ${w}w`).join(", ");
//#endregion
//#region src/components/Catalogue.astro
createAstro("https://shop.tracht-digital.de");
var $$Catalogue = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Catalogue;
	const { lang, category = null } = Astro.props;
	const artwork = categoryArtwork(category);
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
	const comingSoon = category === null && products.length === 0;
	const contact = propertyContact(lang);
	const links = siteLinks(lang);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="shop-intro tds-wash" aria-labelledby="catalogue-heading"><div class="shop-intro__main"><div class="shop-intro__head"><h1 class="shop-title shop-intro__title" id="catalogue-heading">${headline}</h1>${products.length > 1 ? renderTemplate`<div class="shop-filter">${renderComponent($$result, "ShopFilterToggle", $$ShopFilterToggle, { "lang": lang })}${renderComponent($$result, "ShopFilterBar", $$ShopFilterBar, { "lang": lang })}</div>` : null}</div><span class="tds-brandbar tds-brandbar--sm shop-intro__bar" aria-hidden="true"></span><p class="shop-lede">${site.description[lang]}</p>${copy && renderTemplate`<p class="shop-answer">${copy.answer}</p>`}${categories.length > 0 ? renderTemplate`<nav class="shop-catnav"${addAttribute(t.categories, "aria-label")}><a class="shop-chip"${addAttribute(homePath(lang), "href")}${addAttribute(category === null ? "page" : void 0, "aria-current")}>${t.allCategories} <span class="shop-chip__count">${total}</span></a>${categories.map(({ category: name, label, total: count }) => renderTemplate`<a class="shop-chip"${addAttribute(categoryPath(name, lang), "href")}${addAttribute(name === category ? "page" : void 0, "aria-current")}>${categoryName(name, label)} <span class="shop-chip__count">${count}</span></a>`)}</nav>` : null}${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</div>${category === null ? renderTemplate`<aside class="shop-glance" aria-labelledby="glance-heading"><img class="shop-editorial shop-editorial--hero"${addAttribute(editorialSrc("hero"), "src")}${addAttribute(editorialSrcset("hero"), "srcset")} sizes="(min-width: 64rem) 384px, 100vw" width="960" height="540" alt="" decoding="async"><h2 class="shop-glance__title" id="glance-heading">${t.glance.title}</h2><ul class="shop-glance__list">${t.glance.points.map((point) => renderTemplate`<li>${point}</li>`)}</ul></aside>` : artwork ? renderTemplate`<aside class="shop-glance" aria-hidden="true"><img class="shop-editorial"${addAttribute(editorialSrc(artwork), "src")}${addAttribute(editorialSrcset(artwork), "srcset")} sizes="(min-width: 64rem) 384px, 100vw" width="960" height="640" alt="" decoding="async"></aside>` : null}</section>${products.length > 1 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<p class="sr-only" role="status" data-filter-status></p><p class="shop-filter-empty" data-filter-empty></p>` })}` : null}${comingSoon ? renderTemplate`<div class="shop-soon"><section class="shop-soon__areas" aria-labelledby="soon-areas"><h2 class="shop-section-title" id="soon-areas">${t.soon.areasTitle}</h2><p class="shop-soon__note">${t.empty.title}</p><ul class="shop-soon__grid">${t.soon.areas.map((area, index) => renderTemplate`<li class="shop-soon__tile"><img class="shop-editorial"${addAttribute(editorialSrc(soonArtwork[index]), "src")}${addAttribute(editorialSrcset(soonArtwork[index]), "srcset")} sizes="(min-width: 64rem) 25vw, 50vw" width="960" height="640" alt="" loading="lazy" decoding="async"><h3 class="shop-soon__name">${area.name}</h3><p class="shop-soon__text">${area.text}</p></li>`)}</ul></section><section class="shop-soon__cta tds-wash" aria-labelledby="soon-cta"><div><h2 class="shop-soon__cta-title" id="soon-cta">${t.soon.ctaTitle}</h2><p class="shop-soon__cta-body">${t.soon.ctaBody}</p></div><a class="btn btn-primary"${addAttribute(contact, "href")}>${translations[lang].nav.cta}</a></section><section aria-labelledby="soon-onward"><h2 class="shop-section-title" id="soon-onward">${t.soon.onwardTitle}</h2><div class="shop-soon__onward"><a class="shop-soon__link"${addAttribute(links.blog, "href")}><span class="shop-soon__name">${t.soon.journal.name}</span><span class="shop-soon__text">${t.soon.journal.text}</span></a><a class="shop-soon__link"${addAttribute(links.tools, "href")}><span class="shop-soon__name">${t.soon.tools.name}</span><span class="shop-soon__text">${t.soon.tools.text}</span></a></div></section></div>` : grouped ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="shop-filter-results" data-filter-results></div><template data-filter-all>${templateEnter($$result)}${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"lang": lang,
		"filterable": true
	})}${templateExit($$result)}</template>${shelves.map((shelf) => renderTemplate`<section class="shop-shelf" data-filter-shelf${addAttribute(`shelf-${shelf.category}`, "aria-labelledby")}>${categoryArtwork(shelf.category) && renderTemplate`<img class="shop-editorial shop-editorial--shelf"${addAttribute(editorialSrc(categoryArtwork(shelf.category)), "src")}${addAttribute(editorialSrcset(categoryArtwork(shelf.category)), "srcset")} sizes="100vw" width="1440" height="960" alt="" loading="lazy" decoding="async">`}<div class="shop-shelf__head"><h2 class="shop-section-title shop-shelf__title"${addAttribute(`shelf-${shelf.category}`, "id")}><a${addAttribute(categoryPath(shelf.category, lang), "href")}>${shelf.name}</a></h2>${shelf.total > shelf.items.length ? renderTemplate`<a class="shop-shelf__more link-underline"${addAttribute(categoryPath(shelf.category, lang), "href")}>${t.showAll(shelf.total)}</a>` : null}</div>${shelf.intro ? renderTemplate`<p class="shop-shelf__intro">${shelf.intro}</p>` : null}${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": shelf.items,
		"lang": lang
	})}</section>`)}` })}` : renderTemplate`${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"lang": lang,
		"filterable": true
	})}`}${copy && renderTemplate`<section class="shop-faq" aria-labelledby="category-faq-heading"><h2 id="category-faq-heading" class="shop-faq__title">${t.faqHeading}</h2>${copy.faq.map((item) => renderTemplate`<details class="shop-faq__item"><summary>${item.q}</summary><p>${item.a}</p></details>`)}</section>`}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Catalogue.astro", void 0);
//#endregion
export { $$Catalogue as t };
