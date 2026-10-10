import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, B as createAstro, w as renderComponent } from "./sequence_gsNi_lIw.mjs";
import { t as createComponent } from "./compiler_BqOQTrwP.mjs";
import { i as isLegalSlug, r as getLegalMarkdown } from "./legal_B5e0s_ti.mjs";
import { t as $$LegalPage } from "./LegalPage_07RRxS1N.mjs";
//#region src/pages/rechtliches/[key].astro
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
//#endregion
//#region \0virtual:astro:page:src/pages/rechtliches/[key]@_@astro
var page = () => _key__exports;
//#endregion
export { page };
