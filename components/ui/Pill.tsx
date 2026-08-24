import { cn } from "@/lib/utils";

/** Small category label pill (Prayer / Outreach / Worship) shown over images. */
export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-brand-gold/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-dark backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
