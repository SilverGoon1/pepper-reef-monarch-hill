import { N as isStaffAdminUsername, f as STAFF_ADMIN_EMAIL } from "./hours-BHiQSWtc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/phone-Be_Se2od.js
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
export { toTenDigitPhone as i, identifierToEmail as n, looksLikePhone as r, formatPhone as t };
