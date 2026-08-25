"use client";

import { cn } from "@/lib/utils";

/**
 * Horizontal, scrollable category filter chips.
 * On mobile the row scrolls horizontally (touch), on desktop it wraps.
 */
export function CategoryFilters({
  categories,
  active,
  onChange,
  counts,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  counts?: Record<string, number>;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {categories.map((category) => {
        const isActive = category === active;
        const count = counts?.[category];
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              "shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              isActive
                ? "border-brand-gold bg-brand-gold text-brand-dark"
                : "border-black/10 bg-white text-brand-ink/80 hover:border-brand-gold/50 hover:text-brand-ink",
            )}
          >
            {category}
            {typeof count === "number" && category !== "All" && (
              <span
                className={cn(
                  "ml-1.5 text-xs",
                  isActive ? "text-brand-dark/60" : "text-brand-muted",
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
