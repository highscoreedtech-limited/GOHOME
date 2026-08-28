import type { CalendarEvent, EventOccurrence } from "@/types";
import { calendarEvents } from "@/data/calendar";

/**
 * Calendar logic, kept out of the UI. All dates are handled as local-time
 * "YYYY-MM-DD" keys to avoid timezone drift. Swap `calendarEvents` for an API
 * source without touching these helpers or the components that use them.
 */

/** Format a Date as a local "YYYY-MM-DD" key. */
export function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parse a "YYYY-MM-DD" key into a local Date (midnight). */
export function fromKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getAllEvents(): CalendarEvent[] {
  return calendarEvents;
}

/** Does an event occur on the given day? */
function occursOn(event: CalendarEvent, date: Date): boolean {
  const key = toKey(date);
  if (event.date) return event.date === key;
  if (event.start && event.end) return key >= event.start && key <= event.end;
  if (typeof event.weekday === "number") return date.getDay() === event.weekday;
  return false;
}

/** All events on a specific day, ordered by category weight then title. */
export function eventsOnDate(date: Date): CalendarEvent[] {
  return calendarEvents
    .filter((e) => occursOn(e, date))
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Build a 6-row calendar matrix (weeks of 7 days) for a month, starting on
 * Sunday, including the leading/trailing days from adjacent months.
 */
export function getMonthMatrix(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay()); // back up to Sunday

  const weeks: Date[][] = [];
  const cursor = new Date(start);
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

/**
 * The next `limit` upcoming occurrences from `from` (inclusive), scanning up to
 * `horizonDays` ahead. Expands weekly + multi-day events into concrete days.
 */
export function getUpcoming(
  from: Date,
  limit = 6,
  horizonDays = 120,
): EventOccurrence[] {
  const out: EventOccurrence[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);

  for (let i = 0; i < horizonDays && out.length < limit; i++) {
    const dayEvents = eventsOnDate(cursor);
    for (const event of dayEvents) {
      // For multi-day ranges, only surface the first day as the "upcoming" hit.
      if (event.start && event.end && toKey(cursor) !== event.start) continue;
      out.push({ date: toKey(cursor), event });
      if (out.length >= limit) break;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
