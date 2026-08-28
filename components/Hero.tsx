"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { DailyEncouragementCard } from "./DailyEncouragementCard";

/**
 * Full-width hero. Dark sunset/beach image with a praying silhouette,
 * gold eyebrow, serif headline, supporting copy, and a gold CTA.
 *
 * `showQuoteCard` toggles the floating Daily Encouragement card (one variant);
 * the resting variant instead shows a subtle dove graphic (see DoveGraphic).
 */
export function Hero({ showQuoteCard = true }: { showQuoteCard?: boolean }) {
  const { eyebrow, title, body, cta } = site.hero;

  return (
    <section className="relative overflow-hidden bg-brand-dark" aria-label="Introduction">
      {/* Background image + gradient scrims for text legibility */}
      <div className="absolute inset-0">
        <Image
          src={images.hero}
          alt="A person kneeling in prayer on a beach at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-brand-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-brand-dark/40" />
      </div>

      {/* Subtle dove graphic in the resting variant */}
      {!showQuoteCard && <DoveGraphic />}

      <Container className="relative">
        <div className="grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:py-28">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl font-serif text-base font-medium leading-snug tracking-wide text-brand-goldLight sm:text-lg"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 h-0.5 w-16 rounded-full bg-brand-gold"
            />

            {body.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-white/80 sm:text-lg"
              >
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Button href={cta.href} size="lg">
                {cta.label}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Floating quote card */}
          {showQuoteCard && (
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <DailyEncouragementCard />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Decorative dove used in the resting hero variant. aria-hidden. */
function DoveGraphic() {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 120 90"
      className="pointer-events-none absolute right-[28%] top-24 hidden h-24 w-32 text-white/90 drop-shadow-lg lg:block"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <path
        fill="currentColor"
        d="M10 46c14-6 26-4 34 2 3-14 14-24 30-26-6 6-8 12-7 18 10-4 20-2 28 6-10 0-16 4-19 12-4 10-14 16-27 16-16 0-28-10-32-24-2 8-6 12-12 14 2-10 2-18 5-24Z"
      />
    </motion.svg>
  );
}
