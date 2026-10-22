import { s as clampToWord } from "./Layout_DQnrLY78.mjs";
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
export { describe as t };
