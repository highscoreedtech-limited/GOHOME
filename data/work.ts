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

/** Gallery highlights row. */
export const galleryImages: GalleryImage[] = images.gallery.map((src, i) => ({
  id: `gallery-${i + 1}`,
  src,
  alt: `New Jerusalem City community moment ${i + 1}`,
}));
