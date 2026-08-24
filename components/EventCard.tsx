"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { EventItem } from "@/types";

/** A single upcoming-event card: image + title + description (matches the live site). */
export function EventCard({ event }: { event: EventItem }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Link
        href={event.href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-card"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 1024px) 90vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-serif text-lg font-bold text-brand-ink transition-colors group-hover:text-brand-gold">
            {event.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">
            {event.description}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
