"use client";

import { useMemo, useState } from "react";
import { Bookmark, SearchX, Sparkles } from "lucide-react";
import {
  getAllItems,
  getActiveCategories,
  getFeaturedItems,
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
import { FeaturedLibraryCard } from "./FeaturedLibraryCard";
import { ContinueReading } from "./ContinueReading";

/**
 * The Messages Library page body: an editorial hero (title + count), a toolbar
 * (category pills + search), a featured spotlight, and a grid of library cards.
 * All browsing happens client-side against the local dataset via the
 * data-access layer (unchanged).
 */
export function MessagesLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const { bookmarks } = useBookmarks();

  const allItems = getAllItems();
  const total = allItems.length;
  // Category pills: real categories plus a trailing "Saved" view.
  const tabs = useMemo(() => [...getActiveCategories(), "Saved"], []);

  // The default browse state (no filter, no search) shows the spotlight.
  const isDefault = category === "All" && !query.trim();
  const featured = useMemo(
    () => (isDefault ? getFeaturedItems()[0] : undefined),
    [isDefault],
  );

  const results = useMemo(() => {
    let items = allItems;

    // Scope: a real category, or the Saved (bookmarked) view.
    if (category === "Saved") {
      items = items.filter((i) => bookmarks.includes(i.id));
    } else {
      items = filterByCategory(items, category);
    }

    items = searchItems(items, query);

    // Newest first.
    const sorted = [...items].sort((a, b) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
    );
    return sorted;
  }, [allItems, bookmarks, category, query]);

  // When the spotlight is shown, keep it out of the grid below it.
  const gridItems = featured
    ? results.filter((i) => i.id !== featured.id)
    : results;

  return (
    <div className="bg-brand-cream pb-16 sm:pb-20">
      <Container>
        {/* Hero */}
        <Reveal className="pt-12 sm:pt-16">
          <p className="eyebrow text-brand-goldDark">
            The Library · {total} Messages
          </p>
          <h1 className="mt-3.5 max-w-2xl font-serif text-4xl font-bold leading-[1.1] text-brand-ink sm:text-5xl">
            Words to dwell in, one message at a time
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-muted">
            Prayers, teachings and reflections from the New Jerusalem City
            community, written to be read slowly, and returned to often.
          </p>
        </Reveal>

        {/* Toolbar: category pills + search */}
        <Reveal
          delay={0.05}
          className="mt-9 flex flex-col gap-4 border-t border-black/10 pt-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="min-w-0">
            <CategoryFilters
              categories={tabs}
              active={category}
              onChange={setCategory}
            />
          </div>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search the library..."
            className="lg:w-72 lg:shrink-0"
          />
        </Reveal>

        {/* Continue Reading (self-hides when there is no history) */}
        <div className="mt-10 empty:mt-0">
          <ContinueReading />
        </div>

        {/* Featured spotlight */}
        {featured && (
          <Reveal delay={0.1} className="mt-10">
            <FeaturedLibraryCard item={featured} />
          </Reveal>
        )}

        {/* Section divider */}
        {gridItems.length > 0 && (
          <Reveal className="mb-6 mt-14 flex items-center gap-4">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
              {isDefault
                ? "More from the Library"
                : `${gridItems.length} ${gridItems.length === 1 ? "message" : "messages"}`}
            </span>
            <span className="h-px flex-1 bg-black/10" />
          </Reveal>
        )}

        {/* Grid */}
        {gridItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 min-[560px]:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i * 0.04, 0.3)}>
                <LibraryCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          !featured && (
            <div className="mt-12">
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
          )
        )}
      </Container>
    </div>
  );
}
