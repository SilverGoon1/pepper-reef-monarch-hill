//#region node_modules/.nitro/vite/services/ssr/assets/scopes-C8w_GCNd.js
var BOT_ROLES = [
	"security_read",
	"ops_read",
	"menu_write",
	"orders_read",
	"admin_write"
];
var BOT_SCOPES = [
	"health.read",
	"auth.audit.read",
	"security.summary",
	"deploy.status.read",
	"orders.read",
	"orders.update_status",
	"menu.read",
	"menu.write",
	"payments.read"
];
var ROLE_SCOPES = {
	security_read: [
		"health.read",
		"auth.audit.read",
		"security.summary",
		"deploy.status.read"
	],
	ops_read: [
		"health.read",
		"orders.read",
		"menu.read"
	],
	menu_write: [
		"health.read",
		"menu.read",
		"menu.write"
	],
	orders_read: [
		"health.read",
		"orders.read",
		"orders.update_status"
	],
	admin_write: [
		"health.read",
		"auth.audit.read",
		"security.summary",
		"orders.read",
		"menu.read"
	]
};
var BOT_PRESETS = [
	{
		name: "security-guard",
		role: "security_read",
		label: "Security Guard"
	},
	{
		name: "chief-of-staff",
		role: "ops_read",
		label: "Chief of Staff"
	},
	{
		name: "finance",
		role: "orders_read",
		label: "Finance",
		scopes: ["orders.read", "payments.read"]
	},
	{
		name: "pos",
		role: "orders_read",
		label: "POS Employee"
	}
];
function isBotScope(raw) {
	return BOT_SCOPES.includes(raw);
}
function isBotRole(raw) {
	return BOT_ROLES.includes(raw);
}
function scopesForPreset(preset) {
	if (preset.scopes?.length) return [...preset.scopes];
	return [...ROLE_SCOPES[preset.role]];
}
function scopesForRole(role) {
	return [...ROLE_SCOPES[role]];
}
//#endregion
export { scopesForRole as a, scopesForPreset as i, isBotRole as n, isBotScope as r, BOT_PRESETS as t };
