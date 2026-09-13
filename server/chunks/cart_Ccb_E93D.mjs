import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, j as maybeRenderHead, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { t as $$Layout } from "./Layout_MUKHf_7k.mjs";
import { c as tx } from "./i18n_CAi8x9tF.mjs";
import { t as Cart } from "./Cart_BusyCXC7.mjs";
//#region src/pages/en/cart.astro
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
		"client:component-hydration": "load",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Cart.tsx",
		"client:component-export": "default"
	})}` })}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/cart.astro", void 0);
var $$file = "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/pages/en/cart.astro";
var $$url = "/en/cart";
//#endregion
//#region \0virtual:astro:page:src/pages/en/cart@_@astro
var page = () => cart_exports;
//#endregion
export { page };
