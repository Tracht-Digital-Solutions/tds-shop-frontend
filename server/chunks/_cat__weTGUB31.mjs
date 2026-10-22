import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent, t as createAstro } from "./compiler_0Y1Kw-SJ.mjs";
import { t as categoryExists } from "./content-api_L7zZ9Hxt.mjs";
import { t as $$Catalogue } from "./Catalogue_tCEtmiKw.mjs";
// src/pages/kategorie/[cat].astro
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
	if (!await categoryExists(category, "de")) return Astro.rewrite("/404");
	return renderTemplate`${renderComponent($$result, "Catalogue", $$Catalogue, {
		"lang": "de",
		"category": category
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kategorie/[cat].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kategorie/[cat].astro";
var $$url = "/kategorie/[cat]";
// \0virtual:astro:page:src/pages/kategorie/[cat]@_@astro
var page = () => _cat__exports;
export { page };
