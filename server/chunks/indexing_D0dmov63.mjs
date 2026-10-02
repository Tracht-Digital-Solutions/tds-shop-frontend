import { r as matchesPathPrefix, t as NEVER_CACHED } from "./noCache_1gtlPVi1.mjs";
//#region src/lib/indexing.ts
function isIndexable(product) {
	if (!product) return false;
	return product.editorialStatus === "published";
}
/**
* Paths that never belong in an index: everything never cached (basket,
* checkout, order, account, search, `/go/`, `/tds/`) plus the install page.
* Derived, so the two lists cannot drift apart.
*/
var NEVER_INDEXED = [...NEVER_CACHED, "/install"];
function isExcludedPath(pathname) {
	return matchesPathPrefix(pathname, NEVER_INDEXED);
}
//#endregion
export { isIndexable as n, isExcludedPath as t };
