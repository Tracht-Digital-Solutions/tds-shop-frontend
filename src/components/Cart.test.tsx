// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CART_KEY, readCart } from "../lib/cart";
import Cart from "./Cart";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

function quote(quantity: number) {
  return {
    lines: [{ slug: "router", title: "Router", quantity, netCents: 1000, taxCents: 190, grossCents: 1190, requiresShipping: false }],
    shipping: { netCents: 0, taxCents: 0, grossCents: 0, required: false, freeFromCents: 0 },
    netCents: 1000,
    taxCents: 190,
    grossCents: 1190,
    currency: "EUR",
    withdrawalRegime: "digital",
    withdrawalConsentRequired: true,
    addressRequired: false,
  };
}

describe("Cart quantity field", () => {
  it("keeps the line while the field is cleared to type a new number", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(quote(2)), { status: 200 })));
    window.localStorage.setItem(CART_KEY, JSON.stringify([{ slug: "router", quantity: 2 }]));

    render(<Cart lang="de" checkoutHref="/kasse" />);
    const input = await screen.findByRole("spinbutton");

    fireEvent.change(input, { target: { value: "" } });
    expect(readCart()).toEqual([{ slug: "router", quantity: 2 }]);

    fireEvent.change(input, { target: { value: "5" } });
    expect(readCart()).toEqual([{ slug: "router", quantity: 5 }]);

    fireEvent.change(input, { target: { value: "500" } });
    expect(readCart()).toEqual([{ slug: "router", quantity: 99 }]);

    // Let the debounced quote settle so no state update lands after cleanup.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });
  });

  it("does not call a failed quote an unavailable item", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 503 })));
    window.localStorage.setItem(CART_KEY, JSON.stringify([{ slug: "router", quantity: 1 }]));

    render(<Cart lang="de" checkoutHref="/kasse" />);
    const alert = await screen.findByRole("alert", undefined, { timeout: 2000 });
    expect(alert.textContent).toContain("nicht berechnet");
  });
});
