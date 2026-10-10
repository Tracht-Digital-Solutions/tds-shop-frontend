import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_gsNi_lIw.mjs";
import { t as createComponent } from "./compiler_BqOQTrwP.mjs";
import { n as ProductCard, r as displayPrice } from "./Layout_CEK1ovz2.mjs";
import { D as productCategoryName, O as productPath, S as homePath, g as siteLinks, h as site, k as tx, p as canonical, x as categoryPath } from "./siteKey_C6JEtaJE.mjs";
import { r as listCategories, t as getProduct } from "./content-api_CvYjQIre.mjs";
//#region src/lib/offers.ts
/** Anything with a scheme (`https:`) is absolute; everything else stays site-relative. */
var ABSOLUTE = /^[a-z][a-z\d+.-]*:/i;
/**
* Append the click attribution to an offer URL.
*
* `offer.url` already points at this site's `/go/{id}` redirect — the API
* builds it, so the partner tag lives in one row rather than in every card.
* Only the attribution is added here, because only the rendering context knows
* which surface and slot the click came from.
*
* One helper for the product page and the grid: the two used to build this
* separately — one by string concatenation that dropped `placement` and would
* have produced `?a=1?source=…` on a URL that already carried a query.
*/
function attributedOfferUrl(url, lang, placement) {
	const parsed = new URL(url, "https://shop.invalid");
	parsed.searchParams.set("source", "shop");
	parsed.searchParams.set("lang", lang);
	if (placement) parsed.searchParams.set("placement", placement);
	return ABSOLUTE.test(url) ? parsed.toString() : `${parsed.pathname}${parsed.search}${parsed.hash}`;
}
/** The same, over every offer of a product. */
function withAttribution(product, lang, placement) {
	return {
		...product,
		offers: product.offers.map((offer) => ({
			...offer,
			url: attributedOfferUrl(offer.url, lang, placement)
		}))
	};
}
//#endregion
//#region src/components/ProductGrid.astro
createAstro("https://shop.tracht-digital.de");
var $$ProductGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductGrid;
	const { products, lang, placement = null } = Astro.props;
	const t = tx(lang);
	const attributed = products.map((product) => withAttribution(product, lang, placement));
	return renderTemplate`${attributed.length === 0 ? renderTemplate`${maybeRenderHead($$result)}<div class="shop-empty"><p class="shop-empty__title">${t.empty.title}</p><p class="shop-empty__body">${t.empty.body}</p><p class="shop-empty__links"><a class="link-underline shop-empty__link"${addAttribute(siteLinks(lang).blog, "href")}>${t.empty.journal}</a><a class="link-underline shop-empty__link"${addAttribute(siteLinks(lang).tools, "href")}>${t.empty.tools}</a></p></div>` : renderTemplate`<div class="tds-product-grid">${attributed.map((product) => renderTemplate`${renderComponent($$result, "ProductCard", ProductCard, {
		"product": product,
		"lang": lang,
		"variant": "card"
	})}`)}</div>`}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ProductGrid.astro", void 0);
//#endregion
//#region src/lib/jsonld.ts
function asGraph(nodes) {
	return {
		"@context": "https://schema.org",
		"@graph": nodes.filter((n) => Boolean(n))
	};
}
var organizationRef = () => ({ "@id": site.organizationId });
/**
* The organisation as a described entity, not just an `@id`.
*
* Emitted on the two front pages only; every subpage keeps referencing it with
* {@link organizationRef}, which is the pattern the journal already uses. The
* `@id` stays on the marketing origin on purpose — minting
* `shop.tracht-digital.de/#organization` would describe a SECOND business, and
* the whole point of the shared anchor is that there is one.
*
* It carries what identifies the publisher and nothing more. Address, VAT ID
* and phone stay on the marketing site, where the Impressum is; this shop's
* Impressum links there.
*/
function organizationSchema() {
	return {
		"@type": "Organization",
		"@id": site.organizationId,
		name: "Tracht Digital Solutions",
		legalName: site.legalName,
		url: site.mainUrl,
		founder: { "@id": site.personId },
		logo: {
			"@type": "ImageObject",
			url: site.logo.url,
			width: site.logo.width,
			height: site.logo.height
		},
		sameAs: [...site.socials]
	};
}
function websiteSchema(lang) {
	return {
		"@type": "WebSite",
		"@id": `${site.url}/#website`,
		url: site.url,
		name: site.name,
		inLanguage: lang === "en" ? "en-GB" : "de-DE",
		description: site.description[lang],
		publisher: organizationRef()
	};
}
function breadcrumbSchema(trail, id) {
	return {
		"@type": "BreadcrumbList",
		...id ? { "@id": id } : {},
		itemListElement: trail.map((step, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: step.name,
			item: canonical(step.path)
		}))
	};
}
function itemListSchema(products, lang) {
	return {
		"@type": "ItemList",
		numberOfItems: products.length,
		itemListElement: products.map((product, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: canonical(productPath(product.slug, lang)),
			name: product.title
		}))
	};
}
/**
* The questions a category page shows, as `FAQPage`.
*
* Emitted only where `categoryCopy.ts` has written answers, and built from the
* SAME objects the page renders — Google withdraws a FAQ rich result when the
* structured answer differs from the visible one, and two hand-kept copies of
* a sentence diverge on the first edit.
*/
function faqPageSchema(items) {
	if (items.length === 0) return null;
	return {
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.a
			}
		}))
	};
}
function collectionPageSchema(name, path, lang) {
	return {
		"@type": "CollectionPage",
		"@id": canonical(path),
		url: canonical(path),
		name,
		inLanguage: lang === "en" ? "en-GB" : "de-DE",
		isPartOf: { "@id": `${site.url}/#website` }
	};
}
/**
* The product PAGE as an entity, beside the product itself.
*
* `Product` describes the thing; this describes the page about it — who
* published it, and when its assessment was last revised. `dateModified` comes
* from `product.updatedAt`, which the payload has carried the whole time and
* which nothing read: not the sitemap's `lastmod`, not the markup, not a line
* on the page. Freshness is one of the few things an answer engine weighs
* besides the content, and this site had it and threw it away.
*
* The page shows the same date in a `<time datetime>`; the audit fails a
* `dateModified` with no visible counterpart, which is what keeps the two
* from drifting apart.
*/
function webPageSchema(opts) {
	const url = canonical(opts.path);
	return {
		"@type": "WebPage",
		"@id": `${url}#webpage`,
		url,
		name: opts.name,
		inLanguage: opts.lang === "en" ? "en-GB" : "de-DE",
		isPartOf: { "@id": `${site.url}/#website` },
		publisher: organizationRef(),
		...opts.dateModified ? { dateModified: opts.dateModified } : {},
		...opts.breadcrumbId ? { breadcrumb: { "@id": opts.breadcrumbId } } : {}
	};
}
/**
* A product node.
*
* `offers` is attached ONLY when we are the seller and the price is currently
* publishable. See the module note — this is the whole point of the file.
*/
function productSchema(product, lang, now = Date.now()) {
	const url = canonical(productPath(product.slug, lang));
	const node = {
		"@type": "Product",
		"@id": url,
		url,
		name: product.title,
		description: product.teaser,
		category: productCategoryName(product)
	};
	if (product.imageUrl) node.image = product.imageUrl;
	const priced = (product.offers ?? []).filter((offer) => offer.kind === "own").map((offer) => ({
		offer,
		price: displayPrice(offer, now)
	})).filter((entry) => entry.price !== null);
	if (priced.length > 0) node.offers = priced.map(({ offer, price }) => ({
		"@type": "Offer",
		url,
		price: (price.cents / 100).toFixed(2),
		priceCurrency: price.currency,
		availability: offer.availability === "out_of_stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
		seller: organizationRef()
	}));
	return node;
}
/**
* Our own offer is a SERVICE, and says so beside the `Product` node: who
* provides it, where, and what kind of service it is. The `Product` keeps the
* price (`Offer`); this node links to it rather than repeating it, so the two
* cannot state different prices.
*
* Germany only — the shop sells to Germany alone, checked before payment.
*/
function serviceSchema(product, lang) {
	const url = canonical(productPath(product.slug, lang));
	return {
		"@type": "Service",
		"@id": `${url}#service`,
		url,
		name: product.title,
		description: product.summary?.trim() || product.teaser,
		serviceType: productCategoryName(product),
		provider: organizationRef(),
		areaServed: {
			"@type": "Country",
			name: lang === "en" ? "Germany" : "Deutschland"
		},
		inLanguage: lang === "en" ? "en-GB" : "de-DE",
		isRelatedTo: { "@id": url }
	};
}
//#endregion
//#region src/lib/alternates.ts
/**
* The locale counterpart of a page, looked up rather than derived.
*
* ### Why this file exists
*
* `i18n.ts` has referred to "`alternates.ts` looks the counterpart up instead"
* since the shop was built. The file never existed, and the consequence was
* not a missing nicety: `Layout.astro` emits hreflang ONLY when it is handed
* an `altUrl`, and the only pages that handed it one were the four `noindex`
* cart and checkout pages. Every indexable page — home, every category, every
* product — shipped no hreflang at all, and `Header.astro` fell back to
* `homePath()`, so the language switch on a product page sent the reader to
* the front page instead of to the same product.
*
* ### Why a twin is confirmed and never derived
*
* The two trees are not a prefix mirror: the taxonomy segments differ per
* language (`produkt` ↔ `product`), and a product's slug MAY differ too,
* because the API pairs translations on the product id. Pasting `/en/` in
* front of a German path therefore produces a 404 on every listing page, and
* `Layout.astro`'s own doc comment says why that is worse than nothing: one
* dangling alternate invalidates the whole set, the German side included.
*
* So every function here returns `null` unless the counterpart is known to
* answer. For a category that is a count in the other language; for a product
* it costs one extra read, which the page cache absorbs.
*
* ### The gap this cannot close
*
* `ShopProduct` carries no product id and no counterpart slug, so a product
* whose translation lives under a DIFFERENT slug cannot be paired from here —
* the probe looks for the same slug and correctly finds nothing. Closing that
* needs a field from the API (tds-ext-shop + tds-core-frontend-api); until
* then such a product ships no hreflang, which is the honest outcome rather
* than a guess.
*/
/** The other language. */
var otherLang = (lang) => lang === "de" ? "en" : "de";
/** Absolute URL of the home page in the other language. Always exists. */
function homeAlternate(lang) {
	return canonical(homePath(otherLang(lang)));
}
/**
* Absolute URL of this category in the other language, or `null`.
*
* Category slugs are shared across the trees — only the segment differs — so
* the question is whether the other language has anything in it. An empty
* category is not a page: `sitemap.ts` leaves it out, so linking an alternate
* at it would point at a route the sitemap does not list.
*/
async function categoryAlternate(category, lang) {
	const other = otherLang(lang);
	const match = (await listCategories(other)).find((entry) => entry.category === category);
	if (!match || match.total < 1) return null;
	return canonical(categoryPath(category, other));
}
/**
* Absolute URL of this product in the other language, or `null`.
*
* Confirmed with a second read, because a guess here is a 404. A real 404 from
* the API gives `null` and the page then ships without hreflang.
*
* It uses the same client the page itself uses, which means it inherits the
* same fail-soft behaviour: on a network error `getProduct` answers from the
* demo fixtures. That is deliberate and consistent — in that state the PAGE is
* demo content too, so its alternate describes the same thing the page does.
* What must never happen is a confident alternate for a product the API says
* does not exist in that language, and a 404 is passed through.
*/
async function productAlternate(slug, lang) {
	const other = otherLang(lang);
	const twin = await getProduct(slug, other);
	if (!twin) return null;
	return canonical(productPath(twin.slug, other));
}
//#endregion
export { breadcrumbSchema as a, itemListSchema as c, serviceSchema as d, webPageSchema as f, withAttribution as h, asGraph as i, organizationSchema as l, $$ProductGrid as m, homeAlternate as n, collectionPageSchema as o, websiteSchema as p, productAlternate as r, faqPageSchema as s, categoryAlternate as t, productSchema as u };
