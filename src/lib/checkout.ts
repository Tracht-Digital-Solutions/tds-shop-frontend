import { apiBase } from "./connection";
import type { Lang } from "./i18n";

/**
 * The checkout's client-side half.
 *
 * These calls go to `/shop/*` rather than `/content/shop/*` — a different
 * prefix on purpose. They are made by a **visitor's browser**, so they are not
 * site-key protected: a key that ships in a client bundle is not a key.
 */

/** The exact wording the customer agrees to, § 356 Abs. 4 BGB. */
export const WITHDRAWAL_TEXT: Record<Lang, string> = {
  de:
    "Ich verlange ausdrücklich, dass Sie vor Ende der Widerrufsfrist mit der " +
    "Leistung beginnen. Mir ist bekannt, dass ich mein Widerrufsrecht mit " +
    "vollständiger Erbringung der Leistung verliere.",
  en:
    "I expressly request that you begin performing the service before the " +
    "withdrawal period ends. I understand that I lose my right of withdrawal " +
    "once the service has been performed in full.",
};

export interface CheckoutInput {
  slug: string;
  lang: Lang;
  email: string;
  name?: string;
  country: string;
  withdrawalConsent: boolean;
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
      body: JSON.stringify({ ...input, withdrawalText: WITHDRAWAL_TEXT[input.lang] }),
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
  gross_cents: number;
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
