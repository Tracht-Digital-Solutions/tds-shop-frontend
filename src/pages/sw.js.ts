import type { APIRoute } from "astro";
import { buildServiceWorker, SW_HEADERS } from "@tracht-digital-solutions/tds-shared/pwa";

/**
 * The service worker (tds-shared/pwa). Prerendered: its version is the build
 * time. Pages network-first; catalogue and product pages stay readable
 * offline. NEVER cached: the basket, checkout, order pages and the outbound
 * offer redirects (`/go/`) — anything with a price that must be current or a
 * state that must be live.
 */
export const prerender = true;

const VERSION = String(Date.now());

export const GET: APIRoute = () =>
  new Response(
    buildServiceWorker({
      version: VERSION,
      offlinePages: { "/": "/offline", "/en/": "/en/offline" },
      exclude: [
        "/warenkorb", "/kasse", "/bestellung", "/go/",
        "/en/cart", "/en/checkout", "/en/order",
        "/sitemap", "/llms.txt", "/tds-runtime.json",
      ],
      maxPages: 30,
    }),
    { headers: SW_HEADERS },
  );
