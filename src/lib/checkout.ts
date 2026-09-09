import { apiBase } from "@tracht-digital-solutions/tds-shared/api";

import type { CartLine } from "./cart";
import type { Lang } from "./i18n";

/**
 * The checkout's client-side half.
 *
 * These calls go to `/shop/*` rather than `/content/shop/*` — a different
 * prefix on purpose. They are made by a **visitor's browser**, so they are not
 * site-key protected: a key that ships in a client bundle is not a key.
 *
 * ### Why `apiBase` comes from tds-shared and not from `./connection`
 *
 * `src/lib/connection.ts` is **server-only**. It calls `siteConnection()` at
 * module scope, which reads `process.env` and the filesystem-backed pairing
 * state — so importing it from an island drags that module into the client
 * bundle, where `process` does not exist and hydration dies with
 * "ReferenceError: process is not defined". The island then renders its server
 * HTML and never responds to a click, which is the worst shape of failure: the
 * page looks finished.
 *
 * This file was importing it, and every island that touches the checkout
 * imports this file — so the order form has never worked in a browser.
 *
 * The shared `apiBase()` is the browser-safe half: it reads the
 * `tds-api-base` meta tag that `Layout.astro` renders with the server's
 * resolved value, so runtime pairing through `/tds/connect` still applies and
 * there is no extra request. Server code keeps using `./connection`.
 */

/**
 * Which right of withdrawal a basket falls under. The server decides this from
 * what is actually in the basket and reports it on the quote — never inferred
 * in the browser, because it decides whether a consent is legally required.
 */
export type WithdrawalRegime = "digital" | "goods" | "mixed";

/**
 * The exact wording the customer agrees to, per regime.
 *
 * There are two different rights here and only one of them involves agreeing to
 * anything:
 *
 * - **goods** — fourteen days from receipt (§ 355, § 356 Abs. 2 Nr. 1 BGB).
 *   Nothing is asked of the customer; the right is not theirs to give up. What
 *   is stored is the INFORMATION given before the order (Art. 246a § 1 Abs. 2
 *   EGBGB), which is why this wording contains no "I lose".
 * - **digital** — the right lapses on full performance, but only against an
 *   express request to begin early plus an acknowledgement of what that costs
 *   (§ 356 Abs. 4 BGB).
 * - **mixed** — both, said separately, or the customer has agreed to something
 *   broader than what was meant.
 *
 * Whatever is displayed travels with the request, so the order records the
 * sentence the customer actually saw rather than the server's default of the
 * day.
 */
export const WITHDRAWAL_TEXT: Record<Lang, Record<WithdrawalRegime, string>> = {
  de: {
    digital:
      "Ich verlange ausdrücklich, dass Sie vor Ende der Widerrufsfrist mit der " +
      "Leistung beginnen. Mir ist bekannt, dass ich mein Widerrufsrecht mit " +
      "vollständiger Erbringung der Leistung verliere.",
    goods:
      "Sie haben das Recht, binnen vierzehn Tagen ab Erhalt der Ware ohne Angabe " +
      "von Gründen diesen Vertrag zu widerrufen. Die Widerrufsbelehrung und das " +
      "Muster-Widerrufsformular wurden mir vor der Bestellung zur Verfügung gestellt.",
    mixed:
      "Ich verlange ausdrücklich, dass Sie vor Ende der Widerrufsfrist mit der " +
      "Leistung beginnen. Mir ist bekannt, dass ich mein Widerrufsrecht mit " +
      "vollständiger Erbringung der Leistung verliere. Für die enthaltenen Waren " +
      "bleibt mein Widerrufsrecht von vierzehn Tagen ab Erhalt davon unberührt.",
  },
  en: {
    digital:
      "I expressly request that you begin performing the service before the " +
      "withdrawal period ends. I understand that I lose my right of withdrawal " +
      "once the service has been performed in full.",
    goods:
      "You have the right to withdraw from this contract within fourteen days of " +
      "receiving the goods, without giving any reason. The withdrawal policy and " +
      "the model withdrawal form were made available to me before ordering.",
    mixed:
      "I expressly request that you begin performing the service before the " +
      "withdrawal period ends. I understand that I lose my right of withdrawal " +
      "once the service has been performed in full. For any goods included, my " +
      "fourteen-day right of withdrawal from receipt is unaffected.",
  },
};

/** A delivery address. All-or-nothing — a half-filled one is a parcel that does not arrive. */
export interface DeliveryAddress {
  shipName: string;
  shipLine1: string;
  shipLine2?: string;
  shipPostcode: string;
  shipCity: string;
  shipCountry: string;
}

