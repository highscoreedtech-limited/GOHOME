import type { VideoItem } from "@/types";
import { videos, VIDEO_CATEGORIES } from "@/data/videos";

/**
 * Data-access layer for the Videos page. The UI imports ONLY from here (never
 * from `data/videos` directly), so the local array can later be swapped for an
 * API/DB response of the same shape without touching any component.
 */

export { VIDEO_CATEGORIES };

/** All videos, newest first (by `publishedAt`). */
export function getAllVideos(): VideoItem[] {
  return [...videos].sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
  );
}

/** Categories that actually contain at least one video, plus "All". */
export function getActiveVideoCategories(): string[] {
  const present = new Set(videos.map((v) => v.category));
  return VIDEO_CATEGORIES.filter((c) => c === "All" || present.has(c));
}

/** Filter by category. "All" (or empty) returns everything. */
export function filterVideosByCategory(
  items: VideoItem[],
  category: string,
): VideoItem[] {
  if (!category || category === "All") return items;
  return items.filter((v) => v.category === category);
}
