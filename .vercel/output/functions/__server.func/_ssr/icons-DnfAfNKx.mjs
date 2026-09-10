import { F as Layers, K as CookingPot, R as Ham, U as Drumstick, W as CupSoda, _ as Scroll, a as Utensils, d as Soup, f as Snowflake, it as Beef, n as Wheat, o as UtensilsCrossed, tt as CakeSlice, v as Sandwich, w as Pizza, y as Salad, z as Flame } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/icons-DnfAfNKx.js
var CATEGORY_ICONS = {
	pizza: Pizza,
	gourmet: Flame,
	appetizers: Utensils,
	salads: Salad,
	sides: Soup,
	wings: Drumstick,
	turnovers: Layers,
	sandwiches: Sandwich,
	clubs: Layers,
	"hot-subs": Ham,
	"cold-subs": Snowflake,
	"steak-subs": Beef,
	burgers: UtensilsCrossed,
	wraps: Scroll,
	gyros: Wheat,
	pasta: CookingPot,
	desserts: CakeSlice,
	beverages: CupSoda
};
var ICON_CHOICES = [
	{
		id: "pizza",
		label: "Pizza"
	},
	{
		id: "gourmet",
		label: "Flame"
	},
	{
		id: "appetizers",
		label: "Utensils"
	},
	{
		id: "salads",
		label: "Salad"
	},
	{
		id: "sides",
		label: "Soup"
	},
	{
		id: "wings",
		label: "Wings"
	},
	{
		id: "turnovers",
		label: "Layers"
	},
	{
		id: "sandwiches",
		label: "Sandwich"
	},
	{
		id: "hot-subs",
		label: "Ham"
	},
	{
		id: "cold-subs",
		label: "Snowflake"
	},
	{
		id: "steak-subs",
		label: "Steak"
	},
	{
		id: "burgers",
		label: "Burger"
	},
	{
		id: "wraps",
		label: "Wrap"
	},
	{
		id: "gyros",
		label: "Gyro"
	},
	{
		id: "pasta",
		label: "Pasta"
	},
	{
		id: "desserts",
		label: "Dessert"
	},
	{
		id: "beverages",
		label: "Drink"
	}
];
function iconFor(id) {
	return CATEGORY_ICONS[id] ?? Pizza;
}
//#endregion
export { ICON_CHOICES as n, iconFor as r, CATEGORY_ICONS as t };
