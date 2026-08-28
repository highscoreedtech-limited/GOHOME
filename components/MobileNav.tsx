"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import type { NavItem } from "@/types";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

/**
 * Slide-out mobile navigation drawer. Supports nested (accordion) dropdowns
 * for items that have children. Controlled by the Header.
 */
export function MobileNav({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {open && (
        <motion.aside
          key="drawer"
          className="fixed right-0 top-0 z-50 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-brand-darker px-6 pb-10 pt-5 shadow-2xl lg:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          // easeOut starts fast so the drawer feels instant on tap.
          transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
            <div className="flex items-center justify-between">
              <Logo showTagline={false} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-md p-2 text-white/70 hover:bg-white/5 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.nav
              className="mt-8 flex flex-col"
              aria-label="Mobile"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
              initial="hidden"
              animate="show"
            >
              {items.map((item) => {
                const hasChildren = !!item.children?.length;
                const isOpen = expanded === item.label;
                return (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: 24 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.28, ease: "easeOut" },
                      },
                    }}
                    className="border-b border-white/5"
                  >
                    {/* Parent with children: whole row toggles the submenu.
                        Leaf item: the row navigates. */}
                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium text-white/90 transition-colors hover:text-brand-goldLight"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-white/60 transition-transform duration-200",
                            isOpen && "rotate-180 text-brand-goldLight",
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-3.5 text-base font-medium text-white/90 transition-colors hover:text-brand-goldLight"
                      >
                        {item.label}
                      </Link>
                    )}

                    <AnimatePresence initial={false}>
                      {hasChildren && isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          {item.children!.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block border-l border-white/10 py-2.5 pl-4 text-sm text-white/70 transition-colors hover:border-brand-gold hover:text-brand-goldLight"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="mb-1 block border-l border-white/10 py-2.5 pl-4 text-sm font-semibold text-brand-goldLight transition-colors hover:border-brand-gold"
                            >
                              View All {item.label}
                            </Link>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.nav>

            <div className="mt-8">
              <Button href="/join" size="lg" className="w-full" onClick={onClose}>
                Join Us
              </Button>
            </div>
          </motion.aside>
      )}
    </AnimatePresence>
  );
}
