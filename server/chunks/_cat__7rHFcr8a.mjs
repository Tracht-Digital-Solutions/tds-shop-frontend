import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Catalogue } from "./Catalogue_emIh3_ow.mjs";
//#region src/pages/kategorie/[cat].astro
var _cat__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Cat,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://shop.tracht-digital.de");
var $$Cat = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Cat;
	const category = String(Astro.params.cat ?? "").trim();
	if (!/^[a-z0-9-]{2,60}$/.test(category)) return Astro.rewrite("/404");
	return renderTemplate`${renderComponent($$result, "Catalogue", $$Catalogue, {
		"lang": "de",
		"category": category
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kategorie/[cat].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kategorie/[cat].astro";
var $$url = "/kategorie/[cat]";
//#endregion
//#region \0virtual:astro:page:src/pages/kategorie/[cat]@_@astro
var page = () => _cat__exports;
//#endregion
export { page };
