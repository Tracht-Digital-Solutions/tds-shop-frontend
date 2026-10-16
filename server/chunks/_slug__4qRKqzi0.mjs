import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { E as renderComponent, M as renderTemplate } from "./sequence_DETo48yF.mjs";
import { n as createComponent, t as createAstro } from "./compiler_CyuNpeFc.mjs";
import { n as getProduct } from "./content-api_BDJSei-C.mjs";
import { t as $$ProductPage } from "./ProductPage_Do3_GCFH.mjs";
//#region src/pages/en/product/[slug].astro
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
	const product = await getProduct(slug, "en");
	if (!product) return Astro.rewrite("/404");
	return renderTemplate`${renderComponent($$result, "ProductPage", $$ProductPage, {
		"lang": "en",
		"product": product
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/product/[slug].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/product/[slug].astro";
var $$url = "/en/product/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/en/product/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
