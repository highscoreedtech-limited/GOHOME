"use client";

import { useMemo, useState } from "react";
import { Bookmark, SearchX, Sparkles, ChevronDown } from "lucide-react";
import {
  getAllItems,
  getActiveCategories,
  filterByCategory,
  searchItems,
} from "@/lib/library";
import { useBookmarks } from "@/lib/reading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { EmptyState } from "@/components/ui/States";
import { SearchBar } from "./SearchBar";
import { CategoryFilters } from "./CategoryFilters";
import { LibraryCard } from "./LibraryCard";
import { ContinueReading } from "./ContinueReading";

type SortKey = "newest" | "oldest" | "title";

/**
 * The interactive body of the Messages Library page: a header row, a toolbar
 * (search + category tabs + sort), and one uniform grid of library cards.
 * All browsing happens client-side against the local dataset via the
 * data-access layer (unchanged).
 */
export function MessagesLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("newest");

  const { bookmarks } = useBookmarks();

  const allItems = getAllItems();
  // Category tabs: real categories plus a trailing "Saved" view.
  const tabs = useMemo(() => [...getActiveCategories(), "Saved"], []);

  const results = useMemo(() => {
    let items = allItems;

    // Scope: a real category, or the Saved (bookmarked) view.
    if (category === "Saved") {
      items = items.filter((i) => bookmarks.includes(i.id));
    } else {
      items = filterByCategory(items, category);
    }

    items = searchItems(items, query);

    // Sort.
    const sorted = [...items];
    if (sort === "newest") {
      sorted.sort((a, b) =>
        (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
      );
    } else if (sort === "oldest") {
      sorted.sort((a, b) =>
        (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""),
      );
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [allItems, bookmarks, category, query, sort]);

  return (
    <div className="bg-brand-cream py-12 sm:py-16">
      <Container>
        {/* Continue Reading (self-hides when there is no history) */}
        <div className="mb-12 empty:mb-0">
          <ContinueReading />
        </div>

        {/* Header row */}
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-bold text-brand-ink sm:text-3xl">
            Explore the Library
          </h2>
          <span className="shrink-0 text-sm text-brand-muted">
            {results.length} {results.length === 1 ? "message" : "messages"}
          </span>
        </Reveal>

        {/* Toolbar: search + category tabs + sort */}
        <Reveal
          delay={0.05}
          className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center"
        >
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search messages, authors..."
            className="lg:w-72 lg:shrink-0"
          />

          <div className="min-w-0 lg:flex-1">
            <CategoryFilters
              categories={tabs}
              active={category}
              onChange={setCategory}
            />
          </div>

          <SortControl value={sort} onChange={setSort} />
        </Reveal>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {results.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i * 0.04, 0.3)}>
                <LibraryCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            {category === "Saved" ? (
              <EmptyState
                icon={Bookmark}
                title="No saved messages yet"
                message="Tap the bookmark on any message to save it here for later."
              />
            ) : query.trim() ? (
              <EmptyState
                icon={SearchX}
                title="No messages found"
                message="Try searching for another title, author, or topic."
              />
            ) : (
              <EmptyState
                icon={Sparkles}
                title="Nothing here yet"
                message="There are no messages in this category right now."
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

/** "Sort: Newest" control, a styled native select with a chevron. */
function SortControl({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <div className="relative lg:ml-auto lg:shrink-0">
      <label className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white py-2.5 pl-4 pr-9 text-sm text-brand-ink shadow-sm focus-within:ring-2 focus-within:ring-brand-gold">
        <span className="text-brand-muted">Sort:</span>
        <select
          aria-label="Sort messages"
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="cursor-pointer appearance-none bg-transparent pr-1 font-medium outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </label>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
    </div>
  );
}
