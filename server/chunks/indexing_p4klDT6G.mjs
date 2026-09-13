//#region src/lib/indexing.ts
function isIndexable(product) {
	if (!product) return false;
	return product.editorialStatus === "published";
}
/** Paths that never belong in an index, whatever they contain. */
var NEVER_INDEXED = [
	"/go/",
	"/install",
	"/tds/",
	"/suche",
	"/en/search",
	"/warenkorb",
	"/en/cart",
	"/kasse",
	"/en/checkout",
	"/bestellung",
	"/en/order",
	"/konto",
	"/en/account"
];
function isExcludedPath(pathname) {
	const path = pathname.replace(/\/+$/, "") || "/";
	return NEVER_INDEXED.some((prefix) => path === prefix.replace(/\/$/, "") || path.startsWith(prefix));
}
//#endregion
export { isIndexable as n, isExcludedPath as t };
