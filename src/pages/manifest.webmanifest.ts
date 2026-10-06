import type { APIRoute } from "astro";
import { buildManifest, MANIFEST_HEADERS } from "@tracht-digital-solutions/tds-shared/pwa";

/** Installable shop (tds-shared/pwa). Prerendered — never varies per request. */
export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      buildManifest({
        name: "TD Shop — Technik für den Betrieb",
        shortName: "TD Shop",
        description: "Technik für den Betrieb, von uns eingeschätzt.",
        lang: "de",
        themeColor: "#fafaf7",
        backgroundColor: "#fafaf7",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", purpose: "any" },
          { src: "/icons/icon-512.png", sizes: "512x512", purpose: "any" },
          { src: "/icons/maskable-512.png", sizes: "512x512", purpose: "maskable" },
        ],
        shortcuts: [
          { name: "Warenkorb", url: "/warenkorb" },
          { name: "English", url: "/en/" },
        ],
        categories: ["business", "shopping"],
      }),
    ),
    { headers: MANIFEST_HEADERS },
  );
