import {
  Flame,
  Fish,
  Mountain,
  Church,
  Sunrise,
  HandHeart,
  Sprout,
  Sparkles,
  Users,
  Compass,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

/**
 * Per-category visual theme, shared by the card thumbnail placeholder
 * (BookCover) and the card's category label (LibraryCard), so a category's
 * color and icon stay consistent across the grid.
 *
 * Warm, earthy tones only, to sit within the existing cream/gold brand.
 */
export interface CategoryTheme {
  gradient: string; // tailwind gradient stops for the placeholder
  label: string; // tailwind text color for the category label
  Icon: LucideIcon;
}

const THEMES: Record<string, CategoryTheme> = {
  Prayer: { gradient: "from-amber-400 to-yellow-600", label: "text-amber-700", Icon: Flame },
  Faith: { gradient: "from-orange-400 to-amber-700", label: "text-orange-800", Icon: Fish },
  "Bible Study": { gradient: "from-lime-500 to-emerald-700", label: "text-lime-700", Icon: Mountain },
  Devotionals: { gradient: "from-amber-300 to-orange-600", label: "text-amber-700", Icon: Sunrise },
  "Christian Living": { gradient: "from-rose-400 to-amber-700", label: "text-rose-700", Icon: HandHeart },
  "Spiritual Growth": { gradient: "from-emerald-400 to-green-700", label: "text-emerald-700", Icon: Sprout },
  Youth: { gradient: "from-yellow-400 to-orange-600", label: "text-orange-700", Icon: Sparkles },
  Family: { gradient: "from-amber-400 to-stone-600", label: "text-amber-800", Icon: Users },
  Leadership: { gradient: "from-stone-400 to-stone-700", label: "text-stone-600", Icon: Compass },
  "New Jerusalem City": { gradient: "from-stone-600 to-brand-darker", label: "text-brand-goldDark", Icon: Church },
};

const FALLBACK: CategoryTheme = {
  gradient: "from-brand-gold to-brand-goldDark",
  label: "text-brand-gold",
  Icon: BookOpen,
};

export function getCategoryTheme(category: string): CategoryTheme {
  return THEMES[category] ?? FALLBACK;
}
