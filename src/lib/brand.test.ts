import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * The brand assets the shell DECLARES have to exist in `public/`.
 *
 * This test exists because both of them did not. `Layout.astro` carried
 * `<link rel="icon" href="/favicon.png">` from the first commit and
 * `public/favicon.png` was never added, which is the worst shape this class of
 * bug takes: a declared-but-absent asset 404s silently, the browser falls back
 * to the generic page icon, and the tab looks exactly like a site that never
 * declared a favicon at all. Nothing in `astro check`, the build or the rest of
 * the suite reads a `public/` path, so nothing could have caught it.
 *
 * Reading the sources as text is the same choice `surface.test.ts` makes: what
 * is asserted is what the files declare, and the point is to compare that
 * declaration against the filesystem.
 */
const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const layout = read("../layouts/Layout.astro");
const css = read("../styles/global.css");

/** `public/` is the document root at runtime, so a root-relative asset URL in
 *  the markup resolves to a file directly under it. */
const inPublic = (url: string): boolean =>
  existsSync(fileURLToPath(new URL(`../../public${url}`, import.meta.url)));

describe("the brand assets", () => {
  it("serves the favicon the shell links to", () => {
    const href = /<link rel="icon"[^>]*href="([^"]+)"/.exec(layout)?.[1];
    expect(href, "no rel=icon link in the shell at all").toBeDefined();
    expect(href).toMatch(/^\//);
    expect(inPublic(href as string), `${href} is declared but missing from public/`).toBe(true);
  });

  it("serves the logomark the stylesheet masks with", () => {
    // `.brand-logo` (tds-shared) is `mask: var(--tds-brand-logo-mask) …`. With
    // no asset behind the URL the mask matches nothing, and a masked element
    // with an empty mask paints as a SOLID navy rectangle where the mark
    // should be — a failure that reads as a design decision in a screenshot.
    const url = /--tds-brand-logo-mask:\s*url\("([^"]+)"\)/.exec(css)?.[1];
    expect(url, "no --tds-brand-logo-mask declared").toBeDefined();
    expect(inPublic(url as string), `${url} is declared but missing from public/`).toBe(true);
  });

  it("names the brand on the link the mark replaced", () => {
    // The mark carries the "TD" of TDShop, so only "Shop" is set in type. That
    // makes the accessible name a requirement rather than a nicety: without the
    // label the home link announces as "Shop", and the mark must not be
    // announced twice.
    const anchor = /<a\s+class="shop-header__brand[^"]*"[\s\S]*?>/.exec(layout)?.[0] ?? "";
    expect(anchor).toContain("aria-label");
    expect(layout).toMatch(/<span class="brand-logo" aria-hidden="true">/);

    // `.accent-italic` (base.css) is italic; `.brand-wordmark .accent-italic`
    // (primitives.css) is the ONLY rule that puts it back upright. The display
    // face is a grotesk, so dropping the wordmark class silently slants the
    // second half of the name.
    expect(anchor).toContain("brand-wordmark");
  });

  it("never overrides the logomark's aspect ratio", () => {
    // The library default (1.476) is the real aspect of this exact asset
    // (713x483). The mask is `contain`-fitted, so a box with a different ratio
    // letterboxes the art and renders the mark smaller than the space it
    // occupies — the bug tds-blog-frontend's local copy of the rule shipped.
    expect(css).not.toMatch(/--tds-brand-logo-ratio:/);
  });
});
