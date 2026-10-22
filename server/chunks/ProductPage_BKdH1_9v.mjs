import { D as Fragment, E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead, V as unescapeHTML } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent, t as createAstro } from "./compiler_0Y1Kw-SJ.mjs";
import { g as renderScript, t as $$Layout } from "./Layout_WWoZnkdI.mjs";
import { A as productPath, C as categoryPath, _ as site, h as canonical, j as tx, k as productCategoryName, w as homePath } from "./siteKey_CwDlj_H7.mjs";
import { a as listProducts, c as productImageAttributes, l as productImageSchema, s as productImage, u as productImageSrcset } from "./content-api_L7zZ9Hxt.mjs";
import { n as isIndexable } from "./indexing_Dw35tNvQ.mjs";
import { c as serviceSchema, d as $$ProductGrid, f as withAttribution, i as faqPageSchema, l as webPageSchema, n as breadcrumbSchema, p as ProductCard, s as productSchema, t as asGraph, u as websiteSchema } from "./jsonld_BVEoXBSS.mjs";
import { t as describe } from "./metaDescription_VgQGynX0.mjs";
import { r as productAlternate } from "./alternates_B69i4u_n.mjs";
import { t as renderMarkdown } from "./markdown_8qKxepaf.mjs";
// src/components/ProductPage.astro
createAstro("https://shop.tracht-digital.de");
var $$ProductPage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductPage;
	const { lang, product } = Astro.props;
	const t = tx(lang);
	const imageAttributes = productImageAttributes(product, lang, true);
	const artwork = imageAttributes ? productImage(product.slug) : void 0;
	const imageNode = productImageSchema(product, lang);
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
	const altUrl = indexable ? await productAlternate(product, lang) : null;
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
		imageNode,
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
		"ogImageAlt": imageAttributes?.alt,
		"ogImageWidth": artwork?.width,
		"ogImageHeight": artwork?.height,
		"ogType": "product",
		"altUrl": altUrl,
		"jsonLd": jsonLd
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="shop-breadcrumbs"${addAttribute(t.breadcrumb, "aria-label")}><ol><li><a${addAttribute(homePath(lang), "href")}>${t.nav.catalogue}</a></li><li><span class="shop-breadcrumbs__sep" aria-hidden="true">/</span><a${addAttribute(categoryPath(product.category, lang), "href")}>${categoryName}</a></li><li aria-current="page"><span class="shop-breadcrumbs__sep" aria-hidden="true">/</span>${product.title}</li></ol></nav><div class="shop-product"><div class="shop-product__head"><h1 class="shop-title">${product.title}</h1><p class="shop-lede">${product.teaser}</p>${revised && renderTemplate`<p class="shop-revised">${lang === "de" ? "Stand" : "Updated"}: <time${addAttribute(product.updatedAt, "datetime")}>${revised}</time><span aria-hidden="true"> · </span>${sellsDirectly ? `${t.providedBy}: ` : lang === "de" ? "Eingeschätzt von " : "Assessed by "}<a${addAttribute(`${site.mainUrl}/#about`, "href")} class="link-underline">${sellsDirectly ? "Tracht Digital Solutions" : site.legalName}</a></p>`}${summary ? renderTemplate`<p class="shop-answer shop-answer--product"><strong>${t.inShort}</strong> ${summary}</p>` : null}${artwork && renderTemplate`<figure class="shop-product__figure"><picture><source type="image/avif"${addAttribute(productImageSrcset(artwork.src, "avif"), "srcset")}${addAttribute(imageAttributes?.sizes, "sizes")}><img${addAttribute(product.imageUrl, "src")}${addAttribute(imageAttributes?.srcSet, "srcset")}${addAttribute(imageAttributes?.sizes, "sizes")}${addAttribute(imageAttributes?.alt ?? "", "alt")}${addAttribute(artwork.width, "width")}${addAttribute(artwork.height, "height")} fetchpriority="high" decoding="async"></picture><figcaption>${lang === "de" ? `Symbolbild zur Leistung „${product.title}“, KI-generiert.` : `AI-generated illustration of the service “${product.title}”.`}</figcaption></figure>`}${hasAffiliate ? renderTemplate`<p class="shop-disclosure">${t.affiliateNotice}</p>` : null}</div><aside class="shop-product__offers" id="offers"${addAttribute(t.offers, "aria-label")}>${renderComponent($$result, "ProductCard", ProductCard, {
		"product": {
			...product,
			offers,
			imageUrl: artwork ? null : product.imageUrl
		},
		"lang": lang,
		"variant": "list",
		"addToCart": true
	})}${facts.length > 0 ? renderTemplate`<section class="shop-facts" aria-labelledby="facts-heading"><h2 class="shop-facts__title" id="facts-heading">${t.atAGlance}</h2><dl>${facts.map((fact) => renderTemplate`<div class="shop-facts__row"><dt>${fact.label}</dt><dd>${fact.value}</dd></div>`)}</dl></section>` : null}</aside>${body ? renderTemplate`<section class="shop-product__body" aria-labelledby="assessment-heading"><h2 class="shop-section-title" id="assessment-heading">${sellsDirectly ? t.serviceDetails : t.ourAssessment}</h2><div class="shop-doc">${unescapeHTML(body)}</div></section>` : null}</div>${faq.length > 0 && renderTemplate`<section class="shop-faq" aria-labelledby="product-faq-heading"><h2 id="product-faq-heading" class="shop-faq__title">${t.faqHeading}</h2>${faq.map((item) => renderTemplate`<details class="shop-faq__item"><summary>${item.q}</summary><p>${item.a}</p></details>`)}</section>`}${related.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<h2 class="shop-section-title">${t.relatedCategory}</h2>${renderComponent($$result, "ProductGrid", $$ProductGrid, {
		"products": related,
		"lang": lang
	})}` })}` : null}<p class="shop-pager"><a class="btn btn-ghost"${addAttribute(categoryPath(product.category, lang), "href")}>${t.backToCatalogue}</a></p>${offers.length > 0 && renderTemplate`<div class="shop-buybar" id="shop-buybar" hidden><span class="shop-buybar__title">${product.title}</span><a href="#offers" class="btn btn-primary shop-buybar__cta">${t.offers}</a></div>`}<link rel="prefetch"${addAttribute(canonical(homePath(lang)), "href")}>` })}${renderScript($$result, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ProductPage.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/ProductPage.astro", void 0);
export { $$ProductPage as t };
