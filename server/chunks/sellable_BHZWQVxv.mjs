import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_gsNi_lIw.mjs";
import { t as createComponent } from "./compiler_BqOQTrwP.mjs";
import { t as $$Layout } from "./Layout_CEK1ovz2.mjs";
import { D as productCategoryName, O as productPath, k as tx } from "./siteKey_C6JEtaJE.mjs";
import { t as getProduct } from "./content-api_CvYjQIre.mjs";
import { t as describe } from "./metaDescription_CJLBlKxJ.mjs";
import { t as CheckoutForm } from "./CheckoutForm_C3pM0M-k.mjs";
//#region src/components/CheckoutPage.astro
createAstro("https://shop.tracht-digital.de");
var $$CheckoutPage = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CheckoutPage;
	const { lang, slug, sellable } = Astro.props;
	const { product } = sellable;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": product.title,
		"description": describe(product.teaser, productCategoryName(product)),
		"lang": lang,
		"noindex": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="shop-breadcrumbs"${addAttribute(tx(lang).breadcrumb, "aria-label")}><a${addAttribute(productPath(slug, lang), "href")}>${product.title}</a></nav><h1 class="shop-title">${tx(lang).checkout.heading}</h1>${renderComponent($$result, "CheckoutForm", CheckoutForm, {
		"client:load": true,
		"slug": slug,
		"lang": lang,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/CheckoutForm.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/CheckoutPage.astro", void 0);
//#endregion
//#region src/lib/sellable.ts
async function resolveSellable(slug, lang) {
	const product = await getProduct(slug, lang);
	if (!product) return null;
	const offer = product.offers.find((o) => o.kind === "own" && o.netCents != null);
	if (!offer) return null;
	const netCents = offer.netCents;
	const vatRateBp = offer.vatRateBp ?? 1900;
	const taxCents = Math.round(netCents * vatRateBp / 1e4);
	return {
		product,
		offer,
		netCents,
		vatRateBp,
		taxCents,
		grossCents: netCents + taxCents
	};
}
//#endregion
export { $$CheckoutPage as n, resolveSellable as t };
