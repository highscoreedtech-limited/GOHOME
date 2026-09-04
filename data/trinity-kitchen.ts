import type { GalleryImage, JacobsWellContent } from "@/types";
import { images } from "@/data/images";

/** Content for the Trinity Kitchen page (part of Jacob's Well). */
export const trinityKitchen: JacobsWellContent = {
  hero: {
    eyebrow: "Jacob's Well",
    title: "Trinity Kitchen",
    subtitle:
      "Feeding, teaching, and walking with our boys toward the sacraments of the Church.",
    image: "/Trinity-k1.jpg",
  },

  // Narrative paragraphs (the ministry's story with the boys).
  story: [
    "Trinity Kitchen is a work of charity under Jacob's Well, caring for boys who would otherwise go without a warm meal, a place to belong, or anyone to speak to them about Christ. We open our doors and our table to them, just as the Holy Spirit instructed us: to toil for the needy for their eternal life through the yoke of charity.",
    "Feeding the boys is where the work begins, but it is not where it ends. Around the same table where they eat, we sit with them, listen to them, and teach them about Jesus Christ. Many of the boys come to us knowing little or nothing of the faith. We introduce them gently, through stories, songs, and simple daily conversation, before leading them into structured catechism classes.",
    "In catechism, the boys are taught the foundations of the Catholic faith: the creed, the sacraments, the commandments, and how to pray. Classes are held regularly and are paced to meet each boy where he is, some are just beginning to hear the Gospel, others are already preparing for their sacraments.",
    "As the boys grow in understanding and faith, we walk them toward Baptism and, in time, toward Confirmation and Holy Communion, all administered by our Reverend Fathers. Every boy who completes his catechism and receives these sacraments becomes fully part of the family of the Church, not just a recipient of a meal, but a son welcomed into the household of God.",
  ],

  howWeHelp: {
    heading: "How We Serve the Boys",
    items: [
      "Daily meals and a safe place to gather",
      "Personal mentorship and Christian teaching",
      "Weekly catechism classes on the faith",
      "Preparation for Baptism",
      "Preparation for Confirmation and Holy Communion",
      "Ongoing support after the sacraments are received",
    ],
  },

  closing: {
    quote:
      "Toiling for the needy for their eternal life through the yoke of charity.",
    note: "As given by the Holy Spirit",
  },
};

/** Trinity Kitchen photo gallery, sourced from the central images map. */
export const trinityKitchenGallery: GalleryImage[] =
  images.jacobsWell.trinityKitchen.map((src, i) => ({
    id: `trinity-kitchen-${i + 1}`,
    src,
    alt: `Trinity Kitchen, photo ${i + 1}`,
  }));