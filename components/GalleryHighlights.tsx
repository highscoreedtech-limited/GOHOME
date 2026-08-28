"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/work";

/**
 * Row of rounded gallery thumbnails. Horizontally scroll-snaps on small
 * screens; settles into a grid on larger ones.
 */
export function GalleryHighlights() {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-5">
      {galleryImages.slice(0, 4).map((img, i) => (
        <motion.figure
          key={img.id}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="group relative aspect-[4/3] w-[80%] shrink-0 snap-start overflow-hidden rounded-xl sm:w-auto"
        >
          <Link
            href="/gallery"
            aria-label={`${img.alt}, open gallery`}
            className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-dark/0 transition-colors group-hover:bg-brand-dark/25" />
          </Link>
        </motion.figure>
      ))}
    </div>
  );
}
