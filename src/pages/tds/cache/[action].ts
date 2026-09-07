import type { APIRoute } from "astro";

import { siteCache } from "../../../lib/pageCache";

export const prerender = false;

/**
 * The page-cache control plane: `status`, `rebuild`, `purge`.
 *
 * Must be a real route rather than middleware — Astro answers 404 for an
 * unmatched path before middleware runs — and cannot live under `_cache/`,
 * because Astro excludes `_`-prefixed segments from routing. A POST must carry
 * `Content-Type: application/json` or `security.checkOrigin` rejects it.
 */
const handle: APIRoute = ({ params, request, url }) =>
  siteCache.control(String(params.action ?? ""), request, url);

export const GET = handle;
export const POST = handle;
