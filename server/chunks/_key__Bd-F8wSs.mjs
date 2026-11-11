import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { T as renderComponent, j as renderTemplate } from "./sequence_cwM7fFZp.mjs";
import { d as createComponent } from "./Layout_BamyOG81.mjs";
import { t as createAstro } from "./compiler_NuJ7F5L4.mjs";
import { t as $$LegalPage } from "./LegalPage_DT0vcXew.mjs";
import { i as isLegalSlug, r as getLegalMarkdown } from "./legal_Bhi8W2Hu.mjs";
// src/pages/rechtliches/[key].astro
var _key__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Key,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://shop.tracht-digital.de");
var $$Key = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Key;
	const key = String(Astro.params.key ?? "").trim();
	if (!isLegalSlug(key)) return Astro.rewrite("/404");
	const markdown = await getLegalMarkdown(key, "de");
	return renderTemplate`${renderComponent($$result, "LegalPage", $$LegalPage, {
		"lang": "de",
		"slug": key,
		"markdown": markdown
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/rechtliches/[key].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/rechtliches/[key].astro";
var $$url = "/rechtliches/[key]";
// \0virtual:astro:page:src/pages/rechtliches/[key]@_@astro
var page = () => _key__exports;
export { page };
