"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { verses } from "@/data/verses";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

/**
 * Reusable "Daily Encouragement" quote card. Cycles through a set of scripture
 * verses (data/verses.ts) with a gentle fade. Starts on the first verse so the
 * server and first client render match (no hydration mismatch); rotation then
 * begins on the client. Pauses while hovered/focused for readability.
 */
export function DailyEncouragementCard({ className }: { className?: string }) {
  const { heading, cta } = site.encouragement;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || verses.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % verses.length),
      7000,
    );
    return () => clearInterval(id);
  }, [paused]);

  const verse = verses[index];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      aria-label={heading}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={cn(
        "w-full max-w-sm rounded-2xl border border-white/10 bg-brand-dark/80 p-6 shadow-card backdrop-blur-md",
        className,
      )}
    >
      <h3 className="font-serif text-lg font-semibold text-white">{heading}</h3>

      <Quote className="mt-4 h-7 w-7 text-brand-gold" aria-hidden="true" />

      {/* aria-live so screen readers announce each new verse */}
      <div className="mt-2 min-h-[120px]" aria-live="polite">
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[15px] italic leading-relaxed text-white/85">
            &ldquo;{verse.quote}&rdquo;
          </p>
          <cite className="mt-3 block text-sm font-semibold not-italic text-brand-goldLight">
            {verse.citation}
          </cite>
        </motion.blockquote>
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {verses.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-4 bg-brand-gold" : "w-1.5 bg-white/25",
            )}
          />
        ))}
      </div>

      <Button href={cta.href} className="mt-5 w-full">
        {cta.label}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.aside>
  );
}
