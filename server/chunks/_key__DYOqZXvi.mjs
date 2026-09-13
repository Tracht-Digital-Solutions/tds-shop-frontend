import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { a as getLegalMarkdown, o as isLegalSlug } from "./Layout_MUKHf_7k.mjs";
import { t as $$LegalPage } from "./LegalPage_DL27QgFS.mjs";
//#region src/pages/en/legal/[key].astro
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
	const markdown = await getLegalMarkdown(key, "en");
	return renderTemplate`${renderComponent($$result, "LegalPage", $$LegalPage, {
		"lang": "en",
		"slug": key,
		"markdown": markdown
	})}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/legal/[key].astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/legal/[key].astro";
var $$url = "/en/legal/[key]";
//#endregion
//#region \0virtual:astro:page:src/pages/en/legal/[key]@_@astro
var page = () => _key__exports;
//#endregion
export { page };
