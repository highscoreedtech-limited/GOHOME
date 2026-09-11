"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Cross-fading background slideshow for the hero. All slides are mounted and
 * stacked; only the active one is faded in (with a slow Ken Burns zoom), so the
 * transition is a smooth crossfade rather than a mount/unmount, which keeps it
 * reliable across environments. Purely decorative, hidden from screen readers.
 */
export function HeroSlideshow({
  images,
  interval = 5000,
}: {
  images: readonly string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval,
    );
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div aria-hidden="true" className="absolute inset-0">
      {images.map((src, i) => {
        const active = i === index;
        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1.08 : 1.02 }}
            transition={{
              opacity: { duration: 1.3, ease: "easeInOut" },
              scale: { duration: interval / 1000 + 1.3, ease: "linear" },
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
