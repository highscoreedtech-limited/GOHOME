"use client";

import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/lib/reading";
import { cn } from "@/lib/utils";

/**
 * Save/bookmark toggle backed by localStorage.
 * - variant "icon": compact circular button (card corner / reader toolbar)
 * - variant "labelled": full "Save" / "Saved" button (details page)
 */
export function BookmarkButton({
  id,
  variant = "icon",
  className,
  tone = "light",
}: {
  id: string;
  variant?: "icon" | "labelled";
  className?: string;
  tone?: "light" | "dark";
}) {
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(id);

  if (variant === "labelled") {
    return (
      <button
        type="button"
        onClick={() => toggle(id)}
        aria-pressed={saved}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark",
          saved
            ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
            : tone === "dark"
              ? "border-white/20 text-white hover:border-brand-gold hover:text-brand-goldLight"
              : "border-black/15 text-brand-ink hover:border-brand-gold hover:text-brand-gold",
          className,
        )}
      >
        <motion.span
          key={saved ? "on" : "off"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          {saved ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </motion.span>
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save for later"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
        saved
          ? "bg-brand-gold text-brand-dark"
          : "bg-brand-dark/50 text-white hover:bg-brand-dark/70",
        className,
      )}
    >
      <motion.span
        key={saved ? "on" : "off"}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </motion.span>
    </button>
  );
}
