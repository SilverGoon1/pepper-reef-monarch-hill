//#region node_modules/.nitro/vite/services/ssr/assets/geo-O0tEPxB1.js
var ZONE_BOUNDS = {
	south: 39.32,
	north: 39.46,
	west: -74.73,
	east: -74.52
};
var CELL = .0032;
var MAP_CENTER = [39.3787, -74.6051];
function cellKey(lat, lng) {
	return `${Math.floor((lat - ZONE_BOUNDS.south) / CELL)},${Math.floor((lng - ZONE_BOUNDS.west) / CELL)}`;
}
function cellRect(key) {
	const [i, j] = key.split(",").map(Number);
	const south = ZONE_BOUNDS.south + i * CELL;
	const west = ZONE_BOUNDS.west + j * CELL;
	return {
		south,
		west,
		north: south + CELL,
		east: west + CELL
	};
}
function paintAround(lat, lng, radius) {
	const keys = [];
	for (let di = -radius; di <= radius; di += 1) for (let dj = -radius; dj <= radius; dj += 1) keys.push(cellKey(lat + di * CELL, lng + dj * CELL));
	return keys;
}
function cellSetHas(cells, lat, lng) {
	if (!cells.length) return false;
	return cells.includes(cellKey(lat, lng));
}
function googleMapsSearchUrl(query) {
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
function googleMapsCoordUrl(lat, lng) {
	return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
//#endregion
export { cellSetHas as a, paintAround as c, cellRect as i, MAP_CENTER as n, googleMapsCoordUrl as o, cellKey as r, googleMapsSearchUrl as s, CELL as t };
