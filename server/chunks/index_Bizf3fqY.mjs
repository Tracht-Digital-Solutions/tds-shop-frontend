import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_CX4U2Rdn.mjs";
import { d as createComponent } from "./Layout_CzHh5pf5.mjs";
import "./compiler_oWbJ6wCc.mjs";
import { t as $$Catalogue } from "./Catalogue_MoxWedLO.mjs";
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
