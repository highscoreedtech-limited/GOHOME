"use client";

import { cn } from "@/lib/utils";

/**
 * Category tabs rendered as a segmented control: a pill group inside a light
 * container. The active tab is filled white with a subtle shadow; inactive tabs
 * are plain text. Scrolls horizontally when the tabs overflow (many categories).
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
      className="flex gap-1 overflow-x-auto rounded-full bg-brand-ink/[0.06] p-1"
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
              "shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              isActive
                ? "bg-white text-brand-ink shadow-sm"
                : "text-brand-muted hover:text-brand-ink",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
