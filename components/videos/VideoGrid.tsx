"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Youtube, ChevronDown, X } from "lucide-react";
import type { VideoItem } from "@/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

/** Warm, per-category placeholder gradients for videos without a thumbnail. */
const CATEGORY_GRADIENT: Record<string, string> = {
  Sermons: "from-amber-300 to-brand-goldDark",
  Worship: "from-amber-400 to-orange-700",
  Testimonies: "from-lime-500 to-emerald-800",
  Events: "from-stone-500 to-brand-darker",
};
const FALLBACK_GRADIENT = "from-brand-gold to-brand-goldDark";

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function thumbFor(v: VideoItem): string | undefined {
  if (v.thumbnail) return v.thumbnail;
  if (v.youtubeId) return `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`;
  return undefined;
}

/**
 * Videos page body: category filter pills, a card grid (16:9 thumbnail with a
 * category pill, duration badge and play button, then title + source line), a
 * "Load More" reveal, and a YouTube lightbox. Cards with a `youtubeId` play in
 * the lightbox; cards without one open the channel (when provided).
 */
export function VideoGrid({
  videos,
  categories,
  channelUrl,
}: {
  videos: VideoItem[];
  categories: readonly string[];
  channelUrl?: string;
}) {
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [playing, setPlaying] = useState<VideoItem | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? videos
        : videos.filter((v) => v.category === category),
    [videos, category],
  );

  useEffect(() => setVisible(PAGE_SIZE), [category]);

  const shown = filtered.slice(0, visible);

  const close = useCallback(() => setPlaying(null), []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [playing, close]);

  const open = (v: VideoItem) => {
    if (v.youtubeId) setPlaying(v);
    else if (channelUrl && channelUrl !== "#")
      window.open(channelUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Filter pills */}
      <div
        role="tablist"
        aria-label="Filter videos by category"
        className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1"
      >
        {categories.map((c) => {
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

      {/* Grid */}
      <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v, i) => {
          const date = formatDate(v.publishedAt);
          const thumb = thumbFor(v);
          return (
            <motion.button
              key={v.id}
              type="button"
              onClick={() => open(v)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="group flex flex-col overflow-hidden rounded-xl bg-white text-left ring-1 ring-black/[0.06] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              {/* Thumbnail */}
              <div
                className={cn(
                  "relative aspect-video w-full overflow-hidden bg-gradient-to-br",
                  CATEGORY_GRADIENT[v.category] ?? FALLBACK_GRADIENT,
                )}
              >
                {thumb && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}

                {/* Category pill */}
                <span className="absolute left-3 top-3 rounded-full bg-brand-dark/55 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                  {v.category}
                </span>

                {/* Duration */}
                {v.duration && (
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-brand-dark/75 px-2 py-0.5 text-[11px] font-semibold text-white">
                    {v.duration}
                  </span>
                )}

                {/* Play button */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-brand-dark/50 backdrop-blur transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
                  </span>
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold leading-snug text-brand-ink transition-colors group-hover:text-brand-gold">
                  {v.title}
                </h3>
                <div className="mt-2 flex items-center gap-2 text-xs text-brand-muted">
                  <Youtube className="h-4 w-4" />
                  <span>YouTube{date ? ` · ${date}` : ""}</span>
                </div>
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
            onClick={() => setVisible((n) => n + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-brand-goldDark px-8 py-3.5 text-sm font-semibold text-brand-goldDark transition-colors hover:bg-brand-goldDark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
          >
            Load More Videos
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Lightbox player */}
      <AnimatePresence>
        {playing && playing.youtubeId && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={playing.title}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${playing.youtubeId}?autoplay=1&rel=0`}
                  title={playing.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-center font-serif text-lg text-brand-cream">
                {playing.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
