import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, w as renderComponent } from "./sequence_NiXRbFvR.mjs";
import { t as createComponent } from "./compiler_DT_2Cis2.mjs";
import { c as productPath } from "./i18n_CQle7kER.mjs";
import { n as $$CheckoutPage, t as resolveSellable } from "./sellable_BwrQhzDq.mjs";
//#region src/pages/en/checkout/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://shop.tracht-digital.de");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const slug = String(Astro.params.slug ?? "").trim();
	if (!/^[a-z0-9-]{2,120}$/.test(slug)) return Astro.rewrite("/404");
	const sellable = await resolveSellable(slug, "en");
	if (!sellable) return Astro.redirect(productPath(slug, "en"), 302);
	return renderTemplate`${renderComponent($$result, "CheckoutPage", $$CheckoutPage, {
		"lang": "en",
		"slug": slug,
		"sellable": sellable
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/checkout/[slug].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/checkout/[slug].astro";
var $$url = "/en/checkout/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/en/checkout/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
