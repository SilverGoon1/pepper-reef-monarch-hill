//#region node_modules/.nitro/vite/services/ssr/assets/phone-PlVj3DDJ.js
/** Shop desk login. Better Auth still stores an email; the form maps this username to it. */
var STAFF_ADMIN_ID = "staff-admin";
var STAFF_ADMIN_USERNAME = "admin";
var STAFF_ADMIN_NAME = "Admin";
var STAFF_ADMIN_EMAIL = "admin@staff.southend.pizza";
var STAFF_ADMIN_PASSWORD = "Admin2014";
function isStaffAdminUsername(raw) {
	return raw.trim().toLowerCase() === STAFF_ADMIN_USERNAME;
}
function digitsOnly(value) {
	return value.replace(/\D/g, "");
}
function looksLikePhone(value) {
	const d = digitsOnly(value);
	return d.length === 10 || d.length === 11 && d.startsWith("1");
}
function toTenDigitPhone(value) {
	const d = digitsOnly(value);
	if (d.length === 11 && d.startsWith("1")) return d.slice(1);
	if (d.length === 10) return d;
	return "";
}
function formatPhone(value) {
	const d = toTenDigitPhone(value);
	if (d.length !== 10) return value;
	return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
/** Map an email, shop username, or US phone into the Better Auth email identifier. */
function identifierToEmail(raw) {
	const trimmed = raw.trim();
	const phone = toTenDigitPhone(trimmed);
	if (phone) return {
		email: `${phone}@phone.southend.pizza`,
		phone
	};
	if (isStaffAdminUsername(trimmed)) return {
		email: STAFF_ADMIN_EMAIL,
		phone: void 0
	};
	return {
		email: trimmed.toLowerCase(),
		phone: void 0
	};
}
//#endregion
export { formatPhone as a, toTenDigitPhone as c, STAFF_ADMIN_PASSWORD as i, STAFF_ADMIN_ID as n, identifierToEmail as o, STAFF_ADMIN_NAME as r, looksLikePhone as s, STAFF_ADMIN_EMAIL as t };
