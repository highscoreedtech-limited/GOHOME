import {
  Library,
  HandHeart,
  Users,
  Gift,
  HeartHandshake,
} from "lucide-react";
import type { MessageItem, QuickLink } from "@/types";
import { images } from "./images";

/**
 * Latest messages shown on the home page.
 *
 * Hand-curated for now (frontend-only). Once the admin panel + backend land,
 * this becomes a query for the most recently published messages
 * (see docs/BACKEND.md "Auto-surfacing new uploads"), so new uploads appear
 * here automatically.
 */
export const latestMessages: MessageItem[] = [
  {
    id: "glory-of-virginity",
    title: "The Glory of Virginity",
    excerpt:
      "If you wish to have it well in your life, put on the pride of virginity...",
    date: "Nov 11, 2015",
    image: "/glory-of-virginity-cover.png",
    href: "/messages/glory-of-virginity",
  },
  {
    id: "do-no-aggrieve",
    title: "Do Not Aggrieve the Holy Spirit",
    excerpt:
      "If what you have to say is not of good and noble purpose, then keep silent...",
    date: "May 18, 2024",
    image: images.messages.holySpirit,
    href: "/messages/do-no-aggrieve",
  },
  {
    id: "destiny-angels",
    title: "Destiny Angels",
    excerpt:
      "Your guardian Angel will never let go, he will keep fighting even at that...",
    date: "May 12, 2024",
    image: images.messages.destinyAngels,
    href: "/messages/destiny-angels",
  },
  {
    id: "power-of-prayer",
    title: "The Power of Prayer",
    excerpt:
      "Prayer changes things. It changes you, it changes others, it changes...",
    date: "May 5, 2024",
    image: images.messages.powerOfPrayer,
    href: "/messages/power-of-prayer",
  },
];

/** Quick links sidebar. */
export const quickLinks: QuickLink[] = [
  { label: "Messages Library", href: "/messages", icon: Library },
  { label: "Prayer Requests", href: "/prayer-requests", icon: HandHeart },
  { label: "Join Our Community", href: "/join", icon: Users },
  { label: "Give / Support", href: "/give", icon: Gift },
  { label: "Volunteer With Us", href: "/volunteer", icon: HeartHandshake },
];
