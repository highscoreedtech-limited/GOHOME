"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookText, Layers } from "lucide-react";
import type { LibraryItem } from "@/types";
import { hasChapters } from "@/lib/library";
import { Pill } from "@/components/ui/Pill";
import { BookCover } from "./BookCover";
import { BookmarkButton } from "./BookmarkButton";

/**
 * Cover-forward library card. The cover is the focus; the body stays quiet
 * (title, author, one meta line) so a grid of these reads as a clean shelf.
 * A stretched link over the title makes the whole card open the details page,
 * while the bookmark button stays independently clickable.
 */
export function LibraryCard({ item }: { item: LibraryItem }) {
  const chapterCount = hasChapters(item) ? item.chapters!.length : 0;

  // One piece of metadata, preferred in this order (never show empty fields).
  const meta = item.estimatedReadingTime
    ? { icon: Clock, text: item.estimatedReadingTime }
    : item.pages
      ? { icon: BookText, text: `${item.pages} pages` }
      : chapterCount > 0
        ? { icon: Layers, text: `${chapterCount} chapters` }
        : null;
  const MetaIcon = meta?.icon;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(0,0,0,0.45)]"
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <BookCover
          src={item.coverImage}
          title={item.title}
          category={item.category}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
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
        <h3 className="font-serif text-[17px] font-bold leading-snug text-brand-ink">
          <Link
            href={`/messages/${item.id}`}
            className="line-clamp-2 transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-brand-gold"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-brand-muted">by {item.author}</p>

        {meta && MetaIcon && (
          <div className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-brand-muted">
            <MetaIcon className="h-3.5 w-3.5 text-brand-gold" />
            {meta.text}
          </div>
        )}
      </div>
    </motion.article>
  );
}
