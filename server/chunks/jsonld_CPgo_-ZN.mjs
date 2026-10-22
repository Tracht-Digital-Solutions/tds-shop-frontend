import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent, t as createAstro } from "./compiler_0Y1Kw-SJ.mjs";
import { c as formatPrice } from "./Layout_DQnrLY78.mjs";
import { A as productPath, _ as site, h as canonical, j as tx, k as productCategoryName, v as siteLinks } from "./siteKey_D6bmHM0Q.mjs";
import { c as productImageAttributes, l as productImageSchema } from "./content-api_Bw9LJZoH.mjs";
import "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
// node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-ASVQSFGC.js
var PRICE_MAX_AGE_MS = 864e5;
function isPriceStale(offer, now = Date.now()) {
	if (offer.priceCents === null || offer.priceCheckedAt === null) return true;
	const checked = Date.parse(offer.priceCheckedAt);
	if (Number.isNaN(checked)) return true;
	return now - checked > PRICE_MAX_AGE_MS;
}
function displayPrice(offer, now = Date.now()) {
	if (offer.kind === "own" && offer.priceCents !== null) return {
		cents: offer.priceCents,
		currency: offer.currency
	};
	if (isPriceStale(offer, now)) return null;
	return {
		cents: offer.priceCents,
		currency: offer.currency
	};
}
// node_modules/@tracht-digital-solutions/tds-shared/dist/components/index.js
var TX = {
	de: {
		label: "Anzeige",
		checkPrice: "Preis beim Anbieter prüfen",
		at: "bei",
		asOf: "Stand",
		toOffer: "Zum Angebot",
		toProduct: "Ansehen",
		buy: "Kaufen",
		addToCart: "In den Warenkorb",
		buyNow: "Direkt zur Kasse",
		from: "ab",
		outOfStock: "Derzeit nicht verfügbar",
		amazonNote: "Preis und Verfügbarkeit können sich geändert haben. Maßgeblich ist der Preis, der zum Kaufzeitpunkt auf der Anbieterseite steht."
	},
	en: {
		label: "Advertisement",
		checkPrice: "Check price at the merchant",
		at: "at",
		asOf: "as of",
		toOffer: "View offer",
		toProduct: "View",
		buy: "Buy",
		addToCart: "Add to basket",
		buyNow: "Buy now",
		from: "from",
		outOfStock: "Currently unavailable",
		amazonNote: "Price and availability may have changed. The price shown on the merchant's page at the time of purchase applies."
	}
};
function formatChecked(iso, lang) {
	const t = Date.parse(iso);
	if (Number.isNaN(t)) return "";
	return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(t));
}
function primaryOffer(offers) {
	if (offers.length === 0) return null;
	return [...offers].sort((a, b) => {
		if (a.kind !== b.kind) return a.kind === "own" ? -1 : 1;
		return a.position - b.position;
	})[0] ?? null;
}
function OfferRow({ offer, product, lang, now, onOfferClick, addToCart = false }) {
	const tx = TX[lang];
	const price = displayPrice(offer, now);
	const affiliate = offer.kind === "affiliate";
	const toBasket = addToCart && !affiliate;
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-product-offer",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "tds-product-offer__info",
			children: [
				/* @__PURE__ */ jsxs("span", {
					className: "tds-product-offer__merchant",
					children: [
						tx.at,
						" ",
						offer.merchant
					]
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "tds-product-price",
					children: [price && !affiliate ? /* @__PURE__ */ jsxs("span", {
						className: "tds-product-price__from",
						children: [tx.from, " "]
					}) : null, price ? formatPrice(price.cents, price.currency, lang) : tx.checkPrice]
				}),
				price && offer.priceCheckedAt ? /* @__PURE__ */ jsxs("span", {
					className: "tds-product-offer__asof",
					children: [
						tx.asOf,
						" ",
						formatChecked(offer.priceCheckedAt, lang)
					]
				}) : null,
				offer.availability === "out_of_stock" ? /* @__PURE__ */ jsx("span", {
					className: "tds-product-offer__stock",
					children: tx.outOfStock
				}) : null
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "tds-product-offer__actions",
			children: toBasket ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "btn btn-primary tds-product-offer__cta",
				"data-add-to-cart": product.slug,
				"data-product-title": product.title,
				children: tx.addToCart
			}), /* @__PURE__ */ jsx("a", {
				className: "tds-product-offer__direct",
				href: offer.url,
				onClick: () => onOfferClick?.(offer, product),
				children: tx.buyNow
			})] }) : /* @__PURE__ */ jsx("a", {
				className: "btn btn-primary tds-product-offer__cta",
				href: offer.url,
				rel: affiliate ? "sponsored nofollow noopener" : "noopener",
				target: affiliate ? "_blank" : void 0,
				onClick: () => onOfferClick?.(offer, product),
				children: affiliate ? tx.toOffer : tx.buy
			})
		})]
	});
}
function ProductCard({ image, product, variant = "card", lang = "de", affiliateLabel, now = Date.now(), onOfferClick, addToCart = false, className, style }) {
	const tx = TX[lang];
	const offers = product.offers ?? [];
	const hasAffiliate = offers.some((o) => o.kind === "affiliate");
	const hasAmazon = offers.some((o) => o.network === "amazon");
	const label = affiliateLabel?.trim() || tx.label;
	const primary = primaryOffer(offers);
	const classes = [
		"tds-product-card",
		`tds-product-card--${variant}`,
		className
	].filter(Boolean).join(" ");
	if (variant === "inline") return /* @__PURE__ */ jsxs("div", {
		className: classes,
		style,
		children: [
			hasAffiliate ? /* @__PURE__ */ jsx("span", {
				className: "tds-product-badge",
				children: label
			}) : null,
			/* @__PURE__ */ jsx("a", {
				className: "tds-product-card__title",
				href: product.url,
				children: product.title
			}),
			primary ? /* @__PURE__ */ jsx(OfferRow, {
				offer: primary,
				product,
				lang,
				now,
				onOfferClick,
				addToCart
			}) : null
		]
	});
	return /* @__PURE__ */ jsxs("article", {
		className: classes,
		style,
		children: [
			hasAffiliate ? /* @__PURE__ */ jsx("span", {
				className: "tds-product-badge",
				children: label
			}) : null,
			product.imageUrl ? /* @__PURE__ */ jsx("a", {
				className: "tds-product-card__media",
				href: product.url,
				children: /* @__PURE__ */ jsx("img", {
					src: product.imageUrl,
					alt: image?.alt ?? product.title,
					loading: "lazy",
					decoding: "async",
					...image
				})
			}) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "tds-product-card__body",
				children: [/* @__PURE__ */ jsx("a", {
					className: "tds-product-card__title",
					href: product.url,
					children: product.title
				}), /* @__PURE__ */ jsx("p", {
					className: "tds-product-card__teaser",
					children: product.teaser
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "tds-product-card__buy",
				children: [hasAmazon ? /* @__PURE__ */ jsx("p", {
					className: "tds-affiliate-note",
					children: tx.amazonNote
				}) : null, variant === "list" ? offers.map((offer) => /* @__PURE__ */ jsx(OfferRow, {
					offer,
					product,
					lang,
					now,
					onOfferClick,
					addToCart
				}, offer.id)) : primary ? /* @__PURE__ */ jsx(OfferRow, {
					offer: primary,
					product,
					lang,
					now,
					onOfferClick,
					addToCart
				}) : /* @__PURE__ */ jsx("a", {
					className: "btn btn-ghost",
					href: product.url,
					children: tx.toProduct
				})]
			})
		]
	});
}
// src/lib/offers.ts
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
// src/components/ProductGrid.astro
createAstro("https://shop.tracht-digital.de");
var $$ProductGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductGrid;
	const { products, lang, placement = null, filterable = false } = Astro.props;
	const t = tx(lang);
	const attributed = products.map((product) => withAttribution(product, lang, placement));
	const kindOf = (product) => {
		const kinds = new Set(product.offers.map((o) => o.kind));
		return kinds.size === 2 ? "own affiliate" : [...kinds][0] ?? "";
	};
	const now = Date.now();
	const priceOf = (product) => {
		const cents = product.offers.map((offer) => displayPrice(offer, now)?.cents).filter((value) => typeof value === "number");
		return cents.length > 0 ? String(Math.min(...cents)) : "";
	};
	const searchOf = (product) => [
		product.title,
		product.teaser,
		product.categoryLabel ?? product.category,
		...product.tags ?? []
	].join(" ").toLowerCase();
	return renderTemplate`${attributed.length === 0 ? renderTemplate`${maybeRenderHead($$result)}<div class="shop-empty"><p class="shop-empty__title">${t.empty.title}</p><p class="shop-empty__body">${t.empty.body}</p><p class="shop-empty__links"><a class="link-underline shop-empty__link"${addAttribute(siteLinks(lang).blog, "href")}>${t.empty.journal}</a><a class="link-underline shop-empty__link"${addAttribute(siteLinks(lang).tools, "href")}>${t.empty.tools}</a></p></div>` : renderTemplate`<div class="tds-product-grid">${attributed.map((product, i) => filterable ? renderTemplate`<div class="shop-filter-item"${addAttribute(kindOf(products[i]), "data-kind")}${addAttribute(products[i].category, "data-category")}${addAttribute((products[i].tags ?? []).map((tag) => tag.toLowerCase()).join("|"), "data-tags")}${addAttribute(priceOf(products[i]), "data-price")}${addAttribute(searchOf(products[i]), "data-search")}${addAttribute(products[i].title, "data-title")}${addAttribute(products[i].publishedAt ?? "", "data-published")}>${renderComponent($$result, "ProductCard", ProductCard, {
		"product": product,
		"lang": lang,
		"variant": "card",
		"addToCart": true,
		"image": productImageAttributes(product, lang)
	})}</div>` : renderTemplate`${renderComponent($$result, "ProductCard", ProductCard, {
		"product": product,
		"lang": lang,
		"variant": "card",
		"addToCart": true,
		"image": productImageAttributes(product, lang)
	})}`)}</div>`}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ProductGrid.astro", void 0);
// src/lib/jsonld.ts
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
		name: site.fullName,
		alternateName: site.name,
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
	if (product.imageUrl) node.image = productImageSchema(product, lang) ?? product.imageUrl;
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
export { itemListSchema as a, serviceSchema as c, $$ProductGrid as d, withAttribution as f, faqPageSchema as i, webPageSchema as l, breadcrumbSchema as n, organizationSchema as o, ProductCard as p, collectionPageSchema as r, productSchema as s, asGraph as t, websiteSchema as u };
