import {
  Globe2,
  Users,
  Baby,
  Church,
  Utensils,
  Stethoscope,
  Accessibility,
  Home,
  Building2,
  HandHeart,
  Layers,
} from "lucide-react";
import type { NavItem } from "@/types";

/**
 * Primary navigation. Items with `children` render as dropdowns.
 * The "Messages" item is the mega-dropdown shown in the reference design.
 */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Messages",
    href: "/messages",
    children: [
      {
        label: "To Nations",
        href: "/messages/nations",
        description: "Messages for the world",
        icon: Globe2,
      },
      {
        label: "To Parents",
        href: "/messages/parents",
        description: "Guidance for parents",
        icon: Users,
      },
      {
        label: "Youth/Children",
        href: "/messages/youth",
        description: "Messages for young hearts",
        icon: Baby,
      },
      {
        label: "Churches/Religious",
        href: "/messages/churches",
        description: "For churches and ministries",
        icon: Church,
      },
    ],
  },
  {
    label: "Tiers",
    href: "/tiers",
    children: [
      {
        label: "Tier of Charity",
        href: "/tiers/charity",
        description: "Acts of mercy and giving",
        icon: HandHeart,
      },
      {
        label: "Tier of Project",
        href: "/tiers/project",
        description: "Building and development works",
        icon: Layers,
      },
    ],
  },
  {
    label: "Jacob's Well",
    href: "/jacobs-well",
    children: [
      {
        label: "Trinity Kitchen",
        href: "/jacobs-well/trinity-kitchen",
        description: "Feeding the hungry",
        icon: Utensils,
      },
      {
        label: "Motherless Babies' Home",
        href: "/jacobs-well/motherless-babies-home",
        description: "Care for motherless babies",
        icon: Baby,
      },
      {
        label: "Hospital Visitation",
        href: "/jacobs-well/hospital-visitation",
        description: "Comfort for the sick",
        icon: Stethoscope,
      },
      {
        label: "Sharing To Paraplegic",
        href: "/jacobs-well/sharing-to-paraplegic",
        description: "Support for the paralysed",
        icon: Accessibility,
      },
      {
        label: "Home For The Elderly",
        href: "/jacobs-well/home-for-the-elderly",
        description: "Care for our elders",
        icon: Home,
      },
      {
        label: "Rehabilitation Centres",
        href: "/jacobs-well/rehabilitation-centres",
        description: "Restoring lives",
        icon: Building2,
      },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
