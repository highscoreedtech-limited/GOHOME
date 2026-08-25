"use client";

import { useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, SearchX, Sparkles } from "lucide-react";
import {
  getAllItems,
  getFeaturedItems,
  getActiveCategories,
  getCategoryCounts,
  filterByCategory,
  searchItems,
} from "@/lib/library";
import { useBookmarks } from "@/lib/reading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { EmptyState } from "@/components/ui/States";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { CategoryFilters } from "./CategoryFilters";
import { LibraryCard } from "./LibraryCard";
import { FeaturedCard } from "./FeaturedCard";
import { ContinueReading } from "./ContinueReading";

/**
 * The interactive body of the Messages Library page.
 * All browsing (search, category filter, saved view) happens client-side
 * against the local dataset via the data-access layer.
 */
export function MessagesLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [showSaved, setShowSaved] = useState(false);

  const { bookmarks } = useBookmarks();

  const allItems = getAllItems();
  const featured = getFeaturedItems();
  const categories = getActiveCategories();
  const counts = getCategoryCounts();

  const isDefaultView =
    !query.trim() && category === "All" && !showSaved;

  // Results pipeline: saved-scope -> category -> search.
  const results = useMemo(() => {
    let items = allItems;
    if (showSaved) items = items.filter((i) => bookmarks.includes(i.id));
    items = filterByCategory(items, category);
    items = searchItems(items, query);
    return items;
  }, [allItems, bookmarks, showSaved, category, query]);

  const gridTitle = showSaved
    ? "Saved Messages"
    : query.trim()
      ? "Search Results"
      : "Explore the Library";

  return (
    <div className="bg-brand-cream py-12 sm:py-16">
      <Container>
        {/* Search + saved toggle */}
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={query} onChange={setQuery} className="flex-1" />
          <button
            type="button"
            onClick={() => setShowSaved((s) => !s)}
            aria-pressed={showSaved}
            className={cn(
              "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              showSaved
                ? "border-brand-gold bg-brand-gold text-brand-dark"
                : "border-black/10 bg-white text-brand-ink/80 hover:border-brand-gold/50",
            )}
          >
            {showSaved ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            Saved
            {bookmarks.length > 0 && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  showSaved ? "bg-brand-dark/15" : "bg-brand-gold/15 text-brand-gold",
                )}
              >
                {bookmarks.length}
              </span>
            )}
          </button>
        </Reveal>

        {/* Category filters */}
        <Reveal delay={0.05} className="mt-5">
          <CategoryFilters
            categories={categories}
            active={category}
            onChange={setCategory}
            counts={counts}
          />
        </Reveal>

        {/* Continue Reading (self-hides when no history) */}
        <div className="mt-12">
          <ContinueReading />
        </div>

        {/* Featured — only in the default browse view */}
        {isDefaultView && featured.length > 0 && (
          <section aria-label="Featured messages" className="mt-12">
            <Reveal>
              <SectionHeader title="Featured" />
            </Reveal>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {featured.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.05}>
                  <FeaturedCard item={item} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Grid */}
        <section aria-label={gridTitle} className="mt-12">
          <Reveal className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-brand-ink sm:text-3xl">
              {gridTitle}
            </h2>
            <span className="shrink-0 text-sm text-brand-muted">
              {results.length}{" "}
              {results.length === 1 ? "message" : "messages"}
            </span>
          </Reveal>

          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-4 min-[360px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {results.map((item, i) => (
                <Reveal key={item.id} delay={Math.min(i * 0.04, 0.3)}>
                  <LibraryCard item={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              {showSaved ? (
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
        </section>
      </Container>
    </div>
  );
}
