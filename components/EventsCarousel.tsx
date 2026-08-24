"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EventItem } from "@/types";
import { EventCard } from "./EventCard";
import { cn } from "@/lib/utils";

/**
 * Events display. On lg+ screens all cards sit in a 3-col grid. Below that it
 * becomes a swipeable Embla carousel with dot pagination for touch devices.
 *
 * Embla is initialised unconditionally (hooks rule) but its drag/scroll only
 * matters at the mobile/tablet breakpoints where slides don't all fit.
 */
export function EventsCarousel({ events }: { events: EventItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
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

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <div>
      {/* Desktop grid */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Mobile / tablet carousel */}
      <div className="lg:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {events.map((event) => (
              <div
                key={event.id}
                className="min-w-0 shrink-0 grow-0 basis-[85%] pr-4 sm:basis-[48%]"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot pagination */}
        <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Events pagination">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Go to event ${i + 1}`}
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
