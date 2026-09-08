"use client";

import Image from "next/image";
import { useState } from "react";
import { getCategoryTheme } from "./categoryTheme";
import { cn } from "@/lib/utils";

/**
 * Reusable resource cover.
 * Handles: real cover image, lazy loading (fade-in), a loading shimmer, and a
 * branded per-category placeholder (gradient + icon) when there is no image or
 * it fails to load. The caller sets the aspect ratio via `className`.
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
    <div className={cn("relative overflow-hidden bg-brand-surface", className)}>
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

      {showFallback && <CoverPlaceholder category={category} />}
    </div>
  );
}

/** Branded fallback: a warm per-category gradient with a single outline icon. */
function CoverPlaceholder({ category }: { category?: string }) {
  const theme = getCategoryTheme(category ?? "");
  const Icon = theme.Icon;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-gradient-to-br",
        theme.gradient,
      )}
    >
      <Icon className="h-10 w-10 text-white/85" strokeWidth={1.5} />
    </div>
  );
}
