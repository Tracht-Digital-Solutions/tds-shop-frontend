import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Layout } from "./Layout_MUKHf_7k.mjs";
import { t as CheckoutForm } from "./CheckoutForm_aWDWMbC-.mjs";
//#region src/pages/kasse/index.astro
var kasse_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Kasse",
		"description": "Bestellung abschließen.",
		"lang": "de",
		"noindex": true,
		"altUrl": "/en/checkout"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "CheckoutForm", CheckoutForm, {
		"client:load": true,
		"lang": "de",
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/CheckoutForm.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kasse/index.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kasse/index.astro";
var $$url = "/kasse";
//#endregion
//#region \0virtual:astro:page:src/pages/kasse/index@_@astro
var page = () => kasse_exports;
//#endregion
export { page };
