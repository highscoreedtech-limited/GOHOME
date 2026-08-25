"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Controlled search input for the Messages Library. */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search messages, books, authors, topics...",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search the Messages Library"
        className="w-full rounded-full border border-black/10 bg-white py-3.5 pl-12 pr-11 text-brand-ink shadow-sm outline-none transition-colors placeholder:text-brand-muted/70 focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/40"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-black/5 hover:text-brand-ink"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
