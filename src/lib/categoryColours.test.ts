import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Every own category has its colour, and it is the one the image series
 * paints its pictures in (stuff/03-Bilder/Bildserie-2026-11,
 * doku/README.md "Kategoriefarben im Shop"). A picture themed violet on a
 * card tinted blue is the drift this guards against.
 */
const css = readFileSync(fileURLToPath(new URL("../styles/global.css", import.meta.url)), "utf8");

const colours: Record<string, string> = {
  webauftritt: "--color-primary",
  "seo-sichtbarkeit": "--color-cat-violet",
  "e-mail-domain": "--color-cat-cyan",
  "recht-datenschutz": "--color-info",
  schulung: "--color-accent-pink",
  "wartung-betrieb": "--color-cat-teal",
  digitalisierung: "--color-cat-amber",
  leistungspakete: "--color-accent",
};

describe("category colours", () => {
  it.each(Object.entries(colours))("%s is %s on cards, tiles, chips and filter buttons", (slug, token) => {
    const rule = css.split("\n").find((line) => line.startsWith(`:is([data-category="${slug}"]`));
    expect(rule).toBeDefined();
    expect(rule).toContain(`[data-filter-group="category"][data-value="${slug}"]`);
    expect(rule).toContain(`--shop-cat: var(${token});`);
  });

  it("gives every colour to one category only", () => {
    expect(new Set(Object.values(colours)).size).toBe(Object.keys(colours).length);
  });
});
