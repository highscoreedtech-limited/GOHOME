"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import type { GalleryImage } from "@/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

/**
 * Bento-style gallery with category filter pills, a "Load More" reveal, and an
 * accessible lightbox. Tiles vary in size for an editorial masonry feel; dense
 * auto-flow repacks them cleanly as the filter changes. Click/tap a photo to
 * open it large; navigate with the arrows or the keyboard (left/right, Esc).
 */
export function GalleryGrid({
  images,
  categories,
}: {
  images: GalleryImage[];
  categories?: readonly string[];
}) {
  const showFilters = !!categories && categories.length > 1;
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? images
        : images.filter((img) => img.category === category),
    [images, category],
  );

  // Reset the reveal count whenever the active filter changes.
  useEffect(() => setVisible(PAGE_SIZE), [category]);

  const shown = filtered.slice(0, visible);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  // Keyboard navigation + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  return (
    <>
      {/* Filter pills */}
      {showFilters && (
      <div
        role="tablist"
        aria-label="Filter gallery by category"
        className="no-scrollbar -mx-1 mb-1 flex gap-2 overflow-x-auto px-1 py-1"
      >
        {categories!.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                active
                  ? "bg-brand-gold font-semibold text-white"
                  : "border border-black/10 text-brand-muted hover:border-brand-gold/40 hover:text-brand-ink",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>
      )}

      {/* Bento grid */}
      <div className="grid auto-rows-[44vw] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {shown.map((img, i) => {
          const feature = i % 6 === 0;
          const wide = i % 6 === 3;
          return (
            <motion.button
              key={img.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
              aria-label={`View photo: ${img.title ?? img.alt}`}
              className={cn(
                "group relative overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
                feature && "col-span-2 row-span-2",
                wide && "col-span-2",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={
                  feature
                    ? "(max-width: 640px) 100vw, 50vw"
                    : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Legibility gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/10 to-transparent" />

              {/* Feature tile: a category pill top-left */}
              {feature && img.category && (
                <span className="absolute left-3.5 top-3.5 rounded-full bg-brand-dark/55 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
                  {img.category}
                </span>
              )}

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 text-left sm:p-4">
                {!feature && img.category && (
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-goldLight">
                    {img.category}
                  </p>
                )}
                {img.title && (
                  <h3
                    className={cn(
                      "font-serif font-semibold leading-tight text-brand-cream",
                      feature ? "text-lg sm:text-xl" : "text-sm",
                    )}
                  >
                    {img.title}
                  </h3>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Load more */}
      {visible < filtered.length && (
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-brand-goldDark px-8 py-3.5 text-sm font-semibold text-brand-goldDark transition-colors hover:bg-brand-goldDark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
          >
            Load More Photos
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <X className="h-6 w-6" />
            </button>

            {filtered.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[openIndex].src}
                alt={filtered[openIndex].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
              {filtered[openIndex].title && (
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center font-serif text-lg text-brand-cream">
                  {filtered[openIndex].title}
                </p>
              )}
            </motion.div>

            {filtered.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
              {openIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
