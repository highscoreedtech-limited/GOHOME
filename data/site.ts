/** Global site metadata + reusable copy blocks. */
export const site = {
  name: "New Jerusalem City",
  tagline: "Prayers. Mercy. Purpose.",
  description:
    "A community of faith devoted to prayers, works of mercy, and living out purpose together.",
  hero: {
    eyebrow:
      "Government of Heaven Outreach Mission Evangelism of the New Jerusalem City",
    title: "GOHOME of the New Jerusalem City",
    body: [] as string[],
    cta: { label: "Know More", href: "/about" },
  },
  encouragement: {
    heading: "Daily Encouragement",
    quote:
      "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    citation: "Joshua 1:9",
    cta: { label: "Read More Messages", href: "/messages" },
  },
  mission: {
    heading: "Join Our Mission",
    body: "Be part of what God is doing through New Jerusalem City.",
    cta: { label: "Get Involved", href: "/join" },
  },
  work: {
    heading: "Our Work",
    body: "We are committed to prayers, charity works and building a community of faith and purpose.",
  },
  contact: {
    email: "suppertableofnewjerusalemcity@gmail.com",
    phone: "+234 803 337 4746",
    phoneAlt: "+234 810 829 9295",
    address: "1 Chukwuma Azide, Enugu, Nigeria.",
    hours: ["Mon to Fri: 9AM to 5PM (WAT)", "Sat: 10AM to 1PM (WAT)"],
  },
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    twitter: "#",
  },
} as const;
