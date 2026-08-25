import type { LibraryItem } from "@/types";
import { libraryItems, CATEGORIES } from "@/data/library";

/**
 * Data-access layer for the Messages Library.
 *
 * The UI imports ONLY from here (never from `data/library` directly), so the
 * local array can later be replaced by an API/DB call — make these functions
 * async and swap the body — without changing any component.
 */

export { CATEGORIES };

/** All resources. */
export function getAllItems(): LibraryItem[] {
  return libraryItems;
}

/** A single resource by id (or undefined). */
export function getItemById(id: string): LibraryItem | undefined {
  return libraryItems.find((item) => item.id === id);
}

/** Featured resources for the "Featured" rail. */
export function getFeaturedItems(): LibraryItem[] {
  return libraryItems.filter((item) => item.featured);
}

/** True when a resource has a Table of Contents (chapters). */
export function hasChapters(item: LibraryItem): boolean {
  return Array.isArray(item.chapters) && item.chapters.length > 0;
}

/** Categories that actually contain at least one resource, plus "All". */
export function getActiveCategories(): string[] {
  const present = new Set(libraryItems.map((i) => i.category));
  return CATEGORIES.filter((c) => c === "All" || present.has(c));
}

/** Count of resources per category (excluding the synthetic "All"). */
export function getCategoryCounts(): Record<string, number> {
  return libraryItems.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});
}

/** Filter by category. "All" (or empty) returns everything. */
export function filterByCategory(
  items: LibraryItem[],
  category: string,
): LibraryItem[] {
  if (!category || category === "All") return items;
  return items.filter((item) => item.category === category);
}

/**
 * Search across title, author, description, category and tags.
 * Case-insensitive, matches on any whitespace-separated term.
 */
export function searchItems(items: LibraryItem[], query: string): LibraryItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  const terms = q.split(/\s+/);

  return items.filter((item) => {
    const haystack = [
      item.title,
      item.author,
      item.description,
      item.category,
      ...item.tags,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

/**
 * The full readable text of a resource as an ordered list of blocks,
 * used by the reader. Chaptered resources yield one block per chapter;
 * continuous resources yield a single block.
 */
export function getReadableBlocks(
  item: LibraryItem,
): { id: string; title?: string; content: string }[] {
  if (hasChapters(item)) {
    return item.chapters!.map((c) => ({
      id: c.id,
      title: c.title,
      content: c.content,
    }));
  }
  if (item.content) {
    return [{ id: "content", content: item.content }];
  }
  return [];
}
