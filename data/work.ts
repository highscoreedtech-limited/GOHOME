import { HandHeart, HeartHandshake, Baby, Users } from "lucide-react";
import type { WorkItem, GalleryImage } from "@/types";
import { images } from "./images";

/** "Our Work" pillars grid. */
export const workItems: WorkItem[] = [
  { title: "Prayer & Intercession", icon: HandHeart },
  { title: "Mercy Outreach", icon: HeartHandshake },
  { title: "Youth & Children", icon: Baby },
  { title: "Community Support", icon: Users },
];

/**
 * Gallery categories shown as filter pills on the Gallery page.
 * "All" is the default view; the rest match the `category` on each image.
 */
export const galleryCategories = [
  "All",
  "Worship",
  "Outreach",
  "Community",
] as const;

/**
 * Gallery photos with a category and a short caption used by the bento grid
 * overlay and the filter pills. Categories and titles are editable per photo,
 * they simply describe each moment; `src` points at files in /public.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-1",
    src: "/gallery-1.jpg",
    alt: "New Jerusalem City worship gathering",
    category: "Worship",
    title: "Worship Gathering",
  },
  {
    id: "gallery-2",
    src: "/gallery-2.jpg",
    alt: "New Jerusalem City outreach mission",
    category: "Outreach",
    title: "Outreach Mission",
  },
  {
    id: "gallery-3",
    src: "/gallery-3.jpg",
    alt: "New Jerusalem City community life",
    category: "Community",
    title: "Community Life",
  },
  {
    id: "gallery-4",
    src: "/gallery-4.jpg",
    alt: "New Jerusalem City praise and adoration",
    category: "Worship",
    title: "Praise & Adoration",
  },
  {
    id: "gallery-5",
    src: "/gallery-5.jpg",
    alt: "New Jerusalem City reaching the needy",
    category: "Outreach",
    title: "Reaching the Needy",
  },
  {
    id: "gallery-6",
    src: "/gallery-6.jpg",
    alt: "New Jerusalem City fellowship",
    category: "Community",
    title: "Fellowship Together",
  },
  {
    id: "gallery-7",
    src: "/gallery-7.jpg",
    alt: "New Jerusalem City Holy Mass",
    category: "Worship",
    title: "The Holy Mass",
  },
  {
    id: "gallery-8",
    src: "/gallery-8.jpg",
    alt: "New Jerusalem City charity in action",
    category: "Outreach",
    title: "Charity in Action",
  },
  {
    id: "gallery-9",
    src: "/gallery-9.jpg",
    alt: "New Jerusalem City celebration",
    category: "Community",
    title: "Celebration",
  },
];
