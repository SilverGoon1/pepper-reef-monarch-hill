export const BOT_ROLES = ["security_read", "ops_read", "menu_write", "orders_read", "admin_write"] as const;
export type BotRole = (typeof BOT_ROLES)[number];

export const BOT_SCOPES = [
  "health.read",
  "auth.audit.read",
  "security.summary",
  "deploy.status.read",
  "orders.read",
  "orders.update_status",
  "menu.read",
  "menu.write",
  "payments.read",
] as const;
export type BotScope = (typeof BOT_SCOPES)[number];

export const ROLE_SCOPES: Record<BotRole, BotScope[]> = {
  security_read: ["health.read", "auth.audit.read", "security.summary", "deploy.status.read"],
  ops_read: ["health.read", "orders.read", "menu.read"],
  menu_write: ["health.read", "menu.read", "menu.write"],
  orders_read: ["health.read", "orders.read", "orders.update_status"],
  admin_write: ["health.read", "auth.audit.read", "security.summary", "orders.read", "menu.read"],
};

export type BotPreset = {
  name: string;
  role: BotRole;
  label: string;
  scopes?: readonly BotScope[];
};

export const BOT_PRESETS: BotPreset[] = [
  { name: "security-guard", role: "security_read", label: "Security Guard" },
  { name: "chief-of-staff", role: "ops_read", label: "Chief of Staff" },
  { name: "finance", role: "orders_read", label: "Finance", scopes: ["orders.read", "payments.read"] },
  { name: "pos", role: "orders_read", label: "POS Employee" },
];

export function isBotScope(raw: string): raw is BotScope {
  return (BOT_SCOPES as readonly string[]).includes(raw);
}

export function isBotRole(raw: string): raw is BotRole {
  return (BOT_ROLES as readonly string[]).includes(raw);
}

export function scopesForPreset(preset: BotPreset): BotScope[] {
  if (preset.scopes?.length) return [...preset.scopes];
  return [...ROLE_SCOPES[preset.role]];
}

export function scopesForRole(role: BotRole): BotScope[] {
  return [...ROLE_SCOPES[role]];
}
