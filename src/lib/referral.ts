/**
 * Empfehlungslinks (`?ref=CODE`) without storing anything in the browser.
 *
 * ### Why the code rides in the URL instead of localStorage
 *
 * Remembering who recommended a visitor is not something they asked for, so a
 * stored code would need a consent under § 25 Abs. 1 TDDDG — and the only
 * fitting category, "Werbung", describes ad scripts, not referral attribution.
 * A consent given for one purpose does not cover another.
 *
 * So nothing is stored. The code stays in the address: on a page that was
 * opened with `?ref=`, every same-site link the visitor follows gets the same
 * parameter added at click time. It survives browsing within the visit, is
 * gone when they leave, and the checkout pre-fills its visible, editable code
 * field from the address. The page cache drops the query from its key, so the
 * parameter costs no extra render.
 */

export const REF_PARAM = "ref";

const CODE = /^[A-Za-z0-9-]{3,40}$/;

/** Paths whose links must never carry the code: the affiliate redirect leaves the site. */
const SKIP_PREFIXES = ["/go/"];

/** The code in an address, or null. Accepts a full URL or a `?…` search string. */
export function refFromUrl(href: string): string | null {
  let params: URLSearchParams;
  try {
    params = href.startsWith("?") ? new URLSearchParams(href) : new URL(href, "http://x.invalid").searchParams;
  } catch {
    return null;
  }
  const code = (params.get(REF_PARAM) ?? "").trim();
  return CODE.test(code) ? code.toUpperCase() : null;
}

/**
 * The link with the code added, or null when it must stay as it is: another
 * origin, a non-http scheme, an in-page anchor, the affiliate redirect, or a
 * link that already names a code.
 */
export function withRef(href: string, code: string, origin: string): string | null {
  if (!CODE.test(code) || href === "" || href.startsWith("#")) return null;
  let url: URL;
  try {
    url = new URL(href, origin);
  } catch {
    return null;
  }
  if (url.origin !== origin || (url.protocol !== "http:" && url.protocol !== "https:")) return null;
  if (SKIP_PREFIXES.some((p) => url.pathname.startsWith(p))) return null;
  if (url.searchParams.has(REF_PARAM)) return null;
  url.searchParams.set(REF_PARAM, code);
  return url.toString();
}

/**
 * On a page opened with `?ref=`, carry the code into every same-site link the
 * visitor follows. Rewrites the link at click time (left, middle and keyboard
 * activation all fire `click`/`auxclick`), never the markup up front, so the
 * server-rendered HTML stays identical for every visitor.
 */
export function installReferralCarry(win: Window = window): () => void {
  const code = refFromUrl(win.location.search);
  if (code === null) return () => {};
  const handler = (event: Event) => {
    const target = event.target as Element | null;
    const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!anchor || anchor.hasAttribute("download")) return;
    const next = withRef(anchor.getAttribute("href") ?? "", code, win.location.origin);
    if (next !== null) anchor.setAttribute("href", next);
  };
  win.document.addEventListener("click", handler, true);
  win.document.addEventListener("auxclick", handler, true);
  return () => {
    win.document.removeEventListener("click", handler, true);
    win.document.removeEventListener("auxclick", handler, true);
  };
}

/** Whose code is this? The public display name for "Empfohlen von …", or null. */
export async function lookupReferral(apiBase: string, code: string): Promise<{ code: string; name: string } | null> {
  if (!CODE.test(code)) return null;
  try {
    const res = await fetch(`${apiBase}/shop/referral/${encodeURIComponent(code)}`);
    if (!res.ok) return null;
    const body = (await res.json()) as { code?: string; name?: string };
    return body.code && body.name ? { code: body.code, name: body.name } : null;
  } catch {
    return null;
  }
}
