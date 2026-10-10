//#region src/lib/categoryCopy.ts
var COPY = {
	netzwerk: {
		de: {
			answer: "Hier stehen Geräte, die ein Betriebsnetz tragen: Router, Switches, Access Points und was sie verbindet. Ausgewählt für kleine Betriebe und Büros, in denen niemand eine eigene IT-Abteilung hat — also nach Einrichtungsaufwand und Nachkaufbarkeit, nicht nach Datenblattspitzen. Jede Einschätzung stammt von Julian Tracht und nicht aus dem Herstellertext.",
			faq: [
				{
					q: "Wonach werden die Geräte hier ausgewählt?",
					a: "Nach drei Dingen: ob sich das Gerät ohne Spezialwissen einrichten lässt, ob es in zwei Jahren noch Firmware bekommt, und ob es sich nachkaufen lässt, wenn der Betrieb wächst. Technische Höchstwerte, die im Büroalltag niemand abruft, zählen nicht."
				},
				{
					q: "Sind die Links hier Partnerlinks?",
					a: "Ein Teil davon, und jeder einzelne ist als solcher gekennzeichnet — so verlangt es § 5a Abs. 4 UWG. Für dich ändert sich am Preis nichts. Welche Einträge wir selbst verkaufen, steht auf der jeweiligen Produktseite."
				},
				{
					q: "Warum steht bei manchen Einträgen kein Preis?",
					a: "Weil ein Partnerpreis nur so lange angezeigt werden darf, wie er nachweislich aktuell ist. Ist die letzte Prüfung älter als 24 Stunden, nehmen wir die Zahl von der Seite, statt eine womöglich falsche stehen zu lassen. Beim Partner steht immer der gültige Preis."
				},
				{
					q: "Könnt ihr das Netz auch einrichten?",
					a: "Ja, das ist die eigentliche Arbeit hinter diesem Katalog. Planung, Einrichtung und Betreuung laufen über tracht-digital.de; der Umfang wird vorher besprochen und als Angebot festgehalten."
				}
			]
		},
		en: {
			answer: "This is the equipment a business network runs on: routers, switches, access points and what connects them. Chosen for small businesses and offices with no IT department of their own — so by how much setup they need and whether you can buy the same thing again, not by datasheet peaks. Every assessment is Julian Tracht's, not the vendor's copy.",
			faq: [
				{
					q: "How is the equipment here chosen?",
					a: "By three things: whether it can be set up without specialist knowledge, whether it will still get firmware in two years, and whether you can buy more of it as the business grows. Technical maxima nobody reaches in an office do not count."
				},
				{
					q: "Are these affiliate links?",
					a: "Some of them, and every one is labelled as such — German law (§ 5a Abs. 4 UWG) requires it. The price is the same for you either way. Which entries we sell ourselves is stated on each product page."
				},
				{
					q: "Why do some entries show no price?",
					a: "Because a partner's price may only be shown while it is demonstrably current. If the last check is more than 24 hours old we take the figure off the page rather than leave a possibly wrong one standing. The valid price is always the one at the merchant."
				},
				{
					q: "Can you set the network up as well?",
					a: "Yes — that is the actual work behind this catalogue. Planning, setup and support run through tracht-digital.de, with the scope agreed and quoted beforehand."
				}
			]
		}
	},
	peripherie: {
		de: {
			answer: "Geräte, die am Arbeitsplatz hängen: Drucker und Scanner, Eingabegeräte, Bildschirme und Zubehör. Ausgewählt danach, was ein Arbeitstag mit ihnen aushält — Verbrauchskosten, Treiberpflege und ob sich das Gerät in einen bestehenden Ablauf einfügt. Die Einschätzung stammt von Julian Tracht.",
			faq: [
				{
					q: "Warum steht hier kein Drucker mit dem günstigsten Anschaffungspreis ganz oben?",
					a: "Weil der Anschaffungspreis bei Peripherie selten die eigentliche Rechnung ist. Entscheidend sind die Kosten je Seite beziehungsweise je Monat und ob das Gerät ohne Bastelei in den vorhandenen Ablauf passt."
				},
				{
					q: "Sind die Links hier Partnerlinks?",
					a: "Ein Teil davon, jeweils gekennzeichnet, wie es § 5a Abs. 4 UWG verlangt. Am Preis ändert das für dich nichts."
				},
				{
					q: "Wer kümmert sich um Rückgabe oder Garantie?",
					a: "Bei einem Partnerlink der Händler, bei dem du bestellst — dort gelten dessen Bedingungen. Was wir selbst verkaufen, ist auf der Produktseite als solches gekennzeichnet; dann sind wir der Vertragspartner."
				}
			]
		},
		en: {
			answer: "The devices that sit on a desk: printers and scanners, input devices, monitors and accessories. Chosen for what a working day does to them — running costs, driver upkeep, and whether the device fits into a workflow that already exists. The assessment is Julian Tracht's.",
			faq: [
				{
					q: "Why is the cheapest printer not at the top?",
					a: "Because with peripherals the purchase price is rarely the real bill. What decides it is the cost per page or per month, and whether the device fits the existing workflow without tinkering."
				},
				{
					q: "Are these affiliate links?",
					a: "Some of them, each one labelled, as German law (§ 5a Abs. 4 UWG) requires. The price is the same for you either way."
				},
				{
					q: "Who handles returns or warranty?",
					a: "For an affiliate link, the merchant you order from, under their terms. Anything we sell ourselves is marked as such on the product page, and then we are the contracting party."
				}
			]
		}
	}
};
/** The written copy for a category, or `null` when none has been written. */
function categoryCopy(category, lang, fromApi) {
	if (!category) return null;
	const intro = fromApi?.intro?.trim();
	if (intro && fromApi?.faq && fromApi.faq.length > 0) return {
		answer: intro,
		faq: fromApi.faq
	};
	return COPY[category]?.[lang] ?? null;
}
Object.keys(COPY);
//#endregion
export { categoryCopy as t };
