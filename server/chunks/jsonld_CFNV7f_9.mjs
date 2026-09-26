import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_CulRNmGV.mjs";
import { t as createComponent } from "./compiler_nZpybwjH.mjs";
import { n as ProductCard, r as displayPrice } from "./Layout_Dm1pTavd.mjs";
import { c as productPath, l as tx, s as productCategoryName } from "./i18n_CQle7kER.mjs";
import { a as canonical, c as siteLinks, s as site } from "./demoContent_5OiL53YY.mjs";
//#region src/components/ProductGrid.astro
createAstro("https://shop.tracht-digital.de");
var $$ProductGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductGrid;
	const { products, lang, placement = null } = Astro.props;
	const t = tx(lang);
	const attributed = products.map((product) => ({
		...product,
		offers: product.offers.map((offer) => {
			const params = new URLSearchParams({
				source: "shop",
				lang
			});
			if (placement) params.set("placement", placement);
			return {
				...offer,
				url: `${offer.url}?${params}`
			};
		})
	}));
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
function websiteSchema(lang) {
	return {
		"@type": "WebSite",
		"@id": `${site.url}/#website`,
		url: site.url,
		name: site.name,
		inLanguage: lang === "en" ? "en" : "de",
		description: site.description[lang],
		publisher: organizationRef()
	};
}
function breadcrumbSchema(trail) {
	return {
		"@type": "BreadcrumbList",
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
function collectionPageSchema(name, path, lang) {
	return {
		"@type": "CollectionPage",
		"@id": canonical(path),
		url: canonical(path),
		name,
		inLanguage: lang === "en" ? "en" : "de",
		isPartOf: { "@id": `${site.url}/#website` }
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
//#endregion
export { productSchema as a, itemListSchema as i, breadcrumbSchema as n, websiteSchema as o, collectionPageSchema as r, $$ProductGrid as s, asGraph as t };
