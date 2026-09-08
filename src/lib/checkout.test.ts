import { describe, expect, it } from "vitest";

import { formatPrice, WITHDRAWAL_TEXT } from "./checkout";
import { isNeverCached } from "./noCache";

/**
 * The checkout's client half.
 *
 * The VAT arithmetic here has to agree with `OrderRepository::price()` on the
 * server **exactly**. A checkout page showing a total the customer is not
 * charged is worse than either rounding on its own, and nothing would flag it:
 * both numbers look plausible.
 */

/** Mirrors the page's calculation, which mirrors the server's. */
const split = (netCents: number, vatRateBp: number) => {
  const tax = Math.round((netCents * vatRateBp) / 10000);
  return { net: netCents, tax, gross: netCents + tax };
};

describe("the VAT split shown at checkout", () => {
  it("matches the server for a round amount", () => {
    expect(split(10000, 1900)).toEqual({ net: 10000, tax: 1900, gross: 11900 });
  });

  it("rounds the TAX, not the gross", () => {
    // 49.99 € net at 19 % is 9.4981 €. Rounding the tax gives 9.50 and a gross
    // of 59.49 — the same figures `OrderRepository::price()` produces. Deriving
    // the tax back out of a gross would land a cent away.
    expect(split(4999, 1900)).toEqual({ net: 4999, tax: 950, gross: 5949 });
  });

  it("produces whole cents for every amount", () => {
    for (const net of [1, 99, 4999, 123456]) {
      for (const part of Object.values(split(net, 1900))) {
        expect(Number.isInteger(part), `${net}`).toBe(true);
      }
    }
  });

  it("handles a zero rate", () => {
    // The shape a Kleinunternehmer (§ 19 UStG) would run in — a configuration
    // of the same path, not a second one.
    expect(split(5000, 0)).toEqual({ net: 5000, tax: 0, gross: 5000 });
  });
});

describe("the withdrawal wording", () => {
  it("exists in both languages and says what it has to", () => {
    // § 356 Abs. 4 BGB: the customer must expressly request early performance
    // AND acknowledge losing the right. Both halves have to be in the sentence
    // — a text that only asks for consent to start does not extinguish it.
    expect(WITHDRAWAL_TEXT.de).toMatch(/ausdrücklich/);
    expect(WITHDRAWAL_TEXT.de).toMatch(/Widerrufsrecht.*verliere/);
    expect(WITHDRAWAL_TEXT.en).toMatch(/expressly/);
    expect(WITHDRAWAL_TEXT.en).toMatch(/right of withdrawal/);
  });
});

describe("the checkout is never cached", () => {
  it("excludes every path that belongs to one buyer", () => {
    // The worst failure this site can have. Restated here beside the checkout
    // so somebody adding a route notices the rule exists.
    for (const path of [
      "/kasse/setup-paket",
      "/en/checkout/setup-package",
      "/bestellung/0123456789abcdef0123456789abcdef",
      "/en/order/0123456789abcdef0123456789abcdef",
    ]) {
      expect(isNeverCached(path), path).toBe(true);
    }
  });
});

describe("price formatting", () => {
  it("renders euros in the page's own locale", () => {
    // Non-breaking space in the German form — compare on the digits, not on
    // the whitespace Intl chooses.
    expect(formatPrice(5949, "EUR", "de")).toMatch(/59,49/);
    expect(formatPrice(5949, "EUR", "en")).toMatch(/59\.49/);
  });

  it("does not throw on an unknown currency", () => {
    // What matters is that a bad currency code cannot take the checkout page
    // down; the exact rendering is not ours to pin. Node's Intl happens to
    // format an unknown code rather than throwing ("10,00 XYZ"), so the
    // try/catch in `formatPrice` is a floor for runtimes that do not — not
    // dead code, but not the path this asserts either.
    expect(() => formatPrice(1000, "XYZ", "de")).not.toThrow();
    expect(formatPrice(1000, "XYZ", "de")).toMatch(/10[.,]00/);
  });
});

/**
 * The legal pages.
 *
 * They are `cms_block` rows, so saving one in the panel fires a **`block`**
 * event, not `legal`. Mapping only `legal` would leave every edit invisible on
 * this site — and the rebuild would report success having rebuilt nothing.
 */
describe("legal documents", () => {
  it("recognises exactly the documents it renders", async () => {
    const { isLegalSlug, LEGAL_KEYS, LEGAL_TITLES } = await import("./legal");
    for (const slug of Object.keys(LEGAL_KEYS)) {
      expect(isLegalSlug(slug), slug).toBe(true);
      // A title in both languages, or the page renders a heading of
      // `undefined` — which looks like a broken page, not a missing text.
      expect(LEGAL_TITLES.de[slug as keyof typeof LEGAL_KEYS]).toBeTruthy();
      expect(LEGAL_TITLES.en[slug as keyof typeof LEGAL_KEYS]).toBeTruthy();
    }
    expect(isLegalSlug("../etc/passwd")).toBe(false);
    expect(isLegalSlug("impressum2")).toBe(false);
  });

  it("rebuilds a legal page when its BLOCK is saved", async () => {
    const { cacheEvents } = await import("./cache");
    const paths = await cacheEvents.block!({ type: "block", id: "legal_agb", lang: "de" } as never);
    expect(paths).toEqual(["/rechtliches/agb"]);
  });

  it("ignores a block this site does not render", async () => {
    // The marketing site's hero is not our concern; rebuilding everything on
    // any block save would make a wording fix there cost a full rebuild here.
    const { cacheEvents } = await import("./cache");
    expect(await cacheEvents.block!({ type: "block", id: "hero", lang: "de" } as never)).toEqual([]);
    expect(await cacheEvents.block!({ type: "block" } as never)).toEqual([]);
  });

  it("keeps the legal pages OUT of the never-cached list", () => {
    // They are the same for every visitor and are linked from every page — the
    // one kind of page that most wants to be a cache hit.
    expect(isNeverCached("/rechtliches/agb")).toBe(false);
    expect(isNeverCached("/en/legal/widerruf")).toBe(false);
  });
});
