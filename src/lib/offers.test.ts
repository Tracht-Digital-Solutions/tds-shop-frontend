import { describe, expect, it } from "vitest";

import { cacheEvents } from "./cache";
import { quoteFailureMessage } from "./checkout";
import { langOfPath, tx } from "./i18n";
import { isExcludedPath } from "./indexing";
import { attributedOfferUrl } from "./offers";

describe("attributedOfferUrl", () => {
  it("adds source and lang to a site-relative redirect", () => {
    expect(attributedOfferUrl("/go/12", "de")).toBe("/go/12?source=shop&lang=de");
  });

  it("keeps an existing query instead of appending a second `?`", () => {
    expect(attributedOfferUrl("/go/12?x=1", "en", "sidebar")).toBe("/go/12?x=1&source=shop&lang=en&placement=sidebar");
  });

  it("leaves an absolute URL absolute", () => {
    expect(attributedOfferUrl("https://shop.tracht-digital.de/go/3", "de")).toBe(
      "https://shop.tracht-digital.de/go/3?source=shop&lang=de",
    );
  });
});

describe("cache events for legal blocks", () => {
  it("rebuilds every document in the registry, including the two the old list lost", () => {
    for (const key of ["versand", "barrierefreiheit", "impressum"]) {
      const paths = cacheEvents.block!({ type: "block", id: `legal_${key}`, lang: "de" } as never);
      expect(paths, key).toEqual([`/rechtliches/${key}`]);
    }
  });
});

describe("path helpers", () => {
  it("treats a bare /en as the English tree", () => {
    expect(langOfPath("/en")).toBe("en");
    expect(langOfPath("/en/cart")).toBe("en");
    expect(langOfPath("/entwurf")).toBe("de");
  });

  it("excludes from the index segment-wise, like the cache boundary", () => {
    expect(isExcludedPath("/install")).toBe(true);
    expect(isExcludedPath("/installation-service")).toBe(false);
    expect(isExcludedPath("/produkt/gossip-adapter")).toBe(false);
  });
});

describe("quoteFailureMessage", () => {
  it("does not call a network failure an unavailable item", () => {
    expect(quoteFailureMessage({ error: "failed" }, "de")).toBe(tx("de").cart.failed);
    expect(quoteFailureMessage({ error: "unavailable" }, "de")).toBe(tx("de").cart.gone);
    expect(quoteFailureMessage({ error: "empty" }, "de")).toBeNull();
  });
});
