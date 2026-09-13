import { A as renderTemplate, B as createAstro, N as addAttribute, R as unescapeHTML, T as Fragment$2, j as maybeRenderHead, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { a as productSchema, n as breadcrumbSchema, o as websiteSchema, s as $$ProductGrid, t as asGraph } from "./jsonld_6pPDh1gI.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { c as cartPath, d as readCart, r as ProductCard, s as addToCart, t as $$Layout, u as onCartChange } from "./Layout_MUKHf_7k.mjs";
import { c as tx, i as homePath, n as categoryLabel, r as categoryPath, s as productPath } from "./i18n_CAi8x9tF.mjs";
import { a as canonical, s as site } from "./demoContent_DOpp32xC.mjs";
import { n as isIndexable } from "./indexing_p4klDT6G.mjs";
import { r as listProducts } from "./content-api_uQBRie8B.mjs";
import { t as describe } from "./metaDescription_CJLBlKxJ.mjs";
import { t as renderMarkdown } from "./markdown_BXKCkzAJ.mjs";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/AddToCart.tsx
/**
* The add-to-basket button on a product page.
*
* Renders nothing on the server and nothing until the mount effect has read the
* basket. That is not a hydration workaround: whether this product is already
* in the basket changes the button's label, and a button that says "Add" for a
* frame and then "In your basket" is a flicker on the one control the page
* exists for.
*
* After adding, it does NOT navigate. Someone browsing a catalogue usually
* wants the next product, not the checkout — the header badge and the live
* region say what happened, and the basket link is one press away.
*/
function AddToCart({ slug, lang, variant = "primary" }) {
	const t = tx(lang).cart;
	const [inCart, setInCart] = useState(null);
	const [justAdded, setJustAdded] = useState(false);
	const timer = useRef(null);
	useEffect(() => () => {
		if (timer.current) clearTimeout(timer.current);
	}, []);
	useEffect(() => {
		const count = () => {
			const line = readCart().find((l) => l.slug === slug);
			setInCart(line ? line.quantity : 0);
		};
		count();
		return onCartChange(count);
	}, [slug]);
	if (inCart === null) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "add-to-cart",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: variant === "secondary" ? "btn btn-ghost" : "btn btn-primary",
				onClick: () => {
					addToCart(slug, 1);
					setJustAdded(true);
					if (timer.current) clearTimeout(timer.current);
					timer.current = setTimeout(() => setJustAdded(false), 1200);
				},
				children: justAdded ? t.justAdded : t.add
			}),
			inCart > 0 ? /* @__PURE__ */ jsxs("a", {
				className: "add-to-cart__link",
				href: cartPath(lang),
				children: [
					t.added,
					" (",
					inCart,
					")"
				]
			}) : null,
			/* @__PURE__ */ jsx("p", {
				className: "sr-only",
				role: "status",
				children: inCart > 0 ? t.badge(inCart) : ""
			})
		]
	});
}
//#endregion
//#region src/components/ProductPage.astro
createAstro("https://shop.tracht-digital.de");
var $$ProductPage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductPage;
	const { lang, product } = Astro.props;
	const t = tx(lang);
	const indexable = isIndexable(product);
	const description = describe(product.metaDescription ?? product.teaser, product.category, site.description[lang]);
	const related = indexable ? (await listProducts({
		lang,
		limit: 4,
		category: product.category
	})).products.filter((p) => p.slug !== product.slug) : [];
	const offers = product.offers.map((offer) => ({
		...offer,
		url: `${offer.url}?source=shop&lang=${lang}`
	}));
	const hasAffiliate = offers.some((offer) => offer.kind === "affiliate");
	const sellsDirectly = offers.some((offer) => offer.kind === "own");
	const body = product.body && product.bodyFormat === "markdown" ? renderMarkdown(product.body) : "";
	const jsonLd = asGraph([
		websiteSchema(lang),
		productSchema(product, lang),
		breadcrumbSchema([
			{
				name: t.brand,
				path: homePath(lang)
			},
			{
				name: product.category,
				path: categoryPath(product.category, lang)
			},
			{
				name: product.title,
				path: productPath(product.slug, lang)
			}
		])
	]);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": product.title,
		"description": description,
		"lang": lang,
		"noindex": !indexable,
		"ogImage": product.imageUrl,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="shop-breadcrumbs"${addAttribute(t.breadcrumb, "aria-label")}><ol><li><a${addAttribute(homePath(lang), "href")}>${t.nav.catalogue}</a></li><li><span class="shop-breadcrumbs__sep" aria-hidden="true">/</span><a${addAttribute(categoryPath(product.category, lang), "href")}>${categoryLabel(product.category)}</a></li><li aria-current="page"><span class="shop-breadcrumbs__sep" aria-hidden="true">/</span>${product.title}</li></ol></nav><div class="shop-product"><div class="shop-product__head"><h1 class="shop-title">${product.title}</h1><p class="shop-lede">${product.teaser}</p>${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</div><aside class="shop-product__offers"${addAttribute(t.offers, "aria-label")}>${renderComponent($$result, "ProductCard", ProductCard, {
		"product": {
			...product,
			offers
		},
		"lang": lang,
		"variant": "list"
	})}${sellsDirectly ? renderTemplate`${renderComponent($$result, "AddToCart", AddToCart, {
		"client:idle": true,
		"slug": product.slug,
		"lang": lang,
		"variant": "secondary",
		"client:component-hydration": "idle",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/AddToCart.tsx",
		"client:component-export": "default"
	})}` : null}</aside>${body ? renderTemplate`<section class="shop-product__body" aria-labelledby="assessment-heading"><h2 class="shop-section-title" id="assessment-heading">${t.ourAssessment}</h2><div class="shop-doc">${unescapeHTML(body)}</div></section>` : null}</div>${related.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<h2 class="shop-section-title">${t.relatedCategory}</h2>${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": related,
		"lang": lang
	})}` })}` : null}<p class="shop-pager"><a class="btn btn-ghost"${addAttribute(categoryPath(product.category, lang), "href")}>${t.backToCatalogue}</a></p><link rel="prefetch"${addAttribute(canonical(homePath(lang)), "href")}>` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ProductPage.astro", void 0);
//#endregion
export { $$ProductPage as t };
