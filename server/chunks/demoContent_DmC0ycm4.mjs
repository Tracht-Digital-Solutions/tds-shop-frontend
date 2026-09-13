import { s as productPath } from "./i18n_CAi8x9tF.mjs";
//#region src/lib/seo.ts
/**
* Site identity and the two text budgets.
*
* A fourth hand-written copy of this file now exists across the properties
* (landingpage, journal, tools, shop). Extracting it into `tds-shared` is the
* right move and is deliberately NOT done here: it would mean a shared minor,
* a repin round across seven repositories, and a new site going live in the
* same window. Two risks in one change. It belongs in its own pass, once this
* site has run for a while — and by then there will be two live
* implementations to extract FROM rather than one to guess at.
*/
var site = {
	name: "TDShop",
	url: "https://shop.tracht-digital.de",
	/** The canonical identity lives on the marketing site; we reference it by @id. */
	organizationId: "https://tracht-digital.de/#organization",
	personId: "https://tracht-digital.de/#person",
	description: {
		de: "Kuratierte Technik für Digitalisierung im Betrieb: Hardware, Netzwerk und Software mit eigener Einschätzung statt Herstellertext.",
		en: "Curated technology for digitalising a business: hardware, networking and software with our own assessment rather than vendor copy."
	}
};
var TITLE_BUDGET = 60;
/**
* Compose a page title within the budget a search result actually shows.
*
* When the combined form is too long the BRAND is dropped, never the subject —
* a truncated title that keeps "— TDShop" and loses the product name is a
* result nobody can identify.
*/
function pageTitle(subject, lang = "de") {
	const trimmed = subject.trim();
	if (trimmed === "") return site.name;
	const combined = `${trimmed} — ${site.name}`;
	if (combined.length <= TITLE_BUDGET) return combined;
	return trimmed;
}
/**
* The sibling TDS properties this site links to, in the reader's language.
*
* One function rather than URLs inline in the header, footer and empty state:
* the journal links here from its own `nav.ts` (`SHOP_URL`), and a property
* that is only ever linked TO is a dead end for a reader and an orphan for a
* crawler. Absolute on purpose — these are separate hosts, and a site-relative
* path would resolve against this one and 404. Every sibling serves its English
* edition under `/en/`.
*/
function siteLinks(lang) {
	const suffix = lang === "en" ? "/en/" : "/";
	return {
		main: `https://tracht-digital.de${suffix}`,
		blog: `https://blog.tracht-digital.de${suffix}`,
		tools: `https://tools.tracht-digital.de${suffix}`
	};
}
/** The absolute canonical for a path. */
function canonical(pathname) {
	return new URL(pathname, site.url).toString();
}
//#endregion
//#region src/lib/demoContent.ts
var DEMO_MODE = Object.assign({
	"ASSETS_PREFIX": void 0,
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"PUBLIC_DEMO_MODE": "false",
	"SITE": "https://shop.tracht-digital.de",
	"SSR": true
}, { _: "/opt/hostedtoolcache/node/22.23.2/x64/bin/npm" }).PUBLIC_DEMO_MODE === "true";
var DEMO = {
	de: [{
		slug: "beispiel-netzwerkspeicher",
		title: "Netzwerkspeicher fürs Büro",
		teaser: "Beispieleintrag. Der Katalog ist gerade nicht erreichbar — sobald die Verbindung wieder steht, stehen hier die echten Produkte.",
		category: "netzwerk"
	}, {
		slug: "beispiel-dokumentenscanner",
		title: "Dokumentenscanner für den Papierberg",
		teaser: "Beispieleintrag. Der Katalog ist gerade nicht erreichbar — sobald die Verbindung wieder steht, stehen hier die echten Produkte.",
		category: "peripherie"
	}],
	en: [{
		slug: "example-network-storage",
		title: "Network storage for the office",
		teaser: "Placeholder entry. The catalogue is currently unreachable — the real products appear here as soon as the connection is back.",
		category: "netzwerk"
	}, {
		slug: "example-document-scanner",
		title: "Document scanner for the paper pile",
		teaser: "Placeholder entry. The catalogue is currently unreachable — the real products appear here as soon as the connection is back.",
		category: "peripherie"
	}]
};
function toRef(entry, lang) {
	return {
		slug: entry.slug,
		lang,
		title: entry.title,
		teaser: entry.teaser,
		category: entry.category,
		imageUrl: null,
		url: `${site.url}${productPath(entry.slug, lang)}`,
		offers: []
	};
}
function demoProducts(lang, category) {
	const all = DEMO[lang].map((entry) => toRef(entry, lang));
	return category ? all.filter((p) => p.category === category) : all;
}
function demoProduct(slug, lang) {
	const entry = DEMO[lang].find((p) => p.slug === slug);
	if (!entry) return null;
	return {
		...toRef(entry, lang),
		body: "",
		bodyFormat: "blocks",
		tags: [],
		metaDescription: null,
		publishedAt: null,
		updatedAt: null,
		machineTranslated: false,
		editorialStatus: "none"
	};
}
function demoCategories(lang) {
	const counts = /* @__PURE__ */ new Map();
	for (const product of demoProducts(lang)) counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
	return [...counts].map(([category, total]) => ({
		category,
		total
	}));
}
//#endregion
export { canonical as a, siteLinks as c, demoProducts as i, demoCategories as n, pageTitle as o, demoProduct as r, site as s, DEMO_MODE as t };
