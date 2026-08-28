"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

/**
 * Reusable "Daily Encouragement" quote card. Dark glassy card with a gold
 * quote mark, scripture-style italic quote, verse citation, and a gold CTA.
 * Rendered floating over the hero, but standalone-reusable anywhere.
 */
export function DailyEncouragementCard({ className }: { className?: string }) {
  const { heading, quote, citation, cta } = site.encouragement;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      aria-label={heading}
      className={cn(
        "w-full max-w-sm rounded-2xl border border-white/10 bg-brand-dark/80 p-6 shadow-card backdrop-blur-md",
        className,
      )}
    >
      <h3 className="font-serif text-lg font-semibold text-white">{heading}</h3>

      <Quote className="mt-4 h-7 w-7 text-brand-gold" aria-hidden="true" />

      <blockquote className="mt-2">
        <p className="text-[15px] italic leading-relaxed text-white/85">
          &ldquo;{quote}&rdquo;
        </p>
        <cite className="mt-3 block text-sm font-semibold not-italic text-brand-goldLight">
          {citation}
        </cite>
      </blockquote>

      <Button href={cta.href} className="mt-5 w-full">
        {cta.label}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.aside>
  );
}
