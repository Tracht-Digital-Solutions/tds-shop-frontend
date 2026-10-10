// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";

import { installReferralCarry, lookupReferral, refFromUrl, withRef } from "./referral";

/**
 * Empfehlungslinks without browser storage: the code rides in the address and
 * is added to same-site links at click time. Storing it would need a consent
 * the banner cannot honestly ask for (see referral.ts).
 */

const ORIGIN = "https://shop.tracht-digital.de";

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

describe("reading the code", () => {
  it("accepts a plausible code and normalises its case", () => {
    expect(refFromUrl("?ref=anna-4821")).toBe("ANNA-4821");
    expect(refFromUrl(`${ORIGIN}/produkt/x?utm=1&ref=ANNA-4821`)).toBe("ANNA-4821");
  });

  it("ignores anything that cannot be a code", () => {
    expect(refFromUrl("?ref=ab")).toBeNull();
    expect(refFromUrl("?ref=%3Cscript%3E")).toBeNull();
    expect(refFromUrl("?other=1")).toBeNull();
  });
});

describe("carrying it to the next page", () => {
  it("adds the code to same-site links only", () => {
    expect(withRef("/kasse", "ANNA-1", ORIGIN)).toBe(`${ORIGIN}/kasse?ref=ANNA-1`);
    expect(withRef("/kategorie/x?page=2", "ANNA-1", ORIGIN)).toBe(`${ORIGIN}/kategorie/x?page=2&ref=ANNA-1`);
    expect(withRef("https://blog.tracht-digital.de/", "ANNA-1", ORIGIN)).toBeNull();
    expect(withRef("mailto:x@example.org", "ANNA-1", ORIGIN)).toBeNull();
    expect(withRef("#top", "ANNA-1", ORIGIN)).toBeNull();
  });

  it("never touches the affiliate redirect or a link that names its own code", () => {
    expect(withRef("/go/42", "ANNA-1", ORIGIN)).toBeNull();
    expect(withRef("/kasse?ref=PAUL-1", "ANNA-1", ORIGIN)).toBeNull();
  });

  it("rewrites the clicked link and stores nothing", () => {
    window.history.replaceState(null, "", "/produkt/x?ref=anna-1");
    const stop = installReferralCarry(window);
    document.body.innerHTML = '<a id="go" href="/warenkorb"><span id="inner">Warenkorb</span></a>';
    const setItem = vi.spyOn(Storage.prototype, "setItem");

    document.getElementById("inner")!.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

    expect(new URL(document.getElementById("go")!.getAttribute("href")!).searchParams.get("ref")).toBe("ANNA-1");
    expect(setItem).not.toHaveBeenCalled();
    stop();
  });

  it("does nothing on a page opened without a code", () => {
    window.history.replaceState(null, "", "/produkt/x");
    installReferralCarry(window);
    document.body.innerHTML = '<a id="go" href="/warenkorb">Warenkorb</a>';
    document.getElementById("go")!.click();
    expect(document.getElementById("go")!.getAttribute("href")).toBe("/warenkorb");
  });
});

describe("naming the partner", () => {
  it("asks the shop API and returns the public name", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ code: "ANNA-1", name: "Anna B." }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(lookupReferral("https://api.example", "ANNA-1")).resolves.toEqual({ code: "ANNA-1", name: "Anna B." });
    expect(String((fetchMock.mock.calls[0] as unknown[])[0])).toBe("https://api.example/shop/referral/ANNA-1");
  });

  it("treats an unknown code or a dead API as no partner", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 404 })));
    await expect(lookupReferral("https://api.example", "NOBODY")).resolves.toBeNull();
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("offline"))));
    await expect(lookupReferral("https://api.example", "ANNA-1")).resolves.toBeNull();
    await expect(lookupReferral("https://api.example", "<x>")).resolves.toBeNull();
  });
});
