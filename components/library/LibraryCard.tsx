"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LibraryItem } from "@/types";
import { hasChapters } from "@/lib/library";
import { BookCover } from "./BookCover";
import { BookmarkButton } from "./BookmarkButton";
import { getCategoryTheme } from "./categoryTheme";
import { cn } from "@/lib/utils";

/**
 * The single, unified library card used everywhere in the grid.
 *
 * Anatomy (top to bottom):
 *  - 4:3 thumbnail with a circular bookmark button overlaid top-right
 *  - category label (color-coded text only, no badge)
 *  - title (2-line clamp)
 *  - author byline (muted)
 *  - meta row (read time and chapters, dot-separated, muted)
 *
 * No description and no "Read Now" button: the whole card is a link to the
 * message page (stretched link), with a hover elevation and a focus ring.
 */
export function LibraryCard({ item }: { item: LibraryItem }) {
  const chapterCount = hasChapters(item) ? item.chapters!.length : 0;
  const theme = getCategoryTheme(item.category);

  // Compact meta, e.g. "12 min · 3 ch." (only fields that exist).
  const meta = [
    item.estimatedReadingTime?.replace(/\s*read$/i, ""),
    chapterCount > 0
      ? `${chapterCount} ch.`
      : item.pages
        ? `${item.pages} pages`
        : null,
  ].filter(Boolean) as string[];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(0,0,0,0.45)] focus-within:ring-2 focus-within:ring-brand-gold"
    >
      {/* Thumbnail (4:3) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <BookCover
          src={item.coverImage}
          title={item.title}
          category={item.category}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute right-3 top-3 z-10">
          <BookmarkButton id={item.id} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p
          className={cn(
            "text-[11px] font-bold uppercase tracking-wider",
            theme.label,
          )}
        >
          {item.category}
        </p>

        <h3 className="mt-1.5 font-serif text-base font-bold leading-snug text-brand-ink">
          <Link
            href={`/messages/${item.id}`}
            className="line-clamp-2 transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-brand-gold"
          >
            {item.title}
          </Link>
        </h3>

        <p className="mt-1 text-xs text-brand-muted">by {item.author}</p>

        {meta.length > 0 && (
          <p className="mt-auto pt-3 text-xs text-brand-muted">
            {meta.join(" · ")}
          </p>
        )}
      </div>
    </motion.article>
  );
}
