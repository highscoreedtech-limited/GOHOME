import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: the New Jerusalem City logo mark (transparent PNG in /public)
 * + serif wordmark with the tagline beneath.
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
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src="/nj-logo.png"
        alt=""
        width={1859}
        height={1470}
        priority
        className="h-11 w-auto shrink-0 object-contain transition-transform group-hover:scale-105"
      />
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
