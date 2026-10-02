/**
 * Paths whose responses are personal and must never enter the page cache.
 *
 * **This is the most consequential list in this repository.** A cached checkout
 * page shows the next visitor the previous one's order, and nothing about that
 * failure looks like an error — the page renders perfectly, it is simply
 * somebody else's.
 *
 * It lives here rather than inside `middleware.ts` for a plain reason: a module
 * importing `astro:middleware` cannot be loaded outside an Astro build, so a
 * list defined there could not be tested. A rule this consequential that no
 * test can reach is a rule waiting to be edited by somebody who did not know
 * what it was for.
 *
 * Belt and braces: these paths are also absent from the cache event map in
 * `cache.ts`, and `public/.htaccess` excludes them from the disk-hit rewrite.
 * Three independent mechanisms, because the realistic way this breaks is
 * somebody changing one of them without knowing about the other two.
 *
 * `/go/` is here for a different reason — it is a redirect that counts a click.
 * Cached, it would stop counting and would pin one visitor's attribution
 * parameters onto everybody else's clicks.
 */
export const NEVER_CACHED = [
  "/warenkorb",
  "/kasse",
  "/bestellung",
  "/konto",
  "/suche",
  "/go/",
  "/en/cart",
  "/en/checkout",
  "/en/order",
  "/en/account",
  "/en/search",
  "/tds/",
];

/**
 * Does `pathname` fall under one of `prefixes`? Segment-wise, so
 * `/produkt/gossip-adapter` is not caught by `/go/` and `/installation` is not
 * caught by `/install`. Shared with `indexing.ts`, which used a raw
 * `startsWith` and so disagreed with this file about the same paths.
 */
export function matchesPathPrefix(pathname: string, prefixes: readonly string[]): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  return prefixes.some((prefix) => {
    const base = prefix.replace(/\/$/, "");
    return path === base || path.startsWith(`${base}/`);
  });
}

export function isNeverCached(pathname: string): boolean {
  return matchesPathPrefix(pathname, NEVER_CACHED);
}
