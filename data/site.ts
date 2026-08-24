/** Global site metadata + reusable copy blocks. */
export const site = {
  name: "New Jerusalem City",
  tagline: "Prayers. Mercy. Purpose.",
  description:
    "A community of faith devoted to prayers, works of mercy, and living out purpose together.",
  hero: {
    eyebrow: "You Are Not Alone",
    title: "Never run the race all alone",
    body: [
      "Join us in our weekly, monthly and daily charity works. You can also join our prayer and weekly activities.",
      "Never be left alone. Strengthen yourself with prayers and works of mercy.",
    ],
    cta: { label: "Learn More About Us", href: "/about" },
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
    email: "hello@newjerusalemcity.org",
    phone: "+234 800 000 0000",
    address: "New Jerusalem City Center, Lagos, Nigeria",
  },
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    twitter: "#",
  },
} as const;
