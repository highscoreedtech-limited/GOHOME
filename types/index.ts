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

/** Gallery thumbnail. */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}
