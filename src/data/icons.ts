import type { LucideIcon } from "lucide-react";
import {
  Beef,
  CakeSlice,
  CookingPot,
  CupSoda,
  Drumstick,
  Flame,
  Ham,
  Layers,
  Pizza,
  Salad,
  Sandwich,
  Scroll,
  Snowflake,
  Soup,
  Utensils,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
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
  beverages: CupSoda,
};

export const ICON_CHOICES: { id: string; label: string }[] = [
  { id: "pizza", label: "Pizza" },
  { id: "gourmet", label: "Flame" },
  { id: "appetizers", label: "Utensils" },
  { id: "salads", label: "Salad" },
  { id: "sides", label: "Soup" },
  { id: "wings", label: "Wings" },
  { id: "turnovers", label: "Layers" },
  { id: "sandwiches", label: "Sandwich" },
  { id: "hot-subs", label: "Ham" },
  { id: "cold-subs", label: "Snowflake" },
  { id: "steak-subs", label: "Steak" },
  { id: "burgers", label: "Burger" },
  { id: "wraps", label: "Wrap" },
  { id: "gyros", label: "Gyro" },
  { id: "pasta", label: "Pasta" },
  { id: "desserts", label: "Dessert" },
  { id: "beverages", label: "Drink" },
];

export function iconFor(id: string): LucideIcon {
  return CATEGORY_ICONS[id] ?? Pizza;
}
