import { HandHeart, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "./ui/Button";

/**
 * Cream/tan CTA card with heading, short copy, gold "Get Involved" button and
 * a faded decorative praying-hands icon in the corner.
 */
export function JoinMissionCard() {
  const { heading, body, cta } = site.mission;

  return (
    <div className="relative overflow-hidden rounded-xl border border-brand-gold/20 bg-brand-creamAlt p-6 shadow-card">
      {/* Decorative faded icon */}
      <HandHeart
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-28 text-brand-gold/15"
      />

      <div className="relative">
        <h3 className="font-serif text-lg font-bold text-brand-ink">{heading}</h3>
        <p className="mt-2 max-w-[85%] text-sm leading-relaxed text-brand-ink/70">
          {body}
        </p>
        <Button href={cta.href} className="mt-5">
          {cta.label}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
