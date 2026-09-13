import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Layout } from "./Layout_xvF1Gooe.mjs";
import { t as CheckoutForm } from "./CheckoutForm_Dk9pVka-.mjs";
//#region src/pages/en/checkout/index.astro
var checkout_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Checkout",
		"description": "Complete your order.",
		"lang": "en",
		"noindex": true,
		"altUrl": "/kasse"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "CheckoutForm", CheckoutForm, {
		"client:load": true,
		"lang": "en",
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/CheckoutForm.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/checkout/index.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/checkout/index.astro";
var $$url = "/en/checkout";
//#endregion
//#region \0virtual:astro:page:src/pages/en/checkout/index@_@astro
var page = () => checkout_exports;
//#endregion
export { page };
