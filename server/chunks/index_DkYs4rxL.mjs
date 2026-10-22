import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { E as renderComponent, M as renderTemplate, N as maybeRenderHead } from "./sequence_DQ-gEWEB.mjs";
import { n as createComponent } from "./compiler_0Y1Kw-SJ.mjs";
import { t as $$Layout } from "./Layout_DQnrLY78.mjs";
import { j as tx } from "./siteKey_D6bmHM0Q.mjs";
import { t as CheckoutForm } from "./CheckoutForm_D7LDc95i.mjs";
// src/pages/kasse/index.astro
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${tx("de").checkout.heading}</h1>${renderComponent($$result, "CheckoutForm", CheckoutForm, {
		"client:load": true,
		"lang": "de",
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/CheckoutForm.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kasse/index.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/kasse/index.astro";
var $$url = "/kasse";
// \0virtual:astro:page:src/pages/kasse/index@_@astro
var page = () => kasse_exports;
export { page };
