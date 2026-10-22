import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent } from "./compiler_0Y1Kw-SJ.mjs";
import { t as $$Catalogue } from "./Catalogue_tCEtmiKw.mjs";
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Catalogue", $$Catalogue, { "lang": "de" })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/index.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
