import { describe, expect, it } from "vitest";
import { quoteHref, quoteMessage } from "./quote";

describe("quote requests", () => {
  it("names the service and its starting price", () => {
    expect(quoteMessage("de", "Onepager", "1.040 €")).toContain("„Onepager“ (ab 1.040 € inkl. MwSt.)");
    expect(quoteMessage("en", "One-pager", null)).toContain('"One-pager". Please');
  });

  it("links to the contact form on the marketing site", () => {
    const url = new URL(
      quoteHref("de")({
        title: "Onepager",
        offers: [{ kind: "own", priceCents: 123800, currency: "EUR", priceCheckedAt: null }],
      } as never),
    );
    expect(url.origin).toBe("https://tracht-digital.de");
    expect(url.hash).toBe("#contact");
    expect(url.searchParams.get("anfrage")).toContain("„Onepager“");
  });
});
