import type { EventItem } from "@/types";
import { images } from "./images";

/** Upcoming events (content mirrors the live New Jerusalem City site). */
export const events: EventItem[] = [
  {
    id: "november-novena",
    title: "November Novena",
    description:
      "The six-monthly novena, starting from the 1st to the 9th of November.",
    image: images.events.novena,
    href: "/events/november-novena",
  },
  {
    id: "holy-trinity-feast",
    title: "Holy Trinity Feast",
    description:
      "The Holy Trinity feast, a feast held during the Catholic Church's Holy Trinity feast day.",
    image: images.events.trinity,
    href: "/events/holy-trinity-feast",
  },
  {
    id: "house-seminar",
    title: "House Seminar",
    description:
      "A seminar targeting the common problems facing God's children and celebrating how far the city has come. This June, 2026.",
    image: images.events.seminar,
    href: "/events/house-seminar",
  },
];
