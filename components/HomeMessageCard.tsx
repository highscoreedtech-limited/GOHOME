"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LibraryItem } from "@/types";
import { hasChapters } from "@/lib/library";
import { BookCover } from "@/components/library/BookCover";
import { cn } from "@/lib/utils";

/**
 * Rich "message" card used in the promoted "Messages from the Holy Spirit"
 * section on the home page: a large themed thumbnail with a category pill,
 * title, author, a one-line excerpt, and a footer (meta + Read Now). The whole
 * card is a link to the message page.
 */
export function HomeMessageCard({ item }: { item: LibraryItem }) {
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
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-card transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(0,0,0,0.45)] focus-within:ring-2 focus-within:ring-brand-gold"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <BookCover
          src={item.coverImage}
          title={item.title}
          category={item.category}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-brand-dark/55 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
          {item.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-bold leading-snug text-brand-ink">
          <Link
            href={`/messages/${item.id}`}
            className="line-clamp-2 transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-brand-gold"
          >
            {item.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-xs text-brand-muted">by {item.author}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-brand-ink/70">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/5 pt-3.5 text-xs">
          <span className="text-brand-muted">{meta}</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-brand-gold">
            Read Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
