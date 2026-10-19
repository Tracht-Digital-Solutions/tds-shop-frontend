import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Where a product's buy actions sit.
 *
 * A product TDS sells itself has two ways to buy: the basket and the
 * one-product checkout. Since 2026-10-19 both live in the offer card itself
 * (tds-shared ProductCard `addToCart`): "In den Warenkorb" is the filled
 * button, "Direkt zur Kasse" the quiet link beside it, exactly as in the
 * catalogue grid. A second basket island under the card would put the same
 * action on the page twice. Read as text, like `header.test.ts`.
 */
const page = readFileSync(
  fileURLToPath(new URL("../components/ProductPage.astro", import.meta.url)),
  "utf8",
);
const grid = readFileSync(
  fileURLToPath(new URL("../components/ProductGrid.astro", import.meta.url)),
  "utf8",
);
const layout = readFileSync(fileURLToPath(new URL("../layouts/Layout.astro", import.meta.url)), "utf8");

describe("the buy actions", () => {
  it("asks the offer card for the basket button on the product page", () => {
    const aside = /<aside class="shop-product__offers"[\s\S]*?<\/aside>/.exec(page)?.[0] ?? "";
    expect(aside, "no offer column on the product page").not.toBe("");
    expect(aside).toMatch(/<ProductCard\b[^>]*\baddToCart\b/);
    expect(page).not.toMatch(/<AddToCart\b/);
  });

  it("asks for it in every catalogue card too", () => {
    const cards = grid.match(/<ProductCard\b[^>]*>/g) ?? [];
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) expect(card).toMatch(/\baddToCart\b/);
  });

  it("wires the buttons once, in the layout", () => {
    expect(layout.match(/<CartWiring\b/g)).toHaveLength(1);
  });
});
