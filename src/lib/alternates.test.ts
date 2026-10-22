import { describe, expect, it, vi } from "vitest";

const getProduct = vi.fn();
vi.mock("./content-api", () => ({ getProduct: (...args: unknown[]) => getProduct(...args), listCategories: vi.fn() }));

const { productAlternate, productPairKey } = await import("./alternates");
const { canonical } = await import("./seo");
const { productPath } = await import("./i18n");

/**
 * A product's translation may live under a different slug. The API names it in
 * `alternateSlug`, and the page, the sitemap and llms.txt must all pair on it
 * the same way (tds-shop-frontend#2: 172 hreflang warnings).
 */
describe("product twins", () => {
  it("links the twin the API names, without a second read", async () => {
    getProduct.mockClear();
    const alt = await productAlternate({ slug: "webauftritt", alternateSlug: "website" }, "de");
    expect(alt).toBe(canonical(productPath("website", "en")));
    expect(getProduct).not.toHaveBeenCalled();
  });

  it("ships no alternate when the API says there is no twin", async () => {
    getProduct.mockClear();
    expect(await productAlternate({ slug: "nur-deutsch", alternateSlug: null }, "de")).toBeNull();
    expect(getProduct).not.toHaveBeenCalled();
  });

  it("probes the same slug on an older API without the field", async () => {
    getProduct.mockReset().mockResolvedValue({ slug: "gleich" });
    expect(await productAlternate({ slug: "gleich" }, "en")).toBe(canonical(productPath("gleich", "de")));
    expect(getProduct).toHaveBeenCalledWith("gleich", "de");
  });

  it("gives both sides of a pair the same key", () => {
    expect(productPairKey({ slug: "webauftritt", alternateSlug: "website" }, "de")).toBe(
      productPairKey({ slug: "website", alternateSlug: "webauftritt" }, "en"),
    );
  });

  it("never pairs two unrelated products that happen to share a slug", () => {
    expect(productPairKey({ slug: "x", alternateSlug: null }, "de")).not.toBe(
      productPairKey({ slug: "x", alternateSlug: null }, "en"),
    );
  });
});
