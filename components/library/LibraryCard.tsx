"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LibraryItem } from "@/types";
import { hasChapters } from "@/lib/library";
import { BookCover } from "./BookCover";
import { BookmarkButton } from "./BookmarkButton";

/**
 * The unified library card used throughout the grid.
 *
 * Anatomy (top to bottom):
 *  - themed thumbnail (16:10) with a category pill overlaid top-left and a
 *    circular bookmark button top-right
 *  - title (2-line clamp, stretched link to the message)
 *  - author byline
 *  - one-line excerpt
 *  - footer (meta + "Read Now") separated by a hairline rule
 */
export function LibraryCard({ item }: { item: LibraryItem }) {
  const chapterCount = hasChapters(item) ? item.chapters!.length : 0;
  const meta = [
    item.estimatedReadingTime,
    chapterCount > 0
      ? `${chapterCount} chapters`
      : item.pages
        ? `${item.pages} pages`
        : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(0,0,0,0.45)] focus-within:ring-2 focus-within:ring-brand-gold"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <BookCover
          src={item.coverImage}
          title={item.title}
          category={item.category}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand-dark/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-goldLight backdrop-blur">
          {item.category}
        </span>
        <div className="absolute right-3 top-3 z-10">
          <BookmarkButton id={item.id} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-bold leading-snug text-brand-ink">
          <Link
            href={`/messages/${item.id}`}
            className="line-clamp-2 transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-brand-gold"
          >
            {item.title}
          </Link>
        </h3>

        <p className="mt-1.5 text-xs text-brand-muted">by {item.author}</p>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-brand-ink/70">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/5 pt-3.5">
          {meta && <span className="text-xs text-brand-muted">{meta}</span>}
          <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-goldDark">
            Read Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
