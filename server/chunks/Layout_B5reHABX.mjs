import { A as renderTemplate, At as object, B as createAstro, D as renderSlot, Dt as array, Et as _enum, M as renderHead, N as addAttribute, Ot as boolean, P as createRenderInstruction, R as unescapeHTML, T as Fragment$2, j as maybeRenderHead, jt as string, kt as number, w as renderComponent } from "./sequence_CulRNmGV.mjs";
import { t as createComponent } from "./compiler_nZpybwjH.mjs";
import { C as legalPath, D as tx, b as homePath, d as canonical, f as pageTitle, g as propertyNav, h as propertyContact, m as siteLinks, o as serializeJsonLd, p as site } from "./siteKey_DsnQNcL9.mjs";
import { n as LEGAL_TITLES, t as LEGAL_KEYS } from "./legal_Ds_DlrCk.mjs";
import { t as apiBase$1 } from "./connection_DUQTvDW1.mjs";
import { t as isExcludedPath } from "./indexing_D0dmov63.mjs";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { flushSync } from "react-dom";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-GEUXWDQQ.js
var AD_CONSENT_KEY = "tds-ad-consent";
var AD_CONSENT_EVENT = "tds-ad-consent";
function getAdConsent() {
	if (typeof window === "undefined") return null;
	try {
		const v = window.localStorage.getItem(AD_CONSENT_KEY);
		return v === "granted" || v === "denied" ? v : null;
	} catch {
		return null;
	}
}
function setAdConsent(value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(AD_CONSENT_KEY, value);
	} catch {}
	try {
		window.dispatchEvent(new CustomEvent(AD_CONSENT_EVENT, { detail: value }));
	} catch {}
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-NUJAQE2D.js
var CONSENT_CATEGORIES = [
	"necessary",
	"functional",
	"analytics",
	"marketing"
];
var necessaryOnly = () => ({
	necessary: true,
	functional: false,
	analytics: false,
	marketing: false
});
var allGranted = () => ({
	necessary: true,
	functional: true,
	analytics: true,
	marketing: true
});
var isConsentCategory = (v) => typeof v === "string" && CONSENT_CATEGORIES.includes(v);
var CONSENT_KEY = "tds-consent";
var CONSENT_EVENT = "tds:consent-change";
var CONSENT_OPEN_EVENT = "tds:consent-open";
function readConsent() {
	if (typeof window === "undefined") return null;
	let raw = null;
	try {
		raw = window.localStorage.getItem(CONSENT_KEY);
	} catch {
		return null;
	}
	if (raw === null) return migrateLegacy();
	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return null;
	}
	const record = coerce(parsed);
	if (record === null) return null;
	if (record.v !== 1) return null;
	return record;
}
function migrateLegacy() {
	const legacy = getAdConsent();
	if (legacy === null) return null;
	return {
		v: 1,
		ts: null,
		lang: "de",
		choices: {
			...necessaryOnly(),
			marketing: legacy === "granted"
		}
	};
}
function coerce(value) {
	if (typeof value !== "object" || value === null) return null;
	const o = value;
	if (typeof o.v !== "number") return null;
	if (typeof o.choices !== "object" || o.choices === null) return null;
	const src = o.choices;
	const choices = necessaryOnly();
	for (const [k, v] of Object.entries(src)) if (isConsentCategory(k) && typeof v === "boolean") choices[k] = v;
	choices.necessary = true;
	return {
		v: o.v,
		ts: typeof o.ts === "string" ? o.ts : null,
		lang: typeof o.lang === "string" ? o.lang : "de",
		choices
	};
}
function writeConsent(choices, lang) {
	const record = {
		v: 1,
		ts: (/* @__PURE__ */ new Date()).toISOString(),
		lang,
		choices: {
			...choices,
			necessary: true
		}
	};
	if (typeof window === "undefined") return record;
	try {
		window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
	} catch {}
	setAdConsent(record.choices.marketing ? "granted" : "denied");
	try {
		window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }));
	} catch {}
	return record;
}
function openConsentSettings() {
	if (typeof window === "undefined") return;
	try {
		window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
	} catch {}
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-AOAPS4KA.js
var translations = {
	de: {
		nav: {
			about: "Über mich",
			services: "Leistungen",
			tech: "Tech",
			portfolio: "Portfolio",
			process: "Prozess",
			blog: "Journal",
			contact: "Kontakt",
			cta: "Unverbindlich anfragen",
			pricing: "Preise"
		},
		hero: {
			availability: "Verfügbar für Projekte · Q3 2026",
			location: "Schwarzenbek · Hamburg",
			headline: "Digitalisierung, die",
			headlineAccent: "Arbeit",
			headlineSuffix: "abnimmt.",
			sub: "Websites, Webshops und Werkzeuge für kleine Betriebe. Ich schaue, wo es hakt – und baue, was hilft. Aus Schwarzenbek bei Hamburg.",
			cta1: "Unverbindlich anfragen",
			cta2: "Leistungen ansehen",
			scrollHint: "Scrollen"
		},
		about: {
			label: "— 01 / Über mich",
			headline: "Hi, ich bin",
			headlineAccent: "Julian.",
			lead: "Ich bin freier Entwickler in Schwarzenbek bei Hamburg. Ich arbeite für Selbstständige und kleine Betriebe ohne eigene IT.",
			p1: "Website, Webshop, kleines Programm oder ein Ablauf, der einfacher werden soll: Ich höre zu, sortiere das Vorhaben und setze es um. Ein Ansprechpartner, von Anfang bis Ende.",
			p2: "Standardsoftware zwingt Sie, sich anzupassen. Ein gutes Werkzeug macht es andersherum. Manchmal ist die ehrliche Antwort: Es lohnt sich nicht.",
			portraitPlaceholder: "Hier könnte ein Schwarz-Weiß-Portrait von Julian stehen — schräg sitzend am Schreibtisch, leicht zur Kamera gewandt, naturnahes Licht.",
			stat1Value: "5+",
			stat1Label: "Jahre Erfahrung",
			stat2Value: "5",
			stat2Label: "Leistungsbereiche",
			stat3Value: "1:1",
			stat3Label: "Persönliche Betreuung"
		},
		services: {
			label: "— 02 / Leistungen",
			headline: "Was ich für Sie",
			headlineAccent: "leiste.",
			items: [
				{
					number: "01",
					title: "Digitalisierung für Unternehmen",
					description: "Listen von Hand, Zahlen aus drei Quellen, immer wieder abtippen. Ich nehme mir einen konkreten Ablauf vor und mache ihn einfacher – nicht gleich den ganzen Betrieb.",
					tags: [
						"Abläufe",
						"Auswertungen",
						"Automatisierung",
						"Schnittstellen"
					]
				},
				{
					number: "02",
					title: "Digitale Konzepte",
					description: "Sie haben eine Idee, aber noch keinen Plan. Ich mache daraus ein verständliches Konzept: was gebraucht wird, welcher Weg sinnvoll ist, was er kostet.",
					tags: [
						"Anforderungen",
						"Klickbarer Entwurf",
						"Aufwand",
						"Fahrplan"
					]
				},
				{
					number: "03",
					title: "Auftragsentwicklung",
					description: "Nicht jede Aufgabe braucht ein großes Programm. Oft reicht das Werkzeug, das zu Ihrer Arbeit passt: eine Excel-Vorlage, eine kleine Anwendung, eine Auswertung.",
					tags: [
						"Excel-Vorlage",
						"Kleine Anwendung",
						"Auswertung",
						"Datenübernahme"
					]
				},
				{
					number: "04",
					title: "Webauftritt",
					description: "Veraltet, unklar oder noch gar nicht da? Dann springen Interessenten ab, bevor sie anfragen. Ich baue neu, bringe Bestehendes auf Stand – und pflege es weiter.",
					tags: [
						"Neue Website",
						"Überarbeitung",
						"Pflege",
						"Auffindbarkeit"
					]
				},
				{
					number: "05",
					title: "Webshop",
					description: "Ihr Laden läuft, jetzt soll es online weitergehen. Ich plane, baue und betreue den Shop – auf Wunsch so, dass Artikel und Bestand vom Handy aus laufen.",
					tags: [
						"Onlineverkauf",
						"Produktpflege",
						"Bestand per Handy",
						"Betreuung"
					]
				}
			]
		},
		tech: {
			label: "Tech Stack",
			headline: "Womit ich",
			headlineAccent: "arbeite.",
			body: "Werkzeuge, die sich bewährt haben – keine Glaubensfrage, sondern das Richtige fürs Problem. Sprachen wechseln, gute Architektur bleibt."
		},
		portfolio: {
			label: "— 03 / Portfolio",
			headline: "Ausgewählte",
			headlineAccent: "Projekte.",
			comingSoon: "Demnächst",
			placeholderLabel: "Platzhalter",
			items: [
				{
					number: "01",
					badge: "Web-App",
					title: "Mittelstands-Plattform",
					description: "Eine maßgeschneiderte Webanwendung für einen mittelständischen Kunden – individuell entwickelt, skalierbar gebaut.",
					stack: [
						"Angular",
						"Node.js",
						"SQL"
					],
					imagePlaceholder: "Screenshot des Dashboards mit zentraler KPI-Übersicht, links Sidebar-Navigation, rechts ein Detailpanel."
				},
				{
					number: "02",
					badge: "Digitalisierung",
					title: "Prozess-Automatisierung",
					description: "Automatisierung manueller Geschäftsprozesse durch intelligente Workflows und Datenpipelines.",
					stack: [
						"Python",
						"KNIME",
						"SQL"
					],
					imagePlaceholder: "Workflow-Diagramm: KNIME-Knoten, die Daten aus drei Quellen zusammenführen, validieren und in eine SQL-Tabelle schreiben."
				},
				{
					number: "03",
					badge: "Web-Auftritt",
					title: "Markenpräsenz Mittelstand",
					description: "Professioneller Webauftritt für ein etabliertes Unternehmen – performant, barrierefrei, individuell.",
					stack: ["WordPress", "TypeScript"],
					imagePlaceholder: "Hero-Mockup der Kunden-Website auf Desktop und Mobile – ruhige Typografie, großes Schlüsselbild."
				},
				{
					number: "04",
					badge: "App",
					title: "Interne Business-App",
					description: "Desktop-Applikation zur internen Prozessverwaltung – intuitiv bedienbar, wartungsfreundlich dokumentiert.",
					stack: [
						"C#",
						"SQL",
						"Vue"
					],
					imagePlaceholder: "Screenshot der Desktop-App: Listenansicht der Aufträge mit Filterleiste oben und Detail-Panel rechts."
				}
			]
		},
		process: {
			label: "— 04 / Vorgehen",
			headline: "Wie ich",
			headlineAccent: "arbeite.",
			body: "Kein starrer Ablauf. Je nach Vorhaben verschiebt sich das Gewicht. Die vier Schritte sind der übliche Rahmen, kein Korsett.",
			steps: [
				{
					number: "01",
					title: "Zuhören",
					duration: "Zum Einstieg",
					description: "Sie schildern mir, wo es hakt. Ich frage nach – und sage ehrlich, ob sich eine Umsetzung lohnt."
				},
				{
					number: "02",
					title: "Konzept",
					duration: "Je nach Umfang",
					description: "Was wird gebraucht, welcher Weg ist sinnvoll, was kostet er? Die Grundlage steht, bevor Budget fließt."
				},
				{
					number: "03",
					title: "Umsetzung",
					duration: "Nach Absprache",
					description: "Ich baue es und zeige Ihnen Zwischenstände. Nachsteuern ist unterwegs günstig, hinterher teuer."
				},
				{
					number: "04",
					title: "Betreuung",
					duration: "Auf Wunsch",
					description: "Übergabe, Einweisung, auf Wunsch Pflege und Anpassungen. Ansprechpartner bleibe ich in jedem Fall."
				}
			]
		},
		blog: {
			label: "— 05 / Journal",
			headline: "Gedanken &",
			headlineAccent: "Artikel.",
			readMore: "Weiterlesen",
			allPosts: "Alle Artikel",
			placeholderLabel: "Platzhalter",
			posts: [
				{
					category: "Digitalisierung",
					title: "Digitalisierung fängt nicht beim Großprojekt an.",
					excerpt: "Sie fängt bei dem einen Ablauf an, der Sie jede Woche Stunden kostet – und den außer Ihnen niemand sieht.",
					date: "2026-08-04",
					slug: "digitalisierung-faengt-klein-an",
					imagePlaceholder: "Handgeschriebene Liste auf einem Klemmbrett neben einem Laptop – warmes Morgenlicht, Werkstatt im Hintergrund."
				},
				{
					category: "Webshop",
					title: "Lohnt sich ein Webshop für mein Ladengeschäft?",
					excerpt: "Nicht für jedes Sortiment. Vier Fragen, die die Antwort meist schon vorwegnehmen.",
					date: "2026-07-21",
					slug: "lohnt-sich-ein-webshop",
					imagePlaceholder: "Ladentheke von oben – Produkte, ein Notizblock und ein Smartphone mit offener Produktliste."
				},
				{
					category: "Werkzeuge",
					title: "Excel-Tabelle oder eigenes Werkzeug?",
					excerpt: "Eine Tabelle ist erstaunlich weit tragfähig. Es gibt aber drei Punkte, an denen sie zuverlässig kippt.",
					date: "2026-07-07",
					slug: "excel-oder-eigenes-werkzeug",
					imagePlaceholder: "Bildschirm mit einer weit gescrollten Tabelle, daneben ein Notizzettel mit Formelfragment."
				}
			]
		},
		contact: {
			label: "— 06 / Kontakt",
			headline: "Lassen Sie uns",
			headlineAccent: "reden.",
			sub: "Schreiben Sie mir in zwei Sätzen, wo es hakt. Ich antworte in der Regel innerhalb von 24 Stunden.",
			form: {
				name: "Name",
				namePlaceholder: "Hanna Schmidt",
				email: "E-Mail",
				emailPlaceholder: "hanna@manufaktur.de",
				company: "Unternehmen (optional)",
				companyPlaceholder: "Schmidt Manufaktur",
				message: "Nachricht",
				messagePlaceholder: "Wir pflegen unsere Preise noch in drei Listen gleichzeitig — das kostet jede Woche einen halben Tag.",
				consent: "Ich willige in die Verarbeitung meiner Daten gemäß der",
				consentLink: "Datenschutzerklärung",
				consentSuffix: "ein.",
				submit: "Nachricht senden",
				submitting: "Wird gesendet …",
				successTitle: "Nachricht erhalten!",
				successMessage: "Danke für Ihre Nachricht. Ich melde mich in der Regel innerhalb von 24 Stunden.",
				errorMessage: "Etwas ist schiefgelaufen. Bitte versuchen Sie es noch einmal."
			},
			info: {
				emailLabel: "E-Mail",
				phoneLabel: "Handy",
				locationLabel: "Standort",
				socialLabel: "Social",
				email: "kontakt@tracht-digital.de",
				phone: "+49 178 822 4022",
				location: "Schwarzenbek · nähe Hamburg"
			}
		},
		pricing: {
			label: "— Preise",
			headline: "Transparente",
			headlineAccent: "Stundensätze.",
			sub: "Klare Preise, keine Pauschalpakete. Stundengenau abgerechnet, ehrlich geschätzt, mit einer Obergrenze, auf die Sie sich verlassen können.",
			teaserLabel: "Preise",
			teaserHeadline: "Klare Sätze,",
			teaserHeadlineAccent: "keine Pauschalen.",
			teaserSub: "Ab 95 € pro Stunde – stundengenau abgerechnet, ohne versteckte Kosten.",
			teaserCta: "Alle Stundensätze ansehen",
			teaserFromLabel: "ab",
			hourSuffix: "/ Stunde",
			includesLabel: "Beinhaltet:",
			items: [
				{
					title: "Beratung & Konzeption",
					rate: 120,
					description: "Strategische Begleitung, Architektur-Workshops, technische Reviews. Am Ende steht ein verständliches Konzept – nicht nur Folien.",
					includes: [
						"Aufnahme und Sortierung Ihrer Anforderungen",
						"Architektur- & Anforderungs-Workshops",
						"Code- & Stack-Reviews mit dokumentierten Empfehlungen",
						"Schriftliche Konzepte und Entscheidungsgrundlagen"
					],
					highlight: false
				},
				{
					title: "Web- & App-Entwicklung",
					rate: 105,
					description: "Frontend, Backend, mobile und Desktop-Apps. Sauber gebaut, getestet, dokumentiert – auch in zwei Jahren noch wartbar.",
					includes: [
						"Komponentenentwicklung (React, Vue, Angular)",
						"API- und Backend-Entwicklung (Node.js, C#, SQL)",
						"Mobile- und Desktop-Apps",
						"Tests, CI/CD und Dokumentation inklusive"
					],
					highlight: true
				},
				{
					title: "Digitalisierung & Automation",
					rate: 105,
					description: "Manuelle Abläufe durch Workflows, Datenpipelines und Integrationen ablösen. Konkrete Umsetzung, kein PowerPoint.",
					includes: [
						"Prozessanalyse vor Ort oder remote",
						"Workflow-Automation (Python, KNIME, n8n)",
						"Datenpipelines, ETL und SQL-Reporting",
						"Integration bestehender Tools und Systeme"
					],
					highlight: false
				},
				{
					title: "Wartung & Support",
					rate: 85,
					description: "Bestehende Systeme pflegen, Updates einspielen, Fehler beheben. Reaktionszeit nach Vereinbarung.",
					includes: [
						"Bug-Fixes und Hotfixes",
						"Dependency- und Sicherheits-Updates",
						"Monitoring und Performance-Optimierung",
						"Auf Wunsch monatliches Retainer-Modell"
					],
					highlight: false
				},
				{
					title: "Workshops & Schulungen",
					rate: 135,
					description: "Wissen weitergeben statt zurückhalten. Workshops für Ihr Team – von TypeScript-Basics bis Architektur.",
					includes: [
						"Inhouse- oder Remote-Workshops",
						"Maßgeschneiderte Schulungsunterlagen",
						"Hands-on-Übungen mit Ihrem eigenen Code",
						"Nachgespräch und Aufzeichnung inklusive"
					],
					highlight: false
				}
			],
			notesTitle: "Gut zu wissen",
			notes: [
				"Alle Preise zzgl. gesetzlicher Mehrwertsteuer (19 %).",
				"Tagessatz auf Anfrage – Rabatt ab 5 Tagen pro Monat verfügbar.",
				"Festpreis möglich, wenn der Umfang vorab klar ist.",
				"Reisekosten werden separat abgerechnet."
			],
			ctaTitle: "Klingt passend?",
			ctaSub: "Schreiben Sie mir kurz, worum es geht. Ich sage Ihnen ehrlich, ob und wie ich helfen kann.",
			ctaButton: "Unverbindlich anfragen",
			back: "Zurück"
		},
		consulting: {
			label: "— Beratung",
			headline: "Erst zuhören,",
			headlineAccent: "dann bauen.",
			body: "Vielleicht haben Sie ein klares Vorhaben, vielleicht nur das Gefühl, dass etwas einfacher laufen müsste. Beides ist ein guter Anfang.",
			primaryCta: "Unverbindlich anfragen",
			secondaryCta: "Leistungen ansehen"
		},
		footer: {
			slogan: "Digitale Lösungen, die passen.",
			tagline: "Persönlich, passgenau, aus einer Hand — aus Schwarzenbek bei Hamburg.",
			nav: "Navigation",
			contactTitle: "Kontakt",
			copyright: "© 2026 Tracht Digital Solutions. Alle Rechte vorbehalten.",
			impressum: "Impressum",
			datenschutz: "Datenschutz",
			pricing: "Preise"
		},
		errors: {
			name: "Bitte geben Sie Ihren Namen an.",
			email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
			message: "Mindestens 20 Zeichen, bitte.",
			consent: "Zustimmung erforderlich."
		},
		cookieNotice: {
			label: "Hinweis zu Cookies und Datenschutz",
			siteText: "Keine Tracking-Cookies: Nur technisch nötige Einstellungen wie das Farbschema bleiben lokal im Browser.",
			panelText: "Dieser Bereich verwendet ausschließlich ein technisch notwendiges Cookie für die sichere Anmeldung (Session-Cookie). Es findet kein Tracking statt.",
			privacy: "Mehr in der Datenschutzerklärung.",
			accept: "Verstanden",
			consentText: "Wir zeigen auf diesem Blog Werbung von Google AdSense. Dafür werden – nur mit Ihrer Einwilligung – Cookies und ähnliche Technologien zu Werbezwecken gesetzt. Ihre Wahl ist freiwillig und jederzeit änderbar.",
			consentAccept: "Akzeptieren",
			consentDecline: "Ablehnen"
		},
		consent: {
			label: "Datenschutz-Einstellungen",
			title: "Ihre Auswahl",
			intro: "Wir verwenden nur die Speicherung, die diese Seite zum Funktionieren braucht. Alles darüber hinaus setzen wir erst ein, wenn Sie zustimmen. Sie können Ihre Wahl jederzeit ändern.",
			privacy: "Datenschutzerklärung",
			imprint: "Impressum",
			acceptAll: "Alle akzeptieren",
			necessaryOnly: "Nur notwendige",
			settings: "Einstellungen",
			save: "Auswahl speichern",
			close: "Schließen",
			manage: "Cookie-Einstellungen",
			alwaysOn: "Immer aktiv",
			categories: {
				necessary: {
					label: "Notwendig",
					description: "Speichert, was die Seite zum Betrieb braucht: Ihr Farbschema, Ihre Sprache, den Inhalt Ihres Warenkorbs und diese Auswahl selbst. Ohne diese Speicherung funktioniert die Seite nicht, deshalb ist sie nicht abwählbar (§ 25 Abs. 2 Nr. 2 TDDDG)."
				},
				functional: {
					label: "Komfort",
					description: "Merkt sich Einstellungen, die die Bedienung angenehmer machen, für den Betrieb aber nicht nötig sind — etwa eine eingeklappte Seitenleiste oder eine zuletzt gewählte Ansicht."
				},
				analytics: {
					label: "Statistik",
					description: "Hilft uns zu verstehen, welche Seiten gelesen werden und wo Besucher abbrechen. Die Auswertung ist anonym und wird nicht mit Ihrer Person verknüpft."
				},
				marketing: {
					label: "Werbung",
					description: "Erlaubt Werbeanzeigen und die dafür nötigen Cookies unserer Werbepartner. Ohne Ihre Einwilligung wird kein Werbeskript geladen."
				}
			},
			placeholder: {
				title: "Externer Inhalt",
				body: "Dieser Inhalt wird von {provider} geladen. Dabei werden Ihre IP-Adresse und Angaben zu Ihrem Gerät an {provider} übertragen.",
				load: "Inhalt laden",
				settings: "Dauerhaft entscheiden"
			}
		},
		a11y: { skipToContent: "Zum Inhalt springen" },
		toast: { dismiss: "Schließen" }
	},
	en: {
		nav: {
			about: "About",
			services: "Services",
			tech: "Tech",
			portfolio: "Portfolio",
			process: "Process",
			blog: "Journal",
			contact: "Contact",
			cta: "Get in touch",
			pricing: "Pricing"
		},
		hero: {
			availability: "Available for projects · Q3 2026",
			location: "Schwarzenbek · Hamburg",
			headline: "Digitalization that takes",
			headlineAccent: "work",
			headlineSuffix: "off your hands.",
			sub: "Websites, online shops and tools for small businesses. I look at where things stick – and build what helps. From Schwarzenbek near Hamburg.",
			cta1: "Get in touch",
			cta2: "See services",
			scrollHint: "Scroll"
		},
		about: {
			label: "— 01 / About",
			headline: "Hi, I'm",
			headlineAccent: "Julian.",
			lead: "I'm a freelance developer in Schwarzenbek near Hamburg. I work with freelancers and small businesses that have no IT department.",
			p1: "Website, online shop, a small program or a workflow that should get simpler: I listen, sort out the plan and build it. One contact, start to finish.",
			p2: "Off-the-shelf software makes you adapt to it. A good tool works the other way round. Sometimes the honest answer is: it isn't worth it.",
			portraitPlaceholder: "A black-and-white portrait of Julian — seated at an angle at his desk, slightly turned toward the camera, soft natural light.",
			stat1Value: "5+",
			stat1Label: "Years of experience",
			stat2Value: "5",
			stat2Label: "Areas of work",
			stat3Value: "1:1",
			stat3Label: "Personal support"
		},
		services: {
			label: "— 02 / Services",
			headline: "What I",
			headlineAccent: "deliver.",
			items: [
				{
					number: "01",
					title: "Digitalization for Businesses",
					description: "Lists kept by hand, figures from three places, the same retyping every day. I take one concrete workflow and make it simpler – not the whole business at once.",
					tags: [
						"Workflows",
						"Reporting",
						"Automation",
						"Integrations"
					]
				},
				{
					number: "02",
					title: "Digital Concepts",
					description: "You have an idea but no plan yet. I turn it into a concept you can read: what is needed, which route makes sense, what it costs.",
					tags: [
						"Requirements",
						"Clickable draft",
						"Effort",
						"Roadmap"
					]
				},
				{
					number: "03",
					title: "Custom Development",
					description: "Not every task needs a big program. Often it just needs the tool that fits your work: a spreadsheet template, a small application, a report.",
					tags: [
						"Spreadsheet template",
						"Small application",
						"Reporting",
						"Data import"
					]
				},
				{
					number: "04",
					title: "Web Presence",
					description: "Out of date, unclear or not there at all? Then people leave before they get in touch. I build new, bring existing sites up to standard – and maintain them.",
					tags: [
						"New website",
						"Rework",
						"Maintenance",
						"Findability"
					]
				},
				{
					number: "05",
					title: "Online Shop",
					description: "Your shop runs locally, now it should run online too. I plan, build and look after it – set up so items and stock can be managed from a phone.",
					tags: [
						"Online sales",
						"Product upkeep",
						"Stock by phone",
						"Support"
					]
				}
			]
		},
		tech: {
			label: "Tech Stack",
			headline: "What I",
			headlineAccent: "work with.",
			body: "Tools that have proven themselves – not a matter of faith, just the right thing for the problem. Languages change; good architecture stays."
		},
		portfolio: {
			label: "— 03 / Portfolio",
			headline: "Selected",
			headlineAccent: "projects.",
			comingSoon: "Coming soon",
			placeholderLabel: "Placeholder",
			items: [
				{
					number: "01",
					badge: "Web App",
					title: "Mid-market platform",
					description: "A custom-built web application for a mid-market client – individually developed, built to scale.",
					stack: [
						"Angular",
						"Node.js",
						"SQL"
					],
					imagePlaceholder: "Dashboard screenshot with central KPI overview, sidebar navigation on the left, detail panel on the right."
				},
				{
					number: "02",
					badge: "Digitalization",
					title: "Process automation",
					description: "Automation of manual business processes through intelligent workflows and data pipelines.",
					stack: [
						"Python",
						"KNIME",
						"SQL"
					],
					imagePlaceholder: "Workflow diagram: KNIME nodes pulling data from three sources, validating it, writing into a SQL table."
				},
				{
					number: "03",
					badge: "Web presence",
					title: "Brand presence",
					description: "Professional web presence for an established company – performant, accessible, individually crafted.",
					stack: ["WordPress", "TypeScript"],
					imagePlaceholder: "Hero mockup of the client site on desktop and mobile — quiet typography, large keystone image."
				},
				{
					number: "04",
					badge: "App",
					title: "Internal business app",
					description: "Desktop application for internal process management – intuitively usable, cleanly documented.",
					stack: [
						"C#",
						"SQL",
						"Vue"
					],
					imagePlaceholder: "Desktop app screenshot: list view of orders with filter bar at the top and detail panel on the right."
				}
			]
		},
		process: {
			label: "— 04 / Process",
			headline: "How I",
			headlineAccent: "work.",
			body: "No rigid process. The weight shifts with the job. The four steps below are the usual frame, not a corset.",
			steps: [
				{
					number: "01",
					title: "Listening",
					duration: "To begin with",
					description: "You tell me where things get stuck. I keep asking – and say honestly whether building something is worth it."
				},
				{
					number: "02",
					title: "Concept",
					duration: "Depends on scope",
					description: "What is needed, which route makes sense, what does it cost? The groundwork is there before any budget moves."
				},
				{
					number: "03",
					title: "Delivery",
					duration: "As agreed",
					description: "I build it and show you where it stands. Changing course is cheap along the way and expensive afterwards."
				},
				{
					number: "04",
					title: "Support",
					duration: "If you want it",
					description: "Handover, a walkthrough, and maintenance if you want it. Either way I stay your point of contact."
				}
			]
		},
		blog: {
			label: "— 05 / Journal",
			headline: "Thoughts &",
			headlineAccent: "articles.",
			readMore: "Read more",
			allPosts: "All articles",
			placeholderLabel: "Placeholder",
			posts: [
				{
					category: "Digitalization",
					title: "Digitalization doesn't start with a big project.",
					excerpt: "It starts with the one routine that costs you hours every week – the one nobody but you can see.",
					date: "2026-08-04",
					slug: "digitalisierung-faengt-klein-an",
					imagePlaceholder: "A handwritten list on a clipboard beside a laptop — warm morning light, workshop in the background."
				},
				{
					category: "Online shop",
					title: "Is an online shop worth it for my local business?",
					excerpt: "Not for every range of products. Four questions that usually answer it for you.",
					date: "2026-07-21",
					slug: "lohnt-sich-ein-webshop",
					imagePlaceholder: "A shop counter from above — products, a notepad and a phone showing an open product list."
				},
				{
					category: "Tools",
					title: "Spreadsheet or a tool of your own?",
					excerpt: "A spreadsheet carries you surprisingly far. There are three points, though, where it reliably tips over.",
					date: "2026-07-07",
					slug: "excel-oder-eigenes-werkzeug",
					imagePlaceholder: "A screen showing a spreadsheet scrolled far down, next to a sticky note with a fragment of a formula."
				}
			]
		},
		contact: {
			label: "— 06 / Contact",
			headline: "Let's",
			headlineAccent: "talk.",
			sub: "Tell me in two sentences where things are getting stuck. I usually respond within 24 hours.",
			form: {
				name: "Name",
				namePlaceholder: "Alex Marlow",
				email: "Email",
				emailPlaceholder: "alex@marlow.studio",
				company: "Company (optional)",
				companyPlaceholder: "Marlow Studios",
				message: "Message",
				messagePlaceholder: "We still keep our prices in three separate lists — it costs us half a day every week.",
				consent: "I consent to the processing of my data in accordance with the",
				consentLink: "Privacy Policy",
				consentSuffix: ".",
				submit: "Send message",
				submitting: "Sending …",
				successTitle: "Message received!",
				successMessage: "Thank you for your message. I'll get back to you within 24 hours.",
				errorMessage: "Something went wrong. Please try again."
			},
			info: {
				emailLabel: "Email",
				phoneLabel: "Mobile",
				locationLabel: "Location",
				socialLabel: "Social",
				email: "contact@tracht-digital.de",
				phone: "+49 178 822 4022",
				location: "Schwarzenbek · near Hamburg"
			}
		},
		pricing: {
			label: "— Pricing",
			headline: "Transparent",
			headlineAccent: "hourly rates.",
			sub: "Clear pricing, no opaque packages. Billed by the actual hour, honestly estimated, with a ceiling you can rely on.",
			teaserLabel: "Pricing",
			teaserHeadline: "Clear rates,",
			teaserHeadlineAccent: "no packages.",
			teaserSub: "From €95 per hour – billed by the actual hour, no hidden fees.",
			teaserCta: "See all hourly rates",
			teaserFromLabel: "from",
			hourSuffix: "/ hour",
			includesLabel: "Included:",
			items: [
				{
					title: "Consulting & Strategy",
					rate: 120,
					description: "Strategic guidance, architecture workshops, technical reviews. You end up with a clear written concept — not just slides.",
					includes: [
						"Capturing and sorting your requirements",
						"Architecture and requirements workshops",
						"Code and stack reviews with documented recommendations",
						"Written concepts and decision-making input"
					],
					highlight: false
				},
				{
					title: "Web & App Development",
					rate: 105,
					description: "Frontend, backend, mobile and desktop apps. Cleanly built, tested, documented – still maintainable in two years.",
					includes: [
						"Component development (React, Vue, Angular)",
						"API and backend development (Node.js, C#, SQL)",
						"Mobile and desktop apps",
						"Tests, CI/CD and documentation included"
					],
					highlight: true
				},
				{
					title: "Digitalization & Automation",
					rate: 105,
					description: "Replacing manual processes with workflows, data pipelines and integrations. Concrete work, no PowerPoint.",
					includes: [
						"On-site or remote process analysis",
						"Workflow automation (Python, KNIME, n8n)",
						"Data pipelines, ETL and SQL reporting",
						"Integration of existing tools and systems"
					],
					highlight: false
				},
				{
					title: "Maintenance & Support",
					rate: 85,
					description: "Maintaining existing systems, rolling out updates, fixing bugs. Response times by agreement.",
					includes: [
						"Bug fixes and hotfixes",
						"Dependency and security updates",
						"Monitoring and performance optimization",
						"Optional monthly retainer model"
					],
					highlight: false
				},
				{
					title: "Workshops & Training",
					rate: 135,
					description: "Sharing knowledge instead of hoarding it. Workshops for your team – from TypeScript basics to architecture.",
					includes: [
						"On-site or remote workshops",
						"Tailored training materials",
						"Hands-on exercises with your real code",
						"Follow-up call and recording included"
					],
					highlight: false
				}
			],
			notesTitle: "Good to know",
			notes: [
				"All prices exclude German VAT (19 %).",
				"Day rate available on request — discount for 5+ days per month.",
				"Fixed price possible when the scope is clear up front.",
				"Travel costs are billed separately."
			],
			ctaTitle: "Sounds like a fit?",
			ctaSub: "Tell me briefly what it's about. I'll tell you honestly whether and how I can help.",
			ctaButton: "Get in touch",
			back: "Back"
		},
		consulting: {
			label: "— Consulting",
			headline: "Listen first,",
			headlineAccent: "build after.",
			body: "Maybe you have a clear plan, maybe just a feeling that something ought to be simpler. Either is a good place to start.",
			primaryCta: "Get in touch",
			secondaryCta: "See services"
		},
		footer: {
			slogan: "Digital solutions that fit.",
			tagline: "Personal, tailored, all from one source — from Schwarzenbek near Hamburg.",
			nav: "Navigation",
			contactTitle: "Contact",
			copyright: "© 2026 Tracht Digital Solutions. All rights reserved.",
			impressum: "Legal Notice",
			datenschutz: "Privacy Policy",
			pricing: "Pricing"
		},
		errors: {
			name: "Please enter your name.",
			email: "Please enter a valid email address.",
			message: "At least 20 characters, please.",
			consent: "Consent required."
		},
		cookieNotice: {
			label: "Cookie and privacy notice",
			siteText: "No tracking cookies: only necessary preferences such as your colour scheme stay local in your browser.",
			panelText: "This area only uses one technically necessary cookie for secure sign-in (session cookie). No tracking takes place.",
			privacy: "More in the privacy policy.",
			accept: "Got it",
			consentText: "This blog shows advertising from Google AdSense. With your consent — and only then — cookies and similar technologies are set for advertising. Your choice is free and can be changed at any time.",
			consentAccept: "Accept",
			consentDecline: "Decline"
		},
		consent: {
			label: "Privacy settings",
			title: "Your choice",
			intro: "We only use the storage this site needs to work. Anything beyond that we use once you agree. You can change your choice at any time.",
			privacy: "Privacy policy",
			imprint: "Legal notice",
			acceptAll: "Accept all",
			necessaryOnly: "Necessary only",
			settings: "Settings",
			save: "Save choice",
			close: "Close",
			manage: "Cookie settings",
			alwaysOn: "Always on",
			categories: {
				necessary: {
					label: "Necessary",
					description: "Stores what the site needs to operate: your colour scheme, your language, the contents of your basket and this choice itself. The site does not work without it, which is why it cannot be switched off (sec. 25(2) no. 2 TDDDG)."
				},
				functional: {
					label: "Convenience",
					description: "Remembers settings that make the site nicer to use but are not required to operate it — a collapsed sidebar, say, or the view you last picked."
				},
				analytics: {
					label: "Statistics",
					description: "Helps us understand which pages get read and where visitors drop off. The evaluation is anonymous and is not linked to you as a person."
				},
				marketing: {
					label: "Advertising",
					description: "Allows advertisements and the cookies our advertising partners need for them. Without your consent no advertising script is loaded."
				}
			},
			placeholder: {
				title: "External content",
				body: "This content is loaded from {provider}. Doing so transmits your IP address and details about your device to {provider}.",
				load: "Load content",
				settings: "Decide permanently"
			}
		},
		a11y: { skipToContent: "Skip to content" },
		toast: { dismiss: "Dismiss" }
	}
};
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/consent/index.js
function ConsentSettings({ open, lang, categories, initial, privacyUrl, imprintUrl, onSave, onClose }) {
	const t = translations[lang].consent;
	const ref = useRef(null);
	const titleRef = useRef(null);
	const titleId = useId();
	const descId = useId();
	const [choices, setChoices] = useState(initial);
	const [rendered, setRendered] = useState(open);
	useEffect(() => {
		if (open) setRendered(true);
	}, [open]);
	useEffect(() => {
		if (open) setChoices(initial);
	}, [open, initial]);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (open && !el.open) {
			if (typeof el.showModal === "function") el.showModal();
			else el.setAttribute("open", "");
			titleRef.current?.focus();
		} else if (!open && el.open) {
			if (typeof el.close === "function") el.close();
			else el.removeAttribute("open");
			const timer = window.setTimeout(() => setRendered(false), 450);
			return () => window.clearTimeout(timer);
		} else if (!open) setRendered(false);
	}, [open, rendered]);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const onNativeCancel = (e) => {
			e.preventDefault();
			onClose();
		};
		el.addEventListener("cancel", onNativeCancel);
		return () => el.removeEventListener("cancel", onNativeCancel);
	}, [onClose]);
	if (!open && !rendered) return null;
	const rows = ["necessary", ...categories];
	return /* @__PURE__ */ jsx("dialog", {
		ref,
		className: "tds-modal consent-dialog",
		"aria-labelledby": titleId,
		"aria-describedby": descId,
		onClick: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "tds-modal__panel consent-dialog__panel",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "consent-dialog__close",
					"aria-label": t.close,
					onClick: onClose,
					children: /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						children: "×"
					})
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "tds-modal__title",
					id: titleId,
					ref: titleRef,
					tabIndex: -1,
					children: t.title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "consent-dialog__intro",
					id: descId,
					children: t.intro
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "consent-dialog__list",
					children: rows.map((cat) => {
						const meta = t.categories[cat];
						const locked = cat === "necessary";
						return /* @__PURE__ */ jsxs("li", {
							className: "consent-row",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "consent-row__head",
								children: [
									/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										className: "consent-row__input",
										checked: locked ? true : choices[cat],
										disabled: locked,
										onChange: (e) => setChoices((c) => ({
											...c,
											[cat]: e.target.checked
										}))
									}),
									/* @__PURE__ */ jsx("span", {
										className: "consent-row__label",
										children: meta.label
									}),
									locked ? /* @__PURE__ */ jsx("span", {
										className: "consent-row__badge",
										children: t.alwaysOn
									}) : null
								]
							}), /* @__PURE__ */ jsx("p", {
								className: "consent-row__desc",
								children: meta.description
							})]
						}, cat);
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "consent-dialog__links",
					children: [/* @__PURE__ */ jsx("a", {
						href: privacyUrl,
						children: t.privacy
					}), imprintUrl ? /* @__PURE__ */ jsxs(Fragment$1, { children: [" · ", /* @__PURE__ */ jsx("a", {
						href: imprintUrl,
						children: t.imprint
					})] }) : null]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "consent-dialog__actions",
					children: [
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: () => onSave(necessaryOnly()),
							children: t.necessaryOnly
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: () => onSave(allGranted()),
							children: t.acceptAll
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: () => onSave(choices),
							children: t.save
						})
					]
				})
			]
		})
	});
}
var DEFAULT_PRIVACY_URL = "https://tracht-digital.de/legal/datenschutz";
function ConsentBanner({ lang = "de", categories = [], variant = "site", privacyUrl = DEFAULT_PRIVACY_URL, imprintUrl } = {}) {
	const t = translations[lang].consent;
	const notice = translations[lang].cookieNotice;
	const asks = categories.length > 0;
	const [decided, setDecided] = useState(null);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [initial, setInitial] = useState(necessaryOnly);
	const ref = useRef(null);
	const focused = useRef(false);
	useEffect(() => {
		const record = readConsent();
		if (record) setInitial(record.choices);
		setDecided(record !== null);
	}, []);
	useEffect(() => {
		const open = () => {
			setInitial(readConsent()?.choices ?? necessaryOnly());
			setSettingsOpen(true);
		};
		window.addEventListener(CONSENT_OPEN_EVENT, open);
		return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
	}, []);
	const visible = decided === false;
	useEffect(() => {
		const el = ref.current;
		if (!visible || !el || typeof window === "undefined") return;
		const root = document.documentElement;
		const publish = () => {
			root.style.setProperty("--tds-bottom-lane", `${Math.ceil(el.getBoundingClientRect().height)}px`);
		};
		publish();
		const ro = typeof ResizeObserver === "function" ? new ResizeObserver(publish) : null;
		ro?.observe(el);
		window.addEventListener("resize", publish);
		return () => {
			ro?.disconnect();
			window.removeEventListener("resize", publish);
			root.style.removeProperty("--tds-bottom-lane");
		};
	}, [visible]);
	useEffect(() => {
		if (!visible || !asks || focused.current) return;
		focused.current = true;
		ref.current?.focus();
	}, [visible, asks]);
	const save = useCallback((choices) => {
		writeConsent(choices, lang);
		setInitial(choices);
		setSettingsOpen(false);
		setDecided(true);
	}, [lang]);
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [visible ? /* @__PURE__ */ jsxs("aside", {
		ref,
		className: "cookie-notice",
		role: "region",
		"aria-label": asks ? t.label : notice.label,
		tabIndex: -1,
		children: [/* @__PURE__ */ jsxs("p", {
			className: "cookie-notice-text",
			children: [
				asks ? t.intro : variant === "panel" ? notice.panelText : notice.siteText,
				" ",
				/* @__PURE__ */ jsx("a", {
					className: "cookie-notice-link",
					href: privacyUrl,
					children: asks ? t.privacy : notice.privacy
				})
			]
		}), asks ? /* @__PURE__ */ jsxs("div", {
			className: "cookie-notice-actions",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "cookie-notice-btn cookie-notice-btn--ghost",
					onClick: () => setSettingsOpen(true),
					children: t.settings
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "cookie-notice-btn",
					onClick: () => save(necessaryOnly()),
					children: t.necessaryOnly
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "cookie-notice-btn",
					onClick: () => save({
						necessary: true,
						functional: true,
						analytics: true,
						marketing: true
					}),
					children: t.acceptAll
				})
			]
		}) : /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "cookie-notice-btn",
			onClick: () => save(necessaryOnly()),
			children: notice.accept
		})]
	}) : null, /* @__PURE__ */ jsx(ConsentSettings, {
		open: settingsOpen,
		lang,
		categories,
		initial,
		privacyUrl,
		imprintUrl,
		onSave: save,
		onClose: () => setSettingsOpen(false)
	})] });
}
function ConsentLink({ lang = "de", className } = {}) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: className ? `consent-link ${className}` : "consent-link",
		onClick: openConsentSettings,
		children: translations[lang].consent.manage
	});
}
//#endregion
//#region src/lib/cart.ts
/**
* The basket, in the visitor's own browser.
*
* ### What it stores, and what it deliberately does not
*
* Slugs and quantities. **No prices, no titles, no totals.** Every one of those
* comes back from `POST /shop/quote` on each render, which has three
* consequences worth having:
*
*  - A basket cannot carry a stale price. Leave a tab open over a price change
*    and the next quote is simply the new one — there is no old number stored
*    anywhere to disagree with the checkout.
*  - A product that goes out of print, gets unpublished, or loses its offer
*    fails the quote rather than sitting in the basket looking buyable.
*  - The number the customer sees and the number they are charged are computed
*    by the same server code, because the browser never computes one.
*
* ### Why there is no cart cookie and no cart table
*
* A basket in `localStorage` is storage the visitor asked for by putting
* something in it — technically necessary under § 25 Abs. 2 Nr. 2 TDDDG, so it
* needs no consent and appears in no banner. A server-side basket would need a
* session cookie, which would need a consent question for a feature nobody
* asked to be asked about. A guest checkout has no account to hang it on
* anyway.
*
* Everything here is SSR-safe: the module is imported by islands that render on
* the server first, and `localStorage` does not exist there.
*/
var CART_KEY = "tds-shop-cart";
/** Fired on every change, so a badge in the header and a page body agree. */
var CART_EVENT = "tds:cart-change";
/**
* Read the basket.
*
* Anything unparseable reads as empty rather than throwing. A corrupt key
* should cost someone their basket, not the ability to load the shop — and
* `localStorage` itself throws in a private window on some browsers.
*/
function readCart() {
	if (typeof window === "undefined") return [];
	let raw = null;
	try {
		raw = window.localStorage.getItem(CART_KEY);
	} catch {
		return [];
	}
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.flatMap((entry) => {
			if (typeof entry !== "object" || entry === null) return [];
			const { slug, quantity } = entry;
			if (typeof slug !== "string" || slug === "") return [];
			return [{
				slug,
				quantity: clamp(typeof quantity === "number" ? quantity : 1)
			}];
		});
	} catch {
		return [];
	}
}
function clamp(n) {
	if (!Number.isFinite(n)) return 1;
	return Math.max(1, Math.min(99, Math.floor(n)));
}
function write(lines) {
	if (typeof window === "undefined") return lines;
	try {
		window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
	} catch {}
	try {
		window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: lines }));
	} catch {}
	return lines;
}
/**
* Add to the basket, or raise the quantity of a line already in it.
*
* Merging rather than appending: two rows for one product invite the question
* of whether it was charged twice, and the server merges them anyway.
*/
function addToCart(slug, quantity = 1) {
	const lines = readCart();
	const existing = lines.find((l) => l.slug === slug);
	if (existing) existing.quantity = clamp(existing.quantity + quantity);
	else lines.push({
		slug,
		quantity: clamp(quantity)
	});
	return write(lines);
}
/** Set an exact quantity. Zero or less removes the line — that is what a stepper at 0 means. */
function setQuantity(slug, quantity) {
	if (quantity <= 0) return removeFromCart(slug);
	return write(readCart().map((l) => l.slug === slug ? {
		...l,
		quantity: clamp(quantity)
	} : l));
}
function removeFromCart(slug) {
	return write(readCart().filter((l) => l.slug !== slug));
}
/**
* Empty the basket.
*
* Called after a successful handoff to the payment provider — not on return,
* and not on the order page. By the time the customer is at the provider the
* order row exists with its own frozen copy of every line, so the basket has
* done its job; leaving it full would offer a second identical order to
* somebody who just placed one.
*/
function clearCart() {
	return write([]);
}
/** Total item count, for a header badge. */
function cartCount(lines = readCart()) {
	return lines.reduce((sum, l) => sum + l.quantity, 0);
}
/**
* Subscribe to changes.
*
* Listens for both the in-page event and the browser's own `storage` event, so
* a basket changed in a second tab is reflected here. Returns an unsubscribe.
*/
function onCartChange(fn) {
	if (typeof window === "undefined") return () => {};
	const local = (e) => fn(e.detail ?? readCart());
	const cross = (e) => {
		if (e.key === null || e.key === "tds-shop-cart") fn(readCart());
	};
	window.addEventListener(CART_EVENT, local);
	window.addEventListener("storage", cross);
	return () => {
		window.removeEventListener(CART_EVENT, local);
		window.removeEventListener("storage", cross);
	};
}
/** `/warenkorb` / `/en/cart`. Reserved in robots.txt and the no-cache list already. */
var cartPath = (lang) => lang === "en" ? "/en/cart" : "/warenkorb";
//#endregion
//#region src/components/Footer.astro
createAstro("https://shop.tracht-digital.de");
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const { lang } = Astro.props;
	const t = tx(lang);
	const links = siteLinks(lang);
	const legalLinks = Object.keys(LEGAL_KEYS).map((slug) => ({
		href: legalPath(slug, lang),
		label: LEGAL_TITLES[lang][slug]
	}));
	const groups = [{
		id: "footer-shop",
		head: t.footer.shop,
		items: [{
			href: homePath(lang),
			label: t.nav.catalogue
		}, {
			href: cartPath(lang),
			label: t.cart.title
		}]
	}, {
		id: "footer-company",
		head: t.footer.company,
		items: [
			{
				href: links.blog,
				label: "Journal"
			},
			{
				href: links.tools,
				label: "Tools"
			},
			{
				href: links.main,
				label: t.nav.main
			}
		]
	}];
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="shop-footer tds-tone-navy"><div class="tds-shell shop-footer__grid"><div><p class="brand-wordmark shop-footer__wordmark"><span class="brand-logo brand-logo--inverse" aria-hidden="true"></span><span><span class="sr-only">TD </span><span class="shop-footer__accent">Shop</span></span></p><span class="tds-brandbar tds-brandbar--sm tds-brandbar--on-dark" aria-hidden="true"></span><p class="shop-footer__blurb">${t.footer.blurb}</p></div>${groups.map((group) => renderTemplate`<nav${addAttribute(group.id, "aria-labelledby")}><p class="shop-footer__head"${addAttribute(group.id, "id")}>${group.head}</p><ul class="shop-footer__list">${group.items.map((item) => renderTemplate`<li><a class="shop-footer__link"${addAttribute(item.href, "href")}>${item.label}</a></li>`)}</ul></nav>`)}<nav aria-labelledby="footer-legal"><p class="shop-footer__head" id="footer-legal">${t.footer.legal}</p><ul class="shop-footer__list">${legalLinks.map((link) => renderTemplate`<li><a class="shop-footer__link"${addAttribute(link.href, "href")}>${link.label}</a></li>`)}<li>${renderComponent($$result, "ConsentLink", ConsentLink, {
		"client:idle": true,
		"lang": lang,
		"className": "shop-footer__link",
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/consent",
		"client:component-export": "ConsentLink"
	})}</li></ul></nav></div><div class="tds-shell shop-footer__base"><p>© ${year} Tracht Digital Solutions</p><p>${t.tagline}</p></div></footer>`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Footer.astro", void 0);
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-HWXXAOPZ.js
var API_BASE_META = "tds-api-base";
var RUNTIME_CONFIG_PATH = "/tds-runtime.json";
var STATE_KEY = /* @__PURE__ */ Symbol.for("@tracht-digital-solutions/tds-shared:api-state");
var state = (() => {
	const host = globalThis;
	const existing = host[STATE_KEY];
	if (existing !== void 0) return existing;
	const fresh = {
		cached: null,
		runtimePromise: null,
		runtimeValue: null,
		onUnauthorized: null,
		headersProvider: null
	};
	host[STATE_KEY] = fresh;
	return fresh;
})();
var trimEnd$1 = (value) => value.replace(/\/+$/, "");
function apiBase() {
	if (state.cached !== null) return state.cached;
	const env = typeof import.meta !== "undefined" ? Object.assign({
		"ASSETS_PREFIX": void 0,
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"PUBLIC_DEMO_MODE": "false",
		"SITE": "https://shop.tracht-digital.de",
		"SSR": true
	}, {
		_: "/opt/hostedtoolcache/node/22.23.3/x64/bin/npm",
		PATH: "/home/runner/work/tds-shop-frontend/tds-shop-frontend/node_modules/.bin:/home/runner/work/tds-shop-frontend/node_modules/.bin:/home/runner/work/node_modules/.bin:/home/runner/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/opt/hostedtoolcache/node/22.23.3/x64/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/opt/hostedtoolcache/node/22.23.3/x64/bin:/snap/bin:/home/runner/.local/bin:/opt/pipx_bin:/home/runner/.cargo/bin:/home/runner/.config/composer/vendor/bin:/usr/local/.ghcup/bin:/home/runner/.dotnet/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
	})?.PUBLIC_API_BASE ?? "" : "";
	if (typeof document === "undefined") return trimEnd$1(env || "https://api.tracht-digital.de");
	let meta = "";
	try {
		meta = document.querySelector(`meta[name="tds-api-base"]`)?.getAttribute("content") ?? "";
	} catch {}
	state.cached = trimEnd$1(meta.trim() || env || "https://api.tracht-digital.de");
	return state.cached;
}
async function runtimeConfig() {
	if (state.runtimePromise !== null) return state.runtimePromise;
	if (typeof document === "undefined" || typeof fetch !== "function") {
		state.runtimePromise = Promise.resolve(null);
		return state.runtimePromise;
	}
	let declared = "";
	try {
		declared = document.querySelector(`meta[name="tds-api-base"]`)?.getAttribute("content") ?? "";
	} catch {}
	if (declared.trim() !== "") {
		state.runtimePromise = Promise.resolve(null);
		return state.runtimePromise;
	}
	state.runtimePromise = (async () => {
		try {
			const res = await fetch(RUNTIME_CONFIG_PATH, {
				credentials: "same-origin",
				headers: { Accept: "application/json" },
				signal: typeof AbortSignal?.timeout === "function" ? AbortSignal.timeout(3e3) : void 0
			});
			if (!res.ok) return null;
			if (!(res.headers.get("content-type") ?? "").includes("json")) return null;
			const parsed = await res.json();
			if (parsed === null || typeof parsed !== "object") return null;
			const config = parsed;
			if (typeof config.apiBase === "string" && config.apiBase !== "") state.cached = trimEnd$1(config.apiBase);
			state.runtimeValue = config;
			return config;
		} catch {
			return null;
		}
	})();
	return state.runtimePromise;
}
async function runtimeSetting(key, fallback) {
	const value = (await runtimeConfig())?.[key];
	return typeof value === "string" && value !== "" ? value : fallback;
}
async function runtimeAbsolute(key, fallback) {
	const value = await runtimeSetting(key, "");
	return trimEnd$1(/^https?:\/\//i.test(value) ? value : fallback);
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-5TJE6SC6.js
var SEMANTIC_CHIP_VARIANTS = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info"
];
var CATEGORICAL_CHIP_VARIANTS = [
	"cat-violet",
	"cat-teal",
	"cat-amber",
	"cat-rose",
	"cat-cyan"
];
var CHIP_VARIANTS = [...SEMANTIC_CHIP_VARIANTS, ...CATEGORICAL_CHIP_VARIANTS];
new Set(CHIP_VARIANTS);
var THEME_STORAGE_KEY = "tds-theme";
var THEME_ATTRIBUTE = "data-theme";
var THEME_CHANGE_EVENT = "tds:theme-change";
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-CQQFVVBV.js
var DARK_QUERY = "(prefers-color-scheme: dark)";
var hasDocument = () => typeof document !== "undefined";
function systemTheme() {
	try {
		return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
	} catch {
		return "light";
	}
}
function resolveTheme(preference) {
	return preference === "system" ? systemTheme() : preference;
}
function applyThemePreference(preference, options = {}) {
	const theme = resolveTheme(preference);
	try {
		if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
		else localStorage.setItem(THEME_STORAGE_KEY, preference);
	} catch {}
	if (hasDocument()) document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
	if (options.announce !== false && typeof window !== "undefined") try {
		const detail = {
			preference,
			theme
		};
		window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail }));
	} catch {}
	return theme;
}
function onThemeChange(handler) {
	if (typeof window === "undefined") return () => {};
	const listener = (event) => {
		const detail = event.detail;
		if (detail) handler(detail);
	};
	window.addEventListener(THEME_CHANGE_EVENT, listener);
	return () => window.removeEventListener(THEME_CHANGE_EVENT, listener);
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-ZZOPYDZ7.js
var SHOP_OFFER_KINDS = ["own", "affiliate"];
var SHOP_NETWORKS = [
	"amazon",
	"awin",
	"belboon",
	"digistore",
	"direct"
];
var PRICE_MAX_AGE_MS = 864e5;
var ShopOfferSchema = object({
	id: number().int().positive(),
	kind: _enum(SHOP_OFFER_KINDS),
	network: _enum(SHOP_NETWORKS),
	/** Merchant-facing label ("Amazon", "Hetzner"), already localised by the API. */
	merchant: string().max(120),
	/** The outbound URL, affiliate tag already appended by the API. */
	url: string().max(1e3),
	/** Net-of-nothing gross price in minor units; null when we have no quote. */
	priceCents: number().int().nonnegative().nullable(),
	currency: string().length(3).default("EUR"),
	/**
	* When {@link priceCents} was last confirmed, ISO-8601. Null means "never
	* fetched" — which is not the same as a stale price and renders differently:
	* a never-fetched offer simply shows no price, a stale one shows why.
	*/
	priceCheckedAt: string().datetime({ offset: true }).nullable(),
	availability: _enum([
		"in_stock",
		"out_of_stock",
		"unknown"
	]).default("unknown"),
	position: number().int().nonnegative().default(0)
});
function isPriceStale(offer, now = Date.now()) {
	if (offer.priceCents === null || offer.priceCheckedAt === null) return true;
	const checked = Date.parse(offer.priceCheckedAt);
	if (Number.isNaN(checked)) return true;
	return now - checked > PRICE_MAX_AGE_MS;
}
function displayPrice(offer, now = Date.now()) {
	if (isPriceStale(offer, now)) return null;
	return {
		cents: offer.priceCents,
		currency: offer.currency
	};
}
var ShopProductRefSchema = object({
	slug: string().max(120),
	lang: _enum(["de", "en"]),
	title: string().max(200),
	teaser: string().max(400),
	category: string().max(60),
	imageUrl: string().max(1e3).nullable(),
	/** Absolute URL of the product page on the shop site. */
	url: string().max(1e3),
	offers: array(ShopOfferSchema).max(20).default([])
});
ShopProductRefSchema.extend({
	/** Blocks JSON or markdown, same dual format as a blog post body. */
	body: string(),
	bodyFormat: _enum(["markdown", "blocks"]).default("blocks"),
	tags: array(string().max(60)).max(20).default([]),
	metaDescription: string().max(300).nullable(),
	publishedAt: string().datetime({ offset: true }).nullable(),
	updatedAt: string().datetime({ offset: true }).nullable(),
	machineTranslated: boolean().default(false)
});
object({
	key: string().max(60),
	/** Heading shown above the slot, already localised. Null renders no heading. */
	heading: string().max(120).nullable(),
	/**
	* The legally required advertising label ("Anzeige" / "Advertisement").
	*
	* Served rather than hard-coded so the label is right in both languages and
	* cannot be forgotten by a consumer — see `ProductCard`, which refuses to
	* render an affiliate offer without one.
	*/
	label: string().max(60),
	products: array(ShopProductRefSchema).max(12).default([])
});
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/chunk-HISCNI7S.js
var ease = [
	.2,
	.8,
	.2,
	1
];
var cssEase = {
	out: `cubic-bezier(${ease.join(", ")})`,
	inOut: `cubic-bezier(${[
		.4,
		0,
		.2,
		1
	].join(", ")})`
};
var durations = {
	fast: 160,
	base: 200,
	slow: 320
};
var transitions = {
	fast: {
		duration: durations.fast / 1e3,
		ease
	},
	base: {
		duration: durations.base / 1e3,
		ease
	},
	slow: {
		duration: durations.slow / 1e3,
		ease
	}
};
durations.slow / 1e3;
transitions.base, transitions.fast;
transitions.base, transitions.fast;
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/components/index.js
function ThemeToggle({ labelToDark = "Auf Dunkel umschalten", labelToLight = "Auf Hell umschalten" } = {}) {
	const [theme, setTheme] = useState("light");
	const [mounted, setMounted] = useState(false);
	const [flipped, setFlipped] = useState(false);
	const buttonRef = useRef(null);
	useEffect(() => {
		const current = document.documentElement.getAttribute(THEME_ATTRIBUTE);
		setTheme(current === "dark" ? "dark" : "light");
		setMounted(true);
		return onThemeChange((detail) => setTheme(detail.theme));
	}, []);
	const previewRef = useRef(null);
	const frameRef = useRef(0);
	const removeTimerRef = useRef(0);
	const pointRef = useRef({
		x: 0,
		y: 0
	});
	const buildClone = (target) => {
		const page = document.createElement("div");
		page.className = "tds-theme-preview__page";
		page.setAttribute("data-theme", target);
		for (const node of Array.from(document.body.children)) {
			if (node instanceof HTMLElement && node.classList.contains("tds-theme-preview")) continue;
			if (node.tagName === "SCRIPT" || node.tagName === "LINK") continue;
			if (node instanceof HTMLElement && node.dataset.themePreview === "skip") continue;
			page.appendChild(node.cloneNode(true));
		}
		for (const stray of page.querySelectorAll("script, link, [id], [name], [data-theme-preview=\"skip\"]")) {
			if (stray.tagName === "SCRIPT" || stray.tagName === "LINK" || stray.dataset?.themePreview === "skip") {
				stray.remove();
				continue;
			}
			stray.removeAttribute("id");
			stray.removeAttribute("name");
		}
		page.inert = true;
		return page;
	};
	const alignClone = () => {
		const page = previewRef.current?.firstElementChild;
		if (page) page.style.top = `${-window.scrollY}px`;
	};
	const paintPreview = () => {
		frameRef.current = 0;
		const el = previewRef.current;
		if (!el) return;
		el.style.setProperty("--tds-theme-preview-x", `${pointRef.current.x}px`);
		el.style.setProperty("--tds-theme-preview-y", `${pointRef.current.y}px`);
	};
	const trackPointer = (event) => {
		pointRef.current = {
			x: event.clientX,
			y: event.clientY
		};
		if (!previewRef.current || frameRef.current) return;
		frameRef.current = requestAnimationFrame(paintPreview);
	};
	const discardPreview = () => {
		if (removeTimerRef.current) {
			clearTimeout(removeTimerRef.current);
			removeTimerRef.current = 0;
		}
		if (frameRef.current) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = 0;
		}
		previewRef.current?.remove();
		previewRef.current = null;
	};
	const closePreview = () => {
		if (frameRef.current) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = 0;
		}
		const el = previewRef.current;
		if (!el || removeTimerRef.current) return;
		el.removeAttribute("data-visible");
		const fade = parseFloat(getComputedStyle(el).transitionDuration) || .2;
		removeTimerRef.current = window.setTimeout(discardPreview, fade * 1e3 + 40);
	};
	const openPreview = (event) => {
		if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let el = previewRef.current;
		if (el) {
			if (removeTimerRef.current) {
				clearTimeout(removeTimerRef.current);
				removeTimerRef.current = 0;
			}
		} else {
			el = document.createElement("div");
			el.className = "tds-theme-preview";
			el.setAttribute("aria-hidden", "true");
			const current = document.documentElement.getAttribute(THEME_ATTRIBUTE);
			el.appendChild(buildClone(current === "dark" ? "light" : "dark"));
			document.body.appendChild(el);
			previewRef.current = el;
		}
		pointRef.current = {
			x: event.clientX,
			y: event.clientY
		};
		paintPreview();
		alignClone();
		const target = el;
		requestAnimationFrame(() => {
			if (previewRef.current === target) target.setAttribute("data-visible", "true");
		});
	};
	useEffect(() => {
		const button = buttonRef.current;
		if (!button) return;
		const onEnter = (event) => openPreview(event);
		const onMove = (event) => trackPointer(event);
		button.addEventListener("pointerenter", onEnter);
		button.addEventListener("pointermove", onMove);
		button.addEventListener("pointerleave", closePreview);
		button.addEventListener("pointercancel", closePreview);
		button.addEventListener("blur", closePreview);
		const onScroll = () => {
			if (previewRef.current) alignClone();
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			button.removeEventListener("pointerenter", onEnter);
			button.removeEventListener("pointermove", onMove);
			button.removeEventListener("pointerleave", closePreview);
			button.removeEventListener("pointercancel", closePreview);
			button.removeEventListener("blur", closePreview);
			discardPreview();
		};
	}, []);
	const flip = () => {
		const next = theme === "dark" ? "light" : "dark";
		setFlipped(true);
		closePreview();
		const apply = () => {
			setTheme(next);
			applyThemePreference(next);
		};
		const startViewTransition = document.startViewTransition;
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!startViewTransition || prefersReduced) {
			apply();
			return;
		}
		if (window.matchMedia("(pointer: coarse)").matches) {
			startViewTransition.call(document, () => {
				flushSync(apply);
			}).ready.then(() => {
				document.documentElement.animate([
					{ transform: "translateY(-100%)" },
					{
						transform: "translateY(1.5%)",
						offset: .78
					},
					{ transform: "translateY(0)" }
				], {
					duration: 560,
					easing: cssEase.out,
					pseudoElement: "::view-transition-new(root)"
				});
				document.documentElement.animate({ transform: ["translateY(0)", "translateY(10%)"] }, {
					duration: 560,
					easing: cssEase.inOut,
					pseudoElement: "::view-transition-old(root)"
				});
			});
			return;
		}
		const rect = buttonRef.current?.getBoundingClientRect();
		const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
		const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
		const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
		startViewTransition.call(document, () => {
			flushSync(apply);
		}).ready.then(() => {
			document.documentElement.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] }, {
				duration: 480,
				easing: cssEase.inOut,
				pseudoElement: "::view-transition-new(root)"
			});
		});
	};
	const label = mounted && theme === "dark" ? labelToLight : labelToDark;
	return /* @__PURE__ */ jsxs("button", {
		ref: buttonRef,
		type: "button",
		onClick: flip,
		"aria-label": label,
		title: label,
		className: "tds-theme-toggle inline-flex items-center justify-center w-9 h-9 rounded-full text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer",
		children: [/* @__PURE__ */ jsx("svg", {
			"aria-hidden": "true",
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: `${mounted && theme === "dark" ? "hidden" : "block"}${flipped ? " tds-theme-toggle__icon--turn" : ""}`,
			children: /* @__PURE__ */ jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
		}), /* @__PURE__ */ jsxs("svg", {
			"aria-hidden": "true",
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.75",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			className: `${mounted && theme === "dark" ? "block" : "hidden"}${flipped ? " tds-theme-toggle__icon--turn" : ""}`,
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "4"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "12",
					y1: "2",
					x2: "12",
					y2: "5"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "12",
					y1: "19",
					x2: "12",
					y2: "22"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "2",
					y1: "12",
					x2: "5",
					y2: "12"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "19",
					y1: "12",
					x2: "22",
					y2: "12"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "4.93",
					y1: "4.93",
					x2: "6.99",
					y2: "6.99"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "17.01",
					y1: "17.01",
					x2: "19.07",
					y2: "19.07"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "4.93",
					y1: "19.07",
					x2: "6.99",
					y2: "17.01"
				}),
				/* @__PURE__ */ jsx("line", {
					x1: "17.01",
					y1: "6.99",
					x2: "19.07",
					y2: "4.93"
				})
			]
		})]
	});
}
function initialsOf(name) {
	const words = name.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) return "?";
	const head = (value) => Array.from(value ?? "")[0] ?? "";
	return (head(words[0]) + (words.length > 1 ? head(words[words.length - 1]) : "")).toUpperCase() || "?";
}
function hash(value) {
	let h = 5381;
	for (let i = 0; i < value.length; i += 1) h = (h << 5) + h + value.charCodeAt(i) | 0;
	return Math.abs(h);
}
function Avatar({ name, src, seed, size = "md", decorative = false, className }) {
	const [failed, setFailed] = useState(false);
	const label = (name ?? "").trim();
	const classes = ["tds-avatar"];
	if (size === "sm") classes.push("tds-avatar--sm");
	else if (size === "lg") classes.push("tds-avatar--lg");
	if (className) classes.push(className);
	const showImage = Boolean(src) && !failed;
	const variant = CATEGORICAL_CHIP_VARIANTS[hash(String(seed ?? label ?? "")) % CATEGORICAL_CHIP_VARIANTS.length];
	const a11y = decorative ? { "aria-hidden": true } : {
		role: "img",
		"aria-label": label || "Profilbild"
	};
	if (showImage) return /* @__PURE__ */ jsx("img", {
		...a11y,
		alt: decorative ? "" : label,
		src: src ?? void 0,
		className: classes.join(" "),
		onError: () => setFailed(true),
		loading: "lazy",
		decoding: "async"
	});
	return /* @__PURE__ */ jsx("span", {
		...a11y,
		className: classes.join(" "),
		"data-avatar-variant": variant,
		children: /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			children: initialsOf(label)
		})
	});
}
var ACCOUNT_HINT_KEY = "tds_pub_account";
var ACCOUNT_LABEL_KEY = "tds_pub_account_label";
var trimEnd = (value) => value.replace(/\/+$/, "");
async function accountEndpoints(fallbacks = {}) {
	const base = await runtimeSetting("apiBase", fallbacks.apiBase ?? "https://api.tracht-digital.de");
	const login = await runtimeSetting("loginUrl", fallbacks.loginUrl ?? "https://auth.tracht-digital.de");
	const write = await runtimeAbsolute("authBase", fallbacks.authApi ?? "https://api.tracht-digital.de/auth");
	return {
		read: `${trimEnd(base)}/auth`,
		write,
		login: trimEnd(login)
	};
}
var mePromise = null;
async function fetchAccount(endpoints) {
	if (mePromise === null) {
		mePromise = (async () => {
			try {
				const res = await fetch(`${endpoints.read}/me`, { credentials: "include" });
				if (!res.ok) return null;
				return await res.json();
			} catch {
				return null;
			}
		})();
		mePromise = mePromise.then((me) => {
			if (me === null) mePromise = null;
			else setAccountHint(me.label ?? me.name ?? me.email ?? "");
			return me;
		});
	}
	return mePromise;
}
function invalidateAccount() {
	mePromise = null;
}
async function tryRefreshAccount(endpoints) {
	try {
		if (!(await fetch(`${endpoints.write}/refresh`, {
			method: "POST",
			credentials: "include"
		})).ok) return false;
		return (await fetch(`${endpoints.write}/me`, { credentials: "include" })).ok;
	} catch {
		return false;
	}
}
async function logoutAccount(endpoints) {
	try {
		await fetch(`${endpoints.write}/logout`, {
			method: "DELETE",
			credentials: "include"
		});
	} catch {}
	invalidateAccount();
	clearAccountHint();
}
function storage() {
	try {
		return typeof localStorage !== "undefined" ? localStorage : null;
	} catch {
		return null;
	}
}
function hasAccountHint() {
	try {
		return storage()?.getItem(ACCOUNT_HINT_KEY) === "1";
	} catch {
		return false;
	}
}
function setAccountHint(label = "") {
	try {
		const store = storage();
		store?.setItem(ACCOUNT_HINT_KEY, "1");
		if (label !== "") store?.setItem(ACCOUNT_LABEL_KEY, label);
	} catch {}
}
function clearAccountHint() {
	try {
		const store = storage();
		store?.removeItem(ACCOUNT_HINT_KEY);
		store?.removeItem(ACCOUNT_LABEL_KEY);
	} catch {}
}
function accountHintLabel() {
	try {
		return storage()?.getItem("tds_pub_account_label") ?? "";
	} catch {
		return "";
	}
}
function here() {
	return typeof location !== "undefined" ? location.href : "";
}
function loginHref(login, next = here()) {
	return `${trimEnd(login)}?next=${encodeURIComponent(next)}`;
}
function passwordHref(login, next = here()) {
	return `${trimEnd(login)}/passwort?next=${encodeURIComponent(next)}`;
}
var STR2 = {
	de: {
		menuLabel: "Kontomenü",
		portal: "Kundenportal",
		management: "Verwaltung",
		password: "Passwort ändern",
		logout: "Abmelden",
		signIn: "Anmelden"
	},
	en: {
		menuLabel: "Account menu",
		portal: "Customer portal",
		management: "Administration",
		password: "Change password",
		logout: "Sign out",
		signIn: "Sign in"
	}
};
var ICON = {
	user: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})] }),
	grid: /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "3",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "3",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			width: "7",
			height: "7",
			x: "14",
			y: "14",
			rx: "1"
		}),
		/* @__PURE__ */ jsx("rect", {
			width: "7",
			height: "7",
			x: "3",
			y: "14",
			rx: "1"
		})
	] }),
	shield: /* @__PURE__ */ jsx("path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }),
	key: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("path", { d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" }), /* @__PURE__ */ jsx("circle", {
		cx: "16.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor"
	})] }),
	logout: /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
		/* @__PURE__ */ jsx("polyline", { points: "16 17 21 12 16 7" }),
		/* @__PURE__ */ jsx("line", {
			x1: "21",
			x2: "9",
			y1: "12",
			y2: "12"
		})
	] }),
	chevron: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
};
function Glyph({ children, size = 16 }) {
	return /* @__PURE__ */ jsx("svg", {
		"aria-hidden": "true",
		width: size,
		height: size,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children
	});
}
var DEFAULT_LINKS = [{
	key: "portal",
	href: "https://app.tracht-digital.de",
	icon: "grid"
}, {
	key: "management",
	href: "https://management.tracht-digital.de",
	icon: "shield",
	adminOnly: true
}];
function AccountMenu({ lang = "de", compact = false, loggedOut = "nothing", afterLogout = "reload", apiBase: apiBase2, authApi, loginUrl, links = DEFAULT_LINKS, className }) {
	const s = STR2[lang] ?? STR2.de;
	const [me, setMe] = useState(null);
	const [loading, setLoading] = useState(true);
	const [endpoints, setEndpoints] = useState(null);
	const [open, setOpen] = useState(false);
	const [seenBefore] = useState(() => hasAccountHint());
	const [cachedLabel] = useState(() => accountHintLabel());
	const rootRef = useRef(null);
	const triggerRef = useRef(null);
	const panelRef = useRef(null);
	useEffect(() => {
		let cancelled = false;
		(async () => {
			const resolved = await accountEndpoints({
				apiBase: apiBase2,
				authApi,
				loginUrl
			});
			if (cancelled) return;
			setEndpoints(resolved);
			let principal = await fetchAccount(resolved);
			if (principal === null && seenBefore) {
				if (await tryRefreshAccount(resolved)) {
					invalidateAccount();
					principal = await fetchAccount(resolved);
				}
			}
			if (cancelled) return;
			if (principal === null) clearAccountHint();
			setMe(principal);
			setLoading(false);
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	useEffect(() => {
		if (!open) return;
		const onPointerDown = (event) => {
			if (!rootRef.current?.contains(event.target)) setOpen(false);
		};
		document.addEventListener("mousedown", onPointerDown);
		return () => document.removeEventListener("mousedown", onPointerDown);
	}, [open]);
	useEffect(() => {
		if (!open) return;
		panelRef.current?.querySelector("[data-menu-item]")?.focus();
	}, [open]);
	const onRootKeyDown = useCallback((event) => {
		if (event.key === "Escape") {
			setOpen(false);
			triggerRef.current?.focus();
			return;
		}
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		event.preventDefault();
		const items = Array.from(panelRef.current?.querySelectorAll("[data-menu-item]") ?? []);
		if (items.length === 0) return;
		items[(items.indexOf(document.activeElement) + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
	}, []);
	const label = useMemo(() => me?.label ?? me?.name ?? me?.email ?? "", [me]);
	const login = endpoints?.login ?? loginUrl ?? "https://auth.tracht-digital.de";
	const signOut = useCallback(async () => {
		if (endpoints === null) return;
		await logoutAccount(endpoints);
		if (afterLogout === "reload") {
			location.reload();
			return;
		}
		setMe(null);
		setOpen(false);
	}, [endpoints, afterLogout]);
	const signInLink = /* @__PURE__ */ jsx("a", {
		className: `btn btn-ghost${className ? ` ${className}` : ""}`,
		href: loginHref(login),
		children: s.signIn
	});
	if (loading) {
		if (seenBefore) return /* @__PURE__ */ jsx("div", {
			className: `tds-dropdown${className ? ` ${className}` : ""}`,
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "tds-dropdown__trigger",
				disabled: true,
				tabIndex: -1,
				children: [
					/* @__PURE__ */ jsx("span", { className: "tds-avatar tds-avatar--sm" }),
					!compact && cachedLabel !== "" && /* @__PURE__ */ jsx("span", {
						className: "min-w-0 hidden sm:block",
						children: /* @__PURE__ */ jsx("span", {
							className: "tds-dropdown__label text-sm font-medium",
							children: cachedLabel
						})
					}),
					/* @__PURE__ */ jsx("span", {
						style: { color: "var(--color-muted)" },
						children: /* @__PURE__ */ jsx(Glyph, {
							size: 14,
							children: ICON.chevron
						})
					})
				]
			})
		});
		return loggedOut === "login" ? signInLink : null;
	}
	if (me === null) return loggedOut === "login" ? signInLink : null;
	const rows = links.filter((link) => !link.adminOnly || me.isAdmin);
	return /* @__PURE__ */ jsxs("div", {
		className: `tds-dropdown${className ? ` ${className}` : ""}`,
		ref: rootRef,
		onKeyDown: onRootKeyDown,
		children: [/* @__PURE__ */ jsxs("button", {
			type: "button",
			ref: triggerRef,
			className: "tds-dropdown__trigger",
			"aria-haspopup": "menu",
			"aria-expanded": open,
			onClick: () => setOpen((v) => !v),
			children: [
				/* @__PURE__ */ jsx(Avatar, {
					name: label,
					src: me.hasAvatar ? me.avatarUrl : null,
					seed: me.userId,
					size: "sm",
					decorative: true
				}),
				!compact && /* @__PURE__ */ jsx("span", {
					className: "min-w-0 hidden sm:block",
					children: /* @__PURE__ */ jsx("span", {
						className: "tds-dropdown__label text-sm font-medium",
						children: label
					})
				}),
				/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					style: { color: "var(--color-muted)" },
					children: /* @__PURE__ */ jsx(Glyph, {
						size: 14,
						children: ICON.chevron
					})
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "sr-only",
					children: [s.menuLabel, label ? ` \u2014 ${label}` : ""]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			ref: panelRef,
			className: "tds-dropdown__panel",
			role: "menu",
			"aria-label": s.menuLabel,
			hidden: !open,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "tds-dropdown__head",
					children: [/* @__PURE__ */ jsx(Avatar, {
						name: label,
						src: me.hasAvatar ? me.avatarUrl : null,
						seed: me.userId,
						decorative: true
					}), /* @__PURE__ */ jsxs("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("span", {
							className: "tds-dropdown__label text-sm font-medium",
							children: label
						}), /* @__PURE__ */ jsx("span", {
							className: "tds-dropdown__label text-xs",
							style: { color: "var(--color-muted)" },
							children: me.email
						})]
					})]
				}),
				/* @__PURE__ */ jsx("hr", { className: "tds-dropdown__sep" }),
				rows.map((link) => /* @__PURE__ */ jsxs("a", {
					className: "tds-dropdown__item",
					role: "menuitem",
					"data-menu-item": true,
					href: link.href,
					children: [/* @__PURE__ */ jsx("span", {
						className: "tds-dropdown__icon",
						children: /* @__PURE__ */ jsx(Glyph, { children: ICON[link.icon ?? "user"] })
					}), link.label ?? s[link.key] ?? link.key]
				}, link.key)),
				/* @__PURE__ */ jsxs("a", {
					className: "tds-dropdown__item",
					role: "menuitem",
					"data-menu-item": true,
					href: passwordHref(login),
					children: [/* @__PURE__ */ jsx("span", {
						className: "tds-dropdown__icon",
						children: /* @__PURE__ */ jsx(Glyph, { children: ICON.key })
					}), s.password]
				}),
				/* @__PURE__ */ jsx("hr", { className: "tds-dropdown__sep" }),
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					className: "tds-dropdown__item tds-dropdown__item--danger",
					role: "menuitem",
					"data-menu-item": true,
					onClick: () => void signOut(),
					children: [/* @__PURE__ */ jsx("span", {
						className: "tds-dropdown__icon",
						children: /* @__PURE__ */ jsx(Glyph, { children: ICON.logout })
					}), s.logout]
				})
			]
		})]
	});
}
var TX = {
	de: {
		label: "Anzeige",
		checkPrice: "Preis beim Anbieter prüfen",
		at: "bei",
		asOf: "Stand",
		toOffer: "Zum Angebot",
		toProduct: "Ansehen",
		buy: "Kaufen",
		outOfStock: "Derzeit nicht verfügbar",
		amazonNote: "Preis und Verfügbarkeit können sich geändert haben. Maßgeblich ist der Preis, der zum Kaufzeitpunkt auf der Anbieterseite steht."
	},
	en: {
		label: "Advertisement",
		checkPrice: "Check price at the merchant",
		at: "at",
		asOf: "as of",
		toOffer: "View offer",
		toProduct: "View",
		buy: "Buy",
		outOfStock: "Currently unavailable",
		amazonNote: "Price and availability may have changed. The price shown on the merchant's page at the time of purchase applies."
	}
};
function formatPrice(cents, currency, lang) {
	try {
		return new Intl.NumberFormat(lang === "de" ? "de-DE" : "en-GB", {
			style: "currency",
			currency
		}).format(cents / 100);
	} catch {
		return `${(cents / 100).toFixed(2)} ${currency}`;
	}
}
function formatChecked(iso, lang) {
	const t = Date.parse(iso);
	if (Number.isNaN(t)) return "";
	return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}).format(new Date(t));
}
function primaryOffer(offers) {
	if (offers.length === 0) return null;
	return [...offers].sort((a, b) => {
		if (a.kind !== b.kind) return a.kind === "own" ? -1 : 1;
		return a.position - b.position;
	})[0] ?? null;
}
function OfferRow({ offer, product, lang, now, onOfferClick }) {
	const tx = TX[lang];
	const price = displayPrice(offer, now);
	const affiliate = offer.kind === "affiliate";
	return /* @__PURE__ */ jsxs("div", {
		className: "tds-product-offer",
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "tds-product-offer__merchant",
				children: [
					tx.at,
					" ",
					offer.merchant
				]
			}),
			/* @__PURE__ */ jsx("span", {
				className: "tds-product-price",
				children: price ? formatPrice(price.cents, price.currency, lang) : tx.checkPrice
			}),
			price && offer.priceCheckedAt ? /* @__PURE__ */ jsxs("span", {
				className: "tds-product-offer__asof",
				children: [
					tx.asOf,
					" ",
					formatChecked(offer.priceCheckedAt, lang)
				]
			}) : null,
			offer.availability === "out_of_stock" ? /* @__PURE__ */ jsx("span", {
				className: "tds-product-offer__stock",
				children: tx.outOfStock
			}) : null,
			/* @__PURE__ */ jsx("a", {
				className: "btn btn-primary tds-product-offer__cta",
				href: offer.url,
				rel: affiliate ? "sponsored nofollow noopener" : "noopener",
				target: affiliate ? "_blank" : void 0,
				onClick: () => onOfferClick?.(offer, product),
				children: affiliate ? tx.toOffer : tx.buy
			})
		]
	});
}
function ProductCard({ product, variant = "card", lang = "de", affiliateLabel, now = Date.now(), onOfferClick, className, style }) {
	const tx = TX[lang];
	const offers = product.offers ?? [];
	const hasAffiliate = offers.some((o) => o.kind === "affiliate");
	const hasAmazon = offers.some((o) => o.network === "amazon");
	const label = affiliateLabel?.trim() || tx.label;
	const primary = primaryOffer(offers);
	const classes = [
		"tds-product-card",
		`tds-product-card--${variant}`,
		className
	].filter(Boolean).join(" ");
	if (variant === "inline") return /* @__PURE__ */ jsxs("div", {
		className: classes,
		style,
		children: [
			hasAffiliate ? /* @__PURE__ */ jsx("span", {
				className: "tds-product-badge",
				children: label
			}) : null,
			/* @__PURE__ */ jsx("a", {
				className: "tds-product-card__title",
				href: product.url,
				children: product.title
			}),
			primary ? /* @__PURE__ */ jsx(OfferRow, {
				offer: primary,
				product,
				lang,
				now,
				onOfferClick
			}) : null
		]
	});
	return /* @__PURE__ */ jsxs("article", {
		className: classes,
		style,
		children: [
			hasAffiliate ? /* @__PURE__ */ jsx("span", {
				className: "tds-product-badge",
				children: label
			}) : null,
			product.imageUrl ? /* @__PURE__ */ jsx("a", {
				className: "tds-product-card__media",
				href: product.url,
				children: /* @__PURE__ */ jsx("img", {
					src: product.imageUrl,
					alt: product.title,
					loading: "lazy"
				})
			}) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "tds-product-card__body",
				children: [
					/* @__PURE__ */ jsx("a", {
						className: "tds-product-card__title",
						href: product.url,
						children: product.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "tds-product-card__teaser",
						children: product.teaser
					}),
					variant === "list" ? offers.map((offer) => /* @__PURE__ */ jsx(OfferRow, {
						offer,
						product,
						lang,
						now,
						onOfferClick
					}, offer.id)) : primary ? /* @__PURE__ */ jsx(OfferRow, {
						offer: primary,
						product,
						lang,
						now,
						onOfferClick
					}) : /* @__PURE__ */ jsx("a", {
						className: "btn btn-ghost",
						href: product.url,
						children: tx.toProduct
					}),
					hasAmazon ? /* @__PURE__ */ jsx("p", {
						className: "tds-affiliate-note",
						children: tx.amazonNote
					}) : null
				]
			})
		]
	});
}
//#endregion
//#region src/components/CartBadge.tsx
/**
* The basket link in the header, with a count.
*
* Renders nothing until the basket has been read, and nothing at all while it
* is empty. A permanently visible "0" is a control that does nothing on almost
* every page of a catalogue — and the link is not useful before there is
* something in it.
*
* The count is written into the link's accessible name rather than left as a
* bare number: "3" announced on its own says nothing about three of what.
*/
function CartBadge({ lang }) {
	const t = tx(lang).cart;
	const [count, setCount] = useState(null);
	useEffect(() => {
		setCount(cartCount());
		return onCartChange((lines) => setCount(cartCount(lines)));
	}, []);
	if (count === null || count === 0) return null;
	return /* @__PURE__ */ jsxs("a", {
		className: "shop-header__cart",
		href: cartPath(lang),
		"aria-label": t.badge(count),
		children: [t.title, /* @__PURE__ */ jsx("span", {
			className: "shop-header__cart-count",
			"aria-hidden": "true",
			children: count
		}, count)]
	});
}
//#endregion
//#region src/components/Header.astro
createAstro("https://shop.tracht-digital.de");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const { lang, altUrl = null } = Astro.props;
	const t = tx(lang);
	const path = Astro.url.pathname;
	const trimSlash = (v) => v.length > 1 && v.endsWith("/") ? v.slice(0, -1) : v;
	const isHome = trimSlash(path) === trimSlash(homePath(lang));
	const langHrefs = ["de", "en"].map((code) => ({
		code,
		href: code === lang ? path : altUrl ?? homePath(code)
	}));
	const nav = propertyNav("shop", lang, homePath(lang));
	const contact = propertyContact(lang);
	const cta = translations[lang].nav.cta;
	return renderTemplate`${maybeRenderHead($$result)}<header class="brand-header"><div class="tds-shell tds-sitebar"><a class="tds-sitebar__brand brand-wordmark"${addAttribute(homePath(lang), "href")}${addAttribute(`${t.brand} — ${t.nav.catalogue}`, "aria-label")}><span class="brand-logo" aria-hidden="true"></span><span class="accent-italic">Shop</span></a><span class="tds-sitebar__divider" aria-hidden="true"></span><nav class="tds-sitebar__nav"${addAttribute(t.nav.label, "aria-label")}>${nav.map((item) => renderTemplate`<a class="tds-sitebar__link"${addAttribute(item.href, "href")}${addAttribute(item.current ? isHome ? "page" : "true" : void 0, "aria-current")}>${item.label}</a>`)}</nav><div class="tds-sitebar__desktop"><div class="tds-lang-toggle" role="group" aria-label="Sprache / Language">${langHrefs.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(l.code, "hreflang")}${addAttribute(l.code, "lang")}${addAttribute(l.code === lang ? "on" : "", "class")}${addAttribute(l.code === lang ? "true" : void 0, "aria-current")}>${l.code.toUpperCase()}</a>`)}</div>${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:idle": true,
		"labelToDark": t.theme.toDark,
		"labelToLight": t.theme.toLight,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "ThemeToggle"
	})}<div class="tds-sitebar__wide"><a${addAttribute(contact, "href")} class="btn btn-primary">${cta}</a></div></div><div class="tds-sitebar__actions">${renderComponent($$result, "AccountMenu", AccountMenu, {
		"client:idle": true,
		"lang": lang,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "AccountMenu"
	})}${renderComponent($$result, "CartBadge", CartBadge, {
		"client:idle": true,
		"lang": lang,
		"client:component-hydration": "idle",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/CartBadge.tsx",
		"client:component-export": "default"
	})}<button id="menu-toggle" type="button" class="btn btn-ghost tds-menu-toggle" aria-controls="mobile-menu" aria-expanded="false"${addAttribute(t.nav.menu, "aria-label")}><span class="tds-menu-bar tds-menu-bar-top" aria-hidden="true"></span><span class="tds-menu-bar tds-menu-bar-mid" aria-hidden="true"></span><span class="tds-menu-bar tds-menu-bar-bot" aria-hidden="true"></span></button></div></div><div id="mobile-menu" class="tds-mobile-menu shop-mobile-menu" aria-hidden="true"${addAttribute(t.nav.menu, "aria-label")}><nav${addAttribute(t.nav.label, "aria-label")}>${nav.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} data-menu-link class="tds-mobile-menu__link"${addAttribute(item.current ? isHome ? "page" : "true" : void 0, "aria-current")}>${item.label}</a>`)}</nav><div class="shop-mobile-menu__controls"><div class="shop-mobile-menu__settings"><div class="tds-lang-toggle" role="group" aria-label="Sprache / Language">${langHrefs.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(l.code, "hreflang")}${addAttribute(l.code, "lang")} data-menu-link${addAttribute(l.code === lang ? "on" : "", "class")}${addAttribute(l.code === lang ? "true" : void 0, "aria-current")}>${l.code.toUpperCase()}</a>`)}</div>${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:idle": true,
		"labelToDark": t.theme.toDark,
		"labelToLight": t.theme.toLight,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "ThemeToggle"
	})}</div><a${addAttribute(contact, "href")} data-menu-link class="btn btn-primary">${cta}</a></div></div></header>${renderScript($$result, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Header.astro", void 0);
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/astro/index.js
var pageTransitionOptIn = "@view-transition{navigation:auto;types:page}@media (prefers-reduced-motion:reduce){@view-transition{navigation:none}}";
var themeBootstrapScript = `(function () {
  function apply(root) {
    try {
      var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
      if (saved === "light" || saved === "dark") {
        root.setAttribute("${THEME_ATTRIBUTE}", saved);
        return;
      }
    } catch (e) { /* storage disabled \u2014 fall through to OS */ }
    var dark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("${THEME_ATTRIBUTE}", dark ? "dark" : "light");
  }
  apply(document.documentElement);
  document.addEventListener("astro:before-swap", function (event) {
    apply(event.newDocument.documentElement);
  });
})();`;
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://shop.tracht-digital.de");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, description, lang = "de", altUrl = null, noindex = false, ogImage = null, ogType = "website", jsonLd = null } = Astro.props;
	const path = Astro.url.pathname;
	const url = canonical(path);
	const alternate = altUrl && altUrl.startsWith("/") ? canonical(altUrl) : altUrl;
	const robots = noindex || isExcludedPath(path) ? "noindex, follow" : "index, follow";
	const image = ogImage ?? `${site.url}/og-default.png`;
	return renderTemplate`<!--
  data-surface selects the geometry layer from tds-shared's design library.
  This site renders the JOURNAL surface — the same file blog.tracht-digital.de
  and tools.tracht-digital.de render — so the three read as one property rather
  than three that resemble each other. Do not author radii locally.
