import type { MenuItem } from "@/data/menu";

const ROOT = "/food";

function src(key: string) {
  return `${ROOT}/${key}.webp`;
}

const CAT_FALLBACK: Record<string, string> = {
  pizza: "cheese-pizza",
  gourmet: "white-pizza",
  appetizers: "fries",
  salads: "tossed-salad",
  sides: "garlic-bread",
  wings: "wings",
  turnovers: "stromboli",
  sandwiches: "turkey-sandwich",
  clubs: "club",
  "hot-subs": "chicken-parm-sub",
  "cold-subs": "italian-sub",
  "steak-subs": "cheesesteak",
  burgers: "hamburger",
  wraps: "chicken-wrap",
  gyros: "gyro",
  pasta: "pasta-marinara",
  desserts: "cheesecake",
  beverages: "soda",
};

type Rule = { key: string; test: (h: string, cat: string) => boolean };

const RULES: Rule[] = [
  { key: "apple-juice", test: (h) => h.includes("apple juice") },
  { key: "iced-tea", test: (h) => h.includes("iced tea") || h.includes("ice tea") || h.includes("brisk") || h.includes("pure leaf") },
  { key: "soda", test: (h, c) => c === "beverages" || /\bsoda\b/.test(h) },

  { key: "cannoli", test: (h) => h.includes("cannoli") },
  { key: "chocolate-cake", test: (h) => h.includes("chocolate") && h.includes("cake") },
  { key: "cheesecake", test: (h) => h.includes("cheesecake") },

  { key: "panzarotti", test: (h) => h.includes("panzarotti") },
  { key: "calzone", test: (h) => h.includes("calzone") },
  { key: "stromboli", test: (h) => h.includes("stromboli") },

  { key: "gyro", test: (h) => h.includes("gyro") },
  { key: "fajita-wrap", test: (h) => h.includes("fajita") },
  { key: "chicken-wrap", test: (h, c) => c === "wraps" || h.includes("wrap") },

  { key: "spaghetti-clams", test: (h) => h.includes("clam") },
  { key: "manicotti", test: (h) => h.includes("manicotti") },
  { key: "ravioli", test: (h) => h.includes("ravioli") },
  { key: "baked-ziti", test: (h) => h.includes("baked ziti") },
  { key: "spaghetti-meatballs", test: (h) => h.includes("meatball") && (h.includes("pasta") || h.includes("spaghetti") || h.includes("ziti")) },
  { key: "chicken-parm-pasta", test: (h, c) => c === "pasta" && (h.includes("parmigiana") || h.includes("parm")) },
  { key: "pasta-marinara", test: (h, c) => c === "pasta" || (h.includes("spaghetti") && !h.includes("sub")) },

  { key: "double-cheeseburger", test: (h) => h.includes("double") && h.includes("burger") },
  { key: "bacon-cheeseburger", test: (h) => h.includes("bacon") && h.includes("burger") },
  { key: "cheeseburger", test: (h) => h.includes("cheeseburger") || (h.includes("burger") && (h.includes("cheese") || h.includes("pizza burger") || h.includes("western"))) },
  { key: "hamburger", test: (h) => h.includes("hamburger") || h.includes("burger") },

  { key: "pizza-steak", test: (h) => h.includes("pizza steak") },
  { key: "chicken-cheesesteak", test: (h) => h.includes("chicken") && (h.includes("cheesesteak") || h.includes("chicken steak") || h.includes("chicken cheesesteak")) },
  { key: "veggie-sub", test: (h, c) => h.includes("veggie sub") || (c === "steak-subs" && h.includes("veggie")) },
  { key: "cheesesteak", test: (h) => h.includes("cheesesteak") || (h.includes("steak") && h.includes("sub")) },

  { key: "italian-sub", test: (h) => h.includes("italian") && h.includes("sub") },
  { key: "meatball-sub", test: (h) => h.includes("meatball") && h.includes("sub") },
  { key: "sausage-sub", test: (h) => h.includes("sausage") && h.includes("sub") },
  { key: "eggplant-sub", test: (h) => h.includes("eggplant") && (h.includes("sub") || h.includes("hot")) },
  { key: "chicken-parm-sub", test: (h, c) => c === "hot-subs" },

  { key: "turkey-sandwich", test: (h, c) => h.includes("turkey") && (c === "cold-subs" || h.includes("sub")) },
  { key: "tuna-sandwich", test: (h, c) => h.includes("tuna") && (c === "cold-subs" || h.includes("sub")) },
  { key: "ham-sandwich", test: (h, c) => (h.includes("ham") || h.includes("salami")) && (c === "cold-subs" || h.includes("sub")) },

  { key: "blt", test: (h) => /\bblt\b/.test(h) },
  { key: "club", test: (h, c) => c === "clubs" || h.includes("club") },
  { key: "chicken-sandwich", test: (h, c) => c === "sandwiches" && h.includes("chicken") },
  { key: "tuna-sandwich", test: (h, c) => (c === "sandwiches" || h.includes("sandwich")) && h.includes("tuna") },
  { key: "ham-sandwich", test: (h, c) => (c === "sandwiches" || h.includes("sandwich")) && h.includes("ham") },
  { key: "turkey-sandwich", test: (h, c) => c === "sandwiches" || h.includes("sandwich") },

  { key: "nuggets", test: (h) => h.includes("nugget") },
  { key: "wings", test: (h) => h.includes("wing") },
  { key: "buffalo-tenders", test: (h) => h.includes("buffalo") && (h.includes("tender") || h.includes("finger")) },
  { key: "tenders", test: (h) => (h.includes("tender") || h.includes("finger")) && !h.includes("salad") },
  { key: "pizza-bread", test: (h) => h.includes("pizza bread") },
  { key: "poppers", test: (h) => h.includes("popper") },
  { key: "mozz-sticks", test: (h) => h.includes("mozzarella stick") },
  { key: "loaded-fries", test: (h) => (h.includes("south end") && h.includes("fries")) || h.includes("buffalo fries") },
  { key: "cheese-fries", test: (h) => h.includes("cheesy") && h.includes("fries") },
  { key: "curly-fries", test: (h) => h.includes("curly") },
  { key: "onion-rings", test: (h) => h.includes("onion ring") },
  { key: "fries", test: (h) => h.includes("fries") || h.includes("french fry") },

  { key: "cheesy-garlic-bread", test: (h) => h.includes("cheesy garlic") || (h.includes("garlic bread") && h.includes("cheese")) },
  { key: "garlic-bread", test: (h) => h.includes("garlic bread") },
  { key: "sausage-link", test: (h, c) => c === "sides" && h.includes("sausage") },
  { key: "meatballs", test: (h, c) => c === "sides" && h.includes("meatball") },
  { key: "pasta-marinara", test: (h, c) => c === "sides" && h.includes("pasta") },

  { key: "antipasto", test: (h) => h.includes("antipasto") },
  { key: "greek-salad", test: (h) => h.includes("greek") && h.includes("salad") },
  { key: "chicken-caesar", test: (h) => h.includes("salad") && (h.includes("chicken") || h.includes("blackened") || h.includes("cajun") || h.includes("tender")) },
  { key: "caesar-salad", test: (h) => h.includes("caesar") },
  { key: "tuna-salad", test: (h) => h.includes("tuna") && h.includes("salad") },
  { key: "chef-salad", test: (h) => h.includes("chef") || (h.includes("turkey") && h.includes("salad")) },
  { key: "tossed-salad", test: (h, c) => c === "salads" || h.includes("salad") },

  { key: "cbr-pizza", test: (h) => h.includes("c.b.r") || /\bcbr\b/.test(h) || (h.includes("ranch") && h.includes("pizza")) },
  { key: "buffalo-chicken-pizza", test: (h) => h.includes("buffalo") && h.includes("pizza") },
  { key: "bbq-chicken-pizza", test: (h) => h.includes("bbq") && h.includes("pizza") },
  { key: "hawaiian-pizza", test: (h) => h.includes("hawaiian") || h.includes("pineapple") },
  { key: "mexicana-pizza", test: (h) => h.includes("mexicana") || (h.includes("jalapeno") && h.includes("pizza")) },
  { key: "greek-pizza", test: (h) => h.includes("greek") && h.includes("pizza") },
  { key: "white-pizza", test: (h) => (h.includes("white") && h.includes("pizza")) || h.includes("richie") },
  { key: "italian-pizza", test: (h) => h.includes("bonzano") || (h.includes("capicola") && h.includes("pizza")) },
  { key: "meat-lovers-pizza", test: (h) => h.includes("meat lover") },
  { key: "veggie-pizza", test: (h) => h.includes("veggie pizza") },
  { key: "chicken-pizza", test: (h) => h.includes("chicken") && h.includes("pizza") },
  { key: "pepperoni-pizza", test: (h) => h.includes("pepperoni") && h.includes("pizza") },
  { key: "sausage-pizza", test: (h) => h.includes("sausage") && h.includes("pizza") },
  { key: "beef-pizza", test: (h) => h.includes("beef") && h.includes("pizza") },
  { key: "ham-pizza", test: (h) => h.includes("ham") && h.includes("pizza") },
  { key: "bacon-pizza", test: (h) => h.includes("bacon") && h.includes("pizza") },
  { key: "mushroom-pizza", test: (h) => h.includes("mushroom") && h.includes("pizza") },
  { key: "peppers-pizza", test: (h) => h.includes("green pepper") || (h.includes("pepper") && h.includes("pizza") && !h.includes("pepperoni")) },
  { key: "olive-pizza", test: (h) => h.includes("olive") && h.includes("pizza") },
  { key: "onion-pizza", test: (h) => h.includes("onion") && h.includes("pizza") },
  { key: "spinach-pizza", test: (h) => h.includes("spinach") && h.includes("pizza") },
  { key: "broccoli-pizza", test: (h) => h.includes("broccoli") && h.includes("pizza") },
  { key: "cheese-pizza", test: (h, c) => c === "pizza" || c === "gourmet" || h.includes("pizza") },
];

function haystack(item: Pick<MenuItem, "name" | "description">, catId?: string) {
  return `${item.name} ${item.description ?? ""} ${catId ?? ""}`.toLowerCase();
}

export function placeholderPhoto(item: Pick<MenuItem, "name" | "description">, catId?: string): string {
  const h = haystack(item, catId);
  const cat = (catId ?? "").toLowerCase();
  for (const rule of RULES) {
    if (rule.test(h, cat)) return src(rule.key);
  }
  return src(CAT_FALLBACK[cat] ?? "cheese-pizza");
}

export function itemPhoto(item: Pick<MenuItem, "name" | "description" | "image">, catId?: string): string {
  const custom = String(item.image ?? "").trim();
  if (custom) return custom;
  return placeholderPhoto(item, catId);
}
