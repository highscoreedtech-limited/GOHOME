"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ReaderPrefs, ReaderTheme, ReadingRecord } from "@/types";

/**
 * Client-side persistence for the Messages Library (frontend-only).
 *
 * A minimal subscribable store backed by localStorage. All Messages Library
 * state (reading progress, bookmarks, reader preferences) lives here so the
 * UI never touches localStorage directly. Swap this file for API calls later
 * and the components keep working.
 *
 * SSR-safe via useSyncExternalStore + a stable server snapshot, so there are
 * no hydration mismatches.
 */

const KEYS = {
  reading: "njc:reading",
  bookmarks: "njc:bookmarks",
  prefs: "njc:reader-prefs",
} as const;

// Stable fallbacks — returning the SAME reference each call is required so
// useSyncExternalStore doesn't loop.
const EMPTY_BOOKMARKS: string[] = [];
const EMPTY_READING: Record<string, ReadingRecord> = {};
export const DEFAULT_PREFS: ReaderPrefs = { fontScale: 1, theme: "light" };

// In-memory cache keeps snapshot references stable between reads.
const cache: Record<string, unknown> = {};
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  if (key in cache) return cache[key] as T;
  try {
    const raw = window.localStorage.getItem(key);
    const value = raw ? (JSON.parse(raw) as T) : fallback;
    cache[key] = value;
    return value;
  } catch {
    cache[key] = fallback;
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  cache[key] = value;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable / full — persistence is best-effort */
  }
  notify();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// Keep in-tab state fresh if another tab edits storage.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key && e.key.startsWith("njc:")) {
      delete cache[e.key];
      notify();
    }
  });
}

/* --------------------------------- Bookmarks -------------------------------- */

export function useBookmarks() {
  const bookmarks = useSyncExternalStore(
    subscribe,
    () => read<string[]>(KEYS.bookmarks, EMPTY_BOOKMARKS),
    () => EMPTY_BOOKMARKS,
  );

  const toggle = useCallback((id: string) => {
    const current = read<string[]>(KEYS.bookmarks, EMPTY_BOOKMARKS);
    write(
      KEYS.bookmarks,
      current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id],
    );
  }, []);

  const isSaved = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks],
  );

  return { bookmarks, toggle, isSaved };
}

/* ------------------------------ Reading progress ---------------------------- */

export function useReading() {
  const reading = useSyncExternalStore(
    subscribe,
    () => read<Record<string, ReadingRecord>>(KEYS.reading, EMPTY_READING),
    () => EMPTY_READING,
  );

  const setProgress = useCallback((id: string, progress: number) => {
    const clamped = Math.min(1, Math.max(0, progress));
    const current = read<Record<string, ReadingRecord>>(
      KEYS.reading,
      EMPTY_READING,
    );
    const prev = current[id]?.progress ?? -1;
    // Skip negligible changes to avoid write churn while scrolling.
    if (Math.abs(prev - clamped) < 0.01) return;
    write(KEYS.reading, {
      ...current,
      [id]: { progress: clamped, updatedAt: Date.now() },
    });
  }, []);

  return { reading, setProgress };
}

/** Non-hook read of a single record (e.g. to decide Read Now vs Continue). */
export function getReadingRecord(id: string): ReadingRecord | undefined {
  return read<Record<string, ReadingRecord>>(KEYS.reading, EMPTY_READING)[id];
}

/* ----------------------------- Reader preferences --------------------------- */

export function useReaderPrefs() {
  const prefs = useSyncExternalStore(
    subscribe,
    () => read<ReaderPrefs>(KEYS.prefs, DEFAULT_PREFS),
    () => DEFAULT_PREFS,
  );

  const setFontScale = useCallback((fontScale: number) => {
    const current = read<ReaderPrefs>(KEYS.prefs, DEFAULT_PREFS);
    write(KEYS.prefs, { ...current, fontScale });
  }, []);

  const setTheme = useCallback((theme: ReaderTheme) => {
    const current = read<ReaderPrefs>(KEYS.prefs, DEFAULT_PREFS);
    write(KEYS.prefs, { ...current, theme });
  }, []);

  return { prefs, setFontScale, setTheme };
}
