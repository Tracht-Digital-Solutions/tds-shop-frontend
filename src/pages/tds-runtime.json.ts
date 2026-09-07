import type { APIRoute } from "astro";

import { publicRuntimeResponse } from "../lib/connection";

export const prerender = false;

/**
 * The runtime config the browser reads.
 *
 * Carries the API base, the login URL and the live-chat frontend id — and
 * deliberately NOT the site key or the cache token. This file sits in the
 * public document root; a secret in it would be published.
 */
export const GET: APIRoute = () => publicRuntimeResponse();
