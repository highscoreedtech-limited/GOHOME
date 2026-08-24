/**
 * Centralized image sources. Every image on the site references this map so
 * placeholders can be swapped for real/custom assets in ONE place later.
 *
 * Using picsum.photos with stable `seed` URLs keeps images deterministic
 * across renders (no layout shift / hydration mismatch from random images).
 */

const seed = (name: string, w: number, h: number) =>
  `https://picsum.photos/seed/njc-${name}/${w}/${h}`;

export const images = {
  hero: seed("hero-prayer", 1400, 1200),
  events: {
    novena: seed("event-novena", 640, 480),
    trinity: seed("event-trinity", 640, 480),
    seminar: seed("event-seminar", 640, 480),
  },
  messages: {
    holySpirit: seed("msg-holy-spirit", 200, 160),
    destinyAngels: seed("msg-destiny-angels", 200, 160),
    powerOfPrayer: seed("msg-power-prayer", 200, 160),
  },
  gallery: [
    seed("gallery-1", 480, 360),
    seed("gallery-2", 480, 360),
    seed("gallery-3", 480, 360),
    seed("gallery-4", 480, 360),
    seed("gallery-5", 480, 360),
    seed("gallery-6", 480, 360),
  ],
} as const;
