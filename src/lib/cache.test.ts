import { describe, expect, it } from "vitest";
import { resolveEvents } from "@tracht-digital-solutions/tds-shared/cache";
import { cacheEvents } from "./cache";

describe("publication cache events", () => {
  it("refreshes the catalogue, crawler files, translated products and category pages", async () => {
    const result = await resolveEvents(cacheEvents, [
      { type: "product" },
      { type: "product", id: "website-check", lang: "de" },
      { type: "product", id: "website-review", lang: "en" },
      { type: "category", id: "leistungspakete" },
    ]);
    expect(result.unknown).toEqual([]);
    expect(result.paths).toEqual(expect.arrayContaining([
      "/", "/en/", "/llms.txt", "/sitemap-products.xml",
      "/produkt/website-check", "/en/product/website-review",
      "/kategorie/leistungspakete", "/en/category/leistungspakete",
    ]));
    expect(result.paths).not.toContain("/en/product/website-check");
    expect(result.paths.some((path) => path.includes("/kasse"))).toBe(false);
  });
});
