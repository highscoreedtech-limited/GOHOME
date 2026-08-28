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
  aboutHero: seed("about-city", 1600, 900),
  aboutStory: seed("about-story", 900, 1100),
  events: {
    novena: seed("event-novena", 640, 480),
    trinity: seed("event-trinity", 640, 480),
    seminar: seed("event-seminar", 640, 480),
  },
  messages: {
    holySpirit: "/holy-spirit-cover.png",
    destinyAngels: "/destiny-angels-cover.png",
    powerOfPrayer: seed("msg-power-prayer", 200, 160),
  },
  // Local gallery photos from /public (swap/add files here as more arrive).
  gallery: [
    "/gallery-1.jpg",
    "/gallery-2.jpg",
    "/gallery-3.jpg",
    "/gallery-4.jpg",
    "/gallery-5.jpg",
    "/gallery-6.jpg",
    "/gallery-7.jpg",
    "/gallery-8.jpg",
    "/gallery-9.jpg",
  ],
} as const;
