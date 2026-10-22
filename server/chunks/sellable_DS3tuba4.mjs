import { E as renderComponent, F as addAttribute, M as renderTemplate, N as maybeRenderHead } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent, t as createAstro } from "./compiler_0Y1Kw-SJ.mjs";
import { t as $$Layout } from "./Layout_DQnrLY78.mjs";
import { A as productPath, j as tx, k as productCategoryName } from "./siteKey_D6bmHM0Q.mjs";
import { n as getProduct } from "./content-api_Bw9LJZoH.mjs";
import { t as describe } from "./metaDescription_iA0LTISv.mjs";
import { t as CheckoutForm } from "./CheckoutForm_D7LDc95i.mjs";
// src/components/CheckoutPage.astro
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
// src/lib/sellable.ts
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
export { $$CheckoutPage as n, resolveSellable as t };
