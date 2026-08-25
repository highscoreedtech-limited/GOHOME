"use client";

import Image from "next/image";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable resource cover.
 * Handles: real cover image, lazy loading (fade-in), a loading shimmer, and a
 * branded placeholder fallback when there is no image or it fails to load.
 * The caller sets the aspect ratio via `className` (e.g. "aspect-[3/4]").
 */
export function BookCover({
  src,
  title,
  category,
  className,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px",
  priority = false,
}: {
  src?: string;
  title: string;
  category?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    src ? "loading" : "error",
  );
  const showFallback = !src || status === "error";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-brand-surface",
        className,
      )}
    >
      {!showFallback && (
        <Image
          src={src}
          alt={`Cover: ${title}`}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "object-cover transition-opacity duration-500",
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {status === "loading" && !showFallback && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-brand-surface to-brand-surfaceAlt" />
      )}

      {showFallback && <CoverPlaceholder title={title} category={category} />}
    </div>
  );
}

/** Branded fallback used when a cover image is missing or broken. */
function CoverPlaceholder({
  title,
  category,
}: {
  title: string;
  category?: string;
}) {
  const initials = title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand-dark via-brand-surface to-brand-darker p-4 text-center"
    >
      <BookOpen className="h-7 w-7 text-brand-gold/70" />
      <span className="font-serif text-2xl font-bold text-brand-goldLight">
        {initials}
      </span>
      {category && (
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
          {category}
        </span>
      )}
    </div>
  );
}
