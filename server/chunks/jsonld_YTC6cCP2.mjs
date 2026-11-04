import { A as renderTemplate, L as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_CX4U2Rdn.mjs";
import { d as createComponent } from "./Layout_CzHh5pf5.mjs";
import { t as createAstro } from "./compiler_oWbJ6wCc.mjs";
import { A as productCategoryName, M as tx, c as imageRights, g as canonical, j as productPath, v as site, y as siteLinks } from "./siteKey_BtBkErhM.mjs";
import { c as productImageAttributes, l as productImageSchema } from "./content-api_ph_MHMIU.mjs";
import { n as formatPrice } from "./chunk-5OYAWIY6_BMA99kb1.mjs";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
// node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-TIOQP7E6.js
var NAVY = "#050f68";
var BORDEAUX = "#820933";
var CORAL = "#ff7a9c";
var SAND = "#f4efe6";
var SCHEMES = [
	[
		NAVY,
		CORAL,
		BORDEAUX,
		"#ffffff"
	],
	[
		SAND,
		NAVY,
		CORAL,
		NAVY
	],
	[
		BORDEAUX,
		CORAL,
		NAVY,
		"#ffffff"
	],
	[
		"#0b0a07",
		CORAL,
		NAVY,
		"#ffffff"
	],
	[
		SAND,
		BORDEAUX,
		NAVY,
		BORDEAUX
	],
	[
		NAVY,
		"#ffffff",
		CORAL,
		CORAL
	]
];
function placeholderHash(seed) {
	const text = String(seed);
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) {
		h ^= text.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
var escapeXml = (text) => text.replace(/[&<>"']/g, (c) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&apos;"
})[c]);
function tdsPlaceholderSvg({ seed, width = 1200, height = 750, monogram }) {
	const h = placeholderHash(seed);
	const [ground, main, second, line] = SCHEMES[h % SCHEMES.length];
	const u = Math.min(width, height);
	const flipX = h >> 3 & 1;
	const flipY = h >> 4 & 1;
	const x = (value) => flipX ? width - value : value;
	const y = (value) => flipY ? height - value : value;
	const capW = u * .95;
	const capH = u * .36;
	const capX = x(width * .72) - capW / 2;
	const capY = y(height * .78) - capH / 2;
	const rings = [
		1,
		2,
		3,
		4
	].map((step) => {
		const off = step * u * .022;
		return `<rect x="${(capX - off).toFixed(1)}" y="${(capY - off).toFixed(1)}" width="${capW.toFixed(1)}" height="${capH.toFixed(1)}" rx="${(capH / 2).toFixed(1)}" fill="none" stroke="${line}" stroke-opacity="${(.42 - step * .07).toFixed(2)}" stroke-width="${(u * .004).toFixed(1)}"/>`;
	}).join("");
	const capsule = `<rect x="${capX.toFixed(1)}" y="${capY.toFixed(1)}" width="${capW.toFixed(1)}" height="${capH.toFixed(1)}" rx="${(capH / 2).toFixed(1)}" fill="${main}"/>`;
	const r = u * (.32 + (h >> 6) % 12 / 100);
	const cx = x(0);
	const cy = y(0);
	const quarter = `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="${second}"/><circle cx="${cx}" cy="${cy}" r="${(r * 1.28).toFixed(1)}" fill="none" stroke="${line}" stroke-opacity="0.3" stroke-width="${(u * .004).toFixed(1)}"/>`;
	const barH = u * .022;
	const barLeft = flipX ? width * .08 : width * .6;
	const barTop = flipY ? height * .84 : height * .14;
	const bars = [
		[
			0,
			u * .2,
			line
		],
		[
			u * .225,
			u * .09,
			main
		],
		[
			u * .34,
			u * .045,
			second
		]
	].map(([offset, w, colour]) => `<rect x="${(barLeft + offset).toFixed(1)}" y="${barTop.toFixed(1)}" width="${w.toFixed(1)}" height="${barH.toFixed(1)}" rx="${(barH / 2).toFixed(1)}" fill="${colour}"/>`).join("");
	const letters = monogram?.trim().slice(0, 2);
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"><rect width="${width}" height="${height}" fill="${ground}"/>${quarter}${rings}${capsule}${bars}${letters ? `<text x="${width / 2}" y="${height / 2}" dy=".35em" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${(u * .34).toFixed(1)}" fill="${line}" fill-opacity="0.9">${escapeXml(letters)}</text>` : ""}</svg>`;
}
function tdsPlaceholder(options) {
	return `data:image/svg+xml,${encodeURIComponent(tdsPlaceholderSvg(options))}`;
}
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
// src/lib/quote.ts
/**
* "Angebot anfordern": our own services are quoted, not bought from a card.
*
* The contact form lives on the marketing site, so the prepared text travels in
* the query string (`?anfrage=`, read by its `lib/quoteRequest.ts`). It is only a
* draft in the message field and is never sent by itself.
*/
var contactBase = (lang) => `${site.mainUrl}${lang === "en" ? "/en/" : "/"}`;
var quoteUrl = (lang, message) => `${contactBase(lang)}?anfrage=${encodeURIComponent(message)}#contact`;
function quoteMessage(lang, title, price) {
	if (lang === "en") return `Hello,\n\nI am interested in "${title}"${price ? ` (from ${price} incl. VAT)` : ""}. Please send me a quote.\n\nAbout my business:\n\n\nKind regards`;
	return `Guten Tag,\n\nich interessiere mich für „${title}“${price ? ` (ab ${price} inkl. MwSt.)` : ""}. Bitte senden Sie mir ein Angebot.\n\nZu meinem Betrieb:\n\n\nViele Grüße`;
}
/** The link behind one product's "Angebot anfordern". */
var quoteHref = (lang) => (product) => {
	const own = product.offers.find((offer) => offer.kind === "own");
	const price = own ? displayPrice(own) : null;
	return quoteUrl(lang, quoteMessage(lang, product.title, price ? formatPrice(price.cents, price.currency, lang) : null));
};
// node_modules/@tracht-digital-solutions/tds-shared/dist/components/index.js
var TX = {
	de: {
		label: "Anzeige",
		checkPrice: "Preis beim Anbieter prüfen",
		at: "bei",
		asOf: "Stand",
		toOffer: "Zum Angebot",
		toProduct: "Ansehen",
		details: "Details ansehen",
		requestQuote: "Angebot anfordern",
		inclVat: "inkl. 19 % MwSt.",
		exclVat: "zzgl. 19 % MwSt.",
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
		details: "View details",
		requestQuote: "Request a quote",
		inclVat: "incl. 19% VAT",
		exclVat: "plus 19% VAT",
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
function OfferRow({ offer, product, lang, now, onOfferClick, quoteHref }) {
	const tx = TX[lang];
	const price = displayPrice(offer, now);
	const affiliate = offer.kind === "affiliate";
	const netCents = offer.netCents ?? (price ? Math.round(price.cents / 1.19) : 0);
	const switchable = Boolean(quoteHref && !affiliate && price);
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
					}) : null, price ? switchable ? /* @__PURE__ */ jsx("span", {
						"data-price-amount": true,
						"data-price-gross": formatPrice(price.cents, price.currency, lang),
						"data-price-net": formatPrice(netCents, price.currency, lang),
						children: formatPrice(price.cents, price.currency, lang)
					}) : formatPrice(price.cents, price.currency, lang) : tx.checkPrice]
				}),
				switchable ? /* @__PURE__ */ jsx("span", {
					className: "tds-product-offer__asof",
					"data-price-note": true,
					"data-price-gross": tx.inclVat,
					"data-price-net": tx.exclVat,
					children: tx.inclVat
				}) : null,
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
			children: affiliate ? /* @__PURE__ */ jsx("a", {
				className: "btn btn-primary tds-product-offer__cta",
				href: offer.url,
				rel: "sponsored nofollow noopener",
				target: "_blank",
				onClick: () => onOfferClick?.(offer, product),
				children: tx.toOffer
			}) : quoteHref ? /* @__PURE__ */ jsx("a", {
				className: "btn btn-primary tds-product-offer__cta",
				href: quoteHref(product),
				rel: "nofollow",
				"data-quote-request": product.slug,
				onClick: () => onOfferClick?.(offer, product),
				children: tx.requestQuote
			}) : /* @__PURE__ */ jsx("a", {
				className: "btn btn-primary tds-product-offer__cta",
				href: product.url,
				children: tx.details
			})
		})]
	});
}
function ProductCard({ image, product, variant = "card", lang = "de", affiliateLabel, now = Date.now(), onOfferClick, quoteHref, className, style }) {
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
				quoteHref
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
			}) : variant === "card" ? /* @__PURE__ */ jsx("a", {
				className: "tds-product-card__media",
				href: product.url,
				tabIndex: -1,
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx("img", {
					src: tdsPlaceholder({
						seed: product.slug,
						monogram: product.title.charAt(0)
					}),
					alt: "",
					loading: "lazy",
					decoding: "async"
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
					quoteHref
				}, offer.id)) : primary ? /* @__PURE__ */ jsx(OfferRow, {
					offer: primary,
					product,
					lang,
					now,
					onOfferClick,
					quoteHref
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
		"quoteHref": quoteHref(lang),
		"image": productImageAttributes(product, lang)
	})}</div>` : renderTemplate`${renderComponent($$result, "ProductCard", ProductCard, {
		"product": product,
		"lang": lang,
		"variant": "card",
		"quoteHref": quoteHref(lang),
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
			height: site.logo.height,
			...imageRights("de")
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
		priceSpecification: {
			"@type": "PriceSpecification",
			minPrice: (price.cents / 100).toFixed(2),
			priceCurrency: price.currency,
			valueAddedTaxIncluded: true
		},
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
export { itemListSchema as a, serviceSchema as c, $$ProductGrid as d, withAttribution as f, displayPrice as g, quoteHref as h, faqPageSchema as i, webPageSchema as l, contactBase as m, breadcrumbSchema as n, organizationSchema as o, ProductCard as p, collectionPageSchema as r, productSchema as s, asGraph as t, websiteSchema as u };
