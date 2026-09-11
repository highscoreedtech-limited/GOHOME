import type { VideoItem } from "@/types";

/**
 * Videos shown on the /videos page.
 *
 * This is the only place video content lives; the UI reads it through the
 * data-access layer in `lib/videos.ts`. To make a card playable, paste the
 * YouTube video id into `youtubeId` (the part after `watch?v=`), e.g.
 * "dQw4w9WgXcQ". With an id set, the card shows the YouTube thumbnail and
 * plays in a lightbox; without one it shows a branded placeholder and links
 * to the channel. Add a local `thumbnail: "/file.jpg"` to override the image.
 */

/** Canonical category order shown in the filter pills. */
export const VIDEO_CATEGORIES = [
  "All",
  "Sermons",
  "Worship",
  "Testimonies",
  "Events",
] as const;

export const videos: VideoItem[] = [
  {
    id: "power-of-prayer-sunday-service",
    title: "The Power of Prayer, Sunday Service",
    category: "Sermons",
    youtubeId: "",
    duration: "34:12",
    publishedAt: "2025-11-02",
  },
  {
    id: "walking-in-faith-teaching-pt1",
    title: "Walking in Faith, Teaching Series Pt. 1",
    category: "Sermons",
    youtubeId: "",
    duration: "28:47",
    publishedAt: "2025-10-26",
  },
  {
    id: "holy-trinity-feast-live",
    title: "Holy Trinity Feast, Live Recording",
    category: "Events",
    youtubeId: "",
    duration: "1:12:05",
    publishedAt: "2025-10-14",
  },
  {
    id: "a-testimony-of-mercy",
    title: "A Testimony of Mercy",
    category: "Testimonies",
    youtubeId: "",
    duration: "8:23",
    publishedAt: "2025-10-03",
  },
  {
    id: "worship-night-highlights",
    title: "Worship Night Highlights",
    category: "Worship",
    youtubeId: "",
    duration: "15:40",
    publishedAt: "2025-09-21",
  },
  {
    id: "november-novena-day-1",
    title: "November Novena, Day 1",
    category: "Events",
    youtubeId: "",
    duration: "42:10",
    publishedAt: "2025-09-01",
  },
];
