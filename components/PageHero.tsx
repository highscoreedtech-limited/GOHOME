"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Container } from "./ui/Container";

/**
 * Reusable dark hero band for interior pages: background image with scrims,
 * breadcrumb, gold eyebrow, serif title, and optional subtitle.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/40" />
      </div>

      <Container className="relative">
        <div className="max-w-3xl py-20 sm:py-24 lg:py-28">
          {breadcrumb && (
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 flex items-center gap-1.5 text-sm text-white/60"
            >
              {breadcrumb.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-brand-goldLight"
                  >
                    {crumb.label}
                  </Link>
                </span>
              ))}
              <ChevronRight className="h-3.5 w-3.5 text-white/30" />
              <span className="text-brand-goldLight">{title}</span>
            </motion.nav>
          )}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 max-w-2xl font-serif text-lg italic text-brand-goldLight/90 sm:text-xl"
            >
              &ldquo;{subtitle}&rdquo;
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}
