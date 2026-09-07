import type { APIRoute } from "astro";

import { connectResponse } from "../../lib/connection";

export const prerender = false;

/** One-time API pairing, driven by the /install wizard. */
export const POST: APIRoute = ({ request }) => connectResponse(request);
