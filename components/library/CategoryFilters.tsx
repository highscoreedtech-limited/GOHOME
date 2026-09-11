"use client";

import { cn } from "@/lib/utils";

/**
 * Category filters rendered as a row of rounded pills. The active pill is filled
 * gold; inactive pills are outlined. Scrolls horizontally when the pills overflow
 * (many categories).
 */
export function CategoryFilters({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1"
    >
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              isActive
                ? "bg-brand-gold font-semibold text-white"
                : "border border-black/10 text-brand-muted hover:border-brand-gold/40 hover:text-brand-ink",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
