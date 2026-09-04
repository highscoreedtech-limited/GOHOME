import type { LucideIcon } from "lucide-react";

/** A single top-level navigation entry; may carry a dropdown of children. */
export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/** A row inside a nav dropdown / mega-menu. */
export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

/** Upcoming event card (title + description + image, per the live site). */
export interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

/** Latest message list item. */
export interface MessageItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
}

/** Quick-link row with icon. */
export interface QuickLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** "Our Work" pillar. */
export interface WorkItem {
  title: string;
  icon: LucideIcon;
}

/** Shared shape for every Jacob's Well pillar page (Trinity Kitchen, Motherless Babies' Home, etc.). */
export interface JacobsWellContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
  };
  story: string[];
  /** Optional impact numbers shown as a stat strip between story and gallery. */
  stats?: { value: string; label: string }[];
  howWeHelp: {
    heading: string;
    items: string[];
  };
  closing: {
    quote: string;
    note: string;
  };
}

/** Gallery thumbnail. */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

/* ------------------------------------------------------------------ *
 * Messages Library (frontend-only digital reading experience)
 * ------------------------------------------------------------------ */

/** A chapter/section within a library resource. Optional per resource. */
export interface Chapter {
  id: string;
  title: string;
  /** Plain text; paragraphs separated by blank lines. */
  content: string;
}

/**
 * A single readable resource in the Messages Library (book, message,
 * devotional, Bible study, prayer guide, etc.).
 *
 * Most fields are optional so the UI can adapt to three content shapes:
 *  - full book / multi-section message  -> `chapters`
 *  - simple message / article           -> `content` (no chapters)
 */
export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  tags: string[];
  coverImage?: string;
  pages?: number;
  estimatedReadingTime?: string;
  featured?: boolean;
  publishedAt?: string;
  /** Present for chaptered resources; drives the optional Table of Contents. */
  chapters?: Chapter[];
  /** Present for continuous (chapter-less) resources. */
  content?: string;
}

/** Reader appearance preferences (persisted to localStorage). */
export type ReaderTheme = "light" | "sepia" | "dark";

export interface ReaderPrefs {
  fontScale: number; // index into a font-size scale
  theme: ReaderTheme;
}

/** Per-resource reading progress (persisted to localStorage). */
export interface ReadingRecord {
  progress: number; // 0..1
  updatedAt: number; // epoch ms
}

/* ------------------------------------------------------------------ *
 * Events calendar
 * ------------------------------------------------------------------ */

export type EventCategory =
  | "Prayer"
  | "Worship"
  | "Outreach"
  | "Novena"
  | "Feast"
  | "Seminar";

/**
 * A calendar event. Exactly one scheduling shape should be set:
 *  - `date`            a single day ("YYYY-MM-DD")
 *  - `start` + `end`   an inclusive multi-day range (e.g. a novena)
 *  - `weekday`         a weekly recurring event (0=Sun ... 6=Sat)
 */
export interface CalendarEvent {
  id: string;
  title: string;
  category: EventCategory;
  time?: string;
  location?: string;
  description?: string;
  date?: string;
  start?: string;
  end?: string;
  weekday?: number;
}

/** A concrete occurrence of an event on a specific day. */
export interface EventOccurrence {
  date: string; // "YYYY-MM-DD"
  event: CalendarEvent;
}