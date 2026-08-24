import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: a candle/flame-in-a-crown icon mark + serif wordmark with the
 * tagline beneath. Icon is an inline SVG so it inherits the gold accent and
 * needs no external asset.
 */
export function Logo({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <FlameCrownMark className="h-9 w-9 shrink-0 text-brand-gold transition-transform group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-base font-bold tracking-wide text-white sm:text-lg">
          {site.name.toUpperCase()}
        </span>
        {showTagline && (
          <span className="mt-1 text-[10px] font-medium tracking-wide text-brand-goldLight/80">
            {site.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}

/** Decorative flame-in-a-crown glyph. aria-hidden — the Link carries the label. */
function FlameCrownMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Flame */}
      <path
        d="M24 6c2.6 3.4 4.2 6.2 4.2 9.2 0 2.5-1.6 4.3-4.2 4.3s-4.2-1.8-4.2-4.3c0-1.6.5-3 1.4-4.6-.2 2 .8 3.3 2 3.3 1.1 0 1.9-.9 1.9-2.3 0-2-1.2-3.7-1.1-5.6Z"
        fill="currentColor"
      />
      {/* Candle body */}
      <rect x="21.6" y="20.5" width="4.8" height="12" rx="1.2" fill="currentColor" opacity="0.85" />
      {/* Crown base */}
      <path
        d="M12 34l2.8-7 4.4 4 4.8-6 4.8 6 4.4-4 2.8 7c.3.8-.3 1.6-1.1 1.6H13.1c-.8 0-1.4-.8-1.1-1.6Z"
        fill="currentColor"
      />
      <rect x="13" y="37.5" width="22" height="3.2" rx="1.2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
