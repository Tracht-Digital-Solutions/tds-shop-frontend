/**
* Trim to a whole word, never mid-word, and never leaving dangling
* punctuation. An ellipsis is added only when something was actually cut.
*/
function clampToWord(text, max = 160) {
	const clean = text.replace(/\s+/g, " ").trim();
	if (clean.length <= max) return clean;
	const cut = clean.slice(0, max - 1);
	const lastSpace = cut.lastIndexOf(" ");
	return `${(lastSpace > max * .6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, "")}…`;
}
/**
* Build a description from a lead and, if it falls short of the floor, top it
* up with context.
*
* The top-up is why this is a function rather than a `slice`: a two-sentence
* teaser is common and a 40-character description is worse than none, because
* it looks deliberate.
*/
function describe(lead, ...topUps) {
	let text = lead.replace(/\s+/g, " ").trim();
	for (const extra of topUps) {
		if (text.length >= 80) break;
		const addition = (extra ?? "").replace(/\s+/g, " ").trim();
		if (addition === "") continue;
		text = text === "" ? addition : `${text} ${addition}`;
	}
	return clampToWord(text);
}
//#endregion
export { describe as t };
