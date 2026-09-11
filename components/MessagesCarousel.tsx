"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { LibraryItem } from "@/types";
import { HomeMessageCard } from "./HomeMessageCard";
import { cn } from "@/lib/utils";

/**
 * Promoted messages display. On lg+ screens the cards sit in a 3-col grid.
 * Below that it becomes a swipeable Embla carousel with dot pagination, matching
 * the Upcoming Events behavior.
 */
export function MessagesCarousel({ items }: { items: LibraryItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div>
      {/* Desktop grid */}
      <div className="hidden gap-7 lg:grid lg:grid-cols-3">
        {items.map((item) => (
          <HomeMessageCard key={item.id} item={item} />
        ))}
      </div>

      {/* Mobile / tablet carousel */}
      <div className="min-w-0 lg:hidden">
        <div className="min-w-0 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="min-w-0 shrink-0 grow-0 basis-[88%] pr-5 sm:basis-[55%]"
              >
                <HomeMessageCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot pagination */}
        <div
          className="mt-5 flex justify-center gap-2"
          role="tablist"
          aria-label="Messages pagination"
        >
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Go to message ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === selected
                  ? "w-6 bg-brand-gold"
                  : "w-2 bg-brand-ink/20 hover:bg-brand-ink/40",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
