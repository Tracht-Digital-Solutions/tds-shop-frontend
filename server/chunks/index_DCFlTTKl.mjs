import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent } from "./compiler_0Y1Kw-SJ.mjs";
import { t as $$Layout } from "./Layout_WWoZnkdI.mjs";
import { j as tx } from "./siteKey_CwDlj_H7.mjs";
import { t as CheckoutForm } from "./CheckoutForm_2hNshxe3.mjs";
// src/pages/en/checkout/index.astro
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
// \0virtual:astro:page:src/pages/en/checkout/index@_@astro
var page = () => checkout_exports;
export { page };
