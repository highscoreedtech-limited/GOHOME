import type { LibraryItem, CalendarEvent } from "@/types";

/**
 * Typed client for the Go backend.
 *
 * The backend base URL comes from NEXT_PUBLIC_API_URL. When it is UNSET (e.g.
 * the current deploy, before the Go server is hosted), `apiEnabled()` is false
 * and callers fall back to local data, so nothing breaks. When it is set (local
 * dev: http://localhost:8080), the app talks to the real API.
 *
 * This is the single seam described in docs/BACKEND.md: swap the source here,
 * leave every component unchanged.
 */

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export function apiEnabled(): boolean {
  return BASE.length > 0;
}

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API request failed: ${path} (${res.status})`);
  }
  return (await res.json()) as T;
}

export function fetchMessages(params?: {
  category?: string;
  q?: string;
  latest?: number;
}): Promise<LibraryItem[]> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set("category", params.category);
  if (params?.q) qs.set("q", params.q);
  if (params?.latest) qs.set("latest", String(params.latest));
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return getJSON<LibraryItem[]>(`/api/messages${suffix}`);
}

export function fetchMessage(id: string): Promise<LibraryItem> {
  return getJSON<LibraryItem>(`/api/messages/${encodeURIComponent(id)}`);
}

export function fetchEvents(): Promise<CalendarEvent[]> {
  return getJSON<CalendarEvent[]>("/api/events");
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Result of a contact submission.
 * - ok: stored (backend returned 202)
 * - fieldErrors: validation failed (422) with per-field messages
 * - ok:false with no fieldErrors: a network/server error
 */
export type ContactResult =
  | { ok: true }
  | { ok: false; fieldErrors?: Record<string, string> };

export async function postContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  try {
    const res = await fetch(`${BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 202) return { ok: true };
    if (res.status === 422) {
      const data = (await res.json().catch(() => ({}))) as {
        errors?: Record<string, string>;
      };
      return { ok: false, fieldErrors: data.errors };
    }
    return { ok: false };
  } catch {
    return { ok: false };
  }
}