export interface QuoteLine {
  slug: string;
  title: string;
  quantity: number;
  netCents: number;
  taxCents: number;
  grossCents: number;
  requiresShipping: boolean;
}

export interface Quote {
  lines: QuoteLine[];
  shipping: {
    netCents: number;
    taxCents: number;
    grossCents: number;
    required: boolean;
    freeFromCents: number;
  };
  netCents: number;
  taxCents: number;
  grossCents: number;
  currency: string;
  withdrawalRegime: WithdrawalRegime;
  withdrawalConsentRequired: boolean;
  addressRequired: boolean;
}

/**
 * Price a basket without ordering anything.
 *
 * The basket page cannot add this up itself: the total includes delivery, which
 * depends on the free-shipping threshold and on an apportionment of tax across
 * the goods' VAT rates. A page that guessed would eventually show a different
 * number than the checkout charges, and that is worse than showing none.
 */
export async function quoteCart(lines: CartLine[], lang: Lang): Promise<Quote | { error: string }> {
  if (lines.length === 0) {
    return { error: "empty" };
  }
  try {
    const res = await fetch(`${apiBase()}/shop/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: lines, lang }),
    });
    const body = (await res.json().catch(() => ({}))) as Quote & { error?: string };
    if (!res.ok) return { error: body.error ?? `Fehler ${res.status}` };
    return body;
  } catch {
    return { error: "Keine Verbindung. Bitte später erneut versuchen." };
  }
}

export interface PaymentMethod {
  id: string;
  label: string;
}

/**
 * What the shop can actually complete right now.
 *
 * Rendered rather than hard-coded, so a method whose credentials are missing —
 * Wero until a provider is contracted — is simply not offered. An empty list is
 * a valid answer and means the checkout cannot proceed.
 */
export async function paymentMethods(): Promise<PaymentMethod[]> {
  try {
    const res = await fetch(`${apiBase()}/shop/payment-methods`);
    if (!res.ok) return [];
    const body = (await res.json()) as { methods?: PaymentMethod[] };
    return Array.isArray(body.methods) ? body.methods : [];
  } catch {
    return [];
  }
}

export interface CheckoutInput {
  /** The basket. A single-line order is just a basket of one. */
  items: CartLine[];
  lang: Lang;
  email: string;
  name?: string;
  country: string;
  /** Which regime applied, so the right wording is stored. From the quote. */
  regime: WithdrawalRegime;
  /** Only meaningful when the quote said one is required. */
  withdrawalConsent: boolean;
  /** Chosen payment method id. Omitted means "whatever the shop leads with". */
  provider?: string;
  /** Required when the quote said so; ignored otherwise. */
  address?: DeliveryAddress | null;
}

export interface CheckoutResult {
  url?: string;
  token?: string;
  error?: string;
}

/**
 * Start a payment.
 *
 * The exact wording shown on the page travels with the request, so the order
 * records the sentence the customer actually saw rather than whatever the
 * server's default happens to be today.
 */
export async function startCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  try {
    const res = await fetch(`${apiBase()}/shop/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        ...(input.address ?? {}),
        withdrawalText: WITHDRAWAL_TEXT[input.lang][input.regime],
      }),
    });
    const body = (await res.json().catch(() => ({}))) as CheckoutResult;
    if (!res.ok) {
      // Carry the server's own message: "nur nach Deutschland" is actionable,
      // "Fehler 422" is not.
      return { error: body.error ?? `Fehler ${res.status}` };
    }
    return body;
  } catch {
    return { error: "Keine Verbindung. Bitte später erneut versuchen." };
  }
}

export interface OrderItem {
  title: string;
  quantity?: number;
  gross_cents: number;
  requires_shipping?: number | boolean;
}

export interface OrderView {
  order_no: string;
  email: string;
  status: "pending" | "paid" | "refunded" | "failed";
  net_cents: number;
  tax_cents: number;
  gross_cents: number;
  currency: string;
  created_at: string;
  withdrawal_consent_text: string | null;
  shipping_gross_cents?: number;
  ship_name?: string | null;
  ship_line1?: string | null;
  ship_line2?: string | null;
  ship_postcode?: string | null;
  ship_city?: string | null;
  ship_country?: string | null;
  items: OrderItem[];
}

/** Read an order back. The token IS the authorisation — a guest has no account. */
export async function getOrder(token: string): Promise<OrderView | null> {
  try {
    const res = await fetch(`${apiBase()}/shop/order/${encodeURIComponent(token)}`);
    if (!res.ok) return null;
    return (await res.json()) as OrderView;
  } catch {
    return null;
  }
}

export function formatPrice(cents: number, currency: string, lang: Lang): string {
  try {
    return new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-GB", {
      style: "currency",
      currency,
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency}`;
  }
}
