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
    for (const source of [header, footer]) {
      for (const key of ["blog", "tools", "main"]) {
        expect(source).toContain(`links.${key}`);
      }
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
