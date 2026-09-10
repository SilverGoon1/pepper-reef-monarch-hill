import { r as hashPassword } from "../_libs/better-auth__utils.mjs";
import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { A as getSql, B as parsePrinters, G as sanitizeCardSize, H as parseWeeklyHours, J as sanitizeSeasonEffect, K as sanitizeCardTextColor, N as isOpenNow, P as moneyNumber, R as nyWallToDate, V as parseReceiptOptions, W as sanitizeCardBg, b as computeTax, f as authMiddleware, j as hoursSummary, q as sanitizeCardTextSize, u as RESTAURANT, x as dbSource, y as clampTip } from "./hours-DVH-z3bz.mjs";
import { a as formatPhone, c as toTenDigitPhone, i as STAFF_ADMIN_PASSWORD, n as STAFF_ADMIN_ID, o as identifierToEmail, r as STAFF_ADMIN_NAME, t as STAFF_ADMIN_EMAIL } from "./phone-PlVj3DDJ.mjs";
import { n as seedMenu } from "./menu-store-DZhsiMfF.mjs";
import { a as cellSetHas, n as MAP_CENTER, r as cellKey, t as CELL } from "./geo-O0tEPxB1.mjs";
import { a as mergeItemDetail, i as condimentTotal, n as condimentDetail, o as sanitizeCondimentPicks, s as sanitizeCondiments } from "./condiments-D_hr3wCD.mjs";
import { a as pricePizzaBuild, o as sanitizeToppings, r as applyPizzaSizing, t as DEFAULT_TOPPING_PRICES } from "./pizza-BOZ6sxfu.mjs";
import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-server-t5FoNFqh.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32Encode(bytes) {
	let bits = "";
	for (const b of bytes) bits += b.toString(2).padStart(8, "0");
	let out = "";
	for (let i = 0; i < bits.length; i += 5) {
		const chunk = bits.slice(i, i + 5).padEnd(5, "0");
		out += ALPH[parseInt(chunk, 2)];
	}
	return out;
}
function base32Decode(secret) {
	const clean = secret.replace(/=+$/, "").toUpperCase().replace(/[^A-Z2-7]/g, "");
	let bits = "";
	for (const ch of clean) {
		const idx = ALPH.indexOf(ch);
		if (idx < 0) continue;
		bits += idx.toString(2).padStart(5, "0");
	}
	const bytes = [];
	for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
	return Buffer.from(bytes);
}
function generateTotpSecret() {
	return base32Encode(randomBytes(20));
}
function totpCode(secret, at = Date.now()) {
	const key = base32Decode(secret);
	const counter = Math.floor(at / 1e3 / 30);
	const buf = Buffer.alloc(8);
	buf.writeUInt32BE(Math.floor(counter / 4294967296), 0);
	buf.writeUInt32BE(counter >>> 0, 4);
	const hmac = createHmac("sha1", key).update(buf).digest();
	const offset = hmac[hmac.length - 1] & 15;
	const bin = (hmac[offset] & 127) << 24 | (hmac[offset + 1] & 255) << 16 | (hmac[offset + 2] & 255) << 8 | hmac[offset + 3] & 255;
	return String(bin % 1e6).padStart(6, "0");
}
function verifyTotp(secret, code) {
	const c = code.replace(/\s/g, "");
	if (!/^\d{6}$/.test(c)) return false;
	const now = Date.now();
	for (const w of [
		-1,
		0,
		1
	]) if (totpCode(secret, now + w * 3e4) === c) return true;
	return false;
}
function totpUri(secret, account) {
	return `otpauth://totp/${encodeURIComponent(`South End Pizza:${account}`)}?secret=${secret}&issuer=South%20End%20Pizza&digits=6&period=30`;
}
function num(v) {
	return moneyNumber(v);
}
function bool(v) {
	return v === true || v === "t" || v === "true";
}
async function seedIfEmpty(sql) {
	if ((await sql`select id from menu_categories limit 1`).length) return;
	const seeded = seedMenu();
	let i = 0;
	for (const cat of seeded.categories) {
		await sql.query(`insert into menu_categories (id, name, note, kind, icon, sort_order)
       values ($1,$2,$3,$4,$5,$6)
       on conflict (id) do nothing`, [
			cat.id,
			cat.name,
			cat.note ?? "",
			cat.kind,
			cat.icon ?? cat.id,
			i
		]);
		let j = 0;
		for (const item of cat.items) {
			await sql.query(`insert into menu_items (id, category_id, name, description, prices, highlight, sort_order, condiments)
         values ($1,$2,$3,$4,$5::jsonb,$6,$7,$8::jsonb)
         on conflict (id) do nothing`, [
				item.id,
				cat.id,
				item.name,
				item.description ?? "",
				JSON.stringify(item.prices),
				Boolean(item.highlight),
				j,
				JSON.stringify(sanitizeCondiments(item.condiments))
			]);
			j += 1;
		}
		i += 1;
	}
	await sql.query(`update shop_settings set restaurant = $1::jsonb, footer = $2 where id = 1`, [JSON.stringify(seeded.restaurant), seeded.footer]);
	const keys = /* @__PURE__ */ new Set();
	const [lat0, lng0] = MAP_CENTER;
	const span = CELL * 8;
	for (let lat = lat0 - span; lat <= lat0 + span; lat += CELL) for (let lng = lng0 - span; lng <= lng0 + span; lng += CELL) keys.add(cellKey(lat, lng));
	await sql.query(`update delivery_zones set cells = $1::jsonb, name = $2 where id = 1`, [JSON.stringify([...keys]), "Egg Harbor Township"]);
}
async function backfillSeedCondiments(sql) {
	if ((await sql`select id from menu_items where jsonb_typeof(condiments) = 'array' and jsonb_array_length(condiments) > 0 limit 1`).length) return;
	const seeded = seedMenu();
	for (const cat of seeded.categories) for (const item of cat.items) {
		const conds = sanitizeCondiments(item.condiments);
		if (!conds.length) continue;
		await sql.query(`update menu_items set condiments = $1::jsonb
         where name = $2 and category_id = $3
         and (condiments is null or condiments = '[]'::jsonb)`, [
			JSON.stringify(conds),
			item.name,
			cat.id
		]);
	}
	bustStorefrontCache();
}
async function seedDemoSalesIfEmpty(sql) {
	if (dbSource !== "pglite") return;
	if ((await sql`select id from orders limit 1`).length) return;
	for (const c of [
		{
			id: "demo-tony",
			name: "Tony Bianchi",
			points: 210,
			phone: "(609) 555-0142"
		},
		{
			id: "demo-lisa",
			name: "Lisa Park",
			points: 88,
			phone: "(609) 555-0198"
		},
		{
			id: "demo-devon",
			name: "Devon Hale",
			points: 132,
			phone: "(609) 555-0117"
		},
		{
			id: "demo-rita",
			name: "Rita Gomez",
			points: 54,
			phone: "(609) 555-0164"
		}
	]) await sql.query(`insert into profiles (user_id, role, display_name, points, phone) values ($1,'customer',$2,$3,$4)
       on conflict (user_id) do nothing`, [
		c.id,
		c.name,
		c.points,
		c.phone
	]);
	const tickets = [
		{
			id: "ord-demo-01",
			userId: "demo-tony",
			daysAgo: 0,
			hour: 12,
			fulfillment: "pickup",
			status: "placed",
			pay: "pay_pickup",
			items: [{
				itemId: "pep-lg",
				categoryId: "pizza",
				name: "Pepperoni Pizza",
				size: "LG",
				unitPrice: 18.75,
				qty: 1
			}, {
				itemId: "sticks",
				categoryId: "appetizers",
				name: "Mozzarella Sticks",
				size: "5 pc",
				unitPrice: 8.5,
				qty: 1
			}],
			notes: "Well done, extra ranch",
			tipPct: 15
		},
		{
			id: "ord-demo-02",
			userId: "demo-lisa",
			daysAgo: 0,
			hour: 17,
			fulfillment: "delivery",
			status: "out_for_delivery",
			pay: "pay_delivery",
			items: [{
				itemId: "buff-pizza",
				categoryId: "gourmet",
				name: "Buffalo Chicken Pizza",
				size: "MD",
				unitPrice: 20.75,
				qty: 1
			}],
			notes: "Leave at the side door. Bell is broken.",
			tipPct: 20
		},
		{
			id: "ord-demo-03",
			userId: "demo-devon",
			daysAgo: 1,
			hour: 13,
			fulfillment: "pickup",
			status: "completed",
			pay: "pay_pickup",
			items: [{
				itemId: "cheese-md",
				categoryId: "pizza",
				name: "Cheese Pizza",
				size: "MD",
				unitPrice: 15.75,
				qty: 1
			}, {
				itemId: "wings",
				categoryId: "wings",
				name: "Fresh Wings",
				size: "10 pc",
				unitPrice: 14,
				qty: 1
			}],
			notes: "No onions on the pie",
			tipPct: 10
		},
		{
			id: "ord-demo-04",
			userId: "demo-rita",
			daysAgo: 2,
			hour: 18,
			fulfillment: "delivery",
			status: "completed",
			pay: "pay_delivery",
			items: [{
				itemId: "steak",
				categoryId: "steak-subs",
				name: "Cheesesteak Sub",
				size: "Half",
				unitPrice: 12.95,
				qty: 2
			}, {
				itemId: "fries",
				categoryId: "sides",
				name: "Buffalo Fries",
				unitPrice: 12.75,
				qty: 1
			}],
			notes: "Extra napkins",
			tipPct: 15
		},
		{
			id: "ord-demo-05",
			userId: "demo-tony",
			daysAgo: 3,
			hour: 19,
			fulfillment: "pickup",
			status: "completed",
			pay: "pay_pickup",
			items: [{
				itemId: "sausage",
				categoryId: "pizza",
				name: "Sausage Pizza",
				size: "LG",
				unitPrice: 18.75,
				qty: 1
			}],
			discount: 5
		},
		{
			id: "ord-demo-06",
			userId: "demo-lisa",
			daysAgo: 4,
			hour: 12,
			fulfillment: "pickup",
			status: "completed",
			pay: "pay_pickup",
			items: [{
				itemId: "tenders",
				categoryId: "appetizers",
				name: "Buffalo Chicken Tenders",
				unitPrice: 14.95,
				qty: 1
			}, {
				itemId: "garlic",
				categoryId: "sides",
				name: "Garlic Bread",
				unitPrice: 5.5,
				qty: 1
			}]
		},
		{
			id: "ord-demo-07",
			userId: "demo-devon",
			daysAgo: 5,
			hour: 16,
			fulfillment: "delivery",
			status: "completed",
			pay: "pay_delivery",
			items: [{
				itemId: "pep-md",
				categoryId: "pizza",
				name: "Pepperoni Pizza",
				size: "MD",
				unitPrice: 17.75,
				qty: 2
			}]
		},
		{
			id: "ord-demo-08",
			userId: "demo-rita",
			daysAgo: 6,
			hour: 11,
			fulfillment: "pickup",
			status: "canceled",
			pay: "pay_pickup",
			items: [{
				itemId: "cheese-sm",
				categoryId: "pizza",
				name: "Cheese Pizza",
				size: "SM",
				unitPrice: 14.75,
				qty: 1
			}]
		},
		{
			id: "ord-demo-09",
			userId: "demo-tony",
			daysAgo: 7,
			hour: 18,
			fulfillment: "delivery",
			status: "completed",
			pay: "pay_card",
			items: [{
				itemId: "buff-sub",
				categoryId: "steak-subs",
				name: "Buffalo Chicken Cheesesteak Sub",
				size: "Half",
				unitPrice: 12.95,
				qty: 1
			}, {
				itemId: "sticks2",
				categoryId: "appetizers",
				name: "Mozzarella Sticks",
				size: "5 pc",
				unitPrice: 8.5,
				qty: 1
			}]
		},
		{
			id: "ord-demo-10",
			userId: "demo-lisa",
			daysAgo: 8,
			hour: 14,
			fulfillment: "pickup",
			status: "completed",
			pay: "pay_pickup",
			items: [{
				itemId: "stromboli",
				categoryId: "turnovers",
				name: "Stromboli",
				size: "LG",
				unitPrice: 18.5,
				qty: 1
			}]
		},
		{
			id: "ord-demo-11",
			userId: "demo-devon",
			daysAgo: 9,
			hour: 19,
			fulfillment: "pickup",
			status: "completed",
			pay: "pay_pickup",
			items: [{
				itemId: "cheese-lg",
				categoryId: "pizza",
				name: "Cheese Pizza",
				size: "LG",
				unitPrice: 16.75,
				qty: 1
			}, {
				itemId: "wings2",
				categoryId: "wings",
				name: "Fresh Wings",
				size: "10 pc",
				unitPrice: 14,
				qty: 1
			}]
		},
		{
			id: "ord-demo-12",
			userId: "demo-tony",
			daysAgo: 11,
			hour: 13,
			fulfillment: "delivery",
			status: "completed",
			pay: "pay_delivery",
			items: [{
				itemId: "buff-pizza2",
				categoryId: "gourmet",
				name: "Buffalo Chicken Pizza",
				size: "LG",
				unitPrice: 22.75,
				qty: 1
			}]
		},
		{
			id: "ord-demo-13",
			userId: "demo-rita",
			daysAgo: 12,
			hour: 17,
			fulfillment: "pickup",
			status: "completed",
			pay: "pay_pickup",
			items: [{
				itemId: "steak2",
				categoryId: "steak-subs",
				name: "Cheesesteak Sub",
				size: "Half",
				unitPrice: 12.95,
				qty: 1
			}, {
				itemId: "nuggets",
				categoryId: "wings",
				name: "Chicken Nuggets with Fries",
				size: "9 pc",
				unitPrice: 14.95,
				qty: 1
			}]
		},
		{
			id: "ord-demo-14",
			userId: "demo-lisa",
			daysAgo: 13,
			hour: 12,
			fulfillment: "pickup",
			status: "awaiting_payment",
			pay: "pay_card",
			items: [{
				itemId: "pep-sm",
				categoryId: "pizza",
				name: "Pepperoni Pizza",
				size: "SM",
				unitPrice: 16.75,
				qty: 1
			}]
		}
	];
	const taxRate = 6.625;
	const fee = 3.5;
	for (const t of tickets) {
		const subtotal = t.items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
		const discount = t.discount ?? 0;
		const deliveryFee = t.fulfillment === "delivery" ? fee : 0;
		const { tax, total: preTip } = computeTax(subtotal, discount, deliveryFee, taxRate);
		const tip = t.tipPct ? Math.round(Math.max(0, subtotal - discount) * (t.tipPct / 100) * 100) / 100 : 0;
		const total = Math.round((preTip + tip) * 100) / 100;
		const created = /* @__PURE__ */ new Date();
		created.setDate(created.getDate() - t.daysAgo);
		created.setHours(t.hour, 18, 0, 0);
		await sql.query(`insert into orders (
        id, user_id, status, fulfillment, notes, address_line, city, zip,
        items, subtotal, discount, delivery_fee, tax, tip, total, points_earned, points_spent, payment_method, created_at
      ) values (
        $1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10,$11,$12,$13,$14,$15,$16,0,$17,$18
      ) on conflict (id) do nothing`, [
			t.id,
			t.userId,
			t.status,
			t.fulfillment,
			t.notes ?? "",
			t.fulfillment === "delivery" ? "12 English Creek Ave" : "",
			t.fulfillment === "delivery" ? "Egg Harbor Township" : "",
			t.fulfillment === "delivery" ? "08234" : "",
			JSON.stringify(t.items),
			subtotal.toFixed(2),
			discount.toFixed(2),
			deliveryFee.toFixed(2),
			tax.toFixed(2),
			tip.toFixed(2),
			total.toFixed(2),
			Math.round(Math.max(0, subtotal - discount)),
			t.pay,
			created.toISOString()
		]);
	}
}
var shopBoot = globalThis;
var profileLocks = /* @__PURE__ */ new Map();
async function ensureSettingsSchema(sql) {
	if (!shopBoot.__southendSchema__) shopBoot.__southendSchema__ = applySettingsSchema(sql).catch((err) => {
		shopBoot.__southendSchema__ = void 0;
		throw err;
	});
	return shopBoot.__southendSchema__;
}
async function applySettingsSchema(sql) {
	const cols = await sql.query(`select table_name, column_name from information_schema.columns
     where (table_name = 'shop_settings' and column_name = 'invitee_bonus')
        or (table_name = 'profiles' and column_name = 'address_line')`);
	const names = new Set(cols.map((r) => `${String(r.table_name)}.${String(r.column_name)}`));
	const hasInvitee = names.has("shop_settings.invitee_bonus");
	const hasAddress = names.has("profiles.address_line");
	if (hasInvitee && hasAddress) return;
	if (!hasAddress) {
		await sql.query(`alter table profiles add column if not exists address_line text not null default ''`);
		await sql.query(`alter table profiles add column if not exists city text not null default ''`);
		await sql.query(`alter table profiles add column if not exists zip text not null default ''`);
	}
	if (hasInvitee) return;
	await sql.query(`alter table shop_settings add column if not exists tax_rate numeric not null default 6.625`);
	await sql.query(`alter table shop_settings add column if not exists prep_minutes integer not null default 25`);
	await sql.query(`alter table shop_settings add column if not exists delivery_minutes integer not null default 40`);
	await sql.query(`alter table shop_settings add column if not exists weekly_hours jsonb not null default '{
  "sun":{"closed":false,"open":"11:00","close":"20:00"},
  "mon":{"closed":false,"open":"11:00","close":"20:00"},
  "tue":{"closed":false,"open":"11:00","close":"20:00"},
  "wed":{"closed":false,"open":"11:00","close":"20:00"},
  "thu":{"closed":false,"open":"11:00","close":"20:00"},
  "fri":{"closed":false,"open":"11:00","close":"20:00"},
  "sat":{"closed":false,"open":"11:00","close":"20:00"}
}'::jsonb`);
	await sql.query(`alter table shop_settings add column if not exists tagline text not null default 'Egg Harbor Township, New Jersey'`);
	await sql.query(`alter table shop_settings add column if not exists show_mark boolean not null default true`);
	await sql.query(`alter table orders add column if not exists tax numeric not null default 0`);
	await sql.query(`alter table shop_settings add column if not exists printers jsonb not null default '[]'::jsonb`);
	await sql.query(`alter table shop_settings add column if not exists receipt_options jsonb not null default '{}'::jsonb`);
	await sql.query(`alter table orders add column if not exists accepted_at timestamptz`);
	await sql.query(`alter table orders add column if not exists tip numeric not null default 0`);
	await sql.query(`create table if not exists chat_threads (
    id text primary key,
    user_id text not null,
    status text not null default 'open',
    last_message text not null default '',
    last_at timestamptz not null default now(),
    unread_admin integer not null default 0,
    unread_customer integer not null default 0,
    created_at timestamptz not null default now()
  )`);
	await sql.query(`create index if not exists chat_threads_user_idx on chat_threads (user_id)`);
	await sql.query(`create index if not exists chat_threads_last_at_idx on chat_threads (last_at desc)`);
	await sql.query(`create table if not exists chat_messages (
    id text primary key,
    thread_id text not null references chat_threads(id) on delete cascade,
    sender_id text not null,
    sender_role text not null,
    body text not null,
    created_at timestamptz not null default now()
  )`);
	await sql.query(`create index if not exists chat_messages_thread_idx on chat_messages (thread_id, created_at)`);
	await sql.query(`alter table chat_threads add column if not exists order_id text`);
	await sql.query(`create index if not exists chat_threads_order_idx on chat_threads (order_id)`);
	await sql.query(`alter table shop_settings add column if not exists xl_enabled boolean not null default false`);
	await sql.query(`alter table shop_settings add column if not exists xl_inches text not null default '18"'`);
	await sql.query(`alter table shop_settings add column if not exists xl_price_add numeric not null default 2`);
	await sql.query(`alter table shop_settings add column if not exists topping_price_sm numeric not null default 1.5`);
	await sql.query(`alter table shop_settings add column if not exists topping_price_md numeric not null default 1.75`);
	await sql.query(`alter table shop_settings add column if not exists topping_price_lg numeric not null default 2`);
	await sql.query(`alter table shop_settings add column if not exists topping_price_xl numeric not null default 2.5`);
	await sql.query(`alter table profiles add column if not exists banned boolean not null default false`);
	await sql.query(`alter table orders add column if not exists pickup_name text not null default ''`);
	await sql.query(`alter table shop_settings add column if not exists backdrop_data text not null default ''`);
	await sql.query(`alter table shop_settings add column if not exists logo_data text not null default ''`);
	await sql.query(`alter table orders add column if not exists scheduled_for timestamptz`);
	await sql.query(`alter table shop_settings add column if not exists notify_audio text not null default ''`);
	await sql.query(`create table if not exists password_reset_codes (
    id text primary key,
    user_id text not null,
    email text not null,
    code_hash text not null,
    salt text not null,
    expires_at timestamptz not null,
    attempts integer not null default 0,
    consumed_at timestamptz,
    created_at timestamptz not null default now()
  )`);
	await sql.query(`create index if not exists password_reset_codes_user_idx on password_reset_codes (user_id, created_at desc)`);
	await sql.query(`alter table chat_threads add column if not exists staff_note text not null default ''`);
	await sql.query(`alter table chat_threads add column if not exists muted boolean not null default false`);
	await sql.query(`alter table chat_threads add column if not exists flagged boolean not null default false`);
	await sql.query(`alter table shop_settings add column if not exists season_effect text not null default 'none'`);
	await sql.query(`alter table orders add column if not exists ticket_no integer`);
	await ensureTicketNumbers(sql);
	try {
		await sql.query(`create unique index if not exists orders_ticket_no_uidx on orders (ticket_no)`);
	} catch {}
	await sql.query(`alter table menu_items add column if not exists image_data text not null default ''`);
	await sql.query(`alter table shop_settings add column if not exists card_text_size text not null default 'md'`);
	await sql.query(`alter table shop_settings add column if not exists card_text_color text not null default 'ink'`);
	await sql.query(`alter table menu_items add column if not exists condiments jsonb not null default '[]'::jsonb`);
	await sql.query(`alter table shop_settings add column if not exists guest_card_required boolean not null default false`);
	await sql.query(`alter table shop_settings add column if not exists card_desc_color text not null default 'muted'`);
	await sql.query(`alter table shop_settings add column if not exists card_price_color text not null default 'ink'`);
	await sql.query(`alter table shop_settings add column if not exists card_size text not null default 'md'`);
	await sql.query(`alter table shop_settings add column if not exists card_bg text not null default 'paper'`);
	await sql.query(`alter table menu_items add column if not exists hide_image boolean not null default false`);
	await sql.query(`alter table profiles add column if not exists referral_code text`);
	await sql.query(`alter table profiles add column if not exists referred_by text`);
	try {
		await sql.query(`create unique index if not exists profiles_referral_code_uidx on profiles (referral_code) where referral_code is not null and referral_code <> ''`);
	} catch {}
	await sql.query(`create index if not exists profiles_referred_by_idx on profiles (referred_by)`);
	await sql.query(`alter table shop_settings add column if not exists invite_bonus integer not null default 100`);
	await sql.query(`alter table shop_settings add column if not exists invitee_bonus integer not null default 50`);
	await sql.query(`create table if not exists rewards_ledger (
    id text primary key,
    user_id text not null,
    kind text not null,
    points integer not null,
    note text not null default '',
    order_id text,
    created_at timestamptz not null default now()
  )`);
	await sql.query(`create index if not exists rewards_ledger_user_idx on rewards_ledger (user_id, created_at desc)`);
}
async function ensureTicketNumbers(sql) {
	await sql.query(`
    with mx as (select coalesce(max(ticket_no), 0) as m from orders),
    numbered as (
      select id, (select m from mx) + row_number() over (order by created_at asc, id asc) as n
      from orders
      where ticket_no is null
    )
    update orders o set ticket_no = numbered.n from numbered where o.id = numbered.id
  `);
}
async function runShopPatches(sql) {
	await seedIfEmpty(sql);
	await backfillSeedCondiments(sql);
	await seedDemoSalesIfEmpty(sql);
	if ((await sql.query(`select 1 from orders where ticket_no is null limit 1`)).length) await ensureTicketNumbers(sql);
	if (!(await sql.query(`select 1 from rewards_ledger limit 1`)).length) await backfillRewardsLedger(sql);
}
async function bootShop(sql) {
	await ensureSettingsSchema(sql);
	if (!shopBoot.__southendStaffAdmin__) shopBoot.__southendStaffAdmin__ = ensureStaffAdmin(sql).catch((err) => {
		shopBoot.__southendStaffAdmin__ = void 0;
		console.error("[southend] staff admin seed failed", err);
	});
	await shopBoot.__southendStaffAdmin__;
	if (!shopBoot.__southendBoot__) shopBoot.__southendBoot__ = runShopPatches(sql).catch((err) => {
		shopBoot.__southendBoot__ = void 0;
		console.error("[southend] shop boot failed", err);
	});
	if (shopBoot.__southendHasMenu__) return;
	if ((await sql.query(`select 1 from menu_categories limit 1`)).length) {
		shopBoot.__southendHasMenu__ = true;
		return;
	}
	await shopBoot.__southendBoot__;
	shopBoot.__southendHasMenu__ = (await sql.query(`select 1 from menu_categories limit 1`)).length > 0;
}
async function loadCategories(sql) {
	const cats = await sql`select id, name, note, kind, icon from menu_categories order by sort_order, name`;
	const items = await sql`select id, category_id, name, description, prices, highlight, image_data, condiments, hide_image from menu_items order by sort_order, name`;
	const byCat = /* @__PURE__ */ new Map();
	for (const it of items) {
		const catId = String(it.category_id ?? "");
		const list = byCat.get(catId) ?? [];
		const prices = Array.isArray(it.prices) ? it.prices : JSON.parse(String(it.prices || "[]"));
		list.push({
			id: String(it.id ?? ""),
			name: String(it.name ?? ""),
			description: it.description ? String(it.description) : void 0,
			prices,
			highlight: bool(it.highlight),
			image: it.image_data ? String(it.image_data) : void 0,
			hideImage: bool(it.hide_image),
			condiments: sanitizeCondiments(it.condiments)
		});
		byCat.set(catId, list);
	}
	return cats.map((c) => {
		const kind = c.kind === "split" || c.kind === "single" ? c.kind : "pizza";
		return {
			id: String(c.id ?? ""),
			name: String(c.name ?? ""),
			note: c.note ? String(c.note) : void 0,
			kind,
			icon: c.icon ? String(c.icon) : void 0,
			items: byCat.get(String(c.id ?? "")) ?? []
		};
	});
}
async function loadSettingsRow(sql) {
	return (await sql`select * from shop_settings where id = 1`)[0] ?? {};
}
function publicSettings(row, hasZones) {
	const weeklyHours = parseWeeklyHours(row.weekly_hours);
	return {
		vacationOn: bool(row.vacation_on),
		vacationMessage: String(row.vacation_message ?? ""),
		vacationUntil: String(row.vacation_until ?? ""),
		paymentPlaceholder: String(row.payment_placeholder ?? ""),
		guestCardRequired: bool(row.guest_card_required),
		pointsPerDollar: num(row.points_per_dollar) || 1,
		redeemRate: Math.max(1, Math.round(num(row.redeem_rate) || 100)),
		welcomeBonus: Math.round(num(row.welcome_bonus)),
		inviteBonus: Math.max(0, Math.round(num(row.invite_bonus) || 100)),
		inviteeBonus: Math.max(0, Math.round(num(row.invitee_bonus) || 50)),
		minOrderDelivery: num(row.min_order_delivery),
		deliveryFee: num(row.delivery_fee),
		hasZones,
		taxRate: row.tax_rate === void 0 || row.tax_rate === null || row.tax_rate === "" ? 6.625 : Math.max(0, num(row.tax_rate)),
		prepMinutes: Math.max(5, Math.round(num(row.prep_minutes) || 25)),
		deliveryMinutes: Math.max(5, Math.round(num(row.delivery_minutes) || 40)),
		tagline: String(row.tagline ?? "Egg Harbor Township, New Jersey"),
		showMark: row.show_mark === void 0 ? true : bool(row.show_mark),
		weeklyHours,
		openNow: isOpenNow(weeklyHours),
		hoursSummary: hoursSummary(weeklyHours),
		xlEnabled: bool(row.xl_enabled),
		xlInches: String(row.xl_inches || "18\""),
		xlPriceAdd: row.xl_price_add === void 0 || row.xl_price_add === null || row.xl_price_add === "" ? 2 : Math.max(0, num(row.xl_price_add)),
		toppingPriceSm: row.topping_price_sm === void 0 || row.topping_price_sm === null || row.topping_price_sm === "" ? DEFAULT_TOPPING_PRICES.SM : Math.max(0, num(row.topping_price_sm)),
		toppingPriceMd: row.topping_price_md === void 0 || row.topping_price_md === null || row.topping_price_md === "" ? DEFAULT_TOPPING_PRICES.MD : Math.max(0, num(row.topping_price_md)),
		toppingPriceLg: row.topping_price_lg === void 0 || row.topping_price_lg === null || row.topping_price_lg === "" ? DEFAULT_TOPPING_PRICES.LG : Math.max(0, num(row.topping_price_lg)),
		toppingPriceXl: row.topping_price_xl === void 0 || row.topping_price_xl === null || row.topping_price_xl === "" ? DEFAULT_TOPPING_PRICES.XL : Math.max(0, num(row.topping_price_xl)),
		backdropData: sanitizeBackdropData(row.backdrop_data),
		logoData: sanitizeBackdropData(row.logo_data),
		seasonEffect: sanitizeSeasonEffect(row.season_effect),
		cardTextSize: sanitizeCardTextSize(row.card_text_size),
		cardTextColor: sanitizeCardTextColor(row.card_text_color),
		cardDescColor: sanitizeCardTextColor(row.card_desc_color || "muted"),
		cardPriceColor: sanitizeCardTextColor(row.card_price_color || row.card_text_color || "ink"),
		cardSize: sanitizeCardSize(row.card_size),
		cardBg: sanitizeCardBg(row.card_bg || "paper")
	};
}
function sanitizeBackdropData(raw) {
	const s = String(raw ?? "");
	if (!s) return "";
	if (s.length > 36e4) return "";
	if (!/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(s)) return "";
	return s;
}
function sanitizeNotifyAudio(raw) {
	const s = String(raw ?? "");
	if (!s) return "";
	if (s.length > 42e4) return "";
	if (!/^data:audio\/(wav|x-wav|mpeg|mp3|ogg|webm|mp4);base64,/i.test(s)) return "";
	return s;
}
function restaurantFrom(row) {
	const raw = row.restaurant;
	let parsed = raw;
	if (typeof raw === "string") try {
		parsed = JSON.parse(raw || "{}");
	} catch {
		parsed = {};
	}
	const r = parsed && typeof parsed === "object" ? parsed : {};
	const name = String(r.name || RESTAURANT.name);
	return {
		name,
		shortName: name,
		address: String(r.address || RESTAURANT.address),
		city: String(r.city || RESTAURANT.city),
		phone: String(r.phone || RESTAURANT.phone),
		phoneHref: String(r.phoneHref || RESTAURANT.phoneHref),
		hours: String(r.hours || RESTAURANT.hours),
		established: String(r.established || RESTAURANT.established)
	};
}
async function zoneCells(sql) {
	const cells = (await sql`select cells from delivery_zones where id = 1`)[0]?.cells;
	if (Array.isArray(cells)) return cells.map(String);
	if (typeof cells === "string") try {
		const parsed = JSON.parse(cells);
		return Array.isArray(parsed) ? parsed.map(String) : [];
	} catch {
		return [];
	}
	return [];
}
async function ledgerId(kind) {
	return `rew-${kind}-${Date.now().toString(36)}-${randomBytes(4).toString("hex")}`;
}
async function addLedger(sql, userId, kind, points, note, orderId, at) {
	if (!points) return;
	await sql.query(`insert into rewards_ledger (id, user_id, kind, points, note, order_id, created_at)
     values ($1,$2,$3,$4,$5,$6,$7)`, [
		await ledgerId(kind),
		userId,
		kind,
		points,
		note,
		orderId ?? null,
		at ?? /* @__PURE__ */ new Date()
	]);
}
function makeReferralCode() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let body = "";
	for (let i = 0; i < 5; i++) body += alphabet[randomInt(32)];
	return `SE3${body}`;
}
async function ensureReferralCode(sql, userId) {
	const row = await sql`select referral_code from profiles where user_id = ${userId}`;
	const existing = String(row[0]?.referral_code ?? "").trim();
	if (existing) return existing;
	for (let i = 0; i < 8; i++) {
		const code = makeReferralCode();
		try {
			await sql.query(`update profiles set referral_code = $1
         where user_id = $2 and (referral_code is null or referral_code = '')`, [code, userId]);
		} catch {
			continue;
		}
		const check = String((await sql`select referral_code from profiles where user_id = ${userId}`)[0]?.referral_code ?? "");
		if (check) return check;
	}
	return makeReferralCode();
}
async function backfillRewardsLedger(sql) {
	await sql.query(`
    insert into rewards_ledger (id, user_id, kind, points, note, order_id, created_at)
    select 'earn-' || id, user_id, 'earn', points_earned,
           'Order #' || coalesce(lpad(ticket_no::text, 6, '0'), '------'),
           id, created_at
    from orders
    where points_earned > 0
    on conflict (id) do nothing
  `);
	await sql.query(`
    insert into rewards_ledger (id, user_id, kind, points, note, order_id, created_at)
    select 'redeem-' || id, user_id, 'redeem', -points_spent,
           'Redeemed on order #' || coalesce(lpad(ticket_no::text, 6, '0'), '------'),
           id, created_at
    from orders
    where points_spent > 0
    on conflict (id) do nothing
  `);
	await sql.query(`
    insert into rewards_ledger (id, user_id, kind, points, note, created_at)
    select 'welcome-' || p.user_id, p.user_id, 'welcome',
           greatest(0, coalesce((select welcome_bonus from shop_settings where id = 1), 50)),
           'Welcome bonus', p.created_at
    from profiles p
    where not exists (select 1 from rewards_ledger r where r.user_id = p.user_id and r.kind = 'welcome')
    on conflict (id) do nothing
  `);
}
async function ensureStaffAdmin(sql) {
	const found = (await sql.query(`select id from "user" where id = $1 or lower(email) = $2 limit 1`, [STAFF_ADMIN_ID, STAFF_ADMIN_EMAIL]))[0];
	const userId = found?.id ? String(found.id) : STAFF_ADMIN_ID;
	if (!found) await sql.query(`insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt") values ($1,$2,$3,true,now(),now())`, [
		userId,
		STAFF_ADMIN_NAME,
		STAFF_ADMIN_EMAIL
	]);
	else await sql.query(`update "user" set name = $1, email = $2, "emailVerified" = true, "updatedAt" = now() where id = $3`, [
		STAFF_ADMIN_NAME,
		STAFF_ADMIN_EMAIL,
		userId
	]);
	await ensureProfile(sql, userId, STAFF_ADMIN_NAME);
	await sql`update profiles set role = 'admin', display_name = ${STAFF_ADMIN_NAME} where user_id = ${userId}`;
	const cred = (await sql.query(`select id, password from account where "userId" = $1 and "providerId" = 'credential' limit 1`, [userId]))[0];
	if (cred?.id && String(cred.password ?? "").includes(":")) return;
	const hash = await hashPassword(STAFF_ADMIN_PASSWORD);
	if (cred?.id) {
		await sql.query(`update account set password = $1, "updatedAt" = now() where id = $2 and "providerId" = 'credential'`, [hash, String(cred.id)]);
		return;
	}
	await sql.query(`insert into account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
     values ($1,$2,'credential',$3,$4,now(),now())`, [
		`account-${userId}`,
		userId,
		userId,
		hash
	]);
}
async function ensureProfile(sql, userId, displayName) {
	const inflight = profileLocks.get(userId);
	if (inflight) {
		await inflight;
		return;
	}
	const run = ensureProfileRow(sql, userId, displayName).finally(() => {
		profileLocks.delete(userId);
	});
	profileLocks.set(userId, run);
	await run;
}
async function ensureProfileRow(sql, userId, displayName) {
	if ((await sql`select user_id from profiles where user_id = ${userId}`).length) return;
	const settings = await loadSettingsRow(sql);
	const bonus = Math.round(num(settings.welcome_bonus));
	for (let i = 0; i < 6; i++) try {
		if (!(await sql.query(`insert into profiles (user_id, display_name, points, referral_code) values ($1,$2,$3,$4)
         on conflict (user_id) do nothing
         returning user_id`, [
			userId,
			displayName ?? "",
			bonus,
			makeReferralCode()
		])).length) return;
		if (bonus) await addLedger(sql, userId, "welcome", bonus, "Welcome bonus");
		return;
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err ?? "");
		if (/profiles_pkey/i.test(msg)) return;
		if (i === 5) throw err;
	}
}
async function requireAdmin(sql, userId) {
	if ((await sql`select role from profiles where user_id = ${userId}`)[0]?.role !== "admin") {
		const err = /* @__PURE__ */ new Error("Forbidden");
		err.status = 403;
		throw err;
	}
}
function silverAccountMatch(email, name, displayName) {
	const local = email.split("@")[0]?.trim().toLowerCase() ?? "";
	const labels = [name, displayName].map((s) => s.trim().toLowerCase());
	const handles = /* @__PURE__ */ new Set([
		"silver",
		"silvergoon",
		"silvergoonist"
	]);
	if (handles.has(local)) return true;
	if (labels.some((n) => handles.has(n))) return true;
	return `${email} ${name} ${displayName}`.toLowerCase().includes("silvergoon");
}
async function grantSilverAdmin(sql, userId) {
	const rows = userId ? await sql`
        select p.user_id, p.role, p.display_name, u.email, u.name as user_name
        from profiles p
        left join "user" u on u.id = p.user_id
        where p.user_id = ${userId}` : await sql`
        select p.user_id, p.role, p.display_name, u.email, u.name as user_name
        from profiles p
        left join "user" u on u.id = p.user_id`;
	for (const row of rows) {
		const id = String(row.user_id ?? "");
		const email = String(row.email ?? "");
		const name = String(row.user_name ?? "");
		const displayName = String(row.display_name ?? "");
		if (!id || String(row.role) === "admin") continue;
		if (!silverAccountMatch(email, name, displayName)) continue;
		await sql`update profiles set role = 'admin' where user_id = ${id}`;
	}
}
async function assertNotBanned(sql, userId) {
	if (bool((await sql`select banned from profiles where user_id = ${userId}`)[0]?.banned)) throw new Error("This account has been restricted. Call the shop if you need help.");
}
function parseOrderItems(raw) {
	let src = raw;
	if (typeof raw === "string") try {
		src = JSON.parse(raw);
	} catch {
		src = [];
	}
	if (!Array.isArray(src)) return [];
	return src.map((it) => {
		const row = it && typeof it === "object" ? it : {};
		return {
			itemId: String(row.itemId ?? ""),
			categoryId: String(row.categoryId ?? ""),
			name: String(row.name ?? ""),
			size: row.size ? String(row.size) : void 0,
			detail: row.detail ? String(row.detail) : void 0,
			comment: row.comment ? String(row.comment).slice(0, 160) : void 0,
			toppings: sanitizeToppings(row.toppings),
			halfItemId: row.halfItemId ? String(row.halfItemId) : void 0,
			condiments: Array.isArray(row.condiments) ? row.condiments.map((c) => {
				const rec = c && typeof c === "object" ? c : {};
				const qty = Math.max(0, Math.round(num(rec.qty)));
				if (qty <= 0) return null;
				return {
					id: String(rec.id ?? ""),
					name: String(rec.name ?? ""),
					qty,
					charge: Math.max(0, num(rec.charge))
				};
			}).filter((p) => p != null && Boolean(p.name)) : void 0,
			unitPrice: num(row.unitPrice),
			qty: Math.max(1, Math.round(num(row.qty)))
		};
	});
}
function toOrder(row) {
	return {
		id: String(row.id),
		ticketNo: Math.round(num(row.ticket_no)),
		userId: String(row.user_id),
		status: String(row.status),
		fulfillment: row.fulfillment === "delivery" ? "delivery" : "pickup",
		notes: String(row.notes ?? ""),
		addressLine: String(row.address_line ?? ""),
		city: String(row.city ?? ""),
		zip: String(row.zip ?? ""),
		items: parseOrderItems(row.items),
		subtotal: num(row.subtotal),
		discount: num(row.discount),
		deliveryFee: num(row.delivery_fee),
		tax: num(row.tax),
		tip: num(row.tip),
		total: num(row.total),
		pointsEarned: Math.round(num(row.points_earned)),
		pointsSpent: Math.round(num(row.points_spent)),
		paymentMethod: String(row.payment_method),
		pickupName: String(row.pickup_name ?? "").trim() || void 0,
		createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at ?? ""),
		acceptedAt: row.accepted_at instanceof Date ? row.accepted_at.toISOString() : row.accepted_at ? String(row.accepted_at) : null,
		scheduledFor: row.scheduled_for instanceof Date ? row.scheduled_for.toISOString() : row.scheduled_for ? String(row.scheduled_for) : null
	};
}
var storefrontCache = null;
var STOREFRONT_TTL_MS = 2500;
function bustStorefrontCache() {
	storefrontCache = null;
}
async function loadStorefront() {
	const sql = await getSql();
	await bootShop(sql);
	const cats = await loadCategories(sql);
	const row = await loadSettingsRow(sql);
	const settings = publicSettings(row, (await zoneCells(sql)).length > 0);
	return {
		restaurant: restaurantFrom(row),
		footer: String(row.footer || "Ask about extra toppings, wing sauces, and dressing. Prices may change."),
		categories: applyPizzaSizing(cats, settings),
		settings
	};
}
var getStorefront_createServerFn_handler = createServerRpc({
	id: "3e9f6705a03f55c7367d51be98f4352bb380ffbd59c2a91c620ed5e0995217e1",
	name: "getStorefront",
	filename: "src/lib/shop-server.ts"
}, (opts) => getStorefront.__executeServer(opts));
var getStorefront = createServerFn({ method: "GET" }).handler(getStorefront_createServerFn_handler, async () => {
	if (storefrontCache && Date.now() - storefrontCache.at < STOREFRONT_TTL_MS) return storefrontCache.data;
	const data = await loadStorefront();
	storefrontCache = {
		at: Date.now(),
		data
	};
	return data;
});
var getShopContact_createServerFn_handler = createServerRpc({
	id: "8a089eb873cc534ed1bd9d17853df74ce61d84735d84efd9f380782afb170b65",
	name: "getShopContact",
	filename: "src/lib/shop-server.ts"
}, (opts) => getShopContact.__executeServer(opts));
var getShopContact = createServerFn({ method: "GET" }).handler(getShopContact_createServerFn_handler, async () => {
	const sql = await getSql();
	await bootShop(sql);
	const restaurant = restaurantFrom(await loadSettingsRow(sql));
	return {
		name: restaurant.name,
		address: `${restaurant.address}, ${restaurant.city}`,
		phone: restaurant.phone,
		phoneHref: restaurant.phoneHref
	};
});
var getMe_createServerFn_handler = createServerRpc({
	id: "b8e22a13b662d091aee128cd6d1ebc8b222a99837996e65e40a07853632f42c3",
	name: "getMe",
	filename: "src/lib/shop-server.ts"
}, (opts) => getMe.__executeServer(opts));
var getMe = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMe_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await grantSilverAdmin(sql, context.userId);
	let profile = [];
	try {
		profile = await sql`select role, phone, display_name, points, totp_enabled, banned, created_at, referral_code, address_line, city, zip from profiles where user_id = ${context.userId}`;
	} catch {
		await ensureSettingsSchema(sql);
		profile = await sql`select role, phone, display_name, points, totp_enabled, banned, created_at, referral_code from profiles where user_id = ${context.userId}`;
	}
	const admins = await sql`select count(*)::int as n from profiles where role = 'admin'`;
	const unread = await sql`
      select coalesce(sum(unread_customer), 0)::int as n from chat_threads where user_id = ${context.userId} and status <> 'solved'`;
	const p = profile[0];
	const isAdmin = p?.role === "admin";
	let adminInbox = 0;
	if (isAdmin) adminInbox = Math.round(num((await sql`select count(*)::int as n from chat_threads where unread_admin > 0 and status <> 'solved'`)[0]?.n));
	const userRow = (await sql.query(`select email from "user" where id = $1 limit 1`, [context.userId]))[0];
	const referralCode = await ensureReferralCode(sql, context.userId);
	const inviteCount = Math.round(num((await sql`select count(*)::int as n from profiles where referred_by = ${context.userId}`)[0]?.n));
	const orderCount = Math.round(num((await sql`select count(*)::int as n from orders where user_id = ${context.userId}`)[0]?.n));
	return {
		userId: context.userId,
		role: isAdmin ? "admin" : "customer",
		phone: String(p?.phone ?? ""),
		displayName: String(p?.display_name ?? ""),
		addressLine: String(p?.address_line ?? ""),
		city: String(p?.city ?? ""),
		zip: String(p?.zip ?? ""),
		points: Math.round(num(p?.points)),
		totpEnabled: bool(p?.totp_enabled),
		adminExists: num(admins[0]?.n) > 0,
		unreadChats: Math.round(num(unread[0]?.n)),
		adminInbox,
		banned: bool(p?.banned),
		email: String(userRow?.email ?? ""),
		referralCode,
		inviteCount,
		orderCount,
		memberSince: p?.created_at ? String(p.created_at) : ""
	};
});
var getMyRewards_createServerFn_handler = createServerRpc({
	id: "35f265b0dc254ad56abb2de18bea5d0b7f85cf232e6710c8bdc4a44122c887c4",
	name: "getMyRewards",
	filename: "src/lib/shop-server.ts"
}, (opts) => getMyRewards.__executeServer(opts));
var getMyRewards = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyRewards_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	const referralCode = await ensureReferralCode(sql, context.userId);
	const settings = await loadSettingsRow(sql);
	const profile = await sql`select points from profiles where user_id = ${context.userId}`;
	const rows = await sql`
    select id, kind, points, note, order_id, created_at
    from rewards_ledger
    where user_id = ${context.userId}
    order by created_at desc
    limit 80`;
	const invitedRows = await sql`
    select display_name, created_at from profiles
    where referred_by = ${context.userId}
    order by created_at desc
    limit 40`;
	const kinds = /* @__PURE__ */ new Set([
		"welcome",
		"earn",
		"redeem",
		"invite",
		"invitee",
		"adjust"
	]);
	const history = rows.map((r) => ({
		id: String(r.id),
		kind: kinds.has(String(r.kind)) ? String(r.kind) : "adjust",
		points: Math.round(num(r.points)),
		note: String(r.note ?? ""),
		orderId: r.order_id ? String(r.order_id) : void 0,
		createdAt: String(r.created_at ?? "")
	}));
	return {
		points: Math.round(num(profile[0]?.points)),
		referralCode,
		inviteCount: invitedRows.length,
		inviteBonus: Math.max(0, Math.round(num(settings.invite_bonus) || 100)),
		inviteeBonus: Math.max(0, Math.round(num(settings.invitee_bonus) || 50)),
		welcomeBonus: Math.round(num(settings.welcome_bonus)),
		pointsPerDollar: num(settings.points_per_dollar) || 1,
		redeemRate: Math.max(1, Math.round(num(settings.redeem_rate) || 100)),
		history,
		invited: invitedRows.map((r) => ({
			name: String(r.display_name || "Friend").trim() || "Friend",
			at: String(r.created_at ?? "")
		}))
	};
});
var claimReferral_createServerFn_handler = createServerRpc({
	id: "f682853d56d112a3f4a0dcca864fb97e72e162535352f0d152f01bac1db1493e",
	name: "claimReferral",
	filename: "src/lib/shop-server.ts"
}, (opts) => claimReferral.__executeServer(opts));
var claimReferral = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(claimReferral_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	const code = String(data?.code ?? "").trim().toUpperCase();
	if (!/^[A-Z0-9]{4,16}$/.test(code)) throw new Error("That invite code is not valid.");
	const mine = await sql`select referral_code, referred_by from profiles where user_id = ${context.userId}`;
	if (String(mine[0]?.referred_by ?? "")) return {
		ok: true,
		already: true
	};
	if (String(mine[0]?.referral_code ?? "").toUpperCase() === code) throw new Error("You cannot use your own invite.");
	const inviter = await sql`select user_id, display_name from profiles where referral_code = ${code} limit 1`;
	if (!inviter[0]) throw new Error("That invite code is not valid.");
	const inviterId = String(inviter[0].user_id);
	if (inviterId === context.userId) throw new Error("You cannot use your own invite.");
	const settings = await loadSettingsRow(sql);
	const inviteBonus = Math.max(0, Math.round(num(settings.invite_bonus) || 100));
	const inviteeBonus = Math.max(0, Math.round(num(settings.invitee_bonus) || 50));
	await sql.query(`update profiles set referred_by = $1 where user_id = $2 and (referred_by is null or referred_by = '')`, [inviterId, context.userId]);
	const locked = await sql`select referred_by from profiles where user_id = ${context.userId}`;
	if (String(locked[0]?.referred_by ?? "") !== inviterId) return {
		ok: true,
		already: true
	};
	if (inviteeBonus) {
		await sql.query(`update profiles set points = points + $1 where user_id = $2`, [inviteeBonus, context.userId]);
		await addLedger(sql, context.userId, "invitee", inviteeBonus, "Joined with a friend's invite");
	}
	if (inviteBonus) {
		await sql.query(`update profiles set points = points + $1 where user_id = $2`, [inviteBonus, inviterId]);
		await addLedger(sql, inviterId, "invite", inviteBonus, `${String((await sql`select display_name from profiles where user_id = ${context.userId}`)[0]?.display_name || "A friend").trim() || "A friend"} joined from your invite`);
	}
	return {
		ok: true,
		already: false
	};
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "5950193f3d753f32698018454d73b58d7fdc8b5ea2aa14a42de169d1268239ea",
	name: "updateProfile",
	filename: "src/lib/shop-server.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(updateProfile_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId, data.displayName);
	if (data.displayName !== void 0) await sql`update profiles set display_name = ${data.displayName} where user_id = ${context.userId}`;
	if (data.phone !== void 0) await sql`update profiles set phone = ${data.phone} where user_id = ${context.userId}`;
	if (data.addressLine !== void 0) await sql`update profiles set address_line = ${String(data.addressLine ?? "").replace(/\s+/g, " ").trim().slice(0, 120)} where user_id = ${context.userId}`;
	if (data.city !== void 0) await sql`update profiles set city = ${String(data.city ?? "").replace(/\s+/g, " ").trim().slice(0, 60)} where user_id = ${context.userId}`;
	if (data.zip !== void 0) await sql`update profiles set zip = ${String(data.zip ?? "").toUpperCase().replace(/[^0-9A-Z-]/g, "").slice(0, 10)} where user_id = ${context.userId}`;
	return { ok: true };
});
var claimAdmin_createServerFn_handler = createServerRpc({
	id: "dbe07ebe34ad90c5a9260ce8b92ff36457d481dceb7063bc94b3db86cc5fd6a4",
	name: "claimAdmin",
	filename: "src/lib/shop-server.ts"
}, (opts) => claimAdmin.__executeServer(opts));
var claimAdmin = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(claimAdmin_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	if (num((await sql`select count(*)::int as n from profiles where role = 'admin'`)[0]?.n) > 0) throw new Error("A shop admin already exists.");
	await sql`update profiles set role = 'admin' where user_id = ${context.userId}`;
	return { ok: true };
});
var getTwoFactorStatus_createServerFn_handler = createServerRpc({
	id: "6c424cbe95654144167219167617293487fb8d1b08f131793d847208e1ba4cd6",
	name: "getTwoFactorStatus",
	filename: "src/lib/shop-server.ts"
}, (opts) => getTwoFactorStatus.__executeServer(opts));
var getTwoFactorStatus = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getTwoFactorStatus_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	if (!bool((await sql`select totp_enabled from profiles where user_id = ${context.userId}`)[0]?.totp_enabled)) return {
		required: false,
		unlocked: true,
		enabled: false
	};
	const exp = (await sql`select expires_at from two_factor_unlocks where user_id = ${context.userId}`)[0]?.expires_at;
	const unlocked = Boolean(exp && new Date(String(exp)).getTime() > Date.now());
	return {
		required: !unlocked,
		unlocked,
		enabled: true
	};
});
var startTotpSetup_createServerFn_handler = createServerRpc({
	id: "f90ffd0cb3e44665a49d9e85dd34112ffbee3d9fafa02dc50fed6603db2cdb0c",
	name: "startTotpSetup",
	filename: "src/lib/shop-server.ts"
}, (opts) => startTotpSetup.__executeServer(opts));
var startTotpSetup = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(startTotpSetup_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	const secret = generateTotpSecret();
	await sql`update profiles set totp_secret = ${secret} where user_id = ${context.userId}`;
	return {
		secret,
		uri: totpUri(secret, context.userId)
	};
});
var confirmTotpSetup_createServerFn_handler = createServerRpc({
	id: "1e2be28c84d39a2f8dd714eaf2c0915488e3a026a32d331c7dc9671881f8f8cc",
	name: "confirmTotpSetup",
	filename: "src/lib/shop-server.ts"
}, (opts) => confirmTotpSetup.__executeServer(opts));
var confirmTotpSetup = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(confirmTotpSetup_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const secret = String((await sql`select totp_secret from profiles where user_id = ${context.userId}`)[0]?.totp_secret ?? "");
	if (!secret || !verifyTotp(secret, String(data.code || ""))) throw new Error("That code did not match. Try again.");
	await sql`update profiles set totp_enabled = true where user_id = ${context.userId}`;
	await sql.query(`insert into two_factor_unlocks (user_id, expires_at) values ($1, now() + interval '12 hours')
       on conflict (user_id) do update set expires_at = now() + interval '12 hours'`, [context.userId]);
	return { ok: true };
});
var verifyTotpChallenge_createServerFn_handler = createServerRpc({
	id: "332fb1ebcf6f9af1fe043b2d72d5535b336dd8ec06d505e994fe5c368090210f",
	name: "verifyTotpChallenge",
	filename: "src/lib/shop-server.ts"
}, (opts) => verifyTotpChallenge.__executeServer(opts));
var verifyTotpChallenge = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(verifyTotpChallenge_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const rows = await sql`
      select totp_secret, totp_enabled from profiles where user_id = ${context.userId}`;
	if (!bool(rows[0]?.totp_enabled) || !rows[0]?.totp_secret) throw new Error("Two-factor is not enabled.");
	if (!verifyTotp(String(rows[0].totp_secret), String(data.code || ""))) throw new Error("That code did not match.");
	await sql.query(`insert into two_factor_unlocks (user_id, expires_at) values ($1, now() + interval '12 hours')
       on conflict (user_id) do update set expires_at = now() + interval '12 hours'`, [context.userId]);
	return { ok: true };
});
var disableTotp_createServerFn_handler = createServerRpc({
	id: "83d49b93260f6d39298a38704a43e533c52e8173f971d1b7658e100942ed1f59",
	name: "disableTotp",
	filename: "src/lib/shop-server.ts"
}, (opts) => disableTotp.__executeServer(opts));
var disableTotp = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(disableTotp_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const rows = await sql`select totp_secret from profiles where user_id = ${context.userId}`;
	if (!rows[0]?.totp_secret || !verifyTotp(String(rows[0].totp_secret), String(data.code || ""))) throw new Error("That code did not match.");
	await sql`update profiles set totp_enabled = false, totp_secret = null where user_id = ${context.userId}`;
	await sql`delete from two_factor_unlocks where user_id = ${context.userId}`;
	return { ok: true };
});
async function assertTwoFactor(sql, userId) {
	if (!bool((await sql`select totp_enabled from profiles where user_id = ${userId}`)[0]?.totp_enabled)) return;
	const exp = (await sql`select expires_at from two_factor_unlocks where user_id = ${userId}`)[0]?.expires_at;
	if (!exp || new Date(String(exp)).getTime() <= Date.now()) throw new Error("Two-factor verification required.");
}
var checkDeliveryAddress_createServerFn_handler = createServerRpc({
	id: "514af9501a1d9ca90991f58e55092ab224f1a784b82ab9bf84e9978ed6eb8b0b",
	name: "checkDeliveryAddress",
	filename: "src/lib/shop-server.ts"
}, (opts) => checkDeliveryAddress.__executeServer(opts));
var checkDeliveryAddress = createServerFn({ method: "POST" }).validator((data) => ({ query: data.query.trim() })).handler(checkDeliveryAddress_createServerFn_handler, async ({ data }) => {
	if (!data.query) throw new Error("Enter a street address.");
	const cells = await zoneCells(await getSql());
	const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(`${data.query}, Egg Harbor Township, NJ`)}`;
	const res = await fetch(url, { headers: { "User-Agent": "SouthEndPizzaIII/1.0 (delivery-zone)" } });
	if (!res.ok) throw new Error("Address lookup is unavailable right now.");
	const hits = await res.json();
	if (!hits[0]) return {
		found: false,
		deliverable: false,
		label: ""
	};
	const lat = Number(hits[0].lat);
	const lng = Number(hits[0].lon);
	return {
		found: true,
		deliverable: cells.length > 0 && cellSetHas(cells, lat, lng),
		label: hits[0].display_name,
		lat,
		lng,
		mapsUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
	};
});
async function ensureGuestCustomer(sql, name, phone) {
	const pretty = formatPhone(phone);
	const existing = await sql`select user_id from profiles where phone = ${phone} or phone = ${pretty} limit 1`;
	if (existing[0]?.user_id) {
		const userId = String(existing[0].user_id);
		await assertNotBanned(sql, userId);
		await sql`update profiles set display_name = case when coalesce(display_name, '') = '' then ${name} else display_name end, phone = ${pretty} where user_id = ${userId}`;
		return userId;
	}
	const userId = `guest-${phone}`;
	const email = `${phone}@guest.southend.pizza`;
	const found = (await sql.query(`select id from "user" where email = $1 or id = $2 limit 1`, [email, userId]))[0];
	if (found?.id) {
		const id = String(found.id);
		await ensureProfile(sql, id, name);
		await sql`update profiles set phone = ${pretty}, display_name = case when coalesce(display_name, '') = '' then ${name} else display_name end where user_id = ${id}`;
		await assertNotBanned(sql, id);
		return id;
	}
	await sql.query(`insert into "user" (id, name, email, "emailVerified", "createdAt", "updatedAt") values ($1,$2,$3,false,now(),now())`, [
		userId,
		name,
		email
	]);
	await ensureProfile(sql, userId, name);
	await sql`update profiles set phone = ${pretty}, display_name = ${name} where user_id = ${userId}`;
	return userId;
}
async function writePlacedOrder(sql, userId, data) {
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, userId);
	await assertNotBanned(sql, userId);
	const settings = await loadSettingsRow(sql);
	if (bool(settings.vacation_on)) throw new Error(String(settings.vacation_message || "The shop is closed for vacation."));
	if (!data.lines?.length) throw new Error("Your cart is empty.");
	if (data.fulfillment === "pickup" && data.paymentMethod === "pay_delivery") throw new Error("Choose pay at pickup or card.");
	if (data.fulfillment === "delivery" && data.paymentMethod === "pay_pickup") throw new Error("Choose cash or card.");
	const pickupName = String(data.pickupName ?? "").trim().slice(0, 80);
	if (data.fulfillment === "pickup" && !pickupName) throw new Error("Enter the name for pickup.");
	const menuItems = await sql`select id, category_id, name, prices, condiments from menu_items`;
	const byId = new Map(menuItems.map((m) => [String(m.id), m]));
	const cats = await loadCategories(sql);
	const kindByCat = new Map(cats.map((c) => [c.id, c.kind]));
	const pub = publicSettings(settings, false);
	const priced = [];
	for (const line of data.lines) {
		const item = byId.get(String(line.itemId ?? ""));
		if (!item) throw new Error("A menu item is no longer available.");
		const prices = Array.isArray(item.prices) ? item.prices : JSON.parse(String(item.prices || "[]"));
		const wantSize = line.size ? String(line.size) : "";
		const col = wantSize && prices.find((p) => p.label === wantSize) || prices[0];
		const qty = Math.max(1, Math.min(20, Math.round(num(line.qty))));
		const kind = kindByCat.get(String(item.category_id ?? ""));
		const comment = String(line.comment ?? "").trim().slice(0, 160) || void 0;
		const catalog = sanitizeCondiments(item.condiments);
		const condiments = sanitizeCondimentPicks(line.condiments, catalog);
		const extra = condimentTotal(condiments);
		const extrasDetail = condimentDetail(condiments);
		if (kind === "pizza") {
			const toppings = sanitizeToppings(line.toppings);
			const halfId = String(line.halfItemId ?? "");
			const otherRow = halfId && halfId !== String(item.id) ? byId.get(halfId) : void 0;
			let other = null;
			if (otherRow) {
				const otherPrices = Array.isArray(otherRow.prices) ? otherRow.prices : JSON.parse(String(otherRow.prices || "[]"));
				other = {
					name: String(otherRow.name ?? ""),
					prices: otherPrices
				};
			}
			const built = pricePizzaBuild({
				item: {
					name: String(item.name ?? ""),
					prices
				},
				other,
				size: wantSize || String(col?.label || "LG"),
				toppings,
				settings: pub
			});
			priced.push({
				itemId: String(item.id ?? ""),
				categoryId: String(item.category_id ?? ""),
				name: built.name,
				size: wantSize || (col?.label ? String(col.label) : void 0),
				detail: mergeItemDetail(built.detail, extrasDetail) || void 0,
				comment,
				toppings,
				halfItemId: halfId || void 0,
				condiments: condiments.length ? condiments : void 0,
				unitPrice: Math.round((built.unitPrice + extra) * 100) / 100,
				qty
			});
		} else priced.push({
			itemId: String(item.id ?? ""),
			categoryId: String(item.category_id ?? ""),
			name: String(item.name ?? ""),
			size: col?.label ? String(col.label) : wantSize || void 0,
			detail: extrasDetail || void 0,
			comment,
			condiments: condiments.length ? condiments : void 0,
			unitPrice: Math.round((num(col?.price) + extra) * 100) / 100,
			qty
		});
	}
	const subtotal = priced.reduce((s, l) => s + l.unitPrice * l.qty, 0);
	const profile = await sql`select points from profiles where user_id = ${userId}`;
	const points = Math.round(num(profile[0]?.points));
	const redeemRate = Math.max(1, Math.round(num(settings.redeem_rate) || 100));
	const want = Math.max(0, Math.round(num(data.redeemPoints)));
	const maxByPoints = Math.floor(points / redeemRate) * redeemRate;
	const maxBySub = Math.floor(subtotal * redeemRate);
	const spent = Math.min(want, maxByPoints, maxBySub);
	const discount = spent / redeemRate;
	const lat = data.lat;
	const lng = data.lng;
	const deliveryFee = data.fulfillment === "delivery" ? num(settings.delivery_fee) : 0;
	if (data.fulfillment === "delivery") {
		const min = num(settings.min_order_delivery);
		if (subtotal < min) throw new Error(`Delivery minimum is $${min.toFixed(2)}.`);
		const cells = await zoneCells(sql);
		if (!cells.length) throw new Error("Delivery zones are not set yet. Please choose pickup.");
		if (lat == null || lng == null) throw new Error("Check the delivery address first.");
		if (!cellSetHas(cells, Number(lat), Number(lng))) throw new Error("That address is outside our delivery zone.");
	}
	const weeklyHours = parseWeeklyHours(settings.weekly_hours);
	const scheduledDate = String(data.scheduledDate ?? "").trim();
	const scheduledTime = String(data.scheduledTime ?? "").trim();
	let scheduledAt = null;
	if (scheduledDate || scheduledTime) {
		if (!scheduledDate || !scheduledTime) throw new Error("Pick both a date and a time to schedule.");
		scheduledAt = nyWallToDate(scheduledDate, scheduledTime);
		if (!scheduledAt) throw new Error("Pick a valid pickup or delivery time.");
		const min = Date.now() + 9e5;
		const max = Date.now() + 12096e5;
		if (scheduledAt.getTime() < min) throw new Error("Pick a time at least 15 minutes from now.");
		if (scheduledAt.getTime() > max) throw new Error("Schedule within the next 14 days.");
		if (!isOpenNow(weeklyHours, scheduledAt)) throw new Error(`The kitchen is closed at that time. ${hoursSummary(weeklyHours)}`);
	} else if (!bool(settings.vacation_on) && !isOpenNow(weeklyHours)) throw new Error(`The kitchen is closed. ${hoursSummary(weeklyHours)}`);
	const { tax, total: preTip } = computeTax(subtotal, discount, deliveryFee, settings.tax_rate === void 0 || settings.tax_rate === null || settings.tax_rate === "" ? 6.625 : Math.max(0, num(settings.tax_rate)));
	const tip = clampTip(data.tip);
	const total = Math.round((preTip + tip) * 100) / 100;
	const earnRate = num(settings.points_per_dollar) || 1;
	const earned = Math.max(0, Math.round(Math.max(0, subtotal - discount) * earnRate));
	const id = `ord-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
	const ticketNo = Math.max(1, Math.round(num((await sql`select coalesce(max(ticket_no), 0) + 1 as n from orders`)[0]?.n)));
	await sql.query(`insert into orders (
        id, ticket_no, user_id, status, fulfillment, notes, address_line, city, zip, lat, lng,
        items, subtotal, discount, delivery_fee, tax, tip, total, points_earned, points_spent, payment_method, pickup_name, scheduled_for
      ) values (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23
      )`, [
		id,
		ticketNo,
		userId,
		data.paymentMethod === "pay_card" ? "awaiting_payment" : "placed",
		data.fulfillment,
		data.notes?.slice(0, 500) ?? "",
		data.addressLine ?? "",
		data.city ?? "",
		data.zip ?? "",
		lat ?? null,
		lng ?? null,
		JSON.stringify(priced),
		subtotal.toFixed(2),
		discount.toFixed(2),
		deliveryFee.toFixed(2),
		tax.toFixed(2),
		tip.toFixed(2),
		total.toFixed(2),
		earned,
		spent,
		data.paymentMethod,
		data.fulfillment === "pickup" ? pickupName : "",
		scheduledAt
	]);
	await sql.query(`update profiles set points = points - $1 + $2 where user_id = $3`, [
		spent,
		earned,
		userId
	]);
	if (earned) await addLedger(sql, userId, "earn", earned, `Order #${String(ticketNo).padStart(6, "0")}`, id);
	if (spent) await addLedger(sql, userId, "redeem", -spent, `Redeemed on order #${String(ticketNo).padStart(6, "0")}`, id);
	return {
		id,
		ticketNo,
		total,
		earned,
		spent,
		status: data.paymentMethod === "pay_card" ? "awaiting_payment" : "placed"
	};
}
var placeOrder_createServerFn_handler = createServerRpc({
	id: "a86830613005e0efa96728ff8ce8959214bbe7d3fe2f213278a25da1d6b01a4d",
	name: "placeOrder",
	filename: "src/lib/shop-server.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(placeOrder_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await assertTwoFactor(sql, context.userId);
	return writePlacedOrder(sql, context.userId, data);
});
var placeGuestOrder_createServerFn_handler = createServerRpc({
	id: "0a2f400b8bd127862368fe1e673b21e04771f605263fc254089fcf0c082033d3",
	name: "placeGuestOrder",
	filename: "src/lib/shop-server.ts"
}, (opts) => placeGuestOrder.__executeServer(opts));
var placeGuestOrder = createServerFn({ method: "POST" }).validator((data) => data).handler(placeGuestOrder_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	const name = String(data.guestName ?? "").trim().slice(0, 80);
	const phone = toTenDigitPhone(String(data.guestPhone ?? ""));
	if (!name) throw new Error("Enter your name.");
	if (!phone) throw new Error("Enter a 10-digit US phone number.");
	if (bool((await loadSettingsRow(sql)).guest_card_required) && String(data.paymentMethod) !== "pay_card") throw new Error("Guests pay by card. Choose card to place this order.");
	const userId = await ensureGuestCustomer(sql, name, phone);
	const pickupName = String(data.pickupName ?? "").trim().slice(0, 80) || name;
	return writePlacedOrder(sql, userId, {
		...data,
		redeemPoints: 0,
		pickupName
	});
});
var listMyOrders_createServerFn_handler = createServerRpc({
	id: "e138e878a2579f8d295b471784401f1aaddc311e5cca601678c47aea1161e908",
	name: "listMyOrders",
	filename: "src/lib/shop-server.ts"
}, (opts) => listMyOrders.__executeServer(opts));
var listMyOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyOrders_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select * from orders where user_id = ${context.userId} order by created_at desc limit 50`).map(toOrder);
});
var saveShopMenu_createServerFn_handler = createServerRpc({
	id: "5169a9e63544badbc4dfd2bf82336507444ce69e7c5a75ce33a3ab5c2ceae0b2",
	name: "saveShopMenu",
	filename: "src/lib/shop-server.ts"
}, (opts) => saveShopMenu.__executeServer(opts));
var saveShopMenu = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(saveShopMenu_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	await sql`delete from menu_items`;
	await sql`delete from menu_categories`;
	let i = 0;
	for (const cat of data.categories) {
		await sql.query(`insert into menu_categories (id, name, note, kind, icon, sort_order) values ($1,$2,$3,$4,$5,$6)`, [
			cat.id,
			cat.name,
			cat.note ?? "",
			cat.kind,
			cat.icon ?? cat.id,
			i
		]);
		let j = 0;
		for (const item of cat.items) {
			await sql.query(`insert into menu_items (id, category_id, name, description, prices, highlight, sort_order, image_data, condiments, hide_image)
           values ($1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9::jsonb,$10)`, [
				item.id ?? `${cat.id}-${j}`,
				cat.id,
				item.name,
				item.description ?? "",
				JSON.stringify(item.prices),
				Boolean(item.highlight),
				j,
				typeof item.image === "string" && item.image.startsWith("data:image/") && item.image.length <= 42e4 ? item.image : "",
				JSON.stringify(sanitizeCondiments(item.condiments)),
				Boolean(item.hideImage)
			]);
			j += 1;
		}
		i += 1;
	}
	const restaurant = restaurantFrom({ restaurant: data.restaurant });
	await sql.query(`update shop_settings set restaurant = $1::jsonb, footer = $2 where id = 1`, [JSON.stringify(restaurant), data.footer]);
	bustStorefrontCache();
	return { ok: true };
});
var saveShopSettings_createServerFn_handler = createServerRpc({
	id: "4c4c9ed72514c36fc6383ad66d96d7b898f5e43d0eb9e10be6c5bb4722c016ce",
	name: "saveShopSettings",
	filename: "src/lib/shop-server.ts"
}, (opts) => saveShopSettings.__executeServer(opts));
var saveShopSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(saveShopSettings_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const sets = [];
	const params = [];
	const add = (col, val) => {
		if (val === void 0) return;
		params.push(val);
		sets.push(`${col} = $${params.length}`);
	};
	add("vacation_on", data.vacationOn);
	add("vacation_message", data.vacationMessage);
	add("vacation_until", data.vacationUntil);
	add("payment_placeholder", data.paymentPlaceholder);
	add("guest_card_required", data.guestCardRequired);
	add("points_per_dollar", data.pointsPerDollar);
	add("redeem_rate", data.redeemRate === void 0 ? void 0 : Math.round(data.redeemRate));
	add("welcome_bonus", data.welcomeBonus === void 0 ? void 0 : Math.round(data.welcomeBonus));
	add("invite_bonus", data.inviteBonus === void 0 ? void 0 : Math.max(0, Math.round(data.inviteBonus)));
	add("invitee_bonus", data.inviteeBonus === void 0 ? void 0 : Math.max(0, Math.round(data.inviteeBonus)));
	add("min_order_delivery", data.minOrderDelivery);
	add("delivery_fee", data.deliveryFee);
	add("tax_rate", data.taxRate === void 0 ? void 0 : Math.max(0, Math.min(25, Number(data.taxRate))));
	add("prep_minutes", data.prepMinutes === void 0 ? void 0 : Math.max(5, Math.round(data.prepMinutes)));
	add("delivery_minutes", data.deliveryMinutes === void 0 ? void 0 : Math.max(5, Math.round(data.deliveryMinutes)));
	add("tagline", data.tagline);
	add("show_mark", data.showMark);
	add("xl_enabled", data.xlEnabled);
	add("xl_inches", data.xlInches === void 0 ? void 0 : String(data.xlInches).slice(0, 12));
	add("xl_price_add", data.xlPriceAdd === void 0 ? void 0 : Math.max(0, Math.min(40, Number(data.xlPriceAdd))));
	add("topping_price_sm", data.toppingPriceSm === void 0 ? void 0 : Math.max(0, Math.min(20, Number(data.toppingPriceSm))));
	add("topping_price_md", data.toppingPriceMd === void 0 ? void 0 : Math.max(0, Math.min(20, Number(data.toppingPriceMd))));
	add("topping_price_lg", data.toppingPriceLg === void 0 ? void 0 : Math.max(0, Math.min(20, Number(data.toppingPriceLg))));
	add("topping_price_xl", data.toppingPriceXl === void 0 ? void 0 : Math.max(0, Math.min(20, Number(data.toppingPriceXl))));
	if (data.backdropData !== void 0) {
		const raw = String(data.backdropData ?? "").trim();
		if (!raw) add("backdrop_data", "");
		else {
			const clean = sanitizeBackdropData(raw);
			if (!clean) throw new Error("Use a PNG, JPEG, WebP, or GIF under 300 KB.");
			add("backdrop_data", clean);
		}
	}
	if (data.logoData !== void 0) {
		const raw = String(data.logoData ?? "").trim();
		if (!raw) add("logo_data", "");
		else {
			const clean = sanitizeBackdropData(raw);
			if (!clean) throw new Error("Use a PNG, JPEG, WebP, or GIF under 300 KB.");
			add("logo_data", clean);
		}
	}
	if (data.notifyAudio !== void 0) {
		const raw = String(data.notifyAudio ?? "").trim();
		if (!raw) add("notify_audio", "");
		else {
			const clean = sanitizeNotifyAudio(raw);
			if (!clean) throw new Error("Use a WAV, MP3, or OGG under 300 KB.");
			add("notify_audio", clean);
		}
	}
	if (data.seasonEffect !== void 0) add("season_effect", sanitizeSeasonEffect(data.seasonEffect));
	if (data.cardTextSize !== void 0) add("card_text_size", sanitizeCardTextSize(data.cardTextSize));
	if (data.cardTextColor !== void 0) add("card_text_color", sanitizeCardTextColor(data.cardTextColor));
	if (data.cardDescColor !== void 0) add("card_desc_color", sanitizeCardTextColor(data.cardDescColor));
	if (data.cardPriceColor !== void 0) add("card_price_color", sanitizeCardTextColor(data.cardPriceColor));
	if (data.cardSize !== void 0) add("card_size", sanitizeCardSize(data.cardSize));
	if (data.cardBg !== void 0) add("card_bg", sanitizeCardBg(data.cardBg));
	if (data.printers) {
		params.push(JSON.stringify(parsePrinters(data.printers)));
		sets.push(`printers = $${params.length}::jsonb`);
	}
	if (data.receiptOptions) {
		params.push(JSON.stringify(parseReceiptOptions(data.receiptOptions)));
		sets.push(`receipt_options = $${params.length}::jsonb`);
	}
	if (data.weeklyHours) {
		const hours = parseWeeklyHours(data.weeklyHours);
		params.push(JSON.stringify(hours));
		sets.push(`weekly_hours = $${params.length}::jsonb`);
		const restaurant = restaurantFrom(await loadSettingsRow(sql));
		restaurant.hours = hoursSummary(hours);
		params.push(JSON.stringify(restaurant));
		sets.push(`restaurant = $${params.length}::jsonb`);
	}
	if (!sets.length) return { ok: true };
	await sql.query(`update shop_settings set ${sets.join(", ")} where id = 1`, params);
	bustStorefrontCache();
	return { ok: true };
});
var saveWebsite_createServerFn_handler = createServerRpc({
	id: "1a3c9b7a89fdd1bee2670d8deed7aac98907c192c3730703155316bc929700d4",
	name: "saveWebsite",
	filename: "src/lib/shop-server.ts"
}, (opts) => saveWebsite.__executeServer(opts));
var saveWebsite = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(saveWebsite_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const restaurant = restaurantFrom({ restaurant: data.restaurant });
	await sql.query(`update shop_settings set restaurant = $1::jsonb, footer = $2, tagline = $3, show_mark = $4 where id = 1`, [
		JSON.stringify(restaurant),
		data.footer,
		data.tagline,
		data.showMark
	]);
	bustStorefrontCache();
	return { ok: true };
});
var getAdminShop_createServerFn_handler = createServerRpc({
	id: "971dc20631d85431ea74c37c1f767a8debc4b72023eec6f55358703f7ae1901a",
	name: "getAdminShop",
	filename: "src/lib/shop-server.ts"
}, (opts) => getAdminShop.__executeServer(opts));
var getAdminShop = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAdminShop_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await bootShop(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const row = await loadSettingsRow(sql);
	const cells = await zoneCells(sql);
	const categories = await loadCategories(sql);
	return {
		restaurant: restaurantFrom(row),
		footer: String(row.footer || "Ask about extra toppings, wing sauces, and dressing. Prices may change."),
		categories,
		settings: publicSettings(row, cells.length > 0),
		printers: parsePrinters(row.printers),
		receiptOptions: parseReceiptOptions(row.receipt_options),
		cells,
		notifyAudio: sanitizeNotifyAudio(row.notify_audio)
	};
});
var saveDeliveryZone_createServerFn_handler = createServerRpc({
	id: "d6bfaa233bebc5dd2452671a1e44780d44ad5df8ef6cbe19c7c3fae308917ef2",
	name: "saveDeliveryZone",
	filename: "src/lib/shop-server.ts"
}, (opts) => saveDeliveryZone.__executeServer(opts));
var saveDeliveryZone = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(saveDeliveryZone_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	await sql.query(`update delivery_zones set cells = $1::jsonb, name = $2, updated_at = now(), updated_by = $3 where id = 1`, [
		JSON.stringify(data.cells),
		data.name ?? "Delivery area",
		context.userId
	]);
	bustStorefrontCache();
	return {
		ok: true,
		count: data.cells.length
	};
});
var listAllOrders_createServerFn_handler = createServerRpc({
	id: "9e06269a2e64058352abf36b0cfc7655a8a6306a8839b04afdc0d165b71c6f36",
	name: "listAllOrders",
	filename: "src/lib/shop-server.ts"
}, (opts) => listAllOrders.__executeServer(opts));
var listAllOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAllOrders_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	return (await sql`select * from orders order by created_at desc limit 200`).map(toOrder);
});
var updateOrderStatus_createServerFn_handler = createServerRpc({
	id: "6248d7260d5009f275421e55ec9465053af4597f8bfe14bd0b06b9c6e93a19da",
	name: "updateOrderStatus",
	filename: "src/lib/shop-server.ts"
}, (opts) => updateOrderStatus.__executeServer(opts));
var updateOrderStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(updateOrderStatus_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	if (!(/* @__PURE__ */ new Set([
		"placed",
		"accepted",
		"awaiting_payment",
		"preparing",
		"out_for_delivery",
		"ready",
		"completed",
		"canceled"
	])).has(data.status)) throw new Error("Invalid status.");
	if (data.status === "preparing" || data.status === "accepted") await sql.query(`update orders set status = $1, accepted_at = coalesce(accepted_at, now()) where id = $2`, [data.status, data.id]);
	else await sql`update orders set status = ${data.status} where id = ${data.id}`;
	const rows = await sql`select * from orders where id = ${data.id}`;
	return {
		ok: true,
		order: rows[0] ? toOrder(rows[0]) : null
	};
});
var acceptOrder_createServerFn_handler = createServerRpc({
	id: "6b016f733836672a6d31ce4eb9274ae2116885fa4902e070f749996a870ae0b4",
	name: "acceptOrder",
	filename: "src/lib/shop-server.ts"
}, (opts) => acceptOrder.__executeServer(opts));
var acceptOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(acceptOrder_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const id = String(data?.id ?? "").trim();
	if (!id) throw new Error("Ticket is missing.");
	const taken = await sql.query(`update orders
     set status = 'accepted', accepted_at = coalesce(accepted_at, now())
     where id = $1 and status in ('placed', 'awaiting_payment')
     returning *`, [id]);
	if (taken[0]) return toOrder(taken[0]);
	const rows = await sql`select * from orders where id = ${id}`;
	if (!rows[0]) throw new Error("Order not found.");
	const current = String(rows[0].status);
	if (current === "accepted" || current === "preparing" || current === "ready" || current === "out_for_delivery") return toOrder(rows[0]);
	throw new Error("That ticket cannot be accepted.");
});
var getAdminInsights_createServerFn_handler = createServerRpc({
	id: "f1ac3b56f9066fa0f3a79304184a4317fb3e4b8b00a6839d09769c0a779f7553",
	name: "getAdminInsights",
	filename: "src/lib/shop-server.ts"
}, (opts) => getAdminInsights.__executeServer(opts));
var getAdminInsights = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAdminInsights_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await bootShop(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const profiles = await sql`select user_id, display_name, points, totp_enabled, created_at from profiles`;
	const parsed = (await sql`
      select * from orders order by created_at desc limit 400`).map(toOrder);
	const live = parsed.filter((o) => o.status !== "canceled");
	const weekAgo = Date.now() - 6048e5;
	const monthAgo = Date.now() - 2592e6;
	const startToday = /* @__PURE__ */ new Date();
	startToday.setHours(0, 0, 0, 0);
	const sum = (list, pick) => list.reduce((s, o) => s + pick(o), 0);
	const today = live.filter((o) => new Date(o.createdAt).getTime() >= startToday.getTime());
	const week = live.filter((o) => new Date(o.createdAt).getTime() >= weekAgo);
	const month = live.filter((o) => new Date(o.createdAt).getTime() >= monthAgo);
	const spendByUser = /* @__PURE__ */ new Map();
	for (const o of live) {
		const cur = spendByUser.get(o.userId) ?? {
			orders: 0,
			spend: 0
		};
		cur.orders += 1;
		cur.spend += o.total;
		spendByUser.set(o.userId, cur);
	}
	const itemMap = /* @__PURE__ */ new Map();
	for (const o of live) for (const it of o.items) {
		const cur = itemMap.get(it.name) ?? {
			qty: 0,
			sales: 0
		};
		cur.qty += it.qty;
		cur.sales += it.unitPrice * it.qty;
		itemMap.set(it.name, cur);
	}
	const seriesMap = /* @__PURE__ */ new Map();
	for (let i = 13; i >= 0; i--) {
		const d = /* @__PURE__ */ new Date();
		d.setHours(0, 0, 0, 0);
		d.setDate(d.getDate() - i);
		seriesMap.set(d.toISOString().slice(0, 10), {
			total: 0,
			tickets: 0
		});
	}
	for (const o of live) {
		const key = o.createdAt.slice(0, 10);
		const row = seriesMap.get(key);
		if (!row) continue;
		row.total += o.total;
		row.tickets += 1;
	}
	const payMap = /* @__PURE__ */ new Map();
	for (const o of live) {
		const cur = payMap.get(o.paymentMethod) ?? {
			total: 0,
			count: 0
		};
		cur.total += o.total;
		cur.count += 1;
		payMap.set(o.paymentMethod, cur);
	}
	const new7d = profiles.filter((p) => new Date(String(p.created_at ?? "")).getTime() >= weekAgo).length;
	const avgPoints = profiles.length === 0 ? 0 : Math.round(profiles.reduce((acc, p) => acc + num(p.points), 0) / profiles.length);
	return {
		customers: {
			total: profiles.length,
			new7d,
			twoFactor: profiles.filter((p) => bool(p.totp_enabled)).length,
			avgPoints,
			repeat: [...spendByUser.values()].filter((s) => s.orders > 1).length,
			top: profiles.map((p) => {
				const spent = spendByUser.get(String(p.user_id)) ?? {
					orders: 0,
					spend: 0
				};
				return {
					userId: String(p.user_id ?? ""),
					name: String(p.display_name || "Guest"),
					orders: spent.orders,
					spend: spent.spend,
					points: Math.round(num(p.points))
				};
			}).sort((a, b) => b.spend - a.spend).slice(0, 12)
		},
		sales: {
			today: sum(today, (o) => o.total),
			week: sum(week, (o) => o.total),
			month: sum(month, (o) => o.total),
			allTime: sum(live, (o) => o.total),
			tickets: live.length,
			avgTicket: live.length ? sum(live, (o) => o.total) / live.length : 0,
			canceled: parsed.filter((o) => o.status === "canceled").length,
			series: [...seriesMap.entries()].map(([day, v]) => ({
				day,
				...v
			})),
			topItems: [...itemMap.entries()].map(([name, v]) => ({
				name,
				...v
			})).sort((a, b) => b.sales - a.sales).slice(0, 8)
		},
		financials: {
			food: sum(live, (o) => o.subtotal),
			tax: sum(live, (o) => o.tax),
			discounts: sum(live, (o) => o.discount),
			deliveryFees: sum(live, (o) => o.deliveryFee),
			tips: sum(live, (o) => o.tip),
			collected: sum(live, (o) => o.total),
			pickup: sum(live.filter((o) => o.fulfillment === "pickup"), (o) => o.total),
			delivery: sum(live.filter((o) => o.fulfillment === "delivery"), (o) => o.total),
			awaitingPayment: sum(parsed.filter((o) => o.status === "awaiting_payment"), (o) => o.total),
			byPay: [...payMap.entries()].map(([method, v]) => ({
				method,
				...v
			}))
		}
	};
});
function iso(value) {
	if (!value) return "";
	return value instanceof Date ? value.toISOString() : String(value);
}
function newId(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function orderBriefFrom(row) {
	const id = String(row.linked_order_id ?? "");
	if (!id) return null;
	return {
		id,
		ticketNo: Math.round(num(row.order_ticket_no)),
		status: String(row.order_status ?? ""),
		fulfillment: row.order_fulfillment === "delivery" ? "delivery" : "pickup",
		total: num(row.order_total),
		notes: String(row.order_notes ?? ""),
		createdAt: iso(row.order_created),
		items: parseOrderItems(row.order_items).map((it) => ({
			name: it.name,
			size: it.size,
			qty: it.qty,
			detail: it.detail,
			comment: it.comment
		}))
	};
}
function toThread(row, customerName) {
	const order = orderBriefFrom(row);
	return {
		id: String(row.id),
		userId: String(row.user_id),
		customerName,
		customerPhone: String(row.customer_phone ?? row.phone ?? ""),
		status: String(row.status ?? "open"),
		lastMessage: String(row.last_message ?? ""),
		lastAt: iso(row.last_at),
		unreadAdmin: Math.round(num(row.unread_admin)),
		unreadCustomer: Math.round(num(row.unread_customer)),
		createdAt: iso(row.created_at),
		orderId: order?.id ?? (row.order_id ? String(row.order_id) : null),
		order,
		customerBanned: bool(row.banned ?? row.customer_banned),
		staffNote: String(row.staff_note ?? ""),
		muted: bool(row.muted),
		flagged: bool(row.flagged)
	};
}
function toMessage(row) {
	return {
		id: String(row.id),
		threadId: String(row.thread_id),
		senderId: String(row.sender_id),
		senderRole: row.sender_role === "admin" ? "admin" : "customer",
		body: String(row.body ?? ""),
		createdAt: iso(row.created_at)
	};
}
var listCustomers_createServerFn_handler = createServerRpc({
	id: "0a897cfe0a29d64ab7d202af39e50380a4a9d5895aca09fde579debd015c7f8e",
	name: "listCustomers",
	filename: "src/lib/shop-server.ts"
}, (opts) => listCustomers.__executeServer(opts));
var listCustomers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listCustomers_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const profiles = await sql`
      select p.user_id, p.role, p.phone, p.display_name, p.points, p.totp_enabled, p.created_at, p.banned,
             u.email, u.name as user_name
      from profiles p
      left join "user" u on u.id = p.user_id
      order by p.created_at desc`;
	const orders = await sql`
      select * from orders order by created_at desc limit 800`;
	const byUser = /* @__PURE__ */ new Map();
	for (const row of orders) {
		const o = toOrder(row);
		const list = byUser.get(o.userId) ?? [];
		if (list.length < 40) list.push(o);
		byUser.set(o.userId, list);
	}
	return profiles.map((p) => {
		const hist = byUser.get(String(p.user_id)) ?? [];
		const live = hist.filter((o) => o.status !== "canceled");
		return {
			userId: String(p.user_id ?? ""),
			displayName: String(p.display_name || p.user_name || "Guest").trim() || "Guest",
			phone: String(p.phone ?? ""),
			email: String(p.email ?? ""),
			role: p.role === "admin" ? "admin" : "customer",
			points: Math.round(num(p.points)),
			totpEnabled: bool(p.totp_enabled),
			createdAt: iso(p.created_at),
			orderCount: live.length,
			spend: live.reduce((acc, o) => acc + o.total, 0),
			lastOrderAt: hist[0]?.createdAt ?? null,
			banned: bool(p.banned),
			orders: hist
		};
	});
});
var setAccountRole_createServerFn_handler = createServerRpc({
	id: "38dde3267a1a764c7f466ef4bea18a9385d78f473400b8f205c3c2cbf696fa86",
	name: "setAccountRole",
	filename: "src/lib/shop-server.ts"
}, (opts) => setAccountRole.__executeServer(opts));
var setAccountRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(setAccountRole_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const userId = String(data.userId || "").trim();
	if (!userId) throw new Error("Choose an account.");
	if (data.role !== "admin" && data.role !== "customer") throw new Error("Invalid role.");
	const target = await sql`select role from profiles where user_id = ${userId}`;
	if (!target[0]) throw new Error("Account not found.");
	if (data.role === "customer" && target[0].role === "admin") {
		if (num((await sql`select count(*)::int as n from profiles where role = 'admin'`)[0]?.n) <= 1) throw new Error("Keep at least one admin account.");
	}
	await sql`update profiles set role = ${data.role} where user_id = ${userId}`;
	return {
		ok: true,
		role: data.role
	};
});
var setAccountBanned_createServerFn_handler = createServerRpc({
	id: "ea5a208e042a5ef3f7b152ae95c22c2f0ba0342f20a2389ade5195516af08ced",
	name: "setAccountBanned",
	filename: "src/lib/shop-server.ts"
}, (opts) => setAccountBanned.__executeServer(opts));
var setAccountBanned = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(setAccountBanned_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const userId = String(data.userId || "").trim();
	if (!userId) throw new Error("Choose an account.");
	if (userId === context.userId) throw new Error("You cannot ban your own account.");
	const target = await sql`select role from profiles where user_id = ${userId}`;
	if (!target[0]) throw new Error("Account not found.");
	const banned = Boolean(data.banned);
	if (banned && target[0].role === "admin") {
		if (num((await sql`select count(*)::int as n from profiles where role = 'admin' and banned is not true`)[0]?.n) <= 1) throw new Error("Keep at least one admin account.");
	}
	await sql`update profiles set banned = ${banned} where user_id = ${userId}`;
	return {
		ok: true,
		banned
	};
});
var adjustCustomerPoints_createServerFn_handler = createServerRpc({
	id: "6837d55db11b3d67c287bb4576e198cdc6886c03c4f3aefb6761743ce705e4d4",
	name: "adjustCustomerPoints",
	filename: "src/lib/shop-server.ts"
}, (opts) => adjustCustomerPoints.__executeServer(opts));
var adjustCustomerPoints = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(adjustCustomerPoints_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const userId = String(data.userId || "").trim();
	if (!userId) throw new Error("Choose an account.");
	const delta = Math.round(num(data.delta));
	if (!delta) throw new Error("Enter how many points to add or remove.");
	if (Math.abs(delta) > 1e5) throw new Error("That point change is too large.");
	if (!(await sql`select user_id from profiles where user_id = ${userId}`)[0]) throw new Error("Account not found.");
	await sql.query(`update profiles set points = greatest(0, points + $1) where user_id = $2`, [delta, userId]);
	await addLedger(sql, userId, "adjust", delta, delta > 0 ? `Shop added ${delta} points` : `Shop removed ${Math.abs(delta)} points`);
	const row = await sql`select points from profiles where user_id = ${userId}`;
	return {
		ok: true,
		points: Math.round(num(row[0]?.points))
	};
});
var deleteOrder_createServerFn_handler = createServerRpc({
	id: "8009c13d49254d840f003eccd64c51d61b988f9d6ecb3bcc3260f2ee3168ecce",
	name: "deleteOrder",
	filename: "src/lib/shop-server.ts"
}, (opts) => deleteOrder.__executeServer(opts));
var deleteOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(deleteOrder_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const id = String(data.id || "").trim();
	if (!id) throw new Error("Choose an order.");
	if (!(await sql`select id from orders where id = ${id}`)[0]) throw new Error("Order not found.");
	await sql`delete from orders where id = ${id}`;
	return {
		ok: true,
		id
	};
});
var RECOVER_FAIL = "We could not recover that account. Check the email or phone, and the name or phone on file.";
var OTP_TTL_MS = 6e4;
var OTP_MAX_ATTEMPTS = 5;
var OTP_HOUR_CAP = 8;
function hashOtp(salt, code) {
	return createHash("sha256").update(`southend-otp:${salt}:${code}`).digest();
}
function maskEmail(email) {
	const [user, domain] = email.split("@");
	if (!domain) return "***";
	return `${(user || "x").slice(0, 1)}***@${domain}`;
}
async function loadCredentialAccount(sql, userId) {
	return (await sql.query(`select id, "providerId" as provider from account where "userId" = $1`, [userId])).find((row) => String(row.provider) === "credential") ?? null;
}
var recoverPassword_createServerFn_handler = createServerRpc({
	id: "9f27df72f953f9d4e92d96f699ffbaf92e96cf24b310983028f31c929e30807e",
	name: "recoverPassword",
	filename: "src/lib/shop-server.ts"
}, (opts) => recoverPassword.__executeServer(opts));
var recoverPassword = createServerFn({ method: "POST" }).validator((data) => data).handler(recoverPassword_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	const identifier = String(data.identifier ?? "").trim();
	const proof = String(data.proof ?? "").trim();
	const password = String(data.password ?? "");
	if (password.length < 8) throw new Error("Use at least 8 characters for the new password.");
	if (password.length > 128) throw new Error("That password is too long.");
	if (!identifier || !proof) throw new Error(RECOVER_FAIL);
	const parsed = identifierToEmail(identifier);
	const email = parsed.email.toLowerCase();
	const user = (await sql.query(`select id, email from "user" where lower(email) = $1 limit 1`, [email]))[0];
	if (!user) throw new Error(RECOVER_FAIL);
	const userId = String(user.id);
	const profile = (await sql`select phone, display_name from profiles where user_id = ${userId}`)[0];
	const storedPhone = toTenDigitPhone(String(profile?.phone ?? parsed.phone ?? ""));
	const storedName = String(profile?.display_name ?? "").trim().toLowerCase();
	const proofPhone = toTenDigitPhone(proof);
	const proofName = proof.toLowerCase();
	const phoneOk = Boolean(proofPhone && storedPhone && proofPhone === storedPhone);
	const nameOk = Boolean(proofName.length >= 2 && storedName && proofName === storedName);
	if (!phoneOk && !nameOk) throw new Error(RECOVER_FAIL);
	const credential = (await sql.query(`select id, "providerId" as provider from account where "userId" = $1`, [userId])).find((row) => String(row.provider) === "credential");
	if (!credential) throw new Error("This account signs in with Google or X. Use that button on the sign-in page.");
	const hash = await hashPassword(password);
	await sql.query(`update account set password = $1, "updatedAt" = now() where id = $2 and "providerId" = 'credential'`, [hash, String(credential.id)]);
	return { ok: true };
});
var sendPasswordResetCode_createServerFn_handler = createServerRpc({
	id: "6bf02f45892370365b2c8cbb04e561fec611dfd9655a8195ef4aa88a69100c51",
	name: "sendPasswordResetCode",
	filename: "src/lib/shop-server.ts"
}, (opts) => sendPasswordResetCode.__executeServer(opts));
var sendPasswordResetCode = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(sendPasswordResetCode_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	const users = await sql.query(`select id, email from "user" where id = $1 limit 1`, [context.userId]);
	const email = String(users[0]?.email ?? "").trim().toLowerCase();
	if (!email || !email.includes("@")) throw new Error("This account has no email on file.");
	if (!await loadCredentialAccount(sql, context.userId)) throw new Error("This account signs in with Google or X. Use that button on the sign-in page.");
	const recent = await sql.query(`select created_at from password_reset_codes where user_id = $1 and created_at > now() - interval '1 hour' order by created_at desc`, [context.userId]);
	if (recent.length >= OTP_HOUR_CAP) throw new Error("Too many reset emails. Try again in an hour.");
	const last = recent[0]?.created_at ? new Date(String(recent[0].created_at)).getTime() : 0;
	if (last && Date.now() - last < OTP_TTL_MS) throw new Error("A code is already on the way. Wait 60 seconds to send another.");
	await sql.query(`update password_reset_codes set consumed_at = now() where user_id = $1 and consumed_at is null`, [context.userId]);
	const code = String(randomInt(0, 1e6)).padStart(6, "0");
	const salt = randomBytes(16).toString("hex");
	const digest = hashOtp(salt, code).toString("hex");
	const id = `otp-${Date.now().toString(36)}-${randomBytes(4).toString("hex")}`;
	const expires = new Date(Date.now() + OTP_TTL_MS);
	await sql.query(`insert into password_reset_codes (id, user_id, email, code_hash, salt, expires_at) values ($1,$2,$3,$4,$5,$6)`, [
		id,
		context.userId,
		email,
		digest,
		salt,
		expires
	]);
	return {
		sent: true,
		email: maskEmail(email),
		expiresIn: 60,
		previewCode: dbSource === "pglite" ? code : void 0
	};
});
var changeMyPassword_createServerFn_handler = createServerRpc({
	id: "b3d77c9a4c735ff404dcbea870571db354d68ce4b34aaf3e32d03711ed9e38eb",
	name: "changeMyPassword",
	filename: "src/lib/shop-server.ts"
}, (opts) => changeMyPassword.__executeServer(opts));
var changeMyPassword = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(changeMyPassword_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	const password = String(data.password ?? "");
	const code = String(data.code ?? "").replace(/\D/g, "");
	if (password.length < 8) throw new Error("Use at least 8 characters for the new password.");
	if (password.length > 128) throw new Error("That password is too long.");
	if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit code from your email.");
	const credential = await loadCredentialAccount(sql, context.userId);
	if (!credential) throw new Error("This account signs in with Google or X. Use that button on the sign-in page.");
	const row = (await sql.query(`select id, code_hash, salt, expires_at, attempts, consumed_at from password_reset_codes
     where user_id = $1 and consumed_at is null order by created_at desc limit 1`, [context.userId]))[0];
	if (!row) throw new Error("Send a new one-time code first.");
	if (new Date(String(row.expires_at)).getTime() < Date.now()) {
		await sql.query(`update password_reset_codes set consumed_at = now() where id = $1`, [String(row.id)]);
		throw new Error("That code expired. Send a new one.");
	}
	if (Math.round(num(row.attempts)) >= OTP_MAX_ATTEMPTS) {
		await sql.query(`update password_reset_codes set consumed_at = now() where id = $1`, [String(row.id)]);
		throw new Error("Too many tries. Send a new code.");
	}
	const expected = Buffer.from(String(row.code_hash), "hex");
	const got = hashOtp(String(row.salt), code);
	if (expected.length !== got.length || !timingSafeEqual(expected, got)) {
		await sql.query(`update password_reset_codes set attempts = attempts + 1 where id = $1`, [String(row.id)]);
		throw new Error("That code does not match. Try again.");
	}
	const hash = await hashPassword(password);
	await sql.query(`update account set password = $1, "updatedAt" = now() where id = $2 and "providerId" = 'credential'`, [hash, String(credential.id)]);
	await sql.query(`update password_reset_codes set consumed_at = now() where user_id = $1 and consumed_at is null`, [context.userId]);
	return { ok: true };
});
var patchPosOrder_createServerFn_handler = createServerRpc({
	id: "353c71c7e2029e27b2fbe3d0fab0134262150feb44f5d5ebb2c43cf4b0b3d072",
	name: "patchPosOrder",
	filename: "src/lib/shop-server.ts"
}, (opts) => patchPosOrder.__executeServer(opts));
var patchPosOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(patchPosOrder_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const id = String(data.id || "").trim();
	if (!id) throw new Error("Choose an order.");
	const rows = await sql`select * from orders where id = ${id}`;
	if (!rows[0]) throw new Error("Order not found.");
	const current = toOrder(rows[0]);
	if (current.status === "canceled") throw new Error("A canceled ticket cannot be edited.");
	const items = parseOrderItems(data.items).filter((it) => it.qty > 0 && it.name);
	if (!items.length) throw new Error("Keep at least one item on the ticket.");
	const settings = await loadSettingsRow(sql);
	const subtotal = Math.round(items.reduce((s, l) => s + l.unitPrice * l.qty, 0) * 100) / 100;
	const discount = current.discount;
	const deliveryFee = current.deliveryFee;
	const taxRate = settings.tax_rate === void 0 || settings.tax_rate === null || settings.tax_rate === "" ? 6.625 : Math.max(0, num(settings.tax_rate));
	const { tax, total: preTip } = computeTax(subtotal, discount, deliveryFee, taxRate);
	const tip = current.tip;
	const total = Math.round((preTip + tip) * 100) / 100;
	await sql.query(`update orders set items = $1::jsonb, subtotal = $2, tax = $3, total = $4 where id = $5`, [
		JSON.stringify(items),
		subtotal.toFixed(2),
		tax.toFixed(2),
		total.toFixed(2),
		id
	]);
	const next = (await sql`select * from orders where id = ${id}`)[0];
	return {
		ok: true,
		order: next ? toOrder(next) : null
	};
});
var listPosOrders_createServerFn_handler = createServerRpc({
	id: "1206b02a97ef848d3762666fb57bfcf3704c1543c098864a19989d5800595d00",
	name: "listPosOrders",
	filename: "src/lib/shop-server.ts"
}, (opts) => listPosOrders.__executeServer(opts));
var listPosOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPosOrders_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	return (await sql`
      select o.*, p.display_name, p.phone,
        ping.id as chat_thread_id,
        ping.unread_admin as chat_unread
      from orders o
      left join profiles p on p.user_id = o.user_id
      left join (
        select distinct on (order_id) id, order_id, unread_admin
        from chat_threads
        where order_id is not null
          and unread_admin > 0
          and status <> 'solved'
          and muted is not true
        order by order_id, last_at desc
      ) ping on ping.order_id = o.id
      order by o.created_at desc
      limit 120`).map((row) => {
		return {
			...toOrder(row),
			customerName: String(row.display_name || "").trim() || "Guest",
			customerPhone: String(row.phone || ""),
			chatUnread: Math.round(num(row.chat_unread)),
			chatThreadId: row.chat_thread_id ? String(row.chat_thread_id) : null
		};
	});
});
var listIncomingOrders_createServerFn_handler = createServerRpc({
	id: "d854d44aa3f204c2b7c3d5f67d750a3fa01982988a33161dbb9d24c6bdaadd0d",
	name: "listIncomingOrders",
	filename: "src/lib/shop-server.ts"
}, (opts) => listIncomingOrders.__executeServer(opts));
var listIncomingOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listIncomingOrders_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	return (await sql`
      select o.*, p.display_name, p.phone
      from orders o
      left join profiles p on p.user_id = o.user_id
      where o.status = 'placed'
      order by o.created_at asc, coalesce(o.ticket_no, 0) asc, o.id asc
      limit 40`).map((row) => {
		return {
			...toOrder(row),
			customerName: String(row.display_name || "").trim() || "Guest",
			customerPhone: String(row.phone || ""),
			chatUnread: 0,
			chatThreadId: null
		};
	});
});
var getAdminInboxCount_createServerFn_handler = createServerRpc({
	id: "05fde0cd6acff5dcf2d72eba71c33f0f2ec07f553282d9820053733d946d9b44",
	name: "getAdminInboxCount",
	filename: "src/lib/shop-server.ts"
}, (opts) => getAdminInboxCount.__executeServer(opts));
var getAdminInboxCount = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getAdminInboxCount_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const rows = await sql`
      select count(*)::int as n from chat_threads where unread_admin > 0 and status <> 'solved' and muted is not true`;
	return { unread: Math.round(num(rows[0]?.n)) };
});
var listAdminChats_createServerFn_handler = createServerRpc({
	id: "9eb173db2134b93997d461c05fceda01690b6da2b7537a41e4ea5438d70d85a2",
	name: "listAdminChats",
	filename: "src/lib/shop-server.ts"
}, (opts) => listAdminChats.__executeServer(opts));
var listAdminChats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAdminChats_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	return (await sql`
      select t.*, p.display_name, p.phone as customer_phone, p.banned,
        o.id as linked_order_id, o.ticket_no as order_ticket_no, o.status as order_status, o.fulfillment as order_fulfillment,
        o.total as order_total, o.notes as order_notes, o.created_at as order_created, o.items as order_items
      from chat_threads t
      left join profiles p on p.user_id = t.user_id
      left join orders o on o.id = t.order_id
      order by t.flagged desc, t.last_at desc
      limit 80`).map((row) => toThread(row, String(row.display_name || "").trim() || "Guest"));
});
var listMyChats_createServerFn_handler = createServerRpc({
	id: "2545826bb2beb54af1f3131df2c911dfbab5b12a6d5560a433aa7eb2faae5fcc",
	name: "listMyChats",
	filename: "src/lib/shop-server.ts"
}, (opts) => listMyChats.__executeServer(opts));
var listMyChats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyChats_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	return (await sql`
      select t.*,
        o.id as linked_order_id, o.ticket_no as order_ticket_no, o.status as order_status, o.fulfillment as order_fulfillment,
        o.total as order_total, o.notes as order_notes, o.created_at as order_created, o.items as order_items
      from chat_threads t
      left join orders o on o.id = t.order_id
      where t.user_id = ${context.userId} and t.status <> 'solved'
      order by t.last_at desc
      limit 20`).map((row) => {
		return {
			...toThread(row, "You"),
			staffNote: "",
			muted: false,
			flagged: false
		};
	});
});
var loadChatMessages_createServerFn_handler = createServerRpc({
	id: "6396d6554feb23219f0d0edc1c2d3f445b5608846b9c2441cb1647075fdefb7c",
	name: "loadChatMessages",
	filename: "src/lib/shop-server.ts"
}, (opts) => loadChatMessages.__executeServer(opts));
var loadChatMessages = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(loadChatMessages_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	const threadId = String(data.threadId || "");
	const thread = await sql`select user_id, status from chat_threads where id = ${threadId}`;
	if (!thread[0]) throw new Error("Chat not found.");
	const isAdmin = (await sql`select role from profiles where user_id = ${context.userId}`)[0]?.role === "admin";
	if (!isAdmin && thread[0].user_id !== context.userId) throw new Error("Forbidden");
	if (!isAdmin && String(thread[0].status) === "solved") return [];
	if (isAdmin) await sql`update chat_threads set unread_admin = 0 where id = ${threadId}`;
	else await sql`update chat_threads set unread_customer = 0 where id = ${threadId}`;
	return (await sql`
      select * from chat_messages where thread_id = ${threadId} order by created_at asc limit 200`).map(toMessage);
});
var startChat_createServerFn_handler = createServerRpc({
	id: "16cacd9a1e5e9fd5af48ae2106a6dde505a2f79a0236ac7916ad104aa8f286c5",
	name: "startChat",
	filename: "src/lib/shop-server.ts"
}, (opts) => startChat.__executeServer(opts));
var startChat = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(startChat_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await assertNotBanned(sql, context.userId);
	const body = String(data.body || "").trim().slice(0, 1e3);
	if (!body) throw new Error("Write a message first.");
	let orderId = String(data.orderId || "").trim() || null;
	if (!orderId) throw new Error("Pick an active order first.");
	if (!(await sql`
        select id from orders where id = ${orderId} and user_id = ${context.userId}`)[0]) throw new Error("That ticket is not on this account.");
	const openRow = Boolean(data.forceNew) ? void 0 : (await sql`
      select id from chat_threads
      where user_id = ${context.userId} and status = 'open'
      order by last_at desc limit 1`)[0];
	let threadId = openRow?.id ? String(openRow.id) : "";
	const preview = body.slice(0, 140);
	if (!threadId) {
		threadId = newId("chat");
		await sql.query(`insert into chat_threads (id, user_id, status, last_message, last_at, unread_admin, unread_customer, order_id)
         values ($1,$2,'open',$3,now(),1,0,$4)`, [
			threadId,
			context.userId,
			preview,
			orderId
		]);
	} else await sql.query(`update chat_threads
         set last_message = $1, last_at = now(), unread_admin = unread_admin + 1, unread_customer = 0,
             status = 'open', order_id = coalesce($3, order_id)
         where id = $2`, [
		preview,
		threadId,
		orderId
	]);
	const msgId = newId("msg");
	await sql.query(`insert into chat_messages (id, thread_id, sender_id, sender_role, body) values ($1,$2,$3,'customer',$4)`, [
		msgId,
		threadId,
		context.userId,
		body
	]);
	return { threadId };
});
var sendChatMessage_createServerFn_handler = createServerRpc({
	id: "e9ae1e079d8cdff7ebb28cfebfa94d061b7fc89a70b7cd3ad83b31134e9474e0",
	name: "sendChatMessage",
	filename: "src/lib/shop-server.ts"
}, (opts) => sendChatMessage.__executeServer(opts));
var sendChatMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(sendChatMessage_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	const threadId = String(data.threadId || "");
	const body = String(data.body || "").trim().slice(0, 1e3);
	if (!body) throw new Error("Write a message first.");
	const thread = await sql`select user_id, status from chat_threads where id = ${threadId}`;
	if (!thread[0]) throw new Error("Chat not found.");
	const isAdmin = (await sql`select role from profiles where user_id = ${context.userId}`)[0]?.role === "admin";
	if (!isAdmin && thread[0].user_id !== context.userId) throw new Error("Forbidden");
	if (!isAdmin) await assertNotBanned(sql, context.userId);
	if (!isAdmin && String(thread[0].status) === "solved") throw new Error("This chat has concluded. Start a new chat.");
	const role = isAdmin ? "admin" : "customer";
	const msgId = newId("msg");
	await sql.query(`insert into chat_messages (id, thread_id, sender_id, sender_role, body) values ($1,$2,$3,$4,$5)`, [
		msgId,
		threadId,
		context.userId,
		role,
		body
	]);
	if (isAdmin) await sql.query(`update chat_threads
         set last_message = $1, last_at = now(), unread_customer = unread_customer + 1, unread_admin = 0, status = 'open'
         where id = $2`, [body.slice(0, 140), threadId]);
	else await sql.query(`update chat_threads
         set last_message = $1, last_at = now(), unread_admin = unread_admin + 1, unread_customer = 0, status = 'open'
         where id = $2`, [body.slice(0, 140), threadId]);
	return {
		ok: true,
		id: msgId
	};
});
var setChatResolution_createServerFn_handler = createServerRpc({
	id: "d2aa6a345d9a7d270555a60411f1eecd71fd2f6fbaebbb2b8a7247869dd7ccc8",
	name: "setChatResolution",
	filename: "src/lib/shop-server.ts"
}, (opts) => setChatResolution.__executeServer(opts));
var setChatResolution = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(setChatResolution_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const threadId = String(data.threadId || "");
	if (!(await sql`select id from chat_threads where id = ${threadId}`)[0]) throw new Error("Chat not found.");
	const status = data.solved ? "solved" : "open";
	if (data.solved) await sql.query(`update chat_threads
         set status = 'solved', unread_admin = 0, unread_customer = 0, last_at = now()
         where id = $1`, [threadId]);
	else await sql.query(`update chat_threads set status = $1, unread_admin = 0 where id = $2`, [status, threadId]);
	return {
		ok: true,
		status
	};
});
var attachChatOrder_createServerFn_handler = createServerRpc({
	id: "b45f21af2f82f67c84429e9c82fcb3b8465d1c2fd2be129b05264fb9a42a1bed",
	name: "attachChatOrder",
	filename: "src/lib/shop-server.ts"
}, (opts) => attachChatOrder.__executeServer(opts));
var attachChatOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(attachChatOrder_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	const threadId = String(data.threadId || "");
	const orderId = String(data.orderId || "").trim();
	if (!threadId || !orderId) throw new Error("Choose a ticket.");
	const thread = await sql`select user_id from chat_threads where id = ${threadId}`;
	if (!thread[0]) throw new Error("Chat not found.");
	if (!((await sql`select role from profiles where user_id = ${context.userId}`)[0]?.role === "admin") && thread[0].user_id !== context.userId) throw new Error("Forbidden");
	if (!(await sql`select id from orders where id = ${orderId} and user_id = ${thread[0].user_id}`)[0]) throw new Error("That ticket is not on this account.");
	await sql`update chat_threads set order_id = ${orderId} where id = ${threadId}`;
	return {
		ok: true,
		orderId
	};
});
var startAdminChat_createServerFn_handler = createServerRpc({
	id: "8ed47f0f95f0fd928a3867a8c22d06ca683a53003e27db38d73944bbc9a39dce",
	name: "startAdminChat",
	filename: "src/lib/shop-server.ts"
}, (opts) => startAdminChat.__executeServer(opts));
var startAdminChat = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(startAdminChat_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const userId = String(data.userId || "").trim();
	if (!userId) throw new Error("Choose a customer.");
	if (!(await sql`select user_id from profiles where user_id = ${userId}`)[0]) throw new Error("Account not found.");
	const open = (await sql`
      select id from chat_threads where user_id = ${userId} and status <> 'solved' order by last_at desc limit 1`)[0];
	if (open?.id) return { threadId: String(open.id) };
	const any = (await sql`select id from chat_threads where user_id = ${userId} order by last_at desc limit 1`)[0];
	if (any?.id) return { threadId: String(any.id) };
	const threadId = newId("chat");
	await sql.query(`insert into chat_threads (id, user_id, status, last_message, last_at, unread_admin, unread_customer)
       values ($1,$2,'open',$3,now(),0,0)`, [
		threadId,
		userId,
		"Shop started a conversation"
	]);
	return { threadId };
});
var setChatStaffNote_createServerFn_handler = createServerRpc({
	id: "ee424e5f66bbce729edb2eeb2a8b55c2a072faf7605f611f83417dc6916ce827",
	name: "setChatStaffNote",
	filename: "src/lib/shop-server.ts"
}, (opts) => setChatStaffNote.__executeServer(opts));
var setChatStaffNote = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(setChatStaffNote_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const threadId = String(data.threadId || "");
	if (!(await sql`select id from chat_threads where id = ${threadId}`)[0]) throw new Error("Chat not found.");
	const note = String(data.note ?? "").slice(0, 800);
	await sql`update chat_threads set staff_note = ${note} where id = ${threadId}`;
	return {
		ok: true,
		note
	};
});
var setChatMuted_createServerFn_handler = createServerRpc({
	id: "40e86a191d140c403d5961677d7ca214977a0646825cd13ec616f2075c5411cd",
	name: "setChatMuted",
	filename: "src/lib/shop-server.ts"
}, (opts) => setChatMuted.__executeServer(opts));
var setChatMuted = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(setChatMuted_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const threadId = String(data.threadId || "");
	if (!(await sql`select id from chat_threads where id = ${threadId}`)[0]) throw new Error("Chat not found.");
	const muted = Boolean(data.muted);
	await sql`update chat_threads set muted = ${muted} where id = ${threadId}`;
	return {
		ok: true,
		muted
	};
});
var setChatFlagged_createServerFn_handler = createServerRpc({
	id: "45969789c4e158c61e0b50e40516caafc9fc5b0653bc57eaee07e4f33a422d2a",
	name: "setChatFlagged",
	filename: "src/lib/shop-server.ts"
}, (opts) => setChatFlagged.__executeServer(opts));
var setChatFlagged = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(setChatFlagged_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const threadId = String(data.threadId || "");
	if (!(await sql`select id from chat_threads where id = ${threadId}`)[0]) throw new Error("Chat not found.");
	const flagged = Boolean(data.flagged);
	await sql`update chat_threads set flagged = ${flagged} where id = ${threadId}`;
	return {
		ok: true,
		flagged
	};
});
var deleteChatMessage_createServerFn_handler = createServerRpc({
	id: "059d860554c5b698041079549470ec22b4209e73acdca3cb55c29f957c243f2d",
	name: "deleteChatMessage",
	filename: "src/lib/shop-server.ts"
}, (opts) => deleteChatMessage.__executeServer(opts));
var deleteChatMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(deleteChatMessage_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const id = String(data.id || "").trim();
	const row = (await sql`select thread_id from chat_messages where id = ${id}`)[0];
	if (!row) throw new Error("Message not found.");
	const threadId = String(row.thread_id);
	await sql`delete from chat_messages where id = ${id}`;
	const last = (await sql`select body from chat_messages where thread_id = ${threadId} order by created_at desc limit 1`)[0];
	await sql.query(`update chat_threads set last_message = $1 where id = $2`, [String(last?.body ?? "").slice(0, 140), threadId]);
	return {
		ok: true,
		id
	};
});
var deleteChatThread_createServerFn_handler = createServerRpc({
	id: "dee3ffe6ae118327bb704934e7000b191fe224fd07848feda62eef2560bdcbdb",
	name: "deleteChatThread",
	filename: "src/lib/shop-server.ts"
}, (opts) => deleteChatThread.__executeServer(opts));
var deleteChatThread = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((data) => data).handler(deleteChatThread_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureSettingsSchema(sql);
	await ensureProfile(sql, context.userId);
	await requireAdmin(sql, context.userId);
	const threadId = String(data.threadId || "").trim();
	if (!(await sql`select id from chat_threads where id = ${threadId}`)[0]) throw new Error("Chat not found.");
	await sql`delete from chat_messages where thread_id = ${threadId}`;
	await sql`delete from chat_threads where id = ${threadId}`;
	return {
		ok: true,
		threadId
	};
});
//#endregion
export { acceptOrder_createServerFn_handler, adjustCustomerPoints_createServerFn_handler, attachChatOrder_createServerFn_handler, changeMyPassword_createServerFn_handler, checkDeliveryAddress_createServerFn_handler, claimAdmin_createServerFn_handler, claimReferral_createServerFn_handler, confirmTotpSetup_createServerFn_handler, deleteChatMessage_createServerFn_handler, deleteChatThread_createServerFn_handler, deleteOrder_createServerFn_handler, disableTotp_createServerFn_handler, getAdminInboxCount_createServerFn_handler, getAdminInsights_createServerFn_handler, getAdminShop_createServerFn_handler, getMe_createServerFn_handler, getMyRewards_createServerFn_handler, getShopContact_createServerFn_handler, getStorefront_createServerFn_handler, getTwoFactorStatus_createServerFn_handler, listAdminChats_createServerFn_handler, listAllOrders_createServerFn_handler, listCustomers_createServerFn_handler, listIncomingOrders_createServerFn_handler, listMyChats_createServerFn_handler, listMyOrders_createServerFn_handler, listPosOrders_createServerFn_handler, loadChatMessages_createServerFn_handler, patchPosOrder_createServerFn_handler, placeGuestOrder_createServerFn_handler, placeOrder_createServerFn_handler, recoverPassword_createServerFn_handler, saveDeliveryZone_createServerFn_handler, saveShopMenu_createServerFn_handler, saveShopSettings_createServerFn_handler, saveWebsite_createServerFn_handler, sendChatMessage_createServerFn_handler, sendPasswordResetCode_createServerFn_handler, setAccountBanned_createServerFn_handler, setAccountRole_createServerFn_handler, setChatFlagged_createServerFn_handler, setChatMuted_createServerFn_handler, setChatResolution_createServerFn_handler, setChatStaffNote_createServerFn_handler, startAdminChat_createServerFn_handler, startChat_createServerFn_handler, startTotpSetup_createServerFn_handler, updateOrderStatus_createServerFn_handler, updateProfile_createServerFn_handler, verifyTotpChallenge_createServerFn_handler };
