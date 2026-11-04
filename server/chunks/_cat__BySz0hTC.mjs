import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_CX4U2Rdn.mjs";
import { d as createComponent } from "./Layout_CzHh5pf5.mjs";
import { t as createAstro } from "./compiler_oWbJ6wCc.mjs";
import { t as $$Catalogue } from "./Catalogue_MoxWedLO.mjs";
import { t as categoryExists } from "./content-api_ph_MHMIU.mjs";
// src/pages/en/category/[cat].astro
var _cat__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Cat,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://shop.tracht-digital.de");
var $$Cat = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Cat;
	const category = String(Astro.params.cat ?? "").trim();
	if (!/^[a-z0-9-]{2,60}$/.test(category)) return Astro.rewrite("/404");
	if (!await categoryExists(category, "en")) return Astro.rewrite("/404");
	return renderTemplate`${renderComponent($$result, "Catalogue", $$Catalogue, {
		"lang": "en",
		"category": category
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/category/[cat].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/category/[cat].astro";
var $$url = "/en/category/[cat]";
// \0virtual:astro:page:src/pages/en/category/[cat]@_@astro
var page = () => _cat__exports;
export { page };
