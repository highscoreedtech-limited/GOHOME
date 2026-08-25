"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReading } from "@/lib/reading";
import { getAllItems } from "@/lib/library";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { BookCover } from "./BookCover";

/**
 * "Continue Reading" rail — driven entirely by localStorage reading history.
 * Renders nothing when there is no history (no empty section), so it's safe to
 * always mount at the top of the library.
 */
export function ContinueReading() {
  const { reading } = useReading();

  const items = getAllItems()
    .map((item) => ({ item, record: reading[item.id] }))
    .filter(
      (x): x is { item: (typeof x)["item"]; record: NonNullable<typeof x.record> } =>
        !!x.record && x.record.progress > 0.01,
    )
    .sort((a, b) => b.record.updatedAt - a.record.updatedAt)
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section aria-label="Continue reading">
      <Reveal>
        <SectionHeader title="Continue Reading" />
      </Reveal>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map(({ item, record }, i) => {
          const pct = Math.round(record.progress * 100);
          return (
            <Reveal key={item.id} delay={i * 0.05}>
              <Link
                href={`/messages/${item.id}/read`}
                className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-3 shadow-card transition-colors hover:border-brand-gold/40"
              >
                <BookCover
                  src={item.coverImage}
                  title={item.title}
                  className="aspect-[3/4] w-16 shrink-0 rounded-lg"
                  sizes="64px"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-serif text-base font-bold text-brand-ink group-hover:text-brand-gold">
                    {item.title}
                  </h3>
                  <p className="truncate text-xs text-brand-muted">
                    by {item.author}
                  </p>

                  {/* Progress */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                      <div
                        className="h-full rounded-full bg-brand-gold"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-brand-muted">
                      {pct}%
                    </span>
                  </div>

                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-gold">
                    Continue Reading
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
