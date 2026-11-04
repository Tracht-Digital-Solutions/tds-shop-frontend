import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { A as renderTemplate, j as maybeRenderHead, w as renderComponent } from "./sequence_CX4U2Rdn.mjs";
import "./compiler_oWbJ6wCc.mjs";
import { d as createComponent, l as translations, t as $$Layout } from "./Layout_BAK6xaAU.mjs";
import { t as Cart } from "./Cart_Ca8ggNan.mjs";
import { M as tx, b as propertyContact } from "./siteKey_D-mNvWq_.mjs";
// src/pages/en/cart.astro
var cart_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Cart,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Cart = createComponent(($$result, $$props, $$slots) => {
	const t = tx("en").cart;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": t.title,
		"description": t.emptyBody,
		"lang": "en",
		"noindex": true,
		"altUrl": "/warenkorb"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<h1 class="shop-title">${t.title}</h1>${renderComponent($$result, "Cart", Cart, {
		"client:load": true,
		"lang": "en",
		"checkoutHref": "/en/checkout",
		"contactHref": propertyContact("en"),
		"contactLabel": translations.en.nav.cta,
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Cart.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/cart.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/cart.astro";
var $$url = "/en/cart";
// \0virtual:astro:page:src/pages/en/cart@_@astro
var page = () => cart_exports;
export { page };
