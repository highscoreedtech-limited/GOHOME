import Link from "next/link";
import { SearchX, FileQuestion, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

/**
 * Reusable empty state (no results / nothing saved yet).
 * `tone` adapts text colors to light vs dark surrounding sections.
 */
export function EmptyState({
  icon: Icon = SearchX,
  title,
  message,
  action,
  tone = "light",
  className,
}: {
  icon?: LucideIcon;
  title: string;
  message?: string;
  action?: { label: string; href: string };
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 text-center",
        dark ? "border-white/15" : "border-black/10",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full",
          dark ? "bg-white/5 text-brand-goldLight" : "bg-brand-gold/10 text-brand-gold",
        )}
      >
        <Icon className="h-6 w-6" />
      </span>
      <h3
        className={cn(
          "mt-4 font-serif text-xl font-bold",
          dark ? "text-white" : "text-brand-ink",
        )}
      >
        {title}
      </h3>
      {message && (
        <p className={cn("mt-2 max-w-sm text-sm", dark ? "text-white/60" : "text-brand-muted")}>
          {message}
        </p>
      )}
      {action && (
        <Button href={action.href} variant="outline" className="mt-6">
          {action.label}
        </Button>
      )}
    </div>
  );
}

/**
 * Reusable error state. Supports either a link action or a callback (e.g.
 * "Try Again" in the reader). Used for "Message not found" and reader errors.
 */
export function ErrorState({
  icon: Icon = FileQuestion,
  title,
  message,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  message?: string;
  action?:
    | { label: string; href: string }
    | { label: string; onClick: () => void };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-md flex-col items-center justify-center px-6 py-20 text-center",
        className,
      )}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
        <Icon className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-serif text-2xl font-bold text-brand-ink">
        {title}
      </h1>
      {message && <p className="mt-2 text-brand-muted">{message}</p>}
      {action &&
        ("href" in action ? (
          <Button href={action.href} className="mt-7">
            {action.label}
          </Button>
        ) : (
          <Button onClick={action.onClick} className="mt-7">
            {action.label}
          </Button>
        ))}
    </div>
  );
}

/** Simple skeleton block. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-black/10", className)}
    />
  );
}

/** Skeleton matching a LibraryCard while (future) async data loads. */
export function LibraryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-card">
      <Skeleton className="aspect-[3/4] w-full rounded-xl" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-4 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-5/6" />
    </div>
  );
}

/** Grid of card skeletons. */
export function LibraryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <LibraryCardSkeleton key={i} />
      ))}
    </div>
  );
}
