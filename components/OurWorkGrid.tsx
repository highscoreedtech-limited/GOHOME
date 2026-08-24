"use client";

import { motion } from "framer-motion";
import { workItems } from "@/data/work";

/** 4-column pillar grid, each with a circular gold icon badge + label. */
export function OurWorkGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {workItems.map(({ title, icon: Icon }, i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          whileHover={{ y: -4 }}
          className="flex flex-col items-center rounded-xl border border-black/5 bg-white px-4 py-8 text-center shadow-card"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold ring-1 ring-brand-gold/20">
            <Icon className="h-7 w-7" />
          </span>
          <h3 className="mt-4 font-serif text-base font-bold text-brand-ink">
            {title}
          </h3>
        </motion.div>
      ))}
    </div>
  );
}
