import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared section heading row: serif title on the left, optional
 * "View All →" gold link on the right. `tone` adapts to light/dark sections.
 */
export function SectionHeader({
  title,
  link,
  tone = "light",
  className,
}: {
  title: string;
  link?: { label: string; href: string };
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <h2
        className={cn(
          "font-serif text-2xl font-bold sm:text-3xl",
          tone === "light" ? "text-brand-ink" : "text-white",
        )}
      >
        {title}
      </h2>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-gold transition-colors hover:text-brand-goldDark"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
