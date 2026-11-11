import { E as Fragment, I as addAttribute, M as maybeRenderHead, S as templateExit, T as renderComponent, j as renderTemplate, x as templateEnter } from "./sequence_cwM7fFZp.mjs";
import { t as createAstro } from "./compiler_NuJ7F5L4.mjs";
import { d as createComponent, l as translations, n as $$PriceMode, t as $$Layout, u as renderScript } from "./Layout_CXBhHudn.mjs";
import { n as formatPrice } from "./chunk-5OYAWIY6_BMA99kb1.mjs";
import { a as itemListSchema, d as $$ProductGrid, g as displayPrice, i as faqPageSchema, m as contactBase, n as breadcrumbSchema, o as organizationSchema, r as collectionPageSchema, t as asGraph, u as websiteSchema } from "./jsonld_CPqpnRT5.mjs";
import { C as categoryName, M as tx, T as homePath, b as propertyContact, i as createImageCatalog, v as site, w as categoryPath, y as siteLinks } from "./siteKey_BtBkErhM.mjs";
import { i as listCategories, r as listAllProducts } from "./content-api_BnqvrEdm.mjs";
import { t as describe } from "./metaDescription_Kggj1bY_.mjs";
import { n as homeAlternate, t as categoryAlternate } from "./alternates_CKPq30Ga.mjs";
import { t as categoryCopy } from "./categoryCopy_BH6AtFnK.mjs";
// src/components/PriceCalculator.astro
createAstro("https://shop.tracht-digital.de");
var $$PriceCalculator = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PriceCalculator;
	const { lang, products } = Astro.props;
	const rows = products.flatMap((product) => {
		const own = product.offers.find((offer) => offer.kind === "own");
		const price = own ? displayPrice(own) : null;
		if (!own || !price) return [];
		const net = own.netCents ?? Math.round(price.cents / 1.19);
		return [{
			product,
			gross: price.cents,
			net,
			currency: price.currency
		}];
	});
	const groups = [...new Set(rows.map((row) => row.product.category))].map((category) => {
		const inGroup = rows.filter((row) => row.product.category === category);
		return {
			category,
			name: categoryName(category, inGroup[0].product.categoryLabel),
			rows: inGroup
		};
	});
	const ui = lang === "en" ? {
		open: "Price calculator",
		title: "Price calculator",
		intro: "Choose services. The total adds up their starting prices.",
		total: "From",
		netNote: "plus 19% VAT",
		grossNote: "incl. 19% VAT",
		hint: "The final price is in the written quote.",
		empty: "Please choose at least one service.",
		cta: "Request a quote",
		close: "Close the price calculator",
		draftHead: "Hello,\n\nplease send me a quote for:",
		draftTotal: "Total of the starting prices",
		draftTail: "About my business:\n\n\nKind regards"
	} : {
		open: "Preisrechner",
		title: "Preisrechner",
		intro: "Leistungen auswählen. Die Summe addiert ihre Ab-Preise.",
		total: "Ab",
		netNote: "zzgl. 19 % MwSt.",
		grossNote: "inkl. 19 % MwSt.",
		hint: "Der endgültige Preis steht im schriftlichen Angebot.",
		empty: "Bitte mindestens eine Leistung auswählen.",
		cta: "Angebot anfordern",
		close: "Preisrechner schließen",
		draftHead: "Guten Tag,\n\nbitte senden Sie mir ein Angebot für:",
		draftTotal: "Summe der Ab-Preise",
		draftTail: "Zu meinem Betrieb:\n\n\nViele Grüße"
	};
	const zero = rows[0]?.currency ? formatPrice(0, rows[0].currency, lang) : "0 €";
	return renderTemplate`${rows.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<button type="button" class="btn btn-ghost" data-calc-open hidden data-astro-cid-lyjpgqyc>${ui.open}</button><dialog class="shop-calc" data-calc${addAttribute(lang, "data-lang")}${addAttribute(rows[0].currency, "data-currency")}${addAttribute(contactBase(lang), "data-contact")}${addAttribute(ui.draftHead, "data-draft-head")}${addAttribute(ui.draftTotal, "data-draft-total")}${addAttribute(ui.draftTail, "data-draft-tail")}${addAttribute(ui.netNote, "data-net-note")}${addAttribute(ui.grossNote, "data-gross-note")} aria-labelledby="calc-title" data-astro-cid-lyjpgqyc><div class="shop-calc__head" data-astro-cid-lyjpgqyc><div data-astro-cid-lyjpgqyc><h2 class="shop-section-title" id="calc-title" data-astro-cid-lyjpgqyc>${ui.title}</h2><p class="shop-calc__intro" data-astro-cid-lyjpgqyc>${ui.intro}</p></div><button type="button" class="btn btn-ghost" data-calc-close${addAttribute(ui.close, "aria-label")} data-astro-cid-lyjpgqyc>×</button></div><div class="shop-calc__list" data-astro-cid-lyjpgqyc>${groups.map((group) => renderTemplate`<fieldset class="shop-calc__group" data-astro-cid-lyjpgqyc><legend class="tds-filterbar__legend" data-astro-cid-lyjpgqyc>${group.name}</legend>${group.rows.map((row) => renderTemplate`<label class="shop-calc__row" data-astro-cid-lyjpgqyc><input type="checkbox" data-calc-item${addAttribute(row.product.title, "data-title")}${addAttribute(row.gross, "data-gross")}${addAttribute(row.net, "data-net")} data-astro-cid-lyjpgqyc><span class="shop-calc__name" data-astro-cid-lyjpgqyc>${row.product.title}</span><span class="shop-calc__price" data-price-amount${addAttribute(formatPrice(row.gross, row.currency, lang), "data-price-gross")}${addAttribute(formatPrice(row.net, row.currency, lang), "data-price-net")} data-astro-cid-lyjpgqyc>${formatPrice(row.gross, row.currency, lang)}</span></label>`)}</fieldset>`)}</div><div class="shop-calc__foot" data-astro-cid-lyjpgqyc>${renderComponent($$result, "PriceMode", $$PriceMode, {
		"lang": lang,
		"data-astro-cid-lyjpgqyc": true
	})}<output class="shop-calc__total" aria-live="polite" data-astro-cid-lyjpgqyc><span data-astro-cid-lyjpgqyc>${ui.total} </span><strong data-calc-total data-astro-cid-lyjpgqyc>${zero}</strong><span class="shop-calc__note" data-calc-note data-astro-cid-lyjpgqyc>${ui.grossNote}</span></output><p class="shop-calc__intro" data-calc-hint${addAttribute(ui.empty, "data-empty")}${addAttribute(ui.hint, "data-hint")} data-astro-cid-lyjpgqyc>${ui.empty}</p><a class="btn btn-primary"${addAttribute(`${contactBase(lang)}#contact`, "href")} rel="nofollow" data-calc-cta aria-disabled="true" data-astro-cid-lyjpgqyc>${ui.cta}</a></div></dialog>` })}`}${renderScript($$result, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/PriceCalculator.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/PriceCalculator.astro", void 0);
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
			"de": "Laptop, Smartphone, Tablet und Arbeitsmittel als Überblick über digitale Leistungen für kleine Betriebe.",
			"en": "A laptop, smartphone, tablet and work items as an overview of digital services for small businesses."
		},
		"variants": [
			{
				"src": "/images/editorial/hero-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "3626e94ae807",
				"bytes": 25968
			},
			{
				"src": "/images/editorial/hero-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "ee19168e32f3",
				"bytes": 54274
			},
			{
				"src": "/images/editorial/hero-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "9b03a394f1f0",
				"bytes": 72226
			},
			{
				"src": "/images/editorial/hero-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "a8161627ee9b",
				"bytes": 128282
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/network-2026-1440.webp": {
		"src": "/images/editorial/network-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Flacher WLAN-Zugangspunkt an einer hellen Bürodecke.",
			"en": "A flat Wi-Fi access point on a pale office ceiling."
		},
		"variants": [
			{
				"src": "/images/editorial/network-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "851be01d88a1",
				"bytes": 10074
			},
			{
				"src": "/images/editorial/network-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "e164e35260de",
				"bytes": 20002
			},
			{
				"src": "/images/editorial/network-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "3bbfb5f649d0",
				"bytes": 27140
			},
			{
				"src": "/images/editorial/network-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "34cff3df27c0",
				"bytes": 53842
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/workplace-2026-1440.webp": {
		"src": "/images/editorial/workplace-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Schreibtisch mit Mikrofon, Kamera und Licht am Fenster.",
			"en": "A desk with microphone, camera and window light."
		},
		"variants": [
			{
				"src": "/images/editorial/workplace-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "e8222fa5a913",
				"bytes": 22606
			},
			{
				"src": "/images/editorial/workplace-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "d3eb243d995e",
				"bytes": 51258
			},
			{
				"src": "/images/editorial/workplace-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "a3d5833244b4",
				"bytes": 70900
			},
			{
				"src": "/images/editorial/workplace-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "eec641858bfb",
				"bytes": 143706
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/backup-2026-1440.webp": {
		"src": "/images/editorial/backup-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Drei Festplatten nebeneinander, eine davon in einer Schutzhülle.",
			"en": "Three drives side by side, one in a protective case."
		},
		"variants": [
			{
				"src": "/images/editorial/backup-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "c2e72dcf8a71",
				"bytes": 23620
			},
			{
				"src": "/images/editorial/backup-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "59ddc9a3e63a",
				"bytes": 50882
			},
			{
				"src": "/images/editorial/backup-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "532366140362",
				"bytes": 70594
			},
			{
				"src": "/images/editorial/backup-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "0b1627e3eb15",
				"bytes": 145534
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/mobile-2026-1440.webp": {
		"src": "/images/editorial/mobile-2026-1440.webp",
		"width": 1440,
		"height": 960,
		"alt": {
			"de": "Ausgeschalteter Laptop, Notizbuch und Ladegerät in einer Tasche.",
			"en": "A switched-off laptop, notebook and charger in a bag."
		},
		"variants": [
			{
				"src": "/images/editorial/mobile-2026-480.webp",
				"width": 480,
				"height": 320,
				"hash": "0122c2be097d",
				"bytes": 29312
			},
			{
				"src": "/images/editorial/mobile-2026-800.webp",
				"width": 800,
				"height": 533,
				"hash": "9b5b0e30196e",
				"bytes": 74154
			},
			{
				"src": "/images/editorial/mobile-2026-960.webp",
				"width": 960,
				"height": 640,
				"hash": "6f08c37dbfef",
				"bytes": 105624
			},
			{
				"src": "/images/editorial/mobile-2026-1440.webp",
				"width": 1440,
				"height": 960,
				"hash": "f62c1c0f7675",
				"bytes": 214244
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/web-2026-1440.webp": {
		"src": "/images/editorial/web-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Laptop, Tablet und Smartphone zeigen dieselbe Website in drei Größen.",
			"en": "A laptop, tablet and smartphone showing the same website in three sizes."
		},
		"variants": [
			{
				"src": "/images/editorial/web-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "c8db7c610bf3",
				"bytes": 16318
			},
			{
				"src": "/images/editorial/web-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "ed4e1be2f3a0",
				"bytes": 31208
			},
			{
				"src": "/images/editorial/web-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "0c28d78c1931",
				"bytes": 39446
			},
			{
				"src": "/images/editorial/web-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "9702effeb22f",
				"bytes": 67438
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/legal-2026-1440.webp": {
		"src": "/images/editorial/legal-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Laptop mit Cookie-Banner und Paragrafenzeichen neben einer Dokumentmappe.",
			"en": "A laptop with a cookie banner and a section sign beside a document folder."
		},
		"variants": [
			{
				"src": "/images/editorial/legal-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "b638ee9effd8",
				"bytes": 16478
			},
			{
				"src": "/images/editorial/legal-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "60aa8c0ba59c",
				"bytes": 30580
			},
			{
				"src": "/images/editorial/legal-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "8dd07e108de2",
				"bytes": 38950
			},
			{
				"src": "/images/editorial/legal-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "d042c6012ed9",
				"bytes": 70514
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/seo-2026-1440.webp": {
		"src": "/images/editorial/seo-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Laptop mit einer Suchergebnisseite, das oberste Ergebnis hervorgehoben.",
			"en": "A laptop with a search results page, the top result highlighted."
		},
		"variants": [
			{
				"src": "/images/editorial/seo-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "9397de26ecad",
				"bytes": 16740
			},
			{
				"src": "/images/editorial/seo-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "dbe2adf49047",
				"bytes": 34194
			},
			{
				"src": "/images/editorial/seo-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "fcbcdd66ddd7",
				"bytes": 42834
			},
			{
				"src": "/images/editorial/seo-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "7b74db94772a",
				"bytes": 74908
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/email-2026-1440.webp": {
		"src": "/images/editorial/email-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Laptop mit Posteingang und Smartphone mit @-Benachrichtigung neben einem Briefumschlag.",
			"en": "A laptop with an inbox and a smartphone with an @ notification beside an envelope."
		},
		"variants": [
			{
				"src": "/images/editorial/email-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "7dfa36df2234",
				"bytes": 18716
			},
			{
				"src": "/images/editorial/email-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "b04eade346db",
				"bytes": 38776
			},
			{
				"src": "/images/editorial/email-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "d7d16abcc606",
				"bytes": 50220
			},
			{
				"src": "/images/editorial/email-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "14530c9834d7",
				"bytes": 90158
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/maintenance-2026-1440.webp": {
		"src": "/images/editorial/maintenance-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Laptop mit Status-Übersicht und Schutzschild neben einem Werkzeugset.",
			"en": "A laptop with a status overview and a shield beside a tool set."
		},
		"variants": [
			{
				"src": "/images/editorial/maintenance-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "d3f9db50a2d6",
				"bytes": 18832
			},
			{
				"src": "/images/editorial/maintenance-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "1b699fb96c85",
				"bytes": 39032
			},
			{
				"src": "/images/editorial/maintenance-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "a32d3ac7e8df",
				"bytes": 50678
			},
			{
				"src": "/images/editorial/maintenance-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "fc31fe1ca897",
				"bytes": 93528
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/digital-2026-1440.webp": {
		"src": "/images/editorial/digital-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Scanner, Laptop mit Ordnerstruktur und leere Ablage.",
			"en": "A scanner, a laptop with a folder structure and an empty tray."
		},
		"variants": [
			{
				"src": "/images/editorial/digital-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "dfda8d00185d",
				"bytes": 12614
			},
			{
				"src": "/images/editorial/digital-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "a53cf367d9e8",
				"bytes": 25964
			},
			{
				"src": "/images/editorial/digital-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "0b022dc7519c",
				"bytes": 34070
			},
			{
				"src": "/images/editorial/digital-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "8525cd29c528",
				"bytes": 62902
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/training-2026-1440.webp": {
		"src": "/images/editorial/training-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Zwei Personen an einem Laptop, eine zeigt auf den Bildschirm.",
			"en": "Two people at a laptop, one pointing at the screen."
		},
		"variants": [
			{
				"src": "/images/editorial/training-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "6538d3a62164",
				"bytes": 18572
			},
			{
				"src": "/images/editorial/training-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "12683bc43f6d",
				"bytes": 36506
			},
			{
				"src": "/images/editorial/training-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "9994e7b7061b",
				"bytes": 46572
			},
			{
				"src": "/images/editorial/training-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "724c18e3b7ee",
				"bytes": 79780
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/packages-2026-1440.webp": {
		"src": "/images/editorial/packages-2026-1440.webp",
		"width": 1440,
		"height": 810,
		"alt": {
			"de": "Laptop mit Prüfbericht, Klemmbrett mit Checkliste und Lupe.",
			"en": "A laptop with a review report, a clipboard with a checklist and a magnifier."
		},
		"variants": [
			{
				"src": "/images/editorial/packages-2026-480.webp",
				"width": 480,
				"height": 270,
				"hash": "29b270e3135c",
				"bytes": 18138
			},
			{
				"src": "/images/editorial/packages-2026-800.webp",
				"width": 800,
				"height": 450,
				"hash": "f9157283f23e",
				"bytes": 33878
			},
			{
				"src": "/images/editorial/packages-2026-960.webp",
				"width": 960,
				"height": 540,
				"hash": "6861a584a68c",
				"bytes": 42886
			},
			{
				"src": "/images/editorial/packages-2026-1440.webp",
				"width": 1440,
				"height": 810,
				"hash": "848cb32dca85",
				"bytes": 70524
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/legal-band-2026-1440.webp": {
		"src": "/images/editorial/legal-band-2026-1440.webp",
		"width": 1440,
		"height": 360,
		"alt": {
			"de": "Dokumentmappen, Schloss, Laptop mit Paragrafenzeichen und Symbol für Barrierefreiheit auf einem Schreibtisch.",
			"en": "Document folders, a padlock, a laptop showing a section sign and an accessibility symbol on a desk."
		},
		"variants": [
			{
				"src": "/images/editorial/legal-band-2026-480.webp",
				"width": 480,
				"height": 120,
				"hash": "b674fa32c6d6",
				"bytes": 5106
			},
			{
				"src": "/images/editorial/legal-band-2026-960.webp",
				"width": 960,
				"height": 240,
				"hash": "88361100d18a",
				"bytes": 11766
			},
			{
				"src": "/images/editorial/legal-band-2026-1440.webp",
				"width": 1440,
				"height": 360,
				"hash": "26cc6dbcecd5",
				"bytes": 20598
			},
			{
				"src": "/images/editorial/legal-band-2026-1920.webp",
				"width": 1920,
				"height": 480,
				"hash": "6d127aab58c5",
				"bytes": 29528
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/maintenance-band-2026-1440.webp": {
		"src": "/images/editorial/maintenance-band-2026-1440.webp",
		"width": 1440,
		"height": 360,
		"alt": {
			"de": "Feinwerkzeug, Laptop mit Schutzschild und Statusleiste, Sicherungsfestplatte und Pflanze auf einem Schreibtisch.",
			"en": "Precision tools, a laptop with a shield and status row, a backup drive and a plant on a desk."
		},
		"variants": [
			{
				"src": "/images/editorial/maintenance-band-2026-480.webp",
				"width": 480,
				"height": 120,
				"hash": "63b83da4ad33",
				"bytes": 5718
			},
			{
				"src": "/images/editorial/maintenance-band-2026-960.webp",
				"width": 960,
				"height": 240,
				"hash": "9cd203f2f7e8",
				"bytes": 14610
			},
			{
				"src": "/images/editorial/maintenance-band-2026-1440.webp",
				"width": 1440,
				"height": 360,
				"hash": "e1bfff85781b",
				"bytes": 26724
			},
			{
				"src": "/images/editorial/maintenance-band-2026-1920.webp",
				"width": 1920,
				"height": 480,
				"hash": "aa6d5d09bd6b",
				"bytes": 41896
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/web-band-2026-1440.webp": {
		"src": "/images/editorial/web-band-2026-1440.webp",
		"width": 1440,
		"height": 360,
		"alt": {
			"de": "Smartphone, Tablet und Laptop zeigen dieselbe Website in passender Größe.",
			"en": "A smartphone, tablet and laptop showing the same website at each size."
		},
		"variants": [
			{
				"src": "/images/editorial/web-band-2026-480.webp",
				"width": 480,
				"height": 120,
				"hash": "48b3e79b9196",
				"bytes": 6070
			},
			{
				"src": "/images/editorial/web-band-2026-960.webp",
				"width": 960,
				"height": 240,
				"hash": "2dcc17c8e430",
				"bytes": 15202
			},
			{
				"src": "/images/editorial/web-band-2026-1440.webp",
				"width": 1440,
				"height": 360,
				"hash": "0483b5535335",
				"bytes": 27904
			},
			{
				"src": "/images/editorial/web-band-2026-1920.webp",
				"width": 1920,
				"height": 480,
				"hash": "27b9da318102",
				"bytes": 44998
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/digital-band-2026-1440.webp": {
		"src": "/images/editorial/digital-band-2026-1440.webp",
		"width": 1440,
		"height": 360,
		"alt": {
			"de": "Dokumentenscanner, Laptop mit Ordnerstruktur, leere Ablage und Ordner auf einem Schreibtisch.",
			"en": "A document scanner, a laptop with a folder tree, an empty tray and binders on a desk."
		},
		"variants": [
			{
				"src": "/images/editorial/digital-band-2026-480.webp",
				"width": 480,
				"height": 120,
				"hash": "f3132f483111",
				"bytes": 4772
			},
			{
				"src": "/images/editorial/digital-band-2026-960.webp",
				"width": 960,
				"height": 240,
				"hash": "7a86556013ec",
				"bytes": 13302
			},
			{
				"src": "/images/editorial/digital-band-2026-1440.webp",
				"width": 1440,
				"height": 360,
				"hash": "2228902617da",
				"bytes": 26238
			},
			{
				"src": "/images/editorial/digital-band-2026-1920.webp",
				"width": 1920,
				"height": 480,
				"hash": "08dbc9a1b229",
				"bytes": 40174
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/seo-band-2026-1440.webp": {
		"src": "/images/editorial/seo-band-2026-1440.webp",
		"width": 1440,
		"height": 360,
		"alt": {
			"de": "Lupe, Laptop mit Suchergebnis und Sternen, Smartphone mit Kartenpin und Lavendel auf einem Schreibtisch.",
			"en": "A magnifying glass, a laptop with a starred search result, a phone with a map pin and lavender on a desk."
		},
		"variants": [
			{
				"src": "/images/editorial/seo-band-2026-480.webp",
				"width": 480,
				"height": 120,
				"hash": "d8a8813b061e",
				"bytes": 5896
			},
			{
				"src": "/images/editorial/seo-band-2026-960.webp",
				"width": 960,
				"height": 240,
				"hash": "af5d08fbfc88",
				"bytes": 16498
			},
			{
				"src": "/images/editorial/seo-band-2026-1440.webp",
				"width": 1440,
				"height": 360,
				"hash": "92c4489aa6f1",
				"bytes": 30166
			},
			{
				"src": "/images/editorial/seo-band-2026-1920.webp",
				"width": 1920,
				"height": 480,
				"hash": "15233fc230d1",
				"bytes": 42838
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/email-band-2026-1440.webp": {
		"src": "/images/editorial/email-band-2026-1440.webp",
		"width": 1440,
		"height": 360,
		"alt": {
			"de": "Briefumschläge, Laptop mit Posteingang und @-Zeichen, Smartphone und kleiner Briefkasten auf einem Schreibtisch.",
			"en": "Envelopes, a laptop with an inbox and @ sign, a phone and a small postbox on a desk."
		},
		"variants": [
			{
				"src": "/images/editorial/email-band-2026-480.webp",
				"width": 480,
				"height": 120,
				"hash": "7d01910f330d",
				"bytes": 5048
			},
			{
				"src": "/images/editorial/email-band-2026-960.webp",
				"width": 960,
				"height": 240,
				"hash": "6d4834bccfd8",
				"bytes": 11882
			},
			{
				"src": "/images/editorial/email-band-2026-1440.webp",
				"width": 1440,
				"height": 360,
				"hash": "28c7f346ac3b",
				"bytes": 20714
			},
			{
				"src": "/images/editorial/email-band-2026-1920.webp",
				"width": 1920,
				"height": 480,
				"hash": "e899dca33255",
				"bytes": 30192
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/training-band-2026-1440.webp": {
		"src": "/images/editorial/training-band-2026-1440.webp",
		"width": 1440,
		"height": 360,
		"alt": {
			"de": "Notizbuch, Laptop mit Website-Editor unter einer Hand, Tasse und Unterlagen auf einem Schreibtisch.",
			"en": "A notebook, a laptop with a website editor under one hand, a cup and handouts on a desk."
		},
		"variants": [
			{
				"src": "/images/editorial/training-band-2026-480.webp",
				"width": 480,
				"height": 120,
				"hash": "46c9952ffc53",
				"bytes": 4584
			},
			{
				"src": "/images/editorial/training-band-2026-960.webp",
				"width": 960,
				"height": 240,
				"hash": "d714da9057d5",
				"bytes": 11274
			},
			{
				"src": "/images/editorial/training-band-2026-1440.webp",
				"width": 1440,
				"height": 360,
				"hash": "7fa4aab98bfa",
				"bytes": 20950
			},
			{
				"src": "/images/editorial/training-band-2026-1920.webp",
				"width": 1920,
				"height": 480,
				"hash": "696a8e6ef860",
				"bytes": 31786
			}
		],
		"digitalSourceType": "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
	},
	"/images/editorial/packages-band-2026-1440.webp": {
		"src": "/images/editorial/packages-band-2026-1440.webp",
		"width": 1440,
		"height": 360,
		"alt": {
			"de": "Klemmbrett mit Checkliste, Laptop mit Prüfbericht, Lupe und Ablagebox auf einem Schreibtisch.",
			"en": "A clipboard with a checklist, a laptop with a check report, a magnifying glass and a box file on a desk."
		},
		"variants": [
			{
				"src": "/images/editorial/packages-band-2026-480.webp",
				"width": 480,
				"height": 120,
				"hash": "7c0fed8940e9",
				"bytes": 4654
			},
			{
				"src": "/images/editorial/packages-band-2026-960.webp",
				"width": 960,
				"height": 240,
				"hash": "1063ac2c2cd9",
				"bytes": 11622
			},
			{
				"src": "/images/editorial/packages-band-2026-1440.webp",
				"width": 1440,
				"height": 360,
				"hash": "d4ffe67386e6",
				"bytes": 20868
			},
			{
				"src": "/images/editorial/packages-band-2026-1920.webp",
				"width": 1920,
				"height": 480,
				"hash": "f9efa82ea2ea",
				"bytes": 31100
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
	"seo-sichtbarkeit": "seo",
	"e-mail-domain": "email",
	"wartung-betrieb": "maintenance",
	"recht-datenschutz": "legal",
	digitalisierung: "digital",
	schulung: "training",
	leistungspakete: "packages",
	ausstattung: "workplace",
	datensicherung: "backup",
	"mobiles-arbeiten": "mobile"
};
var soonArtwork = [
	"web",
	"seo",
	"email",
	"maintenance",
	"legal",
	"digital",
	"training",
	"packages"
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
/** Wide 4:1 banners over the front-page shelves; a 16:9 scene cropped to that strip loses its subject. */
/** Categories that have a banner; any other shelf shows no picture rather than a cropped scene. */
var bandIds = [
	"web",
	"seo",
	"email",
	"maintenance",
	"legal",
	"digital",
	"training",
	"packages"
];
function shelfBanner(category) {
	const id = categoryArtwork(category);
	return id !== null && bandIds.includes(id) ? id : null;
}
var bandSrc = (id, width = 1440) => `/images/editorial/${id}-band-2026-${width}.webp`;
var bandSrcset = (id) => [
	480,
	960,
	1440,
	1920
].map((w) => `${bandSrc(id, w)} ${w}w`).join(", ");
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
	const hero = category === null && products.length > 1;
	const tileCount = categories.length >= 4 ? 4 : categories.length >= 2 ? 2 : categories.length;
	const heroTiles = categories.slice(0, tileCount).map((c, index) => ({
		category: c.category,
		name: categoryName(c.category, c.label),
		total: c.total,
		art: categoryArtwork(c.category) ?? soonArtwork[index % soonArtwork.length]
	}));
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="shop-intro tds-wash" aria-labelledby="catalogue-heading"><div class="shop-intro__main">${category === null ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<p class="shop-intro__eyebrow">${t.hero.eyebrow}</p><h1 class="shop-title shop-intro__title" id="catalogue-heading">${t.hero.titleLead} <span class="shop-intro__accent">${t.hero.titleAccent}</span></h1>` })}` : renderTemplate`<h1 class="shop-title shop-intro__title" id="catalogue-heading">${headline}</h1>`}<span class="tds-brandbar tds-brandbar--sm shop-intro__bar" aria-hidden="true"></span><p class="shop-lede">${site.description[lang]}</p>${hero ? renderTemplate`<form class="shop-hero__search" role="search" action="#katalog" data-hero-search><label class="sr-only" for="hero-search">${t.filter.search}</label><input id="hero-search" class="field-boxed shop-hero__input" type="search" name="q" autocomplete="off"${addAttribute(t.hero.searchPlaceholder, "placeholder")}><button type="submit" class="btn btn-primary shop-hero__submit">${t.hero.searchSubmit}</button></form>` : null}${category === null ? renderTemplate`<ul class="shop-hero__trust">${t.glance.points.map((point) => renderTemplate`<li>${point}</li>`)}</ul>` : null}${copy && renderTemplate`<p class="shop-answer">${copy.answer}</p>`}${categories.length > 0 && !hero ? renderTemplate`<nav class="shop-catnav"${addAttribute(t.categories, "aria-label")}><a class="shop-chip"${addAttribute(homePath(lang), "href")}${addAttribute(category === null ? "page" : void 0, "aria-current")}${addAttribute(category === null ? "all" : void 0, "data-filter-category")}>${t.allCategories} <span class="shop-chip__count">${total}</span></a>${categories.map(({ category: name, label, total: count }) => renderTemplate`<a class="shop-chip"${addAttribute(categoryPath(name, lang), "href")}${addAttribute(name === category ? "page" : void 0, "aria-current")}${addAttribute(category === null ? name : void 0, "data-filter-category")}${addAttribute(name, "data-category")}>${categoryName(name, label)} <span class="shop-chip__count">${count}</span></a>`)}</nav>` : null}${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</div>${hero ? renderTemplate`<nav class="shop-hero__cats" aria-labelledby="hero-cats-heading"><h2 class="sr-only" id="hero-cats-heading">${t.categories}</h2><ul class="shop-hero__grid">${heroTiles.map((tile) => renderTemplate`<li><a class="shop-hero__cat"${addAttribute(categoryPath(tile.category, lang), "href")}${addAttribute(tile.category, "data-filter-category")}${addAttribute(tile.category, "data-category")}><img class="shop-hero__img"${addAttribute(editorialSrc(tile.art), "src")}${addAttribute(imageHints(editorialSrc(tile.art), lang)?.srcSet ?? editorialSrcset(tile.art), "srcset")} sizes="(min-width: 64rem) 240px, 50vw" width="1440" height="810" alt="" decoding="async"><span class="shop-hero__name">${tile.name}</span><span class="shop-hero__count">${t.filter.shown(tile.total)}</span></a></li>`)}</ul><a class="shop-hero__all link-underline" href="#katalog" data-filter-category="all">${t.hero.allProducts(total)} <span aria-hidden="true">↓</span></a></nav>` : category === null ? null : artwork ? renderTemplate`<aside class="shop-glance"${addAttribute(category, "data-category")} aria-hidden="true"><img class="shop-editorial"${addAttribute(editorialSrc(artwork), "src")}${addAttribute(imageHints(editorialSrc(artwork), lang)?.srcSet ?? editorialSrcset(artwork), "srcset")} sizes="(min-width: 64rem) 384px, 100vw" width="1440" height="810" alt="" decoding="async"></aside>` : null}</section>${products.length > 1 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="tds-filterbar shop-filterrow" id="katalog"><p class="shop-filterrow__count" data-filter-count${addAttribute(products.length, "data-total")}>${t.filter.shown(products.length)}</p><div class="shop-filterrow__tools">${renderComponent($$result, "PriceCalculator", $$PriceCalculator, {
		"lang": lang,
		"products": products
	})}</div>${renderComponent($$result, "ShopFilterToggle", $$ShopFilterToggle, { "lang": lang })}${renderComponent($$result, "ShopFilterBar", $$ShopFilterBar, {
		"lang": lang,
		"categories": filterCategories,
		"tags": filterTags
	})}</div><p class="sr-only" role="status" data-filter-status></p><p class="shop-filter-empty" data-filter-empty></p>` })}` : null}${comingSoon ? renderTemplate`<div class="shop-soon"><section class="shop-soon__areas" aria-labelledby="soon-areas"><h2 class="shop-section-title" id="soon-areas">${t.soon.areasTitle}</h2><p class="shop-soon__note">${t.empty.title}</p><ul class="shop-soon__grid">${t.soon.areas.map((area, index) => renderTemplate`<li class="shop-soon__tile"><img class="shop-editorial"${addAttribute(editorialSrc(soonArtwork[index]), "src")}${addAttribute(imageHints(editorialSrc(soonArtwork[index]), lang)?.srcSet ?? editorialSrcset(soonArtwork[index]), "srcset")} sizes="(min-width: 64rem) 25vw, 50vw" width="1440" height="810" alt="" loading="lazy" decoding="async"><h3 class="shop-soon__name">${area.name}</h3><p class="shop-soon__text">${area.text}</p></li>`)}</ul></section><section class="shop-soon__cta tds-wash" aria-labelledby="soon-cta"><div><h2 class="shop-soon__cta-title" id="soon-cta">${t.soon.ctaTitle}</h2><p class="shop-soon__cta-body">${t.soon.ctaBody}</p></div><a class="btn btn-primary"${addAttribute(contact, "href")}>${translations[lang].nav.cta}</a></section><section aria-labelledby="soon-onward"><h2 class="shop-section-title" id="soon-onward">${t.soon.onwardTitle}</h2><div class="shop-soon__onward"><a class="shop-soon__link"${addAttribute(links.blog, "href")}><span class="shop-soon__name">${t.soon.journal.name}</span><span class="shop-soon__text">${t.soon.journal.text}</span></a><a class="shop-soon__link"${addAttribute(links.tools, "href")}><span class="shop-soon__name">${t.soon.tools.name}</span><span class="shop-soon__text">${t.soon.tools.text}</span></a></div></section></div>` : grouped ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="shop-filter-results" data-filter-results></div><template data-filter-all>${templateEnter($$result)}${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"lang": lang,
		"filterable": true
	})}${templateExit($$result)}</template>${shelves.map((shelf) => renderTemplate`<section class="shop-shelf" data-filter-shelf${addAttribute(shelf.category, "data-category")}${addAttribute(`shelf-${shelf.category}`, "aria-labelledby")}>${shelfBanner(shelf.category) && renderTemplate`<img class="shop-editorial shop-editorial--shelf"${addAttribute(bandSrc(shelfBanner(shelf.category)), "src")}${addAttribute(imageHints(bandSrc(shelfBanner(shelf.category)), lang)?.srcSet ?? bandSrcset(shelfBanner(shelf.category)), "srcset")} sizes="(min-width: 90rem) 86rem, 100vw" width="1440" height="360" alt="" loading="lazy" decoding="async">`}<div class="shop-shelf__head"><h2 class="shop-section-title shop-shelf__title"${addAttribute(`shelf-${shelf.category}`, "id")}><a${addAttribute(categoryPath(shelf.category, lang), "href")}>${shelf.name}</a></h2>${shelf.total > shelf.items.length ? renderTemplate`<a class="shop-shelf__more link-underline"${addAttribute(categoryPath(shelf.category, lang), "href")}>${t.showAll(shelf.total)}</a>` : null}</div>${shelf.intro ? renderTemplate`<p class="shop-shelf__intro">${shelf.intro}</p>` : null}${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": shelf.items,
		"lang": lang
	})}</section>`)}` })}` : renderTemplate`${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": products,
		"lang": lang,
		"filterable": true
	})}`}${copy && renderTemplate`<section class="shop-faq" aria-labelledby="category-faq-heading"><h2 id="category-faq-heading" class="shop-faq__title">${t.faqHeading}</h2>${copy.faq.map((item) => renderTemplate`<details class="shop-faq__item"><summary>${item.q}</summary><p>${item.a}</p></details>`)}</section>`}` })}${renderScript($$result, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Catalogue.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Catalogue.astro", void 0);
export { $$Catalogue as t };
