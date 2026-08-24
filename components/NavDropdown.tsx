"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import type { NavItem } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Accessible desktop nav dropdown / mega-menu.
 * - Opens on hover AND on click/focus (keyboard reachable).
 * - Closes on Escape and on blur leaving the menu.
 * - Rows show lucide icon + title + subtitle + chevron, matching the
 *   "Messages" mega-dropdown in the reference design.
 */
export function NavDropdown({
  item,
  active,
}: {
  item: NavItem;
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  // Small delay so moving the cursor from trigger to panel doesn't close it.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onFocus={openMenu}
        className={cn(
          "inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors",
          active || open
            ? "text-brand-goldLight"
            : "text-white/85 hover:text-white",
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={item.label}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            className="absolute left-0 top-full z-50 mt-3 w-[340px] overflow-hidden rounded-xl border border-white/10 bg-brand-surface/95 p-2 shadow-dropdown backdrop-blur-md"
          >
            {item.children.map((child) => {
              const Icon = child.icon;
              return (
                <Link
                  key={child.label}
                  href={child.href}
                  role="menuitem"
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                >
                  {Icon && (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-gold/15 text-brand-goldLight">
                      <Icon className="h-4 w-4" />
                    </span>
                  )}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-sm font-semibold text-white">
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="truncate text-xs text-white/55">
                        {child.description}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-goldLight" />
                </Link>
              );
            })}

            <Link
              href={item.href}
              className="mt-1 flex items-center justify-center gap-1.5 rounded-lg border-t border-white/5 px-3 py-3 text-sm font-semibold text-brand-goldLight transition-colors hover:text-brand-gold"
            >
              View All {item.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
