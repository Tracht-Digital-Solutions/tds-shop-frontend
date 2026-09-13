import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as getProduct } from "./content-api_NeVbVIBp.mjs";
import { t as $$ProductPage } from "./ProductPage_BxncBX0F.mjs";
//#region src/pages/produkt/[slug].astro
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
//#endregion
//#region \0virtual:astro:page:src/pages/produkt/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
