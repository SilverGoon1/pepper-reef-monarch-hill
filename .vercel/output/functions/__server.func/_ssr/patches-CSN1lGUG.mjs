import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patches-CSN1lGUG.js
var import_jsx_runtime = require_jsx_runtime();
var PATCHES = [
	{
		id: "2026-09-10-guest-header-align",
		date: "September 10, 2026",
		title: "A cleaner guest title bar",
		added: ["Help and Download App stay in the signed-in name menu, not on the guest title bar.", "The buffalo mark is the same height as Sign in and Cart, on one line."]
	},
	{
		id: "2026-09-10-southend-app-address",
		date: "September 10, 2026",
		title: "SouthEnd app, saved address, and a cleaner pizza builder",
		added: [
			"Account details now stores a delivery street, city, and ZIP, and checkout fills them in.",
			"Summary dropped the extra jump buttons — the tabs already cover details, security, and rewards.",
			"Make it yours shows the pie photo and description. Extra toppings are tap chips; half sides only appear once a topping is on.",
			"Menu photos fill the card edge to edge. Category arrows wrap from the last chip back to the first.",
			"Download App in the name menu installs the shop app with the buffalo mark.",
			"Sign-in goes straight to the menu instead of waiting on shop setup, so the live app no longer hangs after login."
		]
	},
	{
		id: "2026-09-10-account-tabs-invites",
		date: "September 10, 2026",
		title: "Account tabs, invites, and a larger title mark",
		added: [
			"Help and Sign out sit in the name menu. POS and Cart match the larger title mark.",
			"Your account opens on a summary, with tabs for details, security, and rewards.",
			"Rewards shows point history and a friend invite with a copyable link and QR code."
		]
	},
	{
		id: "2026-09-10-header-photo-off",
		date: "September 10, 2026",
		title: "Name in the title bar, photos optional",
		added: ["Your name in the title bar opens Account. Admins get a dropdown for Account and Admin.", "Menu photos can be turned off per item so the card shrinks to text."]
	},
	{
		id: "2026-09-10-item-photos",
		date: "September 10, 2026",
		title: "Menu item photos",
		added: ["Every menu card now shows a food photo that matches the item name and description.", "Shop-uploaded photos still replace the placeholder. Remove photo to go back to the match."]
	},
	{
		id: "2026-09-10-search-scroll",
		date: "September 10, 2026",
		title: "Search in the category row",
		added: ["Order is off the customer title bar. The shop mark still opens the menu.", "Search is a short chip that scrolls with Pizza, Gourmet, and the rest, and grows when you tap it."]
	},
	{
		id: "2026-09-10-card-editor",
		date: "September 10, 2026",
		title: "Card Editor tab",
		added: [
			"Card Editor is its own tab in Menu & Shop Details.",
			"Cards can change size and paper color. Name, description, and price still have their own inks.",
			"Large type no longer spills over the photo or stacks on the price."
		]
	},
	{
		id: "2026-09-10-cart-pop-card-ink",
		date: "September 10, 2026",
		title: "Cart popup, Top on scroll, and card ink",
		added: [
			"Cart in the title bar opens Your order as a popup. Checkout still glows.",
			"The Top button sits with Call and Chat only after the title bar scrolls off the screen.",
			"Shop details can color menu card names, descriptions, and prices separately, with more inks."
		]
	},
	{
		id: "2026-09-10-admin-cart-dock",
		date: "September 10, 2026",
		title: "Admin home, checkout glow, and back to top",
		added: [
			"Admin in the title bar always opens Menu & Shop Details on the Menu tab.",
			"The admin menu lists Menu & Shop Details first, then Customer Center.",
			"Cart in the title bar pulses Checkout. The sticky bar says Checkout, and a Top button sits with Call and Chat."
		]
	},
	{
		id: "2026-09-10-pos-popup-hours",
		date: "September 10, 2026",
		title: "POS ticket popup, hours, and Admin home",
		added: [
			"POS opens a ticket popup with status, items, reprint, and profile — no inline dropdown.",
			"Vacation lives on the Hours tab in Menu & Shop Details.",
			"Admin in the title bar opens Menu & Shop Details. Desk is out of the admin menu."
		]
	},
	{
		id: "2026-09-10-search-guest-card",
		date: "September 10, 2026",
		title: "Carousel search, guest card, quieter home",
		added: [
			"Menu search sits in the category carousel. Picking a result opens that item’s confirm popup.",
			"Payments can require card for guest checkout. Signed-in customers still pay at pickup or cash.",
			"The buffalo mark stays in the title bar and is off the main menu page."
		]
	},
	{
		id: "2026-09-10-menu-ops-home",
		date: "September 10, 2026",
		title: "Sizes, printers, and zones in Menu & Shop Details",
		added: [
			"Pizza sizes are typed on each item in Menu & Shop Details. XL is offered when you enter an XL price — no settings toggle.",
			"Printer setup moved into a Printers tab, with Diagnose, Check connection, and a troubleshooting list.",
			"Delivery zones paint on the Delivery tab next to fee and minimum.",
			"Background is now Settings and sits at the bottom of the admin menu."
		]
	},
	{
		id: "2026-09-09-guest-points-chat",
		date: "September 9, 2026",
		title: "Guest checkout, rewards hub, and shop tabs",
		added: [
			"Menu & Shop Details condiments have a quantity cap guests can add (1–9).",
			"Cook notes stay focused while typing — the comment field no longer deselects.",
			"New accounts require a password and a matching confirm password.",
			"Checkout works as a guest with a name and phone, or sign in as usual.",
			"Rewards live in Customer center, with earn/redeem preview chips and wallet tools.",
			"Website edit tools left Settings. Tagline and buffalo mark sit in Shop details.",
			"Hours, vacation, payments, tax, and delivery are their own tabs in Menu & Shop Details.",
			"Menu search no longer flickers after a hit — suggestions sit in a stable slot.",
			"Chat splits sent messages from the pad where you type a new one.",
			"Item photos show the full picture instead of a tight crop, with a sharper upload."
		]
	},
	{
		id: "2026-09-09-condiments-confirm",
		date: "September 9, 2026",
		title: "Condiments, item notes, and steadier return",
		added: [
			"Menu & Shop Details can attach condiments to any item, with an add price and an extra price.",
			"Choosing an item opens a confirm popup: size, condiments, extra portions, and a cook note.",
			"Coming back to the shop retries a dropped connection instead of showing Failed to fetch.",
			"POS tickets, menu editor sections, and order-history trays start closed. Opening one closes the others."
		]
	},
	{
		id: "2026-09-08-card-type",
		date: "September 8, 2026",
		title: "Menu card text size and color",
		added: [
			"Menu & Shop Details can set the text size and color for every customer menu card.",
			"Small, Medium, Large, and Extra large, plus ink, tomato, deep red, or a custom color.",
			"Save all writes card type with prices and shop details. A live preview sits in Shop details."
		]
	},
	{
		id: "2026-09-08-photo-cards",
		date: "September 8, 2026",
		title: "Photo cards, flush tabs, and a steadier backdrop",
		added: [
			"Category tabs pin flush to the top of the screen after the title bar scrolls away.",
			"The page keeps a stable scrollbar gutter so short menu sections no longer shove the layout.",
			"Menu & Shop Details can attach a photo to each item. Save all writes those photos to the live menu.",
			"Item cards are the button: photo in the top 75%, name and price in the lower 25%.",
			"Closing a chat no longer posts “this chat has concluded.” The customer window just opens a fresh thread.",
			"POS Open and Complete sit beside the Menu drawer on phone and desktop.",
			"The shop backdrop covers the visitor’s window, keeps the original photo shape, and no longer drifts when scrolling or resizing."
		]
	},
	{
		id: "2026-09-08-ticket-desk",
		date: "September 8, 2026",
		title: "Ticket numbers, POS desk, and tighter admin chrome",
		added: [
			"Tickets now use a 6-digit number, starting at 000001.",
			"Customer chat says Send, and it stays off until an active order is picked.",
			"POS splits Open and Complete next to the admin menu, drops the description card, and adds a Profile button beside Reprint.",
			"Menu & Shop Details save is Save all. Shop name stays in the title bar, not in shop details.",
			"Category tabs stick under the header as a solid bar while you scroll.",
			"Customer order history groups by date in expandable trays.",
			"Admin accounts no longer see Order and Help in the title bar."
		]
	},
	{
		id: "2026-09-08-desk-polish",
		date: "September 8, 2026",
		title: "POS chat pings, full backdrop, seasonal effects",
		added: [
			"Admin chat no longer shows canned reply chips.",
			"If a guest chats about a live ticket, that row on POS lights up with a message notice.",
			"Customer chat only lists active tickets in About this order — completed and canceled stay off the list.",
			"Admin drawer now says Menu & Shop Details. Short name is gone; one save writes prices and shop details together.",
			"Shop backdrop fills the whole screen, faded so the menu stays readable.",
			"Background tab can turn on quiet holiday effects: New Year's, Christmas, Halloween, 4th of July, Valentine's, and St. Patrick's."
		]
	},
	{
		id: "2026-09-08-customer-center",
		date: "September 8, 2026",
		title: "Customer center, cash, and chat tools",
		added: [
			"Delivery checkout says Cash instead of pay the driver.",
			"Messages, orders, and the customer book live in one Customer center.",
			"Admin chat can flag, mute the pip, ban, delete a line or the whole thread, and keep a staff note.",
			"Quick replies, timestamps, and Enter-to-send on shop chats.",
			"Old Messages, Orders, and Customers links open the same hub.",
			"When the shop marks a chat complete, the customer window goes blank instead of jumping back to an older thread. Start a new chat stays on a fresh conversation."
		]
	},
	{
		id: "2026-09-08-checkout-ops",
		date: "September 8, 2026",
		title: "Checkout, scheduled orders, and the kitchen queue",
		added: [
			"Remove items from the bag on checkout, or step the quantity down.",
			"Category skip buttons move one section at a time, with a clear background.",
			"Customer service order picker shows the date and time the ticket was placed.",
			"Reset password emails a 60-second one-time code before a new password can be set.",
			"Schedule pickup or delivery for a later date during checkout.",
			"Call and Chat stay pinned in the bottom-right corner on the storefront.",
			"Today, this week, and tips moved into a rebuilt Financials page.",
			"POS ticket search is a floating button. Incoming orders pop with an alarm and a queue, and the alarm file is on Background."
		]
	},
	{
		id: "2026-09-08-pos-drawer",
		date: "September 8, 2026",
		title: "POS station, drawer, and account password",
		added: [
			"Category rail skip buttons jump two sections left or right.",
			"Admin drawer covers the title bar so Menu stays on top.",
			"Reward points stay on Your account — not the header or storefront.",
			"Customers can set a new password on Your account with the email on file.",
			"Background tab uploads the website icon as well as the faded backdrop.",
			"POS uses Placed, Accepted (yellow), and Completed (green). Add or remove lines, search the menu, and reprint. The title bar hides in POS.",
			"Admin drawer starts with Main menu and ends with Log out."
		]
	},
	{
		id: "2026-09-08-admin",
		date: "September 8, 2026",
		title: "Admin drawer, POS in the title bar, custom backdrop",
		added: [
			"POS sits in the title bar for admin accounts, on every shop page.",
			"Customers, financials, and shop settings are their own admin pages — no more nested settings tabs.",
			"Admin categories live in a retractable drawer, closed by default, listed A–Z.",
			"Background page to upload a custom faded shop mark, or restore the buffalo-and-chicken icon."
		]
	},
	{
		id: "2026-09-08",
		date: "September 8, 2026",
		title: "Search, recovery, and kitchen notes",
		added: [
			"Backdrop is the buffalo-and-chicken icon, smaller and higher on the screen, with the shop-name engraving removed.",
			"Forgot password on sign-in. Recover with the email or phone on the account plus the phone or name on file.",
			"Reorder from account history, including kitchen notes and cook comments.",
			"Storefront and header stay a readable width on large screens instead of stretching edge to edge.",
			"Search cell before Pizza, with suggestions ranked by name, description, then category.",
			"Pickup orders require a name at confirmation.",
			"Admins can remove a ticket from the system and ban an account.",
			"Marking a chat completed tells the customer it has concluded and starts them on a fresh thread.",
			"Cook comments under each item, printed large on the store copy under that line.",
			"Half-and-half split-this-pie toggle taken off the pizza builder."
		]
	},
	{
		id: "2026-09-07",
		date: "September 7, 2026",
		title: "Pizza builder, extra large, and shop notices",
		added: [
			"Customize popup on every pizza — extra toppings, half-and-half, and a live price.",
			"Topping charges follow pizza size (small through extra large). Half toppings are half price.",
			"Admin toggle to offer extra large pies, with a price field you set yourself (added on top of large).",
			"Admin message pip moved to the Admin tab. Opening a thread marks it read and drops the count.",
			"This Patches tab, listing what landed in the shop.",
			"Stationary faded buffalo-and-chicken backdrop with the white studio background removed."
		]
	},
	{
		id: "2026-09-06",
		date: "September 6, 2026",
		title: "Store flow, tips, and customer book",
		added: [
			"Pay first, kitchen accepts on the tablet, then the receipt prints.",
			"Sign-in with email, Google, or X. Phone maps to a shop account. App TOTP for 2FA.",
			"Tips at 10%, 15%, 20%, or a custom amount. New Jersey tips stay off the sales-tax line.",
			"Customer notes print in a NOTES block under the receipt header.",
			"Customer database in Settings, with order history and the option to grant admin.",
			"Help chat for customers, plus a call-the-shop line. POS lists tickets in time order."
		]
	},
	{
		id: "2026-09-05",
		date: "September 5, 2026",
		title: "Shop desk and wall menu",
		added: [
			"Live storefront for pickup and painted delivery zones.",
			"Admin menu editor and printable wall menu.",
			"Settings for tax, hours, delivery, website copy, financials, and rewards.",
			"Bluetooth printer setup with customer and store copies.",
			"Payment processor panel (under construction)."
		]
	}
];
function AdminPatches() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "patches-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "page-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shop-brand-kicker",
					children: "Admin"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Patches" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ed-sub",
					children: "What landed in the shop, newest first. This is the running log of features we added."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "patch-list",
			children: PATCHES.map((patch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "page-card patch-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shop-brand-kicker",
						children: patch.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: patch.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: patch.added.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line)) })
				]
			}, patch.id))
		})]
	});
}
//#endregion
export { AdminPatches as component };
