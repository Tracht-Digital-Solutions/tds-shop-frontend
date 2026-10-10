import { A as renderTemplate, B as createAstro, N as addAttribute, R as unescapeHTML, T as Fragment$2, j as maybeRenderHead, w as renderComponent } from "./sequence_gsNi_lIw.mjs";
import { t as createComponent } from "./compiler_BqOQTrwP.mjs";
import { a as addToCart, c as onCartChange, f as renderScript, l as readCart, n as ProductCard, o as cartPath, t as $$Layout } from "./Layout_CEK1ovz2.mjs";
import { D as productCategoryName, O as productPath, S as homePath, h as site, k as tx, p as canonical, x as categoryPath } from "./siteKey_C6JEtaJE.mjs";
import { i as listProducts } from "./content-api_CvYjQIre.mjs";
import { n as isIndexable } from "./indexing_D0dmov63.mjs";
import { a as breadcrumbSchema, d as serviceSchema, f as webPageSchema, h as withAttribution, i as asGraph, m as $$ProductGrid, p as websiteSchema, r as productAlternate, s as faqPageSchema, u as productSchema } from "./alternates_D7KE_17F.mjs";
import { t as describe } from "./metaDescription_CJLBlKxJ.mjs";
import { t as renderMarkdown } from "./markdown_CTyP1wuI.mjs";
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
				"data-track": "add-to-cart",
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
	const categoryName = productCategoryName(product);
	const description = describe(product.metaDescription ?? product.teaser, categoryName, site.description[lang]);
	const related = indexable ? (await listProducts({
		lang,
		limit: 4,
		category: product.category
	})).products.filter((p) => p.slug !== product.slug) : [];
	const { offers } = withAttribution(product, lang);
	const hasAffiliate = offers.some((offer) => offer.kind === "affiliate");
	const sellsDirectly = offers.some((offer) => offer.kind === "own");
	const summary = product.summary?.trim() || null;
	const facts = product.facts ?? [];
	const faq = product.faq ?? [];
	const titleSubject = product.metaTitle?.trim() || product.title;
	const body = product.body && product.bodyFormat === "markdown" ? renderMarkdown(product.body) : "";
	const altUrl = indexable ? await productAlternate(product.slug, lang) : null;
	const selfPath = productPath(product.slug, lang);
	const breadcrumbId = `${canonical(selfPath)}#breadcrumb`;
	const jsonLd = asGraph([
		websiteSchema(lang),
		webPageSchema({
			path: selfPath,
			name: product.title,
			lang,
			dateModified: product.updatedAt,
			breadcrumbId
		}),
		productSchema(product, lang),
		...sellsDirectly ? [serviceSchema(product, lang)] : [],
		...faq.length > 0 ? [faqPageSchema(faq)] : [],
		breadcrumbSchema([
			{
				name: t.nav.catalogue,
				path: homePath(lang)
			},
			{
				name: categoryName,
				path: categoryPath(product.category, lang)
			},
			{
				name: product.title,
				path: selfPath
			}
		], breadcrumbId)
	]);
	const revised = product.updatedAt ? new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
		month: "long",
		year: "numeric",
		timeZone: "UTC"
	}).format(new Date(product.updatedAt)) : null;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": titleSubject,
		"description": description,
		"lang": lang,
		"noindex": !indexable,
		"ogImage": product.imageUrl,
		"ogType": "product",
		"altUrl": altUrl,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="shop-breadcrumbs"${addAttribute(t.breadcrumb, "aria-label")}><ol><li><a${addAttribute(homePath(lang), "href")}>${t.nav.catalogue}</a></li><li><span class="shop-breadcrumbs__sep" aria-hidden="true">/</span><a${addAttribute(categoryPath(product.category, lang), "href")}>${categoryName}</a></li><li aria-current="page"><span class="shop-breadcrumbs__sep" aria-hidden="true">/</span>${product.title}</li></ol></nav><div class="shop-product"><div class="shop-product__head"><h1 class="shop-title">${product.title}</h1><p class="shop-lede">${product.teaser}</p>${revised && renderTemplate`<p class="shop-revised">${lang === "de" ? "Stand" : "Updated"}: <time${addAttribute(product.updatedAt, "datetime")}>${revised}</time><span aria-hidden="true"> · </span>${sellsDirectly ? `${t.providedBy}: ` : lang === "de" ? "Eingeschätzt von " : "Assessed by "}<a${addAttribute(`${site.mainUrl}/#about`, "href")} class="link-underline">${sellsDirectly ? "Tracht Digital Solutions" : site.legalName}</a></p>`}${summary ? renderTemplate`<p class="shop-answer shop-answer--product"><strong>${t.inShort}</strong> ${summary}</p>` : null}${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</div><aside class="shop-product__offers" id="offers"${addAttribute(t.offers, "aria-label")}>${renderComponent($$result, "ProductCard", ProductCard, {
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
	})}` : null}${facts.length > 0 ? renderTemplate`<section class="shop-facts" aria-labelledby="facts-heading"><h2 class="shop-facts__title" id="facts-heading">${t.atAGlance}</h2><dl>${facts.map((fact) => renderTemplate`<div class="shop-facts__row"><dt>${fact.label}</dt><dd>${fact.value}</dd></div>`)}</dl></section>` : null}</aside>${body ? renderTemplate`<section class="shop-product__body" aria-labelledby="assessment-heading"><h2 class="shop-section-title" id="assessment-heading">${sellsDirectly ? t.serviceDetails : t.ourAssessment}</h2><div class="shop-doc">${unescapeHTML(body)}</div></section>` : null}</div>${faq.length > 0 && renderTemplate`<section class="shop-faq" aria-labelledby="product-faq-heading"><h2 id="product-faq-heading" class="shop-faq__title">${t.faqHeading}</h2>${faq.map((item) => renderTemplate`<details class="shop-faq__item"><summary>${item.q}</summary><p>${item.a}</p></details>`)}</section>`}${related.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<h2 class="shop-section-title">${t.relatedCategory}</h2>${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": related,
		"lang": lang
	})}` })}` : null}<p class="shop-pager"><a class="btn btn-ghost"${addAttribute(categoryPath(product.category, lang), "href")}>${t.backToCatalogue}</a></p>${offers.length > 0 && renderTemplate`<div class="shop-buybar" id="shop-buybar" hidden><span class="shop-buybar__title">${product.title}</span><a href="#offers" class="btn btn-primary shop-buybar__cta">${t.offers}</a></div>`}<link rel="prefetch"${addAttribute(canonical(homePath(lang)), "href")}>` })}${renderScript($$result, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ProductPage.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ProductPage.astro", void 0);
//#endregion
export { $$ProductPage as t };
