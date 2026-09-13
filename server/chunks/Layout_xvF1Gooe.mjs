import { A as renderTemplate, B as createAstro, D as renderSlot, Dt as _enum, M as renderHead, Mt as number, N as addAttribute, Nt as object, Ot as array, P as createRenderInstruction, Pt as string, R as unescapeHTML, T as Fragment$2, j as maybeRenderHead, kt as boolean, w as renderComponent } from "./sequence_CVXavwWK.mjs";
import { t as createComponent } from "./compiler_CEtdYN_G.mjs";
import { c as tx, i as homePath } from "./i18n_CAi8x9tF.mjs";
import { a as contentApiBase, t as apiBase$1 } from "./connection_BxSDNEzk.mjs";
import { n as siteKeyHeaders, t as assertKeyAccepted } from "./siteKey_CGym-S_8.mjs";
import { a as canonical, c as siteLinks, o as pageTitle, s as site, t as DEMO_MODE } from "./demoContent_DmC0ycm4.mjs";
import { t as isExcludedPath } from "./indexing_p4klDT6G.mjs";
import { useCallback, useEffect, useId, useRef, useState } from "react";
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
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/consent/index.js
var translations$1 = {
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
						"Hands-on-Übungen mit Ihrem echten Code",
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
			slogan: "Digitale Lösungen, die wirklich passen.",
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
			siteText: "Keine Tracking-Cookies: Nur technisch nötige Einstellungen wie Ihr Farbschema bleiben lokal in Ihrem Browser.",
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
			slogan: "Digital solutions that truly fit.",
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
function ConsentSettings({ open, lang, categories, initial, privacyUrl, imprintUrl, onSave, onClose }) {
	const t = translations$1[lang].consent;
	const ref = useRef(null);
	const titleRef = useRef(null);
	const titleId = useId();
	const descId = useId();
	const [choices, setChoices] = useState(initial);
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
		}
	}, [open]);
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
	if (!open) return null;
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
var DEFAULT_PRIVACY_URL = "https://tracht-digital.de/legal/datenschutz";
function ConsentBanner({ lang = "de", categories = [], variant = "site", privacyUrl = DEFAULT_PRIVACY_URL, imprintUrl } = {}) {
	const t = translations$1[lang].consent;
	const notice = translations$1[lang].cookieNotice;
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
		children: translations$1[lang].consent.manage
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
//#region src/content/legal/agb.de.md?raw
var agb_de_default = "---\ntemplate: true\nreview: Vor Livegang anwaltlich pruefen lassen. Diese Vorlage ist vollstaendig\n  und zitiert die einschlaegigen Vorschriften, ersetzt aber keine Rechtsberatung.\n  Die gepruefte Fassung wird ueber das CMS veroeffentlicht und ueberschreibt\n  diese Datei.\n---\nAllgemeine Geschäftsbedingungen für Bestellungen über\n**shop.tracht-digital.de**. Stand: September 2026.\n\n## 1. Geltungsbereich und Vertragspartner\n\n**1.1** Diese Bedingungen gelten für alle Bestellungen, die Sie über diesen\nShop aufgeben. Vertragspartner ist\n\nJulian Tracht, Tracht Digital Solutions\nElbinger Straße 19, 21493 Schwarzenbek\nUSt-IdNr. DE 450 639 725\n\n**1.2** Der Shop richtet sich an Verbraucher (§ 13 BGB) **und** an Unternehmer\n(§ 14 BGB). Einzelne Bestimmungen gelten nur für die eine oder die andere\nGruppe; sie sind dann ausdrücklich so gekennzeichnet.\n\n**1.3** Abweichende Bedingungen des Kunden werden nicht Vertragsbestandteil,\nauch wenn wir ihnen nicht ausdrücklich widersprechen.\n\n**1.4** Maßgeblich ist die Fassung dieser Bedingungen, die zum Zeitpunkt Ihrer\nBestellung gilt.\n\n## 2. Vertragsschluss\n\n**2.1** Die Darstellung der Produkte im Shop ist kein bindendes Angebot,\nsondern eine Aufforderung an Sie, ein Angebot abzugeben.\n\n**2.2** Mit dem Klick auf **„Zahlungspflichtig bestellen\"** geben Sie ein\nverbindliches Angebot ab. Unmittelbar über dieser Schaltfläche sehen Sie die\nwesentlichen Merkmale der Bestellung, den Gesamtpreis einschließlich Steuern\nund gegebenenfalls die Versandkosten.\n\n**2.3** Wir bestätigen den Eingang Ihrer Bestellung unverzüglich per E-Mail.\nDiese Eingangsbestätigung ist noch keine Annahme.\n\n**2.4** Der Vertrag kommt zustande, wenn wir die Bestellung ausdrücklich\nannehmen, die Leistung erbringen oder die Ware versenden — je nachdem, was\nzuerst geschieht. Bei sofort erbrachten digitalen Leistungen ist dies der\nZeitpunkt der Zahlungsbestätigung.\n\n## 3. Eingabefehler und Vertragstext\n\n**3.1** Vor dem Absenden können Sie alle Eingaben auf der Bestellseite\nüberprüfen und mit den üblichen Browserfunktionen sowie den Bearbeitungs- und\nEntfernen-Schaltflächen im Warenkorb ändern (§ 312i Abs. 1 Nr. 1 BGB).\n\n**3.2** Der Vertragstext wird bei uns gespeichert. Diese Bedingungen und die\nWiderrufsbelehrung können Sie jederzeit auf diesen Seiten abrufen, ausdrucken\nund speichern; die Angaben zu Ihrer Bestellung erhalten Sie zusätzlich per\nE-Mail.\n\n**3.3** Der Vertragsschluss erfolgt in deutscher oder englischer Sprache; in\nZweifelsfällen ist die deutsche Fassung maßgeblich.\n\n## 4. Preise\n\n**4.1** Alle Preise sind **Gesamtpreise einschließlich der gesetzlichen\nUmsatzsteuer**. Versandkosten werden, soweit sie anfallen, im Warenkorb und in\nder Bestellübersicht gesondert ausgewiesen.\n\n**4.2** Der Preis, der Ihnen unmittelbar vor dem Absenden der Bestellung\nangezeigt wird, ist der Preis, der berechnet wird. Er wird bei jedem Aufruf des\nWarenkorbs neu vom Server ermittelt.\n\n## 5. Zahlung\n\n**5.1** Die verfügbaren Zahlungsarten werden Ihnen im Bestellvorgang angezeigt.\nEs werden nur solche angeboten, die zum Zeitpunkt der Bestellung tatsächlich\nabgeschlossen werden können.\n\n**5.2** Der Rechnungsbetrag ist sofort mit Vertragsschluss fällig.\n\n**5.3** Für die Nutzung der angebotenen Zahlungsarten erheben wir **kein\nzusätzliches Entgelt** (§ 270a BGB).\n\n**5.4** *Gilt nur für Unternehmer:* Bei vereinbarter Zahlung auf Rechnung ist\nder Betrag ohne Abzug innerhalb von 14 Tagen ab Rechnungsdatum zu zahlen. Zu\nVerzug und Verzugszinsen gelten die §§ 286 ff. BGB.\n\n## 6. Lieferung, Erbringung und Gefahrübergang\n\n**6.1** Digitale Leistungen erbringen wir nach Zahlungseingang ohne\nschuldhaftes Zögern. Ein Versand findet insoweit nicht statt.\n\n**6.2** Körperliche Ware liefern wir an die von Ihnen angegebene Anschrift.\nLieferzeiten und Versandkosten stehen unter\n[Versand und Lieferung](/rechtliches/versand).\n\n**6.3** *Gilt nur für Verbraucher:* Die Gefahr des zufälligen Untergangs geht\nmit Übergabe der Ware an Sie über, auch wenn wir einen Versanddienstleister\nbeauftragt haben (§ 475 Abs. 2 BGB).\n\n**6.4** *Gilt nur für Unternehmer:* Die Gefahr geht mit Übergabe an den\nVersanddienstleister über.\n\n**6.5** Ist eine bestellte Ware dauerhaft nicht verfügbar, kommt insoweit kein\nVertrag zustande. Wir teilen Ihnen das unverzüglich mit und erstatten bereits\nerbrachte Zahlungen ohne Abzug.\n\n## 7. Eigentumsvorbehalt\n\nGelieferte Ware bleibt bis zur vollständigen Zahlung unser Eigentum. Rechte an\ndigitalen Leistungen werden erst mit vollständiger Zahlung eingeräumt.\n\n## 8. Widerrufsrecht\n\nVerbrauchern steht ein Widerrufsrecht zu. Einzelheiten, die Fristen und das\nMuster-Widerrufsformular finden Sie in der\n[Widerrufsbelehrung](/rechtliches/widerruf).\n\nFür Unternehmer besteht kein gesetzliches Widerrufsrecht.\n\n## 9. Mängelhaftung\n\n**9.1** Es gilt das gesetzliche Mängelrecht.\n\n**9.2** *Gilt nur für Unternehmer:* Die Verjährungsfrist für Mängelansprüche an\ngelieferter Ware beträgt ein Jahr ab Gefahrübergang. Ihre Rüge­obliegenheit nach\n§ 377 HGB bleibt unberührt.\n\n**9.3** Ansprüche wegen Verletzung des Lebens, des Körpers oder der Gesundheit,\naus Vorsatz oder grober Fahrlässigkeit sowie aus einer Garantie bleiben von\nZiffer 9.2 unberührt.\n\n## 10. Haftung\n\n**10.1** Wir haften unbeschränkt bei Vorsatz und grober Fahrlässigkeit, für\nSchäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, nach\ndem Produkthaftungsgesetz und im Umfang einer übernommenen Garantie.\n\n**10.2** Bei leicht fahrlässiger Verletzung einer Pflicht, deren Erfüllung die\nordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf\nderen Einhaltung Sie regelmäßig vertrauen dürfen (Kardinalpflicht), ist unsere\nHaftung auf den bei Vertragsschluss vorhersehbaren, vertragstypischen Schaden\nbegrenzt.\n\n**10.3** Im Übrigen ist die Haftung ausgeschlossen.\n\n## 11. Vertraulichkeit\n\nBeide Seiten behandeln Informationen, die ihnen im Zusammenhang mit dem Vertrag\nbekannt werden und ihrer Natur nach vertraulich sind, vertraulich und\nverwenden sie nur für die Durchführung des Vertrages. Diese Pflicht gilt über\ndas Vertragsende hinaus fort.\n\n## 12. Schlussbestimmungen\n\n**12.1** Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des\nUN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit dadurch\nder Schutz zwingender Vorschriften des Staates ihres gewöhnlichen Aufenthalts\nnicht entzogen wird (Art. 6 Abs. 2 Rom-I-VO).\n\n**12.2** *Gilt nur für Unternehmer, juristische Personen des öffentlichen\nRechts und öffentlich-rechtliche Sondervermögen:* Gerichtsstand für alle\nStreitigkeiten aus dem Vertragsverhältnis ist unser Geschäftssitz.\n\n**12.3** Wir sind nicht bereit und nicht verpflichtet, an\nStreitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen\n(§ 36 Abs. 1 Nr. 1 VSBG).\n\n**12.4** Sollte eine Bestimmung dieser Bedingungen unwirksam sein oder werden,\nbleibt die Wirksamkeit der übrigen Bestimmungen unberührt.\n";
//#endregion
//#region src/content/legal/datenschutz.de.md?raw
var datenschutz_de_default = "---\ntemplate: true\nreview: Vor Livegang anwaltlich pruefen lassen. Diese Vorlage ist vollstaendig\n  und zitiert die einschlaegigen Vorschriften, ersetzt aber keine Rechtsberatung.\n  Die gepruefte Fassung wird ueber das CMS veroeffentlicht und ueberschreibt\n  diese Datei.\n---\nDiese Erklärung beschreibt, was mit Ihren Daten geschieht, wenn Sie diesen Shop\nbesuchen oder hier bestellen — für jede Verarbeitung einzeln, mit Zweck und\nRechtsgrundlage. Stand: September 2026.\n\n## 1. Verantwortlicher\n\nJulian Tracht\nTracht Digital Solutions\nElbinger Straße 19\n21493 Schwarzenbek\nDeutschland\n\nTelefon: +49 178 822 4022\nE-Mail: [kontakt@tracht-digital.de](mailto:kontakt@tracht-digital.de)\n\nEine datenschutzbeauftragte Person ist nicht benannt; die Voraussetzungen des\n§ 38 BDSG liegen nicht vor.\n\n## 2. Aufruf der Seiten (Server-Protokolle)\n\nBeim Aufruf einer Seite überträgt Ihr Browser technisch notwendige Angaben, die\nunser Hoster protokolliert: IP-Adresse, Zeitpunkt, aufgerufene Adresse,\nübertragene Datenmenge, Browser- und Betriebssystemkennung sowie die zuvor\nbesuchte Seite.\n\n**Zweck:** Auslieferung der Seiten, Stabilität und Abwehr von Angriffen.\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO — unser berechtigtes Interesse\nam sicheren Betrieb.\n**Speicherdauer:** höchstens sieben Tage, danach automatische Löschung.\n\n## 3. Speicherung auf Ihrem Gerät\n\nDieser Shop setzt **keine Werbe- oder Trackingcookies**. Was gespeichert wird,\nliegt im lokalen Speicher Ihres Browsers und verlässt Ihr Gerät nicht:\n\n| Was | Wofür | Wie lange |\n|---|---|---|\n| Farbschema (hell/dunkel) | Ihre Anzeigeeinstellung | bis Sie sie ändern |\n| Sprache | Ihre Sprachwahl | bis Sie sie ändern |\n| Warenkorb | die Artikel, die Sie hineingelegt haben | bis zur Bestellung oder bis Sie ihn leeren |\n| Datenschutz-Auswahl | Ihre Entscheidung im Hinweisfeld, mit Zeitpunkt | bis Sie sie ändern |\n\nDiese Speicherung ist für den von Ihnen ausdrücklich gewünschten Dienst\nunbedingt erforderlich und daher nach § 25 Abs. 2 Nr. 2 TDDDG\neinwilligungsfrei. **Im Warenkorb stehen nur Kennungen und Mengen, keine\nPreise** — die Preise kommen bei jeder Anzeige neu vom Server.\n\nIhre Entscheidung im Hinweisfeld können Sie jederzeit über\n**„Cookie-Einstellungen\"** in der Fußzeile ändern.\n\n## 4. Bestellung\n\nBei einer Bestellung verarbeiten wir Ihre E-Mail-Adresse, auf Wunsch Ihren\nNamen, das Bestellland, die bestellten Positionen, die Beträge und den Wortlaut\nder Widerrufserklärung, dem Sie zugestimmt haben. Enthält Ihre Bestellung\nkörperliche Ware, kommt die Lieferanschrift hinzu.\n\n**Zweck:** Abwicklung des Vertrages und Erfüllung unserer gesetzlichen\nPflichten.\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (Vertrag) und Art. 6 Abs. 1\nlit. c DSGVO (handels- und steuerrechtliche Aufbewahrung).\n**Speicherdauer:** zehn Jahre nach § 147 AO und § 257 HGB. Eine Löschung vor\nAblauf dieser Frist ist uns nicht möglich.\n\nEin Kundenkonto ist nicht erforderlich; die Bestellung erfolgt als Gast. Der\nZugang zu Ihrer Bestellansicht erfolgt über eine zufällige Kennung in der\nAdresse — bewahren Sie diese Adresse wie ein Passwort auf.\n\n## 5. Zahlung\n\nDie Zahlung wickeln spezialisierte Anbieter ab. Wir erhalten von ihnen die\nBestätigung, dass gezahlt wurde, und eine Vorgangsnummer. **Ihre\nZahlungsdaten — Kartennummer, Zugangsdaten, Kontoverbindung — erreichen unsere\nServer zu keinem Zeitpunkt.**\n\n- **PayPal (Europe) S.à r.l. et Cie, S.C.A.**, 22–24 Boulevard Royal, 2449\n  Luxemburg. Es gelten deren\n  [Datenschutzhinweise](https://www.paypal.com/de/webapps/mpp/ua/privacy-full).\n- **Stripe Payments Europe, Limited**, 1 Grand Canal Street Lower, Dublin,\n  Irland, für Kartenzahlungen. Stripe überträgt Daten an die **Stripe, Inc.**\n  in den USA; die Übermittlung ist durch Standardvertragsklauseln nach Art. 46\n  Abs. 2 lit. c DSGVO abgesichert.\n\n**Zweck:** Durchführung der Zahlung.\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO.\n\n## 6. Versand\n\nEnthält Ihre Bestellung körperliche Ware, geben wir Ihren Namen und Ihre\nLieferanschrift an das beauftragte Versandunternehmen weiter, soweit dies für\ndie Zustellung erforderlich ist.\n\n**Zweck:** Lieferung.\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO.\n\n## 7. Hosting\n\nDie Seiten werden bei der **netcup GmbH**, Daimlerstraße 25, 76185 Karlsruhe,\nin einem Rechenzentrum in Deutschland betrieben. Mit netcup besteht ein Vertrag\nzur Auftragsverarbeitung nach Art. 28 DSGVO.\n\n## 8. E-Mail-Versand\n\nBestellbestätigungen versenden wir über **Resend, Inc.**, 2261 Market Street,\nSan Francisco, USA. Die Übermittlung ist durch Standardvertragsklauseln nach\nArt. 46 Abs. 2 lit. c DSGVO abgesichert.\n\n**Zweck:** die gesetzlich vorgeschriebene Bestätigung Ihrer Bestellung\n(§ 312i Abs. 1 Nr. 3 BGB).\n**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b und lit. c DSGVO.\n\n## 9. Weiterleitung zu Partnershops\n\nEinige Produkte kaufen Sie nicht bei uns, sondern bei einem Partner. Der Link\nführt über unsere Adresse `/go/…`, die den Klick zählt und Sie sofort\nweiterleitet.\n\nDabei wird **keine IP-Adresse gespeichert, kein Cookie gesetzt und keine\nKennung vergeben.** Gezählt wird ausschließlich, dass ein Klick stattgefunden\nhat. Ein Personenbezug entsteht nicht.\n\nWas nach der Weiterleitung geschieht, richtet sich nach der Datenschutz­erklärung\ndes jeweiligen Partners. Näheres im\n[Hinweis zu Partnerlinks](/rechtliches/affiliate).\n\n## 10. Schriftarten\n\nAlle Schriftarten werden von unserem eigenen Server ausgeliefert. Es besteht\n**keine Verbindung zu Google Fonts, Adobe Fonts oder einem anderen\nSchriftdienst**, und es wird dorthin auch keine IP-Adresse übertragen.\n\n## 11. Keine Analyse, keine Werbung\n\nDieser Shop enthält **keine Webanalyse, kein Tag-Management, keine Werbung,\nkeine Social-Media-Plugins und keine eingebetteten Karten oder Videos.** Es gibt\nfolglich nichts, wozu Sie hier einwilligen müssten — das Hinweisfeld sagt genau\ndas und fragt nichts ab.\n\n## 12. Ihre Rechte\n\nSie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16),\nLöschung (Art. 17), Einschränkung der Verarbeitung (Art. 18),\nDatenübertragbarkeit (Art. 20) und **Widerspruch** gegen Verarbeitungen, die\nauf einem berechtigten Interesse beruhen (Art. 21).\n\nEine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft\nwiderrufen (Art. 7 Abs. 3 DSGVO); die Rechtmäßigkeit der bis dahin erfolgten\nVerarbeitung bleibt unberührt.\n\nWenden Sie sich dafür formlos an\n[kontakt@tracht-digital.de](mailto:kontakt@tracht-digital.de).\n\n## 13. Beschwerderecht\n\nSie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns\nzuständig ist das\n\nUnabhängige Landeszentrum für Datenschutz Schleswig-Holstein\nHolstenstraße 98\n24103 Kiel\n[datenschutzzentrum.de](https://www.datenschutzzentrum.de)\n\n## 14. Verschlüsselung\n\nDiese Seiten werden ausschließlich über eine verschlüsselte Verbindung (TLS)\nausgeliefert. Sie erkennen das an `https://` in der Adresszeile.\n";
//#endregion
//#region src/content/legal/impressum.de.md?raw
var impressum_de_default = "---\ntemplate: true\nreview: Vor Livegang anwaltlich pruefen lassen. Diese Vorlage ist vollstaendig\n  und zitiert die einschlaegigen Vorschriften, ersetzt aber keine Rechtsberatung.\n  Die gepruefte Fassung wird ueber das CMS veroeffentlicht und ueberschreibt\n  diese Datei.\n---\n## Angaben gemäß § 5 DDG\n\nJulian Tracht\nTracht Digital Solutions\nElbinger Straße 19\n21493 Schwarzenbek\nDeutschland\n\n## Kontakt\n\nTelefon: +49 178 822 4022\nE-Mail: [kontakt@tracht-digital.de](mailto:kontakt@tracht-digital.de)\n\nEine Kontaktaufnahme ist über beide Wege möglich; auf E-Mails antworten wir in\nder Regel innerhalb eines Werktages.\n\n## Umsatzsteuer-Identifikationsnummer\n\nUmsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\n**DE 450 639 725**\n\n## Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV\n\nJulian Tracht\nElbinger Straße 19\n21493 Schwarzenbek\n\n## Verbraucherstreitbeilegung\n\nWir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor\neiner Verbraucherschlichtungsstelle teilzunehmen (§ 36 Abs. 1 Nr. 1 VSBG).\n\nDie Online-Streitbeilegungsplattform der Europäischen Kommission wurde zum\n20. Juli 2025 eingestellt. Ein Verweis darauf entfällt daher; er würde ins\nLeere führen.\n\n## Haftung für Inhalte\n\nAls Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen\nSeiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind\nwir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder\ngespeicherte fremde Informationen zu überwachen oder nach Umständen zu\nforschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nVerpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach\nden allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung\nist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung\nmöglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir\ndiese Inhalte umgehend.\n\n## Haftung für Links\n\nUnser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir\nkeinen Einfluss haben. Deshalb können wir für diese fremden Inhalte keine\nGewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der\njeweilige Anbieter oder Betreiber verantwortlich.\n\nEin Teil dieser Links sind Partnerlinks. Was das bedeutet, steht im\n[Hinweis zu Partnerlinks](/rechtliches/affiliate).\n\n## Urheberrecht\n\nDie durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten\nunterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,\nVerbreitung und jede Art der Verwertung außerhalb der Grenzen des\nUrheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw.\nErstellers.\n";
//#endregion
//#region src/lib/legal.ts
/**
* The legal texts.
*
* They live in the website CMS as `cms_block` rows carrying markdown, under
* this shop's own `cms_site` row — the same mechanism the marketing site's
* Impressum and Datenschutzerklärung use. Not `cms_legal_doc`: that stores
* uploaded PDF **bytes**, which is right for an AGB handed over as a document
* and wrong for a shop, where a consumer has to be able to read the terms on
* the page before ordering (§ 312i BGB) and a screen reader has to get at them.
*
* ### Every document has a committed fallback
*
* The texts under `src/content/legal/` are the ones that ship. The CMS
* OVERRIDES them; it does not supply them. That is the opposite of how the rest
* of this site reads content, and deliberately so: a marketing page that goes
* quiet is an inconvenience, whereas a shop whose withdrawal policy is blank
* because an API was slow is a shop that cannot lawfully take an order. The
* fallback lives in git, is reviewed like code, and cannot be unavailable.
*
* `null` therefore means something is genuinely wrong — a document with no
* committed text at all. The page renders a plain notice rather than an empty
* document: a blank legal page reads as a legal page with nothing IN it, which
* is a worse claim than admitting it is missing.
*/
/** The documents this site publishes, and their URL segments per language. */
var LEGAL_KEYS = {
	agb: "legal_agb",
	widerruf: "legal_widerruf",
	zahlung: "legal_zahlung",
	versand: "legal_versand",
	barrierefreiheit: "legal_barrierefreiheit",
	affiliate: "legal_affiliate",
	datenschutz: "legal_datenschutz",
	impressum: "legal_impressum"
};
function isLegalSlug(value) {
	return Object.prototype.hasOwnProperty.call(LEGAL_KEYS, value);
}
var LEGAL_TITLES = {
	de: {
		agb: "Allgemeine Geschäftsbedingungen",
		widerruf: "Widerrufsbelehrung",
		zahlung: "Zahlungsarten",
		versand: "Versand und Lieferung",
		barrierefreiheit: "Erklärung zur Barrierefreiheit",
		affiliate: "Hinweis zu Partnerlinks",
		datenschutz: "Datenschutzerklärung",
		impressum: "Impressum"
	},
	en: {
		agb: "Terms and Conditions",
		widerruf: "Right of withdrawal",
		zahlung: "Payment methods",
		versand: "Shipping and delivery",
		barrierefreiheit: "Accessibility statement",
		affiliate: "About affiliate links",
		datenschutz: "Privacy policy",
		impressum: "Legal notice"
	}
};
/**
* The committed texts, bundled at build time.
*
* `import.meta.glob` with `eager` and `?raw` inlines them into the server
* bundle, so nothing is read from disk at runtime — which matters because the
* production host receives `release/` without `src/`, exactly the trap the
* marketing site hit with its AGB PDF.
*/
var BUNDLED = /* #__PURE__ */ Object.assign({
	"../content/legal/agb.de.md": agb_de_default,
	"../content/legal/datenschutz.de.md": datenschutz_de_default,
	"../content/legal/impressum.de.md": impressum_de_default
});
/**
* The header every committed text carries.
*
* These documents are **templates**. They are written to be complete and to
* cite the right provisions, and they are still not a lawyer's advice — the
* operator has to have them reviewed before going live, and then publish their
* own through the CMS, which overrides the committed one.
*
* The marker is stripped before rendering. It is a note to whoever runs the
* shop, and a customer reading the withdrawal policy has no use for it — a
* banner saying "this may be wrong" on a page whose whole purpose is to be
* relied on would be worse than useless.
*/
var FRONT_MATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/;
/** Raw file contents including the marker, or null. */
function bundledRaw(slug, lang) {
	const text = BUNDLED[`../content/legal/${slug}.${lang}.md`];
	return typeof text === "string" && text.trim() !== "" ? text : null;
}
/** The committed text for a document, marker stripped, or null if none exists. */
function bundledLegal(slug, lang) {
	const raw = bundledRaw(slug, lang);
	if (raw === null) return null;
	const body = raw.replace(FRONT_MATTER, "").trim();
	return body === "" ? null : body;
}
/**
* Fetch one legal text as markdown, or null.
*
* Reads `/content/landing`, which serves the blocks of the site this site key
* is bound to. That is why the shop needs its own `cms_site` row: bound to the
* marketing site's, it would serve the marketing site's Impressum here.
*/
async function getLegalMarkdown(slug, lang) {
	const fallback = bundledLegal(slug, lang);
	if (DEMO_MODE) return fallback;
	const url = `${contentApiBase()}/landing?lang=${lang}`;
	try {
		const res = await fetch(url, { headers: siteKeyHeaders() });
		assertKeyAccepted(res, url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const markdown = (await res.json()).blocks?.[LEGAL_KEYS[slug]]?.markdown ?? "";
		return markdown.trim() === "" ? fallback : markdown;
	} catch (err) {
		if (err instanceof Error && err.name === "SiteKeyRejectedError") throw err;
		console.warn(`[tds-shop] legal ${slug} unreachable, serving the committed text:`, err);
		return fallback;
	}
}
//#endregion
//#region src/components/Footer.astro
createAstro("https://shop.tracht-digital.de");
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const { lang } = Astro.props;
	const t = tx(lang);
	const links = siteLinks(lang);
	const legalBase = lang === "en" ? "/en/legal" : "/rechtliches";
	const legalLinks = Object.keys(LEGAL_KEYS).map((slug) => ({
		href: `${legalBase}/${slug}`,
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
	return renderTemplate`${maybeRenderHead($$result)}<footer class="shop-footer tds-tone-navy"><div class="shop-shell shop-footer__grid"><div><p class="brand-wordmark shop-footer__wordmark"><span class="brand-logo brand-logo--inverse" aria-hidden="true"></span><span><span class="sr-only">TD </span><span class="shop-footer__accent">Shop</span></span></p><span class="tds-brandbar tds-brandbar--sm tds-brandbar--on-dark" aria-hidden="true"></span><p class="shop-footer__blurb">${t.footer.blurb}</p></div>${groups.map((group) => renderTemplate`<nav${addAttribute(group.id, "aria-labelledby")}><p class="shop-footer__head"${addAttribute(group.id, "id")}>${group.head}</p><ul class="shop-footer__list">${group.items.map((item) => renderTemplate`<li><a class="shop-footer__link"${addAttribute(item.href, "href")}>${item.label}</a></li>`)}</ul></nav>`)}<nav aria-labelledby="footer-legal"><p class="shop-footer__head" id="footer-legal">${t.footer.legal}</p><ul class="shop-footer__list">${legalLinks.map((link) => renderTemplate`<li><a class="shop-footer__link"${addAttribute(link.href, "href")}>${link.label}</a></li>`)}<li>${renderComponent($$result, "ConsentLink", ConsentLink, {
		"client:idle": true,
		"lang": lang,
		"className": "shop-footer__link",
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/consent",
		"client:component-export": "ConsentLink"
	})}</li></ul></nav></div><div class="shop-shell shop-footer__base"><p>© ${year} Tracht Digital Solutions</p><p>${t.tagline}</p></div></footer>`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Footer.astro", void 0);
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/components/index.js
var SEMANTIC_CHIP_VARIANTS$1 = [
	"neutral",
	"success",
	"warning",
	"danger",
	"info"
];
var CATEGORICAL_CHIP_VARIANTS$1 = [
	"cat-violet",
	"cat-teal",
	"cat-amber",
	"cat-rose",
	"cat-cyan"
];
var CHIP_VARIANTS$1 = [...SEMANTIC_CHIP_VARIANTS$1, ...CATEGORICAL_CHIP_VARIANTS$1];
new Set(CHIP_VARIANTS$1);
var THEME_STORAGE_KEY$1 = "tds-theme";
var THEME_ATTRIBUTE$1 = "data-theme";
var THEME_CHANGE_EVENT = "tds:theme-change";
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
		if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY$1);
		else localStorage.setItem(THEME_STORAGE_KEY$1, preference);
	} catch {}
	if (hasDocument()) document.documentElement.setAttribute(THEME_ATTRIBUTE$1, theme);
	if (options.announce !== false && typeof window !== "undefined") try {
		const detail = {
			preference,
			theme
		};
		window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail }));
	} catch {}
	return theme;
}
var cssEase = {
	out: `cubic-bezier(${[
		.2,
		.8,
		.2,
		1
	].join(", ")})`,
	inOut: `cubic-bezier(${[
		.4,
		0,
		.2,
		1
	].join(", ")})`
};
function ThemeToggle({ labelToDark = "Auf Dunkel umschalten", labelToLight = "Auf Hell umschalten" } = {}) {
	const [theme, setTheme] = useState("light");
	const [mounted, setMounted] = useState(false);
	const buttonRef = useRef(null);
	useEffect(() => {
		const current = document.documentElement.getAttribute(THEME_ATTRIBUTE$1);
		setTheme(current === "dark" ? "dark" : "light");
		setMounted(true);
	}, []);
	const flip = () => {
		const next = theme === "dark" ? "light" : "dark";
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
				document.documentElement.animate({
					opacity: [0, 1],
					transform: ["scale(1.02)", "scale(1)"]
				}, {
					duration: 320,
					easing: cssEase.out,
					pseudoElement: "::view-transition-new(root)"
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
			className: mounted && theme === "dark" ? "hidden" : "block",
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
			className: mounted && theme === "dark" ? "block" : "hidden",
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
var STATE_KEY$1 = /* @__PURE__ */ Symbol.for("@tracht-digital-solutions/tds-shared:api-state");
(() => {
	const host = globalThis;
	const existing = host[STATE_KEY$1];
	if (existing !== void 0) return existing;
	const fresh = {
		cached: null,
		runtimePromise: null,
		runtimeValue: null,
		onUnauthorized: null,
		headersProvider: null
	};
	host[STATE_KEY$1] = fresh;
	return fresh;
})();
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
	const links = siteLinks(lang);
	const path = Astro.url.pathname;
	const trimSlash = (v) => v.length > 1 && v.endsWith("/") ? v.slice(0, -1) : v;
	const isHome = trimSlash(path) === trimSlash(homePath(lang));
	const langHrefs = ["de", "en"].map((code) => ({
		code,
		href: code === lang ? path : altUrl ?? homePath(code)
	}));
	const nav = [
		{
			href: homePath(lang),
			label: t.nav.catalogue,
			current: isHome
		},
		{
			href: links.blog,
			label: "Journal",
			current: false
		},
		{
			href: links.tools,
			label: "Tools",
			current: false
		},
		{
			href: links.main,
			label: t.nav.main,
			current: false
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<header class="brand-header"><div class="shop-shell shop-bar"><a class="shop-header__brand brand-wordmark"${addAttribute(homePath(lang), "href")}${addAttribute(`${t.brand} — ${t.nav.catalogue}`, "aria-label")}><span class="brand-logo" aria-hidden="true"></span><span class="accent-italic">Shop</span></a><span class="nav-divider shop-bar__divider" aria-hidden="true"></span><nav class="shop-nav"${addAttribute(t.nav.label, "aria-label")}>${nav.map((item) => renderTemplate`<a class="shop-nav__link link-underline"${addAttribute(item.href, "href")}${addAttribute(item.current ? "page" : void 0, "aria-current")}>${item.label}</a>`)}</nav><div class="shop-bar__actions">${renderComponent($$result, "CartBadge", CartBadge, {
		"client:idle": true,
		"lang": lang,
		"client:component-hydration": "idle",
		"client:component-path": "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/CartBadge.tsx",
		"client:component-export": "default"
	})}<div class="shop-bar__desktop"><div class="tds-lang-toggle" role="group" aria-label="Sprache / Language">${langHrefs.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(l.code, "hreflang")}${addAttribute(l.code, "lang")}${addAttribute(l.code === lang ? "on" : "", "class")}${addAttribute(l.code === lang ? "true" : void 0, "aria-current")}>${l.code.toUpperCase()}</a>`)}</div>${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:idle": true,
		"labelToDark": t.theme.toDark,
		"labelToLight": t.theme.toLight,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "ThemeToggle"
	})}</div><button id="menu-toggle" type="button" class="btn btn-ghost tds-menu-toggle" aria-controls="mobile-menu" aria-expanded="false"${addAttribute(t.nav.menu, "aria-label")}><span class="tds-menu-bar tds-menu-bar-top" aria-hidden="true"></span><span class="tds-menu-bar tds-menu-bar-mid" aria-hidden="true"></span><span class="tds-menu-bar tds-menu-bar-bot" aria-hidden="true"></span></button></div></div><div id="mobile-menu" class="tds-mobile-menu shop-mobile-menu" aria-hidden="true"${addAttribute(t.nav.menu, "aria-label")}><nav${addAttribute(t.nav.label, "aria-label")}>${nav.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} data-menu-link class="tds-mobile-menu__link"${addAttribute(item.current ? "page" : void 0, "aria-current")}>${item.label}</a>`)}</nav><div class="shop-mobile-menu__controls"><div class="tds-lang-toggle" role="group" aria-label="Sprache / Language">${langHrefs.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(l.code, "hreflang")}${addAttribute(l.code, "lang")} data-menu-link${addAttribute(l.code === lang ? "on" : "", "class")}${addAttribute(l.code === lang ? "true" : void 0, "aria-current")}>${l.code.toUpperCase()}</a>`)}</div>${renderComponent($$result, "ThemeToggle", ThemeToggle, {
		"client:idle": true,
		"labelToDark": t.theme.toDark,
		"labelToLight": t.theme.toLight,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/components",
		"client:component-export": "ThemeToggle"
	})}</div></div></header>${renderScript($$result, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/components/Header.astro", void 0);
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/api/index.js
var API_BASE_META = "tds-api-base";
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
var trimEnd = (value) => value.replace(/\/+$/, "");
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
		_: "/opt/hostedtoolcache/node/22.23.2/x64/bin/npm",
		PATH: "/home/runner/work/tds-shop-frontend/tds-shop-frontend/node_modules/.bin:/home/runner/work/tds-shop-frontend/node_modules/.bin:/home/runner/work/node_modules/.bin:/home/runner/node_modules/.bin:/home/node_modules/.bin:/node_modules/.bin:/opt/hostedtoolcache/node/22.23.2/x64/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/opt/hostedtoolcache/node/22.23.2/x64/bin:/snap/bin:/home/runner/.local/bin:/opt/pipx_bin:/home/runner/.cargo/bin:/home/runner/.config/composer/vendor/bin:/usr/local/.ghcup/bin:/home/runner/.dotnet/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"
	})?.PUBLIC_API_BASE ?? "" : "";
	if (typeof document === "undefined") return trimEnd(env || "https://api.tracht-digital.de");
	let meta = "";
	try {
		meta = document.querySelector(`meta[name="tds-api-base"]`)?.getAttribute("content") ?? "";
	} catch {}
	state.cached = trimEnd(meta.trim() || env || "https://api.tracht-digital.de");
	return state.cached;
}
//#endregion
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/i18n/index.js
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
						"Hands-on-Übungen mit Ihrem echten Code",
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
			slogan: "Digitale Lösungen, die wirklich passen.",
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
			siteText: "Keine Tracking-Cookies: Nur technisch nötige Einstellungen wie Ihr Farbschema bleiben lokal in Ihrem Browser.",
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
			slogan: "Digital solutions that truly fit.",
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
//#region node_modules/@tracht-digital-solutions/tds-shared/dist/astro/index.js
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
	const { title, description, lang = "de", altUrl = null, noindex = false, ogImage = null, jsonLd = null } = Astro.props;
	const path = Astro.url.pathname;
	const url = canonical(path);
	const robots = noindex || isExcludedPath(path) ? "noindex, follow" : "index, follow";
	const image = ogImage ?? `${site.url}/og-default.png`;
	const legalBase = lang === "en" ? "/en/legal" : "/rechtliches";
	return renderTemplate`<!--
  data-surface selects the geometry layer from tds-shared's design library.
  This site renders the JOURNAL surface — the same file blog.tracht-digital.de
  and tools.tracht-digital.de render — so the three read as one property rather
  than three that resemble each other. Do not author radii locally.
--><html${addAttribute(lang, "lang")} data-surface="blog" data-flat><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${pageTitle(title, lang)}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(url, "href")}><meta name="robots"${addAttribute(robots, "content")}>${altUrl ? renderTemplate`${renderComponent($$result, "Fragment", Fragment$2, {}, { "default": ($$result) => renderTemplate`<link rel="alternate"${addAttribute(lang === "de" ? "en" : "de", "hreflang")}${addAttribute(altUrl, "href")}><link rel="alternate"${addAttribute(lang, "hreflang")}${addAttribute(url, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(lang === "de" ? url : altUrl, "href")}>` })}` : null}<meta property="og:type" content="website"><meta property="og:site_name"${addAttribute(site.name, "content")}><meta property="og:title"${addAttribute(pageTitle(title, lang), "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(url, "content")}><meta property="og:image"${addAttribute(image, "content")}><meta property="og:locale"${addAttribute(lang === "en" ? "en_GB" : "de_DE", "content")}><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/png" href="/favicon.png" sizes="any"><meta${addAttribute(API_BASE_META, "name")}${addAttribute(apiBase$1(), "content")}><script>${unescapeHTML(themeBootstrapScript)}<\/script>${jsonLd ? renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script>` : null}${renderHead($$result)}</head><body><a class="tds-skip-link" href="#main">${translations[lang].a11y.skipToContent}</a>${renderComponent($$result, "Header", $$Header, {
		"lang": lang,
		"altUrl": altUrl
	})}<main class="shop-shell shop-main" id="main" tabindex="-1">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, { "lang": lang })}${renderComponent($$result, "ConsentBanner", ConsentBanner, {
		"client:idle": true,
		"lang": lang,
		"privacyUrl": `${legalBase}/datenschutz`,
		"imprintUrl": `${legalBase}/impressum`,
		"client:component-hydration": "idle",
		"client:component-path": "@tracht-digital-solutions/tds-shared/consent",
		"client:component-export": "ConsentBanner"
	})}</body></html>`;
}, "/home/runner/work/tds-shop-frontend/tds-shop-frontend/src/layouts/Layout.astro", void 0);
//#endregion
export { getLegalMarkdown as a, cartPath as c, readCart as d, removeFromCart as f, LEGAL_TITLES as i, clearCart as l, apiBase as n, isLegalSlug as o, setQuantity as p, ProductCard as r, addToCart as s, $$Layout as t, onCartChange as u };
