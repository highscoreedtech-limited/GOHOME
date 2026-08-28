"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, CalendarDays } from "lucide-react";
import type { EventCategory } from "@/types";
import {
  getMonthMatrix,
  eventsOnDate,
  getUpcoming,
  toKey,
  fromKey,
  MONTH_NAMES,
  WEEKDAY_SHORT,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";

/** Per-category colours for dots and badges. */
const CATEGORY_STYLES: Record<
  EventCategory,
  { dot: string; badge: string }
> = {
  Prayer: { dot: "bg-brand-gold", badge: "bg-brand-gold/15 text-brand-goldDark" },
  Worship: { dot: "bg-indigo-500", badge: "bg-indigo-500/15 text-indigo-600" },
  Outreach: { dot: "bg-emerald-500", badge: "bg-emerald-500/15 text-emerald-600" },
  Novena: { dot: "bg-violet-500", badge: "bg-violet-500/15 text-violet-600" },
  Feast: { dot: "bg-rose-500", badge: "bg-rose-500/15 text-rose-600" },
  Seminar: { dot: "bg-teal-500", badge: "bg-teal-500/15 text-teal-600" },
};

function formatLongDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Interactive month calendar. `todayKey` is computed on the server and passed
 * in so the server and first client render agree (no hydration mismatch).
 */
export function EventCalendar({ todayKey }: { todayKey: string }) {
  const today = fromKey(todayKey);
  const [view, setView] = useState({
    y: today.getFullYear(),
    m: today.getMonth(),
  });
  const [selectedKey, setSelectedKey] = useState(todayKey);

  const weeks = useMemo(() => getMonthMatrix(view.y, view.m), [view]);
  const upcoming = useMemo(() => getUpcoming(today, 6), [todayKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedDate = fromKey(selectedKey);
  const selectedEvents = eventsOnDate(selectedDate);

  const shiftMonth = (delta: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const goToday = () => {
    setView({ y: today.getFullYear(), m: today.getMonth() });
    setSelectedKey(todayKey);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
      {/* Calendar */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-card sm:p-6">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-brand-ink sm:text-2xl">
              {MONTH_NAMES[view.m]} {view.y}
            </h2>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goToday}
                className="mr-1 rounded-md px-3 py-1.5 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-cream"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
                className="flex h-9 w-9 items-center justify-center rounded-md text-brand-ink/70 transition-colors hover:bg-brand-cream"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className="flex h-9 w-9 items-center justify-center rounded-md text-brand-ink/70 transition-colors hover:bg-brand-cream"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAY_SHORT.map((d) => (
              <div
                key={d}
                className="py-2 text-xs font-semibold uppercase tracking-wide text-brand-muted"
              >
                <span className="sm:hidden">{d[0]}</span>
                <span className="hidden sm:inline">{d}</span>
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {weeks.flat().map((day) => {
              const key = toKey(day);
              const inMonth = day.getMonth() === view.m;
              const isToday = key === todayKey;
              const isSelected = key === selectedKey;
              const dayEvents = eventsOnDate(day);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedKey(key)}
                  aria-pressed={isSelected}
                  aria-label={`${formatLongDate(day)}${
                    dayEvents.length
                      ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}`
                      : ""
                  }`}
                  className={cn(
                    "relative flex aspect-square flex-col items-center justify-start gap-1 rounded-lg p-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                    isSelected
                      ? "bg-brand-gold text-brand-dark"
                      : inMonth
                        ? "text-brand-ink hover:bg-brand-cream"
                        : "text-brand-muted/40 hover:bg-brand-cream/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold sm:text-sm",
                      isToday && !isSelected && "bg-brand-gold/20 text-brand-goldDark",
                    )}
                  >
                    {day.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="flex flex-wrap items-center justify-center gap-0.5">
                      {dayEvents.slice(0, 3).map((e, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isSelected ? "bg-brand-dark/70" : CATEGORY_STYLES[e.category].dot,
                          )}
                        />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-black/5 pt-4">
            {(Object.keys(CATEGORY_STYLES) as EventCategory[]).map((cat) => (
              <span key={cat} className="flex items-center gap-1.5 text-xs text-brand-muted">
                <span className={cn("h-2 w-2 rounded-full", CATEGORY_STYLES[cat].dot)} />
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Side panel: selected day + upcoming */}
      <div className="space-y-8 lg:col-span-2">
        {/* Selected day */}
        <div>
          <h3 className="font-serif text-lg font-bold text-brand-ink">
            {formatLongDate(selectedDate)}
          </h3>
          {selectedEvents.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {selectedEvents.map((e) => (
                <EventItem key={`${e.id}-${selectedKey}`} event={e} />
              ))}
            </ul>
          ) : (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-black/10 p-4 text-sm text-brand-muted">
              <CalendarDays className="h-5 w-5 shrink-0 text-brand-gold/50" />
              No events scheduled for this day.
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div>
          <h3 className="font-serif text-lg font-bold text-brand-ink">Upcoming</h3>
          <ul className="mt-4 space-y-3">
            {upcoming.map(({ date, event }) => (
              <li key={`${event.id}-${date}`}>
                <button
                  type="button"
                  onClick={() => {
                    const d = fromKey(date);
                    setView({ y: d.getFullYear(), m: d.getMonth() });
                    setSelectedKey(date);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-black/5 bg-white p-3 text-left shadow-sm transition-colors hover:border-brand-gold/40"
                >
                  <DateChip date={fromKey(date)} category={event.category} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-brand-ink">
                      {event.title}
                    </span>
                    <span className="block text-xs text-brand-muted">
                      {event.time ?? "All day"}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DateChip({ date, category }: { date: Date; category: EventCategory }) {
  return (
    <span className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-cream text-center">
      <span className="text-[10px] font-semibold uppercase text-brand-muted">
        {date.toLocaleDateString("en-US", { month: "short" })}
      </span>
      <span className="font-serif text-lg font-bold leading-none text-brand-ink">
        {date.getDate()}
      </span>
      <span className={cn("mt-0.5 h-1 w-4 rounded-full", CATEGORY_STYLES[category].dot)} />
    </span>
  );
}

function EventItem({
  event,
}: {
  event: import("@/types").CalendarEvent;
}) {
  const style = CATEGORY_STYLES[event.category];
  return (
    <li className="rounded-xl border border-black/5 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-serif text-base font-bold text-brand-ink">
          {event.title}
        </h4>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
            style.badge,
          )}
        >
          {event.category}
        </span>
      </div>
      {event.description && (
        <p className="mt-1.5 text-sm text-brand-ink/70">{event.description}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-muted">
        {event.time && (
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-brand-gold" />
            {event.time}
          </span>
        )}
        {event.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-brand-gold" />
            {event.location}
          </span>
        )}
      </div>
    </li>
  );
}
