import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { s as productPath } from "./i18n_CAi8x9tF.mjs";
import { n as $$CheckoutPage, t as resolveSellable } from "./sellable_G1N48QWr.mjs";
//#region src/pages/kasse/[slug].astro
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
	const sellable = await resolveSellable(slug, "de");
	if (!sellable) return Astro.redirect(productPath(slug, "de"), 302);
	return renderTemplate`${renderComponent($$result, "CheckoutPage", $$CheckoutPage, {
		"lang": "de",
		"slug": slug,
		"sellable": sellable
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kasse/[slug].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kasse/[slug].astro";
var $$url = "/kasse/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/kasse/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
