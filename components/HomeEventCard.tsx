"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { EventItem } from "@/types";

/**
 * Compact event card for the demoted "Upcoming Events" grid on the home page:
 * a short thumbnail, a small title, and a brief description.
 */
export function HomeEventCard({ event }: { event: EventItem }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Link
        href={event.href}
        className="group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/[0.06] shadow-sm transition-shadow hover:shadow-card"
      >
        <div className="relative aspect-[2/1] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 90vw, 260px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-serif text-[15px] font-bold leading-snug text-brand-ink transition-colors group-hover:text-brand-gold">
            {event.title}
          </h3>
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-brand-muted">
            {event.description}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
