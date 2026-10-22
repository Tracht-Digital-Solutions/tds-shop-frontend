import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent, t as createAstro } from "./compiler_0Y1Kw-SJ.mjs";
import { i as isLegalSlug, r as getLegalMarkdown } from "./legal_TYpiqxuJ.mjs";
import { t as $$LegalPage } from "./LegalPage_BbWHv6fK.mjs";
// src/pages/en/legal/[key].astro
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
// \0virtual:astro:page:src/pages/en/legal/[key]@_@astro
var page = () => _key__exports;
export { page };
