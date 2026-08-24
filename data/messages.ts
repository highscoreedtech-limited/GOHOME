import {
  Library,
  HandHeart,
  Users,
  Gift,
  HeartHandshake,
} from "lucide-react";
import type { MessageItem, QuickLink } from "@/types";
import { images } from "./images";

/** Latest messages list. */
export const latestMessages: MessageItem[] = [
  {
    id: "do-no-aggrieve",
    title: "Do No Aggrieve the Holy Spirit",
    excerpt:
      "What you have to say is not of good and noble purpose, then keep silent...",
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
