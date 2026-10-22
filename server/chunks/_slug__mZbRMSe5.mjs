import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent, t as createAstro } from "./compiler_0Y1Kw-SJ.mjs";
import { A as productPath } from "./siteKey_CwDlj_H7.mjs";
import { n as $$CheckoutPage, t as resolveSellable } from "./sellable_BZkGYkHM.mjs";
// src/pages/kasse/[slug].astro
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
// \0virtual:astro:page:src/pages/kasse/[slug]@_@astro
var page = () => _slug__exports;
export { page };
