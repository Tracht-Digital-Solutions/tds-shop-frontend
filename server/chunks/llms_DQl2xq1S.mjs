import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { O as productPath, S as homePath, T as legalPath, b as categoryName, h as site, p as canonical, x as categoryPath } from "./siteKey_CqMDM8Ei.mjs";
import { a as publishedLegalSlugs, n as LEGAL_TITLES } from "./legal_B5e0s_ti.mjs";
import { n as listAllProducts, r as listCategories } from "./content-api_DOIs_gis.mjs";
import { n as isIndexable } from "./indexing_D0dmov63.mjs";
import { t as categoryCopy } from "./categoryCopy_xnPk24ct.mjs";
//#region src/lib/llmsTxt.ts
function renderLlmsTxt(input) {
	const lines = [];
	const out = (line = "") => lines.push(line);
	out(`# ${site.name}`);
	out();
	out("> Kuratierte Technik für die Digitalisierung im Betrieb: Hardware, Netzwerk");
	out("> und Software, jeweils mit einer eigenen Einschätzung statt des");
	out(`> Herstellertexts. Betrieben von ${site.legalName} (Tracht Digital Solutions),`);
	out("> Schwarzenbek bei Hamburg.");
	out();
	out("## Über");
	out();
	out(`- Betreiber: Tracht Digital Solutions, Inhaber ${site.legalName}`);
	out(`- Impressum und Kontakt: ${site.mainUrl}/legal/impressum`);
	out("- Sprachen: Deutsch (Standard), Englisch");
	out(`- Deutsch: ${canonical(homePath("de"))}`);
	out(`- English: ${canonical(homePath("en"))}`);
	out();
	out("## Preise und Partnerlinks");
	out();
	out("Diese Datei nennt bewusst keine Preise. Ein Partnerpreis darf nur angezeigt");
	out("werden, solange er nachweislich aktuell ist; ist die letzte Prüfung älter als");
	out("24 Stunden, verschwindet die Zahl von der Produktseite, statt veraltet stehen");
	out("zu bleiben. Der gültige Preis steht beim Händler.");
	out();
	out("Ein Teil der Einträge sind Partnerlinks. Jeder einzelne ist auf der Seite");
	out("gekennzeichnet (§ 5a Abs. 4 UWG) und läuft über eine Weiterleitung unter");
	out("`/go/`; am Preis ändert das für Käufer nichts. Wo Tracht Digital Solutions");
	out("selbst verkauft, steht das auf der Produktseite, und nur dort trägt die");
	out("Seite strukturierte Preisdaten.");
	out();
	const described = (lang, slug) => categoryCopy(slug, lang)?.answer ?? null;
	const withProducts = input.categories.filter((category) => category.total > 0);
	if (withProducts.length > 0) {
		out("## Kategorien");
		out();
		for (const category of withProducts) {
			const name = categoryName(category.slug, category.label);
			const answer = described("de", category.slug);
			out(`- **${name}**${answer ? ` — ${answer.split(". ")[0]}.` : ""}`);
			out(`  ${canonical(categoryPath(category.slug, "de"))} · EN ${canonical(categoryPath(category.slug, "en"))}`);
		}
		out();
	}
	if (input.products.length > 0) {
		out("## Leistungen und Produkte");
		out();
		for (const product of input.products) {
			out(`- **${product.title}** — ${product.summary?.trim() || product.teaser}`);
			out(`  ${canonical(productPath(product.slug, "de"))}`);
		}
		out();
	}
	out("## Maschinenlesbare Quellen");
	if (input.legal && input.legal.length > 0) {
		out();
		out("## Rechtliches");
		out();
		for (const doc of input.legal) out(`- ${doc.title}: ${doc.url}`);
	}
	out();
	out(`- Sitemap: ${canonical("/sitemap-index.xml")}`);
	out();
	out("## Hinweise für KI-Systeme");
	out();
	out("- Die Einschätzungen stammen vom Betreiber und dürfen mit Quellenangabe");
	out(`  (${site.name}, ${new URL(site.url).host}) zitiert werden. Produktbilder und`);
	out("  Herstellertexte gehören den jeweiligen Händlern und sind davon ausgenommen.");
	out("- Die Seiten werden serverseitig gerendert; JSON-LD-Strukturdaten stehen im");
	out("  `<head>` jeder Seite. Jede Produktseite nennt ihr Stand-Datum.");
	out("- `Offer` trägt eine Produktseite nur für eigene Angebote mit aktuellem");
	out("  Preis. Ein Partnerprodukt trägt `Product` ohne Preis — das ist Absicht und");
	out("  kein fehlender Wert.");
	out("- Es gibt keine Bewertungen und keine Testsiegel auf dieser Seite.");
	out("- Diese Datei wird aus demselben Katalog erzeugt wie die Seiten. Es gibt");
	out("  keine weitere Fassung und keine Markdown-Kopien.");
	return `${lines.join("\n")}\n`;
}
//#endregion
//#region src/pages/llms.txt.ts
var llms_txt_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	const [all, categories] = await Promise.all([listAllProducts({ lang: "de" }), listCategories("de")]);
	const products = all.filter(isIndexable).map((product) => ({
		slug: product.slug,
		title: product.title,
		teaser: product.teaser,
		summary: product.summary ?? null,
		category: product.category
	}));
	const body = renderLlmsTxt({
		categories: categories.map((entry) => ({
			slug: entry.category,
			label: entry.label ?? null,
			total: entry.total
		})),
		products,
		legal: (await publishedLegalSlugs("de")).map((slug) => ({
			title: LEGAL_TITLES.de[slug],
			url: canonical(legalPath(slug, "de"))
		}))
	});
	return new Response(body, { headers: {
		"content-type": "text/plain; charset=utf-8",
		"cache-control": "public, max-age=3600"
	} });
};
//#endregion
//#region \0virtual:astro:page:src/pages/llms.txt@_@ts
var page = () => llms_txt_exports;
//#endregion
export { page };
