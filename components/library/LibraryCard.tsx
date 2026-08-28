"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookText, ArrowRight } from "lucide-react";
import type { LibraryItem } from "@/types";
import { hasChapters } from "@/lib/library";
import { Pill } from "@/components/ui/Pill";
import { BookCover } from "./BookCover";
import { BookmarkButton } from "./BookmarkButton";

/**
 * Grid card for a library resource.
 * A stretched link over the card opens the details page; the bookmark button
 * and the "Read Now" shortcut sit above it (z-10) so they stay clickable
 * without nesting anchors.
 */
export function LibraryCard({ item }: { item: LibraryItem }) {
  const chapterCount = hasChapters(item) ? item.chapters!.length : 0;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-card"
    >
      {/* Cover */}
      <div className="relative">
        <BookCover
          src={item.coverImage}
          title={item.title}
          category={item.category}
          className="aspect-[3/4] w-full"
        />
        <div className="absolute left-3 top-3">
          <Pill>{item.category}</Pill>
        </div>
        <div className="absolute right-3 top-3 z-10">
          <BookmarkButton id={item.id} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-base font-bold leading-snug text-brand-ink">
          {/* Stretched link → details page */}
          <Link
            href={`/messages/${item.id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-brand-gold"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-brand-muted">by {item.author}</p>

        <p className="mt-2 line-clamp-2 text-sm text-brand-ink/70">
          {item.description}
        </p>

        {/* Optional metadata, only render fields that exist */}
        {(item.estimatedReadingTime || item.pages || chapterCount > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-muted">
            {item.estimatedReadingTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {item.estimatedReadingTime}
              </span>
            )}
            {item.pages && (
              <span className="inline-flex items-center gap-1">
                <BookText className="h-3.5 w-3.5" />
                {item.pages} pages
              </span>
            )}
            {!item.pages && chapterCount > 0 && (
              <span className="inline-flex items-center gap-1">
                <BookText className="h-3.5 w-3.5" />
                {chapterCount} chapters
              </span>
            )}
          </div>
        )}

        {/* Read Now shortcut (above the stretched link) */}
        <div className="mt-4 pt-1">
          <Link
            href={`/messages/${item.id}/read`}
            className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold transition-colors hover:text-brand-goldDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            Read Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
