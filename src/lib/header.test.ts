import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { categoryLabel } from "./i18n";
import { siteLinks } from "./seo";

/**
 * The header and footer are the journal's, not a fourth design.
 *
 * Until 2026-09-12 this site rendered a hand-rolled bar with no language
 * switch, no theme toggle, no mobile menu and no link to any sibling property,
 * while the journal linked TO the shop from its own nav. Nothing about that
 * looked broken in a screenshot. Read as text, like `surface.test.ts`: what is
 * asserted is what the files declare.
 */
const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const layout = read("../layouts/Layout.astro");
const header = read("../components/Header.astro");
const footer = read("../components/Footer.astro");
const css = read("../styles/global.css");

describe("the shared chrome", () => {
  it("renders header and footer through their components", () => {
    expect(layout).toMatch(/<Header\b/);
    expect(layout).toMatch(/<Footer\b/);
    expect(layout).not.toMatch(/<header\b/);
    expect(layout).not.toMatch(/<footer\b/);
  });

  it("uses the shared header shell, language switch and mobile menu", () => {
    expect(header).toContain('class="brand-header"');
    expect(header).toContain("tds-lang-toggle");
    expect(header).toContain("tds-mobile-menu");
    expect(footer).toContain("tds-tone-navy");
  });

  it("bundles the mobile-menu script instead of inlining it", () => {
    // An inline script is not bundled: its import reaches the browser as a
    // bare specifier and the hamburger silently does nothing.
    const script = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/.exec(header);
    expect(script, "no script in the header").not.toBeNull();
    expect(script?.[1] ?? "").not.toContain("is:inline");
    expect(script?.[2]).toContain("mountMobileNav");
  });

  it("links back to every sibling property from header and footer", () => {
    // The header's list is tds-shared's `propertyNav()` since the three public
    // bars were unified; the footer still names its own.
    expect(header).toContain('propertyNav("shop"');
    for (const key of ["blog", "tools", "main"]) {
      expect(footer).toContain(`links.${key}`);
    }
  });

  it("derives the legal links from the registry and keeps the consent link", () => {
    expect(footer).toMatch(/Object\.keys\(LEGAL_KEYS\)/);
    expect(footer).toContain("<ConsentLink");
  });

  it("never guesses the other language's URL", () => {
    // The taxonomy segments differ per language; `/en${path}` 404s on every
    // listing page.
    expect(header).not.toMatch(/`\/en\$\{/);
  });

  it("hides every decorative brand bar from assistive tech", () => {
    const pages = import.meta.glob("../{components,pages,layouts}/**/*.astro", {
      eager: true,
      query: "?raw",
      import: "default",
    }) as Record<string, string>;

    for (const [file, body] of Object.entries(pages)) {
      for (const match of body.matchAll(/<span[^>]*\btds-brandbar\b[^>]*>/g)) {
        expect(match[0], file).toContain('aria-hidden="true"');
      }
    }
  });
});

describe("the property bar", () => {
  /**
   * The journal, the tools site and the shop share one bar. The shop's used to
   * be 72rem wide beside the journal's 120rem, with its own link list, so a
   * link between them moved the logo and renamed the links.
   */

  it("is the shared bar, at the page's edges, not the old private shell", () => {
    expect(header).toContain('<div class="tds-shell tds-sitebar">');
    expect(layout).toMatch(/<main class="tds-shell\b/);
    expect(footer).not.toContain("shop-shell");
    expect(css).not.toMatch(/\.shop-shell\b/);
    expect(css).not.toMatch(/\.shop-nav__link\b/);
  });

  it("marks the shop current and sends the CTA in the reader's language", () => {
    expect(header).toContain('aria-current={item.current ? (isHome ? "page" : "true") : undefined}');
    expect(header).toContain("propertyContact(lang)");
    // Hidden below 80rem through the wrapper, never on the `.btn` itself.
    expect(header).toMatch(/<div class="tds-sitebar__wide">\s*<a href=\{contact\} class="btn btn-primary"/);
  });

  it("keeps the account menu and the basket beside the hamburger at every width", () => {
    const actions = header.slice(header.indexOf('<div class="tds-sitebar__actions">'));
    const account = actions.indexOf("<AccountMenu");
    const cart = actions.indexOf("<CartBadge");
    const toggle = actions.indexOf('id="menu-toggle"');
    expect(account, "no account menu in the actions").toBeGreaterThan(-1);
    expect(cart).toBeGreaterThan(account);
    expect(toggle).toBeGreaterThan(cart);
  });

  it("keeps the blend's pill actions out of the shared bar", () => {
    // The shop rounds buttons and chips site-wide; inside the header that made
    // the CTA and the language switch the one visible difference to the
    // journal's and the tools site's bar.
    const rule = /\.brand-header \{([^}]*)\}/.exec(css)?.[1] ?? "";
    expect(rule).toMatch(/--tds-radius-btn:\s*var\(--tds-radius-none\)/);
    expect(rule).toMatch(/--tds-radius-chip:\s*var\(--tds-radius-none\)/);
  });

  it("resolves the bar in the INSTALLED tds-shared", () => {
    // A 0.x caret is minor-locked, and a pin below the version carrying these
    // classes renders an unstyled row with nothing anywhere to say so.
    const shared = (rel: string) =>
      readFileSync(
        fileURLToPath(new URL(`../../node_modules/@tracht-digital-solutions/tds-shared/${rel}`, import.meta.url)),
        "utf8",
      );
    expect(shared("styles/primitives.css")).toContain(".tds-sitebar__wide");
    expect(shared("styles/base.css")).toContain("--tds-product-grid-min:");
    expect(shared("dist/nav/index.d.ts")).toMatch(/\bpropertyContact\b/);
  });
});

describe("sibling links", () => {
  it("are absolute and stay in the reader's language", () => {
    for (const lang of ["de", "en"] as const) {
      for (const href of Object.values(siteLinks(lang))) {
        expect(href).toMatch(/^https:\/\/([a-z]+\.)?tracht-digital\.de\//);
        expect(href.endsWith("/en/")).toBe(lang === "en");
      }
    }
  });
});

describe("category labels", () => {
  it("reads a slug as a German noun", () => {
    expect(categoryLabel("netzwerk")).toBe("Netzwerk");
    expect(categoryLabel("smart-home")).toBe("Smart home");
  });
});
