import {
  connectionStatusResponse,
  runtimeConfigResponse,
  siteConnection,
} from "@tracht-digital-solutions/tds-shared/connection";

const DEFAULT_API_BASE = "https://api.tracht-digital.de";
const DEFAULT_LOGIN_URL = "https://auth.tracht-digital.de";

function buildApiBase(): string {
  return ((import.meta.env.PUBLIC_API_URL as string | undefined) ?? DEFAULT_API_BASE)
    .trim()
    .replace(/\/+$/, "");
}

/**
 * Where the account menu sends a visitor who is not signed in.
 *
 * Configured rather than hard-coded so a non-production build does not send
 * people to the live login — the sibling sites learned that one by having two
 * halves of the same bundle disagree about where login lives.
 */
function buildLoginUrl(): string {
  return (
    ((import.meta.env.PUBLIC_LOGIN_URL as string | undefined) ?? DEFAULT_LOGIN_URL)
      .trim()
      .replace(/\/+$/, "") || DEFAULT_LOGIN_URL
  );
}

/**
 * The paired API connection.
 *
 * The site key is paired at runtime through `/tds/connect` and stored outside
 * the checkout — `TDS_SITE_KEY` remains only as a host fallback. It is read
 * from `process.env`, never `import.meta.env`: Astro inlines only `PUBLIC_*`
 * names, so the latter silently yields `undefined` and the site runs keyless
 * without saying so.
 */
export const connection = siteConnection({
  profile: "shop",
  fallbackApiBase: buildApiBase,
  fallbackSiteKey: () => process.env.TDS_SITE_KEY ?? "",
  fallbackCacheToken: () => process.env.TDS_CACHE_TOKEN ?? "",
  fallbackRuntime: () => ({
    apiBase: buildApiBase(),
    loginUrl: buildLoginUrl(),
    liveChatFrontend: "shop",
  }),
});

export const apiBase = (): string => connection.apiBase() || DEFAULT_API_BASE;

/** The content root. Every catalogue read hangs off this. */
export const contentApiBase = (): string => `${apiBase()}/content`;

export const connectResponse = (request: Request): Promise<Response> =>
  connection.handleConnect(request);
export const connectStatusResponse = (): Response => connectionStatusResponse(connection);
export const publicRuntimeResponse = (): Response => runtimeConfigResponse(connection);
