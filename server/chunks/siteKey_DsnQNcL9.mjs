import { i as connection } from "./connection_DUQTvDW1.mjs";
//#region src/lib/i18n.ts
/**
* Languages, route segments and UI strings.
*
* German is the root tree, English lives under `/en/`. The two are **not** a
* prefix mirror: the taxonomy segments differ per language, exactly as they do
* on the journal (`kategorie` ↔ `category`). Deriving an alternate by pasting
* `/en/` in front of a German path therefore produces a 404 for every listing
* page, which is why `alternates.ts` looks the counterpart up instead.
*
* The one thing that IS shared is a product's identity, and even there the
* slugs may differ — the API pairs translations on the product id, not on the
* slug. That is a deliberate improvement over the journal's 1:1 rule; do not
* "fix" it back.
*/
var LANGS = ["de", "en"];
function isLang(value) {
	return typeof value === "string" && LANGS.includes(value);
}
/** Path segments, per language. Each module that builds URLs keeps its own copy. */
var SEGMENTS = {
	de: {
		product: "produkt",
		category: "kategorie",
		legal: "rechtliches"
	},
	en: {
		product: "product",
		category: "category",
		legal: "legal"
	}
};
/** The tree a path belongs to. `/en` itself counts — a bare `startsWith("/en/")` missed it. */
var langOfPath = (pathname) => pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
/** The prefix a language's tree hangs under. German is the root. */
var prefix = (lang) => lang === "en" ? "/en" : "";
var productPath = (slug, lang) => `${prefix(lang)}/${SEGMENTS[lang].product}/${slug}`;
var categoryPath = (category, lang) => `${prefix(lang)}/${SEGMENTS[lang].category}/${category}`;
var legalPath = (slug, lang) => `${prefix(lang)}/${SEGMENTS[lang].legal}/${slug}`;
var homePath = (lang) => `${prefix(lang)}/`;
/**
* A category slug as a reader sees it: "netzwerk" → "Netzwerk".
*
* The API serves slugs, and a lower-case German noun in a heading or a chip
* reads as a typo. First letter only — "smart-home" becomes "Smart home", not
* a guessed title case.
*/
var categoryLabel = (slug) => {
	const words = slug.replace(/-/g, " ").trim();
	return words.charAt(0).toUpperCase() + words.slice(1);
};
/**
* The name a reader sees for a category: the API's resolved name when it sent
* one, the capitalised slug otherwise.
*
* The API resolves the language itself (name in `lang`, then German, then the
* slug — `CategoryName` in tds-ext-shop), so this never picks a language; it
* only covers an older API build that serves no name. The slug fallback above
* must stay identical to `CategoryName::fromSlug()` so the two cannot disagree.
*/
var categoryName = (slug, label) => label?.trim() || categoryLabel(slug);
/** Shorthand for a product row or page, which carry both fields. */
var productCategoryName = (product) => categoryName(product.category, product.categoryLabel);
var TX = {
	de: {
		brand: "TDShop",
		tagline: "Technik und Digitalisierung, kuratiert.",
		nav: {
			catalogue: "Katalog",
			label: "Hauptnavigation",
			menu: "Menü",
			/** The marketing site, by name — "Startseite" beside "Katalog" is ambiguous. */
			main: "Tracht Digital"
		},
		theme: {
			toDark: "Zum dunklen Farbschema wechseln",
			toLight: "Zum hellen Farbschema wechseln"
		},
		catalogue: "Produkte",
		faqHeading: "Häufige Fragen",
		/** The catalogue's H1. The <title> stays "Produkte" — short, and the brand follows it. */
		catalogueHeadline: "Technik für den Betrieb, von uns eingeschätzt",
		allCategories: "Alle",
		categories: "Kategorien",
		empty: {
			title: "Der Katalog wird gerade bestückt.",
			body: "Bis dahin stehen unsere Einschätzungen zu Technik im Betrieb im Journal, und die Tools-Seite hat Werkzeuge, die Sie direkt im Browser nutzen können.",
			journal: "Einschätzungen im Journal lesen",
			tools: "Werkzeuge ausprobieren"
		},
		breadcrumb: "Pfadnavigation",
		offers: "Angebote",
		relatedCategory: "Mehr aus dieser Kategorie",
		ourAssessment: "Unsere Einschätzung",
		affiliateNotice: "Einige Links auf dieser Seite sind Partnerlinks. Kaufen Sie darüber, erhalten wir eine Provision — am Preis ändert sich für Sie nichts.",
		backToCatalogue: "Zurück zum Katalog",
		toCatalogue: "Zum Katalog",
		toJournal: "Zum Journal",
		notFound: "Diese Adresse gibt es hier nicht.",
		notFoundBody: "Der Link ist veraltet oder vertippt. Im Katalog steht, was es gerade gibt.",
		footer: {
			blurb: "Kuratierte Technik für den Betrieb, jedes Produkt mit eigener Einschätzung von Tracht Digital Solutions.",
			shop: "Shop",
			company: "Tracht Digital",
			legal: "Rechtliches"
		},
		checkout: { heading: "Bestellung abschließen" },
		errors: {
			offline: "Keine Verbindung. Bitte später erneut versuchen.",
			status: (code) => `Fehler ${code}. Bitte später erneut versuchen.`,
			unknown: "Unbekannter Fehler. Bitte später erneut versuchen."
		},
		cart: {
			title: "Warenkorb",
			empty: "Ihr Warenkorb ist leer.",
			emptyBody: "Legen Sie ein Produkt hinein, dann erscheint es hier.",
			add: "In den Warenkorb",
			justAdded: "Hinzugefügt",
			added: "Im Warenkorb",
			remove: "Entfernen",
			quantity: "Menge",
			badge: (n) => n === 1 ? "1 Artikel im Warenkorb" : `${n} Artikel im Warenkorb`,
			subtotal: "Zwischensumme",
			total: "Gesamt",
			shipping: "Versand",
			shippingFree: "kostenlos",
			shippingFrom: (amount) => `Versandkostenfrei ab ${amount}`,
			digitalOnly: "Keine Lieferung nötig — sofortige Erbringung nach Zahlung.",
			toCheckout: "Zur Kasse",
			keepShopping: "Weiter einkaufen",
			loading: "Wird berechnet …",
			gone: "Mindestens ein Artikel ist nicht mehr verfügbar. Bitte entfernen Sie ihn.",
			failed: "Die Preise konnten gerade nicht berechnet werden. Bitte versuchen Sie es gleich noch einmal.",
			updated: (title, n) => `${title}: Menge ${n}`,
			removed: (title) => `${title} entfernt`
		}
	},
	en: {
		brand: "TDShop",
		tagline: "Technology and digitalisation, curated.",
		nav: {
			catalogue: "Catalogue",
			label: "Main navigation",
			menu: "Menu",
			main: "Tracht Digital"
		},
		theme: {
			toDark: "Switch to dark mode",
			toLight: "Switch to light mode"
		},
		catalogue: "Products",
		faqHeading: "Common questions",
		catalogueHeadline: "Business technology, assessed by us",
		allCategories: "All",
		categories: "Categories",
		empty: {
			title: "The catalogue is being stocked.",
			body: "Meanwhile, our assessments of business technology are in the journal, and the tools site has utilities you can use right in your browser.",
			journal: "Read assessments in the journal",
			tools: "Try the tools"
		},
		breadcrumb: "Breadcrumb",
		offers: "Offers",
		relatedCategory: "More in this category",
		ourAssessment: "Our assessment",
		affiliateNotice: "Some links on this page are affiliate links. If you buy through them we earn a commission — the price is the same for you.",
		backToCatalogue: "Back to the catalogue",
		toCatalogue: "To the catalogue",
		toJournal: "To the journal",
		notFound: "This address does not exist here.",
		notFoundBody: "The link is outdated or mistyped. The catalogue shows what is currently available.",
		footer: {
			blurb: "Curated technology for the business, every product with its own assessment by Tracht Digital Solutions.",
			shop: "Shop",
			company: "Tracht Digital",
			legal: "Legal"
		},
		checkout: { heading: "Complete your order" },
		errors: {
			offline: "No connection. Please try again later.",
			status: (code) => `Error ${code}. Please try again later.`,
			unknown: "Unknown error. Please try again later."
		},
		cart: {
			title: "Basket",
			empty: "Your basket is empty.",
			emptyBody: "Put a product in and it will show up here.",
			add: "Add to basket",
			justAdded: "Added",
			added: "In your basket",
			remove: "Remove",
			quantity: "Quantity",
			badge: (n) => n === 1 ? "1 item in your basket" : `${n} items in your basket`,
			subtotal: "Subtotal",
			total: "Total",
			shipping: "Delivery",
			shippingFree: "free",
			shippingFrom: (amount) => `Free delivery from ${amount}`,
			digitalOnly: "Nothing to deliver — performed immediately after payment.",
			toCheckout: "Checkout",
			keepShopping: "Keep shopping",
			loading: "Calculating …",
			gone: "At least one item is no longer available. Please remove it.",
			failed: "Prices could not be calculated just now. Please try again in a moment.",
			updated: (title, n) => `${title}: quantity ${n}`,
			removed: (title) => `${title} removed`
		}
	}
};
var tx = (lang) => TX[lang];
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/nav/index.js
var PROPERTY_ORIGINS = {
	journal: "https://blog.tracht-digital.de",
	tools: "https://tools.tracht-digital.de",
	shop: "https://shop.tracht-digital.de",
	main: "https://tracht-digital.de"
};
var LABELS = {
	journal: "Journal",
	tools: "Tools",
	shop: "Shop",
	main: "Tracht Digital"
};
var ORDER = [
	"journal",
	"tools",
	"shop",
	"main"
];
function propertyHome(key, lang) {
	return `${PROPERTY_ORIGINS[key]}${lang === "en" ? "/en/" : "/"}`;
}
function propertyContact(lang) {
	return `${propertyHome("main", lang)}#contact`;
}
function propertyNav(current, lang, homeHref) {
	return ORDER.map((key) => ({
		key,
		label: LABELS[key],
		href: key === current ? homeHref : propertyHome(key, lang),
		current: key === current
	}));
}
[
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
//#endregion
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
	/**
	* The marketing origin, and the few values the front page needs in order to
	* describe the organisation rather than only point at it.
	*
	* Until 2026-10-02 `organizationRef()` was the ONLY organisation markup on
	* this site, so every page named a publisher with no name and no logo. A
	* shared `@id` is the right design — one business, four properties — but it
	* only resolves for a consumer that also fetches the marketing site, and an
	* answer engine reading one product page does not.
	*
	* Deliberately NOT copied here: street address, VAT ID, phone, geo. Those
	* belong where the Impressum is, and this shop's Impressum is a link to the
	* marketing site. A fifth copy of the NAP is exactly the drift this file's
	* header refuses.
	*/
	mainUrl: "https://tracht-digital.de",
	legalName: "Julian Tracht",
	logo: {
		url: "https://tracht-digital.de/images/logo.webp",
		width: 713,
		height: 483
	},
	socials: ["https://www.linkedin.com/in/julian-tracht/", "https://github.com/Tracht-Digital-Solutions"],
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
function pageTitle(subject) {
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
* crawler. The origins come from tds-shared's `PROPERTY_ORIGINS`, the list
* every public header reads, so a moved host is changed once.
*/
function siteLinks(lang) {
	return {
		main: propertyHome("main", lang),
		blog: propertyHome("journal", lang),
		tools: propertyHome("tools", lang)
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
}, { _: "/opt/hostedtoolcache/node/22.23.3/x64/bin/npm" }).PUBLIC_DEMO_MODE === "true";
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
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/site/index.js
var SiteKeyRejectedError = class extends Error {
	status;
	constructor(status, url, label = "tds-site", reconnectHint = "") {
		super(`[${label}] Der gekoppelte API-Zugang wurde abgelehnt (HTTP ${status}) von ${url}.` + (reconnectHint ? ` ${reconnectHint}` : ""));
		this.name = "SiteKeyRejectedError";
		this.status = status;
	}
};
var COUNTER = "__tdsSiteKeyRejectionCount__";
function siteKeyRejectionCount() {
	return globalThis[COUNTER] ?? 0;
}
function countRejection() {
	const store = globalThis;
	store[COUNTER] = (store[COUNTER] ?? 0) + 1;
}
function createSiteKeyGuard(source, options) {
	return {
		currentSiteKey: () => source.siteKey(),
		siteKeyHeaders: () => source.siteKeyHeaders(),
		assertKeyAccepted(res, url) {
			if (source.siteKey() === "") return;
			if (res.status !== 401 && res.status !== 403) return;
			countRejection();
			throw new SiteKeyRejectedError(res.status, String(url), options.label, options.reconnectHint);
		}
	};
}
async function guardSiteKey(next) {
	const before = siteKeyRejectionCount();
	const response = await next();
	if (siteKeyRejectionCount() === before) return response;
	const guarded = new Response(response.body, response);
	guarded.headers.set("cache-control", "no-store");
	return guarded;
}
var ContentHttpError = class extends Error {
	status;
	constructor(status, url) {
		super(`HTTP ${status} from ${String(url)}`);
		this.name = "ContentHttpError";
		this.status = status;
	}
};
function createContentReader(guard) {
	return async function readContentJson(url, timeoutMs = 1e4) {
		const res = await fetch(url, {
			headers: guard.siteKeyHeaders(),
			signal: AbortSignal.timeout(timeoutMs)
		});
		guard.assertKeyAccepted(res, url);
		if (!res.ok) throw new ContentHttpError(res.status, url);
		return await res.json();
	};
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function serializeJsonLd(data) {
	return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
//#endregion
//#region src/lib/siteKey.ts
/**
* Request-time protection for paired API reads — tds-shared's guard, bound to
* this site's connection.
*
* The private key is loaded dynamically from the server-side connection file.
* `connection.ts` retains `TDS_SITE_KEY` only as a one-release host fallback;
* builds and GitHub workflows no longer receive it.
*
* Every public site used to keep a byte-identical copy of the guard (only this
* label differed). `assertKeyAccepted` counts a 401/403 on `globalThis` before
* it throws; `src/middleware.ts` refuses to store a render that grew the count.
*/
var guard = createSiteKeyGuard(connection, {
	label: "tds-shop",
	reconnectHint: "Bitte den Shop in den TDShop-Einstellungen neu verbinden."
});
var { currentSiteKey, siteKeyHeaders, assertKeyAccepted } = guard;
/** Key, 10s timeout, key check, throw on non-2xx. See tds-shared/site. */
var readContentJson = createContentReader(guard);
//#endregion
export { legalPath as C, tx as D, productPath as E, langOfPath as S, productCategoryName as T, LANGS as _, guardSiteKey as a, homePath as b, demoCategories as c, canonical as d, pageTitle as f, propertyNav as g, propertyContact as h, escapeXml as i, demoProduct as l, siteLinks as m, readContentJson as n, serializeJsonLd as o, site as p, siteKeyHeaders as r, DEMO_MODE as s, assertKeyAccepted as t, demoProducts as u, categoryName as v, prefix as w, isLang as x, categoryPath as y };
