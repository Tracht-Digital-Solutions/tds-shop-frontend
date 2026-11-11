import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { T as renderComponent, j as renderTemplate } from "./sequence_cwM7fFZp.mjs";
import { d as createComponent } from "./Layout_CXBhHudn.mjs";
import { t as createAstro } from "./compiler_NuJ7F5L4.mjs";
import { t as $$Catalogue } from "./Catalogue_Bvx6n4gR.mjs";
import { t as categoryExists } from "./content-api_BnqvrEdm.mjs";
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
