import { useEffect, useState } from "react";

import type { CartLine } from "../lib/cart";
import { quoteCart, quoteFailureMessage, type Quote } from "../lib/checkout";
import type { Lang } from "../lib/i18n";

export interface QuoteState {
  quote: Quote | null;
  /** A sentence for the reader, or null. */
  error: string | null;
  /** Counts successful re-quotes, so a figure can replay its highlight. */
  settled: number;
}

/**
 * Price `lines` whenever they change — the one quote loop the basket and the
 * checkout share.
 *
 * Each run is debounced by `delayMs` and **superseded** by the next: the
 * cleanup marks the in-flight request stale, so an older answer arriving late
 * can no longer overwrite a newer quote, or set one after the basket was
 * emptied. Both components used to fire `quoteCart` without that guard.
 *
 * The OLD quote stays on screen while a new one is in flight: blanking the
 * totals on every keypress makes the page flicker and briefly removes the
 * figures the checkout button sits next to.
 */
export function useQuote(lines: CartLine[] | null, lang: Lang, delayMs = 0): QuoteState {
  const [state, setState] = useState<QuoteState>({ quote: null, error: null, settled: 0 });

  useEffect(() => {
    if (lines === null) return;
    if (lines.length === 0) {
      setState((s) => ({ ...s, quote: null, error: null }));
      return;
    }

    let current = true;
    const timer = setTimeout(() => {
      void quoteCart(lines, lang).then((result) => {
        if (!current) return;
        if ("error" in result) {
          setState((s) => ({ ...s, quote: null, error: quoteFailureMessage(result, lang) }));
        } else {
          setState((s) => ({ quote: result, error: null, settled: s.settled + 1 }));
        }
      });
    }, delayMs);

    return () => {
      current = false;
      clearTimeout(timer);
    };
  }, [lines, lang, delayMs]);

  return state;
}
