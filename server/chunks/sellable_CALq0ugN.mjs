import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_CulRNmGV.mjs";
import { t as createComponent } from "./compiler_nZpybwjH.mjs";
import { t as $$Layout } from "./Layout_Dsb5ZBAT.mjs";
import { c as productPath, s as productCategoryName } from "./i18n_CQle7kER.mjs";
import { t as getProduct } from "./content-api_CoRwg2be.mjs";
import { t as describe } from "./metaDescription_CJLBlKxJ.mjs";
import { t as CheckoutForm } from "./CheckoutForm_Dy3_FJ9g.mjs";
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<nav class="shop-breadcrumbs"><a${addAttribute(productPath(slug, lang), "href")}>${product.title}</a></nav>${renderComponent($$result, "CheckoutForm", CheckoutForm, {
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
