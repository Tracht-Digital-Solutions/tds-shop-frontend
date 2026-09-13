import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Where a product's buy actions sit.
 *
 * A product TDS sells itself has two ways to buy: the offer card's "Kaufen"
 * (straight to the one-product checkout) and the basket. They used to stand a
 * column apart as two equal filled buttons — "In den Warenkorb" under the lede,
 * "Kaufen" in the card beside it. Nothing about that looks broken in a
 * screenshot of one column. Read as text, like `header.test.ts`.
 */
const page = readFileSync(
  fileURLToPath(new URL("../components/ProductPage.astro", import.meta.url)),
  "utf8",
);

describe("the product page's buy actions", () => {
  it("puts the basket button in the offer column, under the card", () => {
    const aside = /<aside class="shop-product__offers"[\s\S]*?<\/aside>/.exec(page)?.[0] ?? "";
    expect(aside, "no offer column on the product page").not.toBe("");
    expect(aside).toMatch(/<ProductCard\b[\s\S]*<AddToCart\b/);
    expect(aside).toMatch(/<AddToCart\b[^>]*variant="secondary"/);
  });

  it("renders the basket button exactly once", () => {
    expect(page.match(/<AddToCart\b/g)).toHaveLength(1);
  });
});
