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
		tag: "thema",
		page: "seite",
		legal: "rechtliches"
	},
	en: {
		product: "product",
		category: "category",
		tag: "topic",
		page: "page",
		legal: "legal"
	}
};
/** The prefix a language's tree hangs under. German is the root. */
var prefix = (lang) => lang === "en" ? "/en" : "";
var productPath = (slug, lang) => `${prefix(lang)}/${SEGMENTS[lang].product}/${slug}`;
var categoryPath = (category, lang) => `${prefix(lang)}/${SEGMENTS[lang].category}/${category}`;
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
var TX = {
	de: {
		brand: "TDShop",
		tagline: "Technik und Digitalisierung, kuratiert.",
		nav: {
			home: "Start",
			catalogue: "Katalog",
			categories: "Kategorien",
			about: "Über TDShop",
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
		older: "Ältere",
		newer: "Neuere",
		page: "Seite",
		breadcrumb: "Pfadnavigation",
		offers: "Angebote",
		relatedCategory: "Mehr aus dieser Kategorie",
		ourAssessment: "Unsere Einschätzung",
		adLabel: "Anzeige",
		affiliateNotice: "Einige Links auf dieser Seite sind Partnerlinks. Kaufen Sie darüber, erhalten wir eine Provision — am Preis ändert sich für Sie nichts.",
		priceUnavailable: "Preis beim Anbieter prüfen",
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
			shipping: "Versand",
			shippingFree: "kostenlos",
			shippingFrom: (amount) => `Versandkostenfrei ab ${amount}`,
			digitalOnly: "Keine Lieferung nötig — sofortige Erbringung nach Zahlung.",
			toCheckout: "Zur Kasse",
			keepShopping: "Weiter einkaufen",
			loading: "Wird berechnet …",
			gone: "Mindestens ein Artikel ist nicht mehr verfügbar. Bitte entfernen Sie ihn.",
			updated: (title, n) => `${title}: Menge ${n}`,
			removed: (title) => `${title} entfernt`
		}
	},
	en: {
		brand: "TDShop",
		tagline: "Technology and digitalisation, curated.",
		nav: {
			home: "Home",
			catalogue: "Catalogue",
			categories: "Categories",
			about: "About TDShop",
			label: "Main navigation",
			menu: "Menu",
			main: "Tracht Digital"
		},
		theme: {
			toDark: "Switch to dark mode",
			toLight: "Switch to light mode"
		},
		catalogue: "Products",
		catalogueHeadline: "Business technology, assessed by us",
		allCategories: "All",
		categories: "Categories",
		empty: {
			title: "The catalogue is being stocked.",
			body: "Meanwhile, our assessments of business technology are in the journal, and the tools site has utilities you can use right in your browser.",
			journal: "Read assessments in the journal",
			tools: "Try the tools"
		},
		older: "Older",
		newer: "Newer",
		page: "Page",
		breadcrumb: "Breadcrumb",
		offers: "Offers",
		relatedCategory: "More in this category",
		ourAssessment: "Our assessment",
		adLabel: "Advertisement",
		affiliateNotice: "Some links on this page are affiliate links. If you buy through them we earn a commission — the price is the same for you.",
		priceUnavailable: "Check price at the merchant",
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
			shipping: "Delivery",
			shippingFree: "free",
			shippingFrom: (amount) => `Free delivery from ${amount}`,
			digitalOnly: "Nothing to deliver — performed immediately after payment.",
			toCheckout: "Checkout",
			keepShopping: "Keep shopping",
			loading: "Calculating …",
			gone: "At least one item is no longer available. Please remove it.",
			updated: (title, n) => `${title}: quantity ${n}`,
			removed: (title) => `${title} removed`
		}
	}
};
var tx = (lang) => TX[lang];
//#endregion
export { isLang as a, tx as c, homePath as i, categoryLabel as n, prefix as o, categoryPath as r, productPath as s, LANGS as t };
