import type { CalendarEvent } from "@/types";

/**
 * Ministry events for the calendar (frontend-only).
 * Single source of truth: swap this for an API response of the same shape.
 * See `types` CalendarEvent for the three scheduling shapes.
 */
export const calendarEvents: CalendarEvent[] = [
  // Weekly recurring
  {
    id: "weekly-prayer",
    title: "Weekly Prayer Meeting",
    category: "Prayer",
    weekday: 6, // Saturday
    time: "6:00 AM",
    location: "New Jerusalem Prayer Hall, Enugu",
    description:
      "Our weekly gathering for prayer and intercession, held every Saturday morning.",
  },
  {
    id: "weekly-adoration",
    title: "Weekly Adoration",
    category: "Worship",
    weekday: 4, // Thursday
    time: "5:00 PM",
    location: "New Jerusalem City Center, Enugu",
    description:
      "A quiet hour of adoration before the Blessed Sacrament every Thursday evening.",
  },

  // One-off events
  {
    id: "mercy-outreach-sep",
    title: "Mercy Outreach",
    category: "Outreach",
    date: "2026-09-12",
    time: "9:00 AM",
    location: "Enugu Community",
    description:
      "Corporal works of mercy in the community: sharing food, clothing, and care with the less privileged.",
  },
  {
    id: "worship-word-night",
    title: "Worship & Word Night",
    category: "Worship",
    date: "2026-09-26",
    time: "6:00 PM",
    location: "New Jerusalem City Center, Enugu",
    description:
      "An evening of worship, the Word, and testimonies for the whole family.",
  },
  {
    id: "house-seminar",
    title: "House Seminar",
    category: "Seminar",
    date: "2026-10-17",
    time: "10:00 AM",
    location: "New Jerusalem City Center, Enugu",
    description:
      "A seminar addressing the common problems facing God's children and celebrating how far the City has come.",
  },
  {
    id: "november-novena",
    title: "November Novena",
    category: "Novena",
    start: "2026-11-01",
    end: "2026-11-09",
    time: "6:00 AM",
    location: "New Jerusalem Prayer Hall, Enugu",
    description:
      "The biannual novena, nine days of prayer from the 1st to the 9th of November.",
  },
  {
    id: "feast-holy-family",
    title: "Grand Finale: Feast of the Holy Family",
    category: "Feast",
    date: "2026-11-15",
    time: "10:00 AM",
    location: "New Jerusalem City Center, Enugu",
    description:
      "The grand finale of the November Novena, followed by an outreach to the less privileged.",
  },
];
