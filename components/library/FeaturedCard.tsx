"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookText, ArrowRight } from "lucide-react";
import type { LibraryItem } from "@/types";
import { hasChapters } from "@/lib/library";
import { Pill } from "@/components/ui/Pill";
import { BookCover } from "./BookCover";
import { BookmarkButton } from "./BookmarkButton";

/** Larger, horizontal card for the Featured rail. */
export function FeaturedCard({ item }: { item: LibraryItem }) {
  const chapterCount = hasChapters(item) ? item.chapters!.length : 0;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex h-full gap-5 overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-card sm:p-5"
    >
      <Link
        href={`/messages/${item.id}`}
        className="relative w-28 shrink-0 sm:w-32"
        aria-label={`${item.title} details`}
      >
        <BookCover
          src={item.coverImage}
          title={item.title}
          category={item.category}
          className="aspect-[3/4] w-full rounded-xl"
          sizes="128px"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <Pill>{item.category}</Pill>
          <BookmarkButton id={item.id} />
        </div>

        <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-brand-ink">
          <Link
            href={`/messages/${item.id}`}
            className="transition-colors hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            {item.title}
          </Link>
        </h3>
        <p className="text-xs text-brand-muted">by {item.author}</p>

        <p className="mt-2 line-clamp-2 text-sm text-brand-ink/70">
          {item.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-xs text-brand-muted">
          {item.estimatedReadingTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {item.estimatedReadingTime}
            </span>
          )}
          {chapterCount > 0 && (
            <span className="inline-flex items-center gap-1">
              <BookText className="h-3.5 w-3.5" />
              {chapterCount} chapters
            </span>
          )}
        </div>

        <div className="mt-3">
          <Link
            href={`/messages/${item.id}/read`}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-goldLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
          >
            Read Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
