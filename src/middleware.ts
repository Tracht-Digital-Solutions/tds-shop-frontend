import { defineMiddleware, sequence } from "astro:middleware";

import { siteCache } from "./lib/pageCache";
import { siteKeyRejectionCount } from "./lib/siteKey";
import { isNeverCached } from "./lib/noCache";

/**
 * Serve cached pages, store rendered ones — and never store the ones that must
 * not be shared.
 *
 * The control plane that drives the cache is NOT here; it is a real route
 * (`src/pages/tds/cache/[action].ts`), because Astro runs no middleware for a
 * path that matches no route.
 *
 * In production `public/.htaccess` serves an existing entry straight off disk,
 * so a hit normally never reaches Node. The hit path here still matters: it is
 * what `npm run dev`, `npm start` and any host without the rewrite use.
 */


const noStore = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!isNeverCached(context.url.pathname)) return response;

  const guarded = new Response(response.body, response);
  guarded.headers.set("cache-control", "no-store, private");
  return guarded;
});

/**
 * Refuse to STORE a page rendered while the API rejected our site key.
 *
 * Every content fetch is deliberately fail-soft, so at request time a rejected
 * key produces a perfectly valid page full of baked fallbacks. Cached, that
 * page outlives the misconfiguration with nothing to see.
 *
 * Comparing the rejection counter around the render is enough. Two requests
 * racing can only make this refuse to store a page that was fine; it can never
 * make it store one that was not, and a needless miss costs one render.
 */
const refuseStaleKey = defineMiddleware(async (_context, next) => {
  const before = siteKeyRejectionCount();
  const response = await next();

  if (siteKeyRejectionCount() > before) {
    const guarded = new Response(response.body, response);
    guarded.headers.set("cache-control", "no-store");
    return guarded;
  }
  return response;
});

/**
 * `sequence` runs these outside-in, so the cache wraps both guards: their
 * `no-store` is already on the response by the time the cache decides whether
 * to store it. Reversing the order would put a guard outside the cache, where
 * it would see hits it never rendered.
 */
export const onRequest = sequence(
  defineMiddleware((context, next) =>
    siteCache.middleware(
      {
        request: context.request,
        url: context.url,
        isPrerendered: context.isPrerendered,
      },
      next as () => Promise<Response>,
    ),
  ),
  noStore,
  refuseStaleKey,
);
