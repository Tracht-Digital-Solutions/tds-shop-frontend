import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { T as renderComponent, j as renderTemplate } from "./sequence_cwM7fFZp.mjs";
import { d as createComponent } from "./Layout_BamyOG81.mjs";
import "./compiler_NuJ7F5L4.mjs";
import { t as $$Catalogue } from "./Catalogue_yYq8_fL0.mjs";
// src/pages/en/index.astro
var en_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => "/en"
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Catalogue", $$Catalogue, { "lang": "en" })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/index.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/index.astro";
// \0virtual:astro:page:src/pages/en/index@_@astro
var page = () => en_exports;
export { page };
