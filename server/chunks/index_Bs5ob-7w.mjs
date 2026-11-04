import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, j as maybeRenderHead, w as renderComponent } from "./sequence_CX4U2Rdn.mjs";
import "./compiler_oWbJ6wCc.mjs";
import { d as createComponent, t as $$Layout } from "./Layout_CzHh5pf5.mjs";
import { t as CheckoutForm } from "./CheckoutForm_YcU_tE-T.mjs";
import { M as tx } from "./siteKey_BtBkErhM.mjs";
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
