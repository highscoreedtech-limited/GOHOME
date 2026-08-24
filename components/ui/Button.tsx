"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  gold: "bg-brand-gold text-brand-dark hover:bg-brand-goldLight",
  outline:
    "border border-white/20 text-white hover:border-brand-gold hover:text-brand-goldLight bg-transparent",
  ghost: "text-brand-goldLight hover:text-brand-gold bg-transparent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Polymorphic button: renders a Next <Link> when `href` is given, otherwise a
 * <button>. Wrapped in a Framer Motion tap/hover micro-interaction.
 */
export function Button({
  variant = "gold",
  size = "md",
  href,
  className,
  children,
  type = "button",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link
          href={href}
          className={classes}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
