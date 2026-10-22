import { C as templateExit, D as Fragment, E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead, S as templateEnter } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent, t as createAstro } from "./compiler_0Y1Kw-SJ.mjs";
import { g as renderScript, h as translations, t as $$Layout } from "./Layout_DQnrLY78.mjs";
import { C as categoryPath, S as categoryName, _ as site, i as createImageCatalog, j as tx, v as siteLinks, w as homePath, y as propertyContact } from "./siteKey_D6bmHM0Q.mjs";
import { i as listCategories, r as listAllProducts } from "./content-api_Bw9LJZoH.mjs";
import { a as itemListSchema, d as $$ProductGrid, i as faqPageSchema, n as breadcrumbSchema, o as organizationSchema, r as collectionPageSchema, t as asGraph, u as websiteSchema } from "./jsonld_CPgo_-ZN.mjs";
import { t as describe } from "./metaDescription_iA0LTISv.mjs";
import { n as homeAlternate, t as categoryAlternate } from "./alternates_BuB0FOvY.mjs";
import { t as categoryCopy } from "./categoryCopy_BH6AtFnK.mjs";
// src/components/ShopFilterBar.astro
createAstro("https://shop.tracht-digital.de");
var $$ShopFilterBar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShopFilterBar;
	const { lang, categories = [], tags = [] } = Astro.props;
	const f = tx(lang).filter;
	return renderTemplate`${maybeRenderHead($$result)}<div class="tds-filterbar__panel" id="catalogue-filter" data-shop-filter${addAttribute(lang, "data-lang")}${addAttribute(f.shown(1), "data-shown-one")}${addAttribute(f.shown(2).replace("2", "{n}"), "data-shown-many")}${addAttribute(f.none, "data-none")} hidden><input type="search" class="field-boxed tds-filterbar__search" data-filter-search${addAttribute(f.search, "placeholder")}${addAttribute(f.search, "aria-label")} autocomplete="off"><fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${f.kind}</legend><div class="tds-toolbar">${[
		"all",
		"own",
		"affiliate"
	].map((k) => renderTemplate`<button type="button" class="chip" data-filter-group="kind"${addAttribute(k, "data-value")}${addAttribute(k === "all" ? "true" : "false", "aria-pressed")}>${f.kinds[k]}</button>`)}</div></fieldset>${categories.length > 1 && renderTemplate`<fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${f.category}</legend><div class="tds-toolbar"><button type="button" class="chip" data-filter-group="category" data-value="all" aria-pressed="true">${f.all}</button>${categories.map((c) => renderTemplate`<button type="button" class="chip" data-filter-group="category"${addAttribute(c.slug, "data-value")} aria-pressed="false">${c.name}</button>`)}</div></fieldset>`}${tags.length > 1 && renderTemplate`<fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${f.tags}</legend><div class="tds-toolbar"><button type="button" class="chip" data-filter-group="tag" data-value="all" aria-pressed="true">${f.all}</button>${tags.map((tag) => renderTemplate`<button type="button" class="chip" data-filter-group="tag"${addAttribute(tag.toLowerCase(), "data-value")} aria-pressed="false">#${tag}</button>`)}</div></fieldset>`}<fieldset class="tds-filterbar__group"><legend class="tds-filterbar__legend">${f.sort}</legend><div class="tds-toolbar">${[
		"default",
		"new",
		"az",
		"priceUp",
		"priceDown"
	].map((k) => renderTemplate`<button type="button" class="chip" data-filter-group="sort"${addAttribute(k, "data-value")}${addAttribute(k === "default" ? "true" : "false", "aria-pressed")}>${f.sorts[k]}</button>`)}</div></fieldset><button type="button" class="tds-filterbar__reset" data-filter-reset>${f.reset}</button><button type="button" class="tds-filterbar__close" data-filter-close${addAttribute(f.close, "aria-label")}${addAttribute(f.close, "title")}></button></div>${renderScript($$result, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ShopFilterBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ShopFilterBar.astro", void 0);
// src/components/ShopFilterToggle.astro
createAstro("https://shop.tracht-digital.de");
var $$ShopFilterToggle = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ShopFilterToggle;
	const { lang } = Astro.props;
	const f = tx(lang).filter;
	return renderTemplate`${maybeRenderHead($$result)}<button type="button" class="btn btn-primary tds-filterbar__toggle" data-filter-toggle aria-expanded="false" aria-controls="catalogue-filter"><svg class="tds-filterbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"></path></svg><span class="tds-filterbar__label">${f.toggle}</span><span class="tds-filterbar__count"></span></button>`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ShopFilterToggle.astro", void 0);
// src/lib/imageCatalog.ts
/** The generated editorial image catalogue (tds-shared helper). */
var { imageInfo, imageHints, imageObject } = createImageCatalog({
	"/images/editorial/hero-2026-1440.webp": {
		"src": "/images/editorial/hero-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Ausgewählte Arbeitsgeräte als Symbol für den TDS-Shop.",
			"en": "Selected work equipment illustrating the TDS shop."
		},
		"variants": [
			{
				"src": "/images/editorial/hero-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "1d1f25ccbc37",
				"bytes": 15474
			},
			{
				"src": "/images/editorial/hero-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "6c1e321822e2",
				"bytes": 33956
			},
			{
				"src": "/images/editorial/hero-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "4c432c746f7e",
				"bytes": 44812
			},
			{
				"src": "/images/editorial/hero-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "9b2413a45085",
				"bytes": 78830
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/network-2026-1440.webp": {
		"src": "/images/editorial/network-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Netzwerkgerät und Kabel als Symbol für Büro-WLAN.",
			"en": "Network device and cable illustrating office Wi-Fi."
		},
		"variants": [
			{
				"src": "/images/editorial/network-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "3d4d63b8bc7b",
				"bytes": 19572
			},
			{
				"src": "/images/editorial/network-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "7b6501d118a3",
				"bytes": 39786
			},
			{
				"src": "/images/editorial/network-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "f79cec252daf",
				"bytes": 51660
			},
			{
				"src": "/images/editorial/network-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "deefaf77136c",
				"bytes": 101872
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/workplace-2026-1440.webp": {
		"src": "/images/editorial/workplace-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Kamera, Mikrofon und Bildschirm als Symbol für Videocalls und Homeoffice.",
			"en": "Camera, microphone and monitor illustrating video calls and home working."
		},
		"variants": [
			{
				"src": "/images/editorial/workplace-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "af9bd6a52ad9",
				"bytes": 24514
			},
			{
				"src": "/images/editorial/workplace-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "e69c48f9024b",
				"bytes": 52054
			},
			{
				"src": "/images/editorial/workplace-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "5924499c51ad",
				"bytes": 68362
			},
			{
				"src": "/images/editorial/workplace-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "ea5797b08b7b",
				"bytes": 121580
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/backup-2026-1440.webp": {
		"src": "/images/editorial/backup-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Separate Datenträger als Symbol für betriebliche Datensicherung.",
			"en": "Separate storage drives illustrating business backups."
		},
		"variants": [
			{
				"src": "/images/editorial/backup-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "d405f4bd64d8",
				"bytes": 19032
			},
			{
				"src": "/images/editorial/backup-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "a217dab7afd4",
				"bytes": 38504
			},
			{
				"src": "/images/editorial/backup-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "3ae1fe347856",
				"bytes": 51218
			},
			{
				"src": "/images/editorial/backup-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "050426db9d20",
				"bytes": 93992
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/mobile-2026-1440.webp": {
		"src": "/images/editorial/mobile-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Laptop und Zubehör am Zugfenster als Symbol für mobiles Arbeiten.",
			"en": "Laptop and accessories beside a train window illustrating mobile work."
		},
		"variants": [
			{
				"src": "/images/editorial/mobile-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "974e4b65c144",
				"bytes": 20622
			},
			{
				"src": "/images/editorial/mobile-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "6228bc1db9c6",
				"bytes": 43988
			},
			{
				"src": "/images/editorial/mobile-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "0d186e209549",
				"bytes": 57432
			},
			{
				"src": "/images/editorial/mobile-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "29b802a6bbb9",
				"bytes": 99894
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/documents-2026-1440.webp": {
		"src": "/images/editorial/documents-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Dokumentenscanner und Ablage als Symbol für ein papierloses Büro.",
			"en": "Document scanner and filing folder illustrating a paperless office."
		},
		"variants": [
			{
				"src": "/images/editorial/documents-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "0ce3319555c0",
				"bytes": 19424
			},
			{
				"src": "/images/editorial/documents-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "d30174e3d275",
				"bytes": 37118
			},
			{
				"src": "/images/editorial/documents-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "afe10fa2153d",
				"bytes": 48562
			},
			{
				"src": "/images/editorial/documents-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "1aa58949cda4",
				"bytes": 84206
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/web-2026-1440.webp": {
		"src": "/images/editorial/web-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Laptop, Telefon und Layoutkarten als Symbol für Webauftritte und Onlineshops.",
			"en": "Laptop, phone and layout cards illustrating websites and online shops."
		},
		"variants": [
			{
				"src": "/images/editorial/web-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "ed3d4a68ffd6",
				"bytes": 20800
			},
			{
				"src": "/images/editorial/web-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "bb8f17eb1123",
				"bytes": 40176
			},
			{
				"src": "/images/editorial/web-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "9451e04af982",
				"bytes": 51104
			},
			{
				"src": "/images/editorial/web-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "270c0adc7f66",
				"bytes": 84496
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/planning-2026-1440.webp": {
		"src": "/images/editorial/planning-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Hände und Planungskarten als Symbol für Beratung und Konzeption.",
			"en": "Hands and planning cards illustrating consulting and planning."
		},
		"variants": [
			{
				"src": "/images/editorial/planning-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "7b8a81985c71",
				"bytes": 21632
			},
			{
				"src": "/images/editorial/planning-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "f84f7cea1de7",
				"bytes": 43466
			},
			{
				"src": "/images/editorial/planning-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "93cfb15804ef",
				"bytes": 56904
			},
			{
				"src": "/images/editorial/planning-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "c92f76dc29db",
				"bytes": 97338
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/process-2026-1440.webp": {
		"src": "/images/editorial/process-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Geordnete Ablagen und Paket als Symbol für betriebliche Prozessoptimierung.",
			"en": "Organised trays and a parcel illustrating business process optimisation."
		},
		"variants": [
			{
				"src": "/images/editorial/process-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "f10487ae27d7",
				"bytes": 26880
			},
			{
				"src": "/images/editorial/process-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "93a9d71708ab",
				"bytes": 56254
			},
			{
				"src": "/images/editorial/process-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "9eeddbe7050b",
				"bytes": 71950
			},
			{
				"src": "/images/editorial/process-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "542845c9e2f6",
				"bytes": 131820
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/legal-2026-1440.webp": {
		"src": "/images/editorial/legal-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Dokumentmappen als Symbol für Website-Pflichtangaben.",
			"en": "Document folders illustrating website compliance information."
		},
		"variants": [
			{
				"src": "/images/editorial/legal-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "01bb349e6e27",
				"bytes": 20590
			},
			{
				"src": "/images/editorial/legal-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "e93832123ec0",
				"bytes": 41884
			},
			{
				"src": "/images/editorial/legal-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "2a766d73d178",
				"bytes": 52682
			},
			{
				"src": "/images/editorial/legal-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "5d4c31dd6b2c",
				"bytes": 91472
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	}
}, {
	origin: "https://shop.tracht-digital.de",
	about: "page"
});
// src/lib/editorialImages.ts
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
// src/components/Catalogue.astro
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
	const filterCategories = category === null ? categories.map((c) => ({
		slug: c.category,
		name: categoryName(c.category, c.label)
	})) : [];
	const tagCounts = /* @__PURE__ */ new Map();
	for (const product of products) for (const tag of product.tags ?? []) {
		const key = tag.trim().toLowerCase();
		if (!key) continue;
		const entry = tagCounts.get(key) ?? {
			name: tag.trim(),
			count: 0
		};
		entry.count += 1;
		tagCounts.set(key, entry);
	}
	const filterTags = [...tagCounts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, lang)).slice(0, 10).map((entry) => entry.name);
	const contact = propertyContact(lang);
	const links = siteLinks(lang);
	const jsonLd = asGraph([
		websiteSchema(lang),
		...category ? [] : [organizationSchema()],
		collectionPageSchema(heading, path, lang),
		imageObject(editorialSrc(artwork ?? "hero"), lang, new URL(path, site.url).href),
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="shop-intro tds-wash" aria-labelledby="catalogue-heading"><div class="shop-intro__main">${category === null ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<p class="shop-intro__eyebrow">${t.hero.eyebrow}</p><h1 class="shop-title shop-intro__title" id="catalogue-heading">${t.hero.titleLead} <span class="shop-intro__accent">${t.hero.titleAccent}</span></h1>` })}` : renderTemplate`<h1 class="shop-title shop-intro__title" id="catalogue-heading">${headline}</h1>`}<span class="tds-brandbar tds-brandbar--sm shop-intro__bar" aria-hidden="true"></span><p class="shop-lede">${site.description[lang]}</p>${category === null && products.length > 1 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="shop-intro__ctas"><a class="btn btn-primary" href="#katalog">${t.hero.browse}<span aria-hidden="true">↓</span></a><a class="btn btn-ghost"${addAttribute(contact, "href")}>${translations[lang].nav.cta}</a></div><dl class="shop-intro__stats"><div><dt>${t.hero.products(total)}</dt><dd>${total}</dd></div><div><dt>${t.hero.categories(categories.length)}</dt><dd>${categories.length}</dd></div><div><dt>${t.hero.contact}</dt><dd>1</dd></div></dl>` })}` : null}${copy && renderTemplate`<p class="shop-answer">${copy.answer}</p>`}${categories.length > 0 ? renderTemplate`<nav class="shop-catnav"${addAttribute(t.categories, "aria-label")}><a class="shop-chip"${addAttribute(homePath(lang), "href")}${addAttribute(category === null ? "page" : void 0, "aria-current")}${addAttribute(category === null ? "all" : void 0, "data-filter-category")}>${t.allCategories} <span class="shop-chip__count">${total}</span></a>${categories.map(({ category: name, label, total: count }) => renderTemplate`<a class="shop-chip"${addAttribute(categoryPath(name, lang), "href")}${addAttribute(name === category ? "page" : void 0, "aria-current")}${addAttribute(category === null ? name : void 0, "data-filter-category")}>${categoryName(name, label)} <span class="shop-chip__count">${count}</span></a>`)}</nav>` : null}${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</div>${category === null ? renderTemplate`<aside class="shop-glance" aria-labelledby="glance-heading"><img class="shop-editorial shop-editorial--hero"${addAttribute(editorialSrc("hero"), "src")}${addAttribute(imageHints(editorialSrc("hero"), lang)?.srcSet ?? editorialSrcset("hero"), "srcset")} sizes="(min-width: 64rem) 384px, 100vw" width="960" height="540" alt="" decoding="async"><h2 class="shop-glance__title" id="glance-heading">${t.glance.title}</h2><ul class="shop-glance__list">${t.glance.points.map((point) => renderTemplate`<li>${point}</li>`)}</ul></aside>` : artwork ? renderTemplate`<aside class="shop-glance" aria-hidden="true"><img class="shop-editorial"${addAttribute(editorialSrc(artwork), "src")}${addAttribute(imageHints(editorialSrc(artwork), lang)?.srcSet ?? editorialSrcset(artwork), "srcset")} sizes="(min-width: 64rem) 384px, 100vw" width="960" height="640" alt="" decoding="async"></aside>` : null}</section>${products.length > 1 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="tds-filterbar shop-filterrow" id="katalog"><p class="shop-filterrow__count" data-filter-count${addAttribute(products.length, "data-total")}>${t.filter.shown(products.length)}</p>${renderComponent($$result, "ShopFilterToggle", $$ShopFilterToggle, { "lang": lang })}${renderComponent($$result, "ShopFilterBar", $$ShopFilterBar, {
		"lang": lang,
		"categories": filterCategories,
		"tags": filterTags
	})}</div><p class="sr-only" role="status" data-filter-status></p><p class="shop-filter-empty" data-filter-empty></p>` })}` : null}${comingSoon ? renderTemplate`<div class="shop-soon"><section class="shop-soon__areas" aria-labelledby="soon-areas"><h2 class="shop-section-title" id="soon-areas">${t.soon.areasTitle}</h2><p class="shop-soon__note">${t.empty.title}</p><ul class="shop-soon__grid">${t.soon.areas.map((area, index) => renderTemplate`<li class="shop-soon__tile"><img class="shop-editorial"${addAttribute(editorialSrc(soonArtwork[index]), "src")}${addAttribute(imageHints(editorialSrc(soonArtwork[index]), lang)?.srcSet ?? editorialSrcset(soonArtwork[index]), "srcset")} sizes="(min-width: 64rem) 25vw, 50vw" width="960" height="640" alt="" loading="lazy" decoding="async"><h3 class="shop-soon__name">${area.name}</h3><p class="shop-soon__text">${area.text}</p></li>`)}</ul></section><section class="shop-soon__cta tds-wash" aria-labelledby="soon-cta"><div><h2 class="shop-soon__cta-title" id="soon-cta">${t.soon.ctaTitle}</h2><p class="shop-soon__cta-body">${t.soon.ctaBody}</p></div><a class="btn btn-primary"${addAttribute(contact, "href")}>${translations[lang].nav.cta}</a></section><section aria-labelledby="soon-onward"><h2 class="shop-section-title" id="soon-onward">${t.soon.onwardTitle}</h2><div class="shop-soon__onward"><a class="shop-soon__link"${addAttribute(links.blog, "href")}><span class="shop-soon__name">${t.soon.journal.name}</span><span class="shop-soon__text">${t.soon.journal.text}</span></a><a class="shop-soon__link"${addAttribute(links.tools, "href")}><span class="shop-soon__name">${t.soon.tools.name}</span><span class="shop-soon__text">${t.soon.tools.text}</span></a></div></section></div>` : grouped ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="shop-filter-results" data-filter-results></div><template data-filter-all>${templateEnter($$result)}${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"lang": lang,
		"filterable": true
	})}${templateExit($$result)}</template>${shelves.map((shelf) => renderTemplate`<section class="shop-shelf" data-filter-shelf${addAttribute(`shelf-${shelf.category}`, "aria-labelledby")}>${categoryArtwork(shelf.category) && renderTemplate`<img class="shop-editorial shop-editorial--shelf"${addAttribute(editorialSrc(categoryArtwork(shelf.category)), "src")}${addAttribute(imageHints(editorialSrc(categoryArtwork(shelf.category)), lang)?.srcSet ?? editorialSrcset(categoryArtwork(shelf.category)), "srcset")} sizes="100vw" width="1440" height="960" alt="" loading="lazy" decoding="async">`}<div class="shop-shelf__head"><h2 class="shop-section-title shop-shelf__title"${addAttribute(`shelf-${shelf.category}`, "id")}><a${addAttribute(categoryPath(shelf.category, lang), "href")}>${shelf.name}</a></h2>${shelf.total > shelf.items.length ? renderTemplate`<a class="shop-shelf__more link-underline"${addAttribute(categoryPath(shelf.category, lang), "href")}>${t.showAll(shelf.total)}</a>` : null}</div>${shelf.intro ? renderTemplate`<p class="shop-shelf__intro">${shelf.intro}</p>` : null}${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": shelf.items,
		"lang": lang
	})}</section>`)}` })}` : renderTemplate`${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"lang": lang,
		"filterable": true
	})}`}${copy && renderTemplate`<section class="shop-faq" aria-labelledby="category-faq-heading"><h2 id="category-faq-heading" class="shop-faq__title">${t.faqHeading}</h2>${copy.faq.map((item) => renderTemplate`<details class="shop-faq__item"><summary>${item.q}</summary><p>${item.a}</p></details>`)}</section>`}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Catalogue.astro", void 0);
export { $$Catalogue as t };
