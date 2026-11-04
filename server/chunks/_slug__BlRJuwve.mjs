import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_CX4U2Rdn.mjs";
import { d as createComponent } from "./Layout_BAK6xaAU.mjs";
import { t as createAstro } from "./compiler_oWbJ6wCc.mjs";
import { t as $$ProductPage } from "./ProductPage_Cn-FLwae.mjs";
import { n as getProduct } from "./content-api_DF4uD3Dc.mjs";
// src/pages/produkt/[slug].astro
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
	const product = await getProduct(slug, "de");
	if (!product) return Astro.rewrite("/404");
	return renderTemplate`${renderComponent($$result, "ProductPage", $$ProductPage, {
		"lang": "de",
		"product": product
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/produkt/[slug].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/produkt/[slug].astro";
var $$url = "/produkt/[slug]";
// \0virtual:astro:page:src/pages/produkt/[slug]@_@astro
var page = () => _slug__exports;
export { page };
