import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, j as maybeRenderHead, w as renderComponent } from "./sequence_gsNi_lIw.mjs";
import { t as createComponent } from "./compiler_BqOQTrwP.mjs";
import { t as $$Layout } from "./Layout_CEK1ovz2.mjs";
import { k as tx } from "./siteKey_C6JEtaJE.mjs";
import { t as CheckoutForm } from "./CheckoutForm_C3pM0M-k.mjs";
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${tx("en").checkout.heading}</h1>${renderComponent($$result, "CheckoutForm", CheckoutForm, {
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
