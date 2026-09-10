//#region node_modules/.nitro/vite/services/ssr/assets/prod-guard.server-DuOhlek3.js
/**
* Production runtime checks. Preview and local `vite preview` are not
* `VERCEL_ENV=production`, so they keep the PGLite fallback.
*/
function isVercelProduction() {
	return (process.env.VERCEL_ENV ?? "").trim() === "production";
}
function requireNeonInProduction() {
	const url = (process.env.DATABASE_URL ?? "").trim();
	if (isVercelProduction() && !url) throw new Error("Production requires DATABASE_URL (Neon). Auth and orders are refused.");
}
var PRODUCTION_AUTH_ORIGINS = ["https://southendpizza.app", "https://www.southendpizza.app"];
//#endregion
export { isVercelProduction as n, requireNeonInProduction as r, PRODUCTION_AUTH_ORIGINS as t };
