"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { useReading } from "@/lib/reading";
import { cn } from "@/lib/utils";

/**
 * Primary reading CTA for the details page. Reads localStorage progress and
 * shows "Continue Reading" (with %) when the resource has been started,
 * otherwise "Read Now".
 */
export function ReadCta({ id, className }: { id: string; className?: string }) {
  const { reading } = useReading();
  const record = reading[id];
  const started = record && record.progress > 0.02;
  const pct = record ? Math.round(record.progress * 100) : 0;

  return (
    <div className={cn("w-full", className)}>
      <Link
        href={`/messages/${id}/read`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-goldLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
      >
        <BookOpen className="h-4 w-4" />
        {started ? "Continue Reading" : "Read Now"}
        <ArrowRight className="h-4 w-4" />
      </Link>

      {started && (
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-brand-gold"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1.5 text-center text-xs text-brand-muted">
            {pct}% complete
          </p>
        </div>
      )}
    </div>
  );
}
