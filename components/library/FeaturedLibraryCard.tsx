"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import type { LibraryItem } from "@/types";
import { hasChapters } from "@/lib/library";
import { BookCover } from "./BookCover";

/**
 * Large horizontal "spotlight" card for the single featured message at the top
 * of the library: a tall themed thumbnail beside a generous content column
 * (title, author, excerpt, meta with icons, and a "Read Now" affordance). The
 * whole card links to the message via a stretched title link.
 */
export function FeaturedLibraryCard({ item }: { item: LibraryItem }) {
  const chapterCount = hasChapters(item) ? item.chapters!.length : 0;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06] shadow-card transition-shadow duration-300 hover:shadow-[0_30px_60px_-28px_rgba(0,0,0,0.5)] focus-within:ring-2 focus-within:ring-brand-gold"
    >
      <div className="grid md:grid-cols-[46%_1fr]">
        {/* Thumbnail */}
        <div className="relative min-h-[220px] md:min-h-[360px]">
          <BookCover
            src={item.coverImage}
            title={item.title}
            category={item.category}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 520px"
            priority
          />
          <span className="absolute left-5 top-5 rounded-full bg-brand-dark/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-goldLight backdrop-blur">
            {item.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <h2 className="font-serif text-2xl font-bold leading-tight text-brand-ink sm:text-3xl">
            <Link
              href={`/messages/${item.id}`}
              className="transition-colors after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-brand-gold"
            >
              {item.title}
            </Link>
          </h2>

          <p className="mt-2 text-sm text-brand-muted">by {item.author}</p>

          <p className="mt-4 max-w-lg leading-relaxed text-brand-ink/75">
            {item.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-brand-muted">
            {item.estimatedReadingTime && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {item.estimatedReadingTime}
              </span>
            )}
            {chapterCount > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {chapterCount} chapters
              </span>
            )}
          </div>

          <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-goldDark">
            Read Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