--><html${addAttribute(lang, "lang")} data-surface="blog" data-flat><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><!-- The cross-page transition switch, as early as it can be: Chrome decides the
         incoming page's opt-in at its first render, and the stylesheet linked at the
         end of this head often arrives later (tds-shared pageTransitionOptIn). --><style>${unescapeHTML(pageTransitionOptIn)}</style><title>${pageTitle(title)}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(url, "href")}><meta name="robots"${addAttribute(robots, "content")}>${alternate ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<link rel="alternate"${addAttribute(lang === "de" ? "en" : "de", "hreflang")}${addAttribute(alternate, "href")}><link rel="alternate"${addAttribute(lang, "hreflang")}${addAttribute(url, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(lang === "de" ? url : alternate, "href")}>` })}` : null}<meta property="og:type"${addAttribute(ogType, "content")}><meta property="og:site_name"${addAttribute(site.name, "content")}><meta property="og:title"${addAttribute(pageTitle(title), "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(url, "content")}><meta property="og:image"${addAttribute(image, "content")}><meta property="og:image:alt"${addAttribute(title, "content")}><meta property="og:locale"${addAttribute(lang === "en" ? "en_GB" : "de_DE", "content")}><meta property="og:locale:alternate"${addAttribute(lang === "en" ? "de_DE" : "en_GB", "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle(title), "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(image, "content")}><meta name="author"${addAttribute(site.legalName, "content")}><link rel="icon" type="image/png" href="/favicon.png" sizes="any"><meta${addAttribute(API_BASE_META, "name")}${addAttribute(apiBase$1(), "content")}><script>${unescapeHTML(themeBootstrapScript)}<\/script>${jsonLd ? renderTemplate`<script type="application/ld+json">${unescapeHTML(serializeJsonLd(jsonLd))}<\/script>` : null}${renderHead($$result)}</head><body><a class="tds-skip-link" href="#main">${translations[lang].a11y.skipToContent}</a>${renderComponent($$result, "Header", $$Header, {
		"lang": lang,
		"altUrl": altUrl
	})}<main class="tds-shell shop-main" id="main" tabindex="-1">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, { "lang": lang })}${renderComponent($$result, "ConsentBanner", ConsentBanner, {
		"client:idle": true,
		"lang": lang,
		"privacyUrl": legalPath("datenschutz", lang),
		"imprintUrl": legalPath("impressum", lang),
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/consent",
		"client:component-export": "ConsentBanner"
	})}</body></html>`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/layouts/Layout.astro", void 0);
//#endregion
export { addToCart as a, onCartChange as c, setQuantity as d, apiBase as i, readCart as l, ProductCard as n, cartPath as o, displayPrice as r, clearCart as s, $$Layout as t, removeFromCart as u };
