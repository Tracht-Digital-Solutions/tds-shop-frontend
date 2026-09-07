import { describe, expect, it } from "vitest";

import { asGraph, productSchema } from "./jsonld";
import { isExcludedPath, isIndexable } from "./indexing";
import { clampToWord, describe as describeText, MAX_LENGTH, MIN_LENGTH } from "./metaDescription";
import { pageTitle } from "./seo";
import { isNeverCached } from "./noCache";
import type { ProductPage } from "./types";

/**
 * The rules whose failure is invisible.
 *
 * Every assertion here guards something that renders perfectly when it is
 * wrong: an indexed page that should not be, a price in structured data that
 * cannot stay true, a checkout page in a shared cache.
 */

const NOW = Date.parse("2026-09-07T12:00:00.000Z");
const HOUR = 3_600_000;

function product(overrides: Partial<ProductPage> = {}): ProductPage {
  return {
    slug: "nas-4-bay",
    lang: "de",
    title: "NAS mit vier Einschüben",
    teaser: "Netzwerkspeicher für kleine Büros.",
    category: "netzwerk",
    imageUrl: null,
    url: "https://shop.tracht-digital.de/produkt/nas-4-bay",
    offers: [],
    body: "",
    bodyFormat: "blocks",
    tags: [],
    metaDescription: null,
    publishedAt: null,
    updatedAt: null,
    machineTranslated: false,
    ...overrides,
  };
}

const offer = (over: Record<string, unknown> = {}) => ({
  id: 1,
  kind: "affiliate" as const,
  network: "amazon" as const,
  merchant: "Amazon",
  url: "https://shop.tracht-digital.de/go/1",
  priceCents: 34900,
  currency: "EUR",
  priceCheckedAt: new Date(NOW - HOUR).toISOString(),
  availability: "in_stock" as const,
  position: 0,
  ...over,
});

describe("the indexing gate", () => {
  it("indexes only a product with its own written assessment", () => {
    expect(isIndexable({ slug: "x", editorialStatus: "published" })).toBe(true);
    expect(isIndexable({ slug: "x", editorialStatus: "stub" })).toBe(false);
    expect(isIndexable({ slug: "x", editorialStatus: "none" })).toBe(false);
  });

  it("treats a missing status as not indexable", () => {
    // The dangerous default. An older API payload without the field must not
    // let three hundred imported ASINs into the index by omission.
    expect(isIndexable({ slug: "x" })).toBe(false);
    expect(isIndexable(null)).toBe(false);
  });

  it("keeps personal and transient paths out of any index", () => {
    for (const path of ["/go/12", "/kasse", "/en/checkout", "/konto/downloads", "/install"]) {
      expect(isExcludedPath(path), path).toBe(true);
    }
    for (const path of ["/", "/produkt/nas-4-bay", "/kategorie/netzwerk", "/en/"]) {
      expect(isExcludedPath(path), path).toBe(false);
    }
  });

  it("does not mistake a product slug that merely starts alike", () => {
    // `/gossip` must not match the `/go/` prefix.
    expect(isExcludedPath("/produkt/gossip-adapter")).toBe(false);
  });
});

describe("the cache boundary", () => {
  it("never caches a page that belongs to one visitor", () => {
    // The worst failure this repository can have: a cached checkout shows the
    // next visitor the previous one's order, and it looks like a working page.
    for (const path of [
      "/warenkorb",
      "/kasse",
      "/bestellung/abc",
      "/konto/downloads",
      "/en/cart",
      "/en/checkout",
      "/en/order/abc",
      "/go/12",
    ]) {
      expect(isNeverCached(path), path).toBe(true);
    }
  });

  it("does cache the pages that are the same for everybody", () => {
    for (const path of ["/", "/en/", "/produkt/nas-4-bay", "/kategorie/netzwerk", "/sitemap-0.xml"]) {
      expect(isNeverCached(path), path).toBe(false);
    }
  });
});

describe("structured data", () => {
  it("emits no Offer for an affiliate product, however fresh the price", () => {
    // The decision this file exists to protect. A marked-up affiliate price
    // disagrees with the merchant's sooner or later — and the 24-hour licence
    // rule makes a permanently correct one structurally impossible, because the
    // price legitimately disappears from the page overnight.
    const node = productSchema(product({ offers: [offer()] }), "de", NOW);
    expect(node.offers).toBeUndefined();
    expect(node["@type"]).toBe("Product");
  });

  it("emits an Offer for our own product when the price may be shown", () => {
    const node = productSchema(product({ offers: [offer({ kind: "own" })] }), "de", NOW);
    expect(Array.isArray(node.offers)).toBe(true);
    expect((node.offers as Record<string, unknown>[])[0]?.price).toBe("349.00");
  });

  it("emits no Offer for our own product once the quote has expired", () => {
    // Structured data must not outlive the price it quotes.
    const stale = offer({ kind: "own", priceCheckedAt: new Date(NOW - 25 * HOUR).toISOString() });
    expect(productSchema(product({ offers: [stale] }), "de", NOW).offers).toBeUndefined();
  });

  it("owns @context exactly once, at the graph", () => {
    const graph = asGraph([productSchema(product(), "de", NOW), null, undefined]);
    expect(graph["@context"]).toBe("https://schema.org");
    for (const node of graph["@graph"] as Record<string, unknown>[]) {
      expect(node["@context"]).toBeUndefined();
    }
    expect((graph["@graph"] as unknown[]).length).toBe(1);
  });
});

describe("titles and descriptions", () => {
  it("keeps the brand when the whole title fits", () => {
    expect(pageTitle("NAS mit vier Einschüben")).toBe("NAS mit vier Einschüben — TDShop");
  });

  it("drops the BRAND, never the subject, when it does not", () => {
    // A truncated result that keeps "— TDShop" and loses the product name is a
    // result nobody can identify.
    const long = "Ein außerordentlich ausführlich benanntes Netzwerkspeichergerät für Büros";
    expect(pageTitle(long)).toBe(long);
    expect(pageTitle(long)).not.toContain("TDShop");
  });

  it("clamps to a whole word and marks the cut", () => {
    const clamped = clampToWord("a".repeat(40) + " " + "b".repeat(200), 60);
    expect(clamped.length).toBeLessThanOrEqual(60);
    expect(clamped.endsWith("…")).toBe(true);
    expect(clamped).not.toMatch(/[\s,;:.]…$/);
  });

  it("tops a short lead up rather than shipping a stub", () => {
    // A 40-character description is worse than none: it looks deliberate.
    const text = describeText("Kurz.", "Ein deutlich längerer Zusatz, der die Beschreibung auf eine brauchbare Länge bringt.");
    expect(text.length).toBeGreaterThanOrEqual(MIN_LENGTH);
    expect(text.length).toBeLessThanOrEqual(MAX_LENGTH);
  });

  it("never exceeds the budget even from one long lead", () => {
    expect(describeText("x ".repeat(400)).length).toBeLessThanOrEqual(MAX_LENGTH);
  });
});
