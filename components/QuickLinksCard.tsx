import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { quickLinks } from "@/data/messages";

/** Sidebar card listing quick links, each with a lucide icon. */
export function QuickLinksCard() {
  return (
    <div className="rounded-xl border border-black/5 bg-white p-6 shadow-card">
      <h3 className="font-serif text-lg font-bold text-brand-ink">Quick Links</h3>
      <ul className="mt-4 space-y-1">
        {quickLinks.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              className="group flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-brand-ink/90 transition-colors hover:bg-brand-cream"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-gold/10 text-brand-gold">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 font-medium">{label}</span>
              <ChevronRight className="h-4 w-4 text-brand-muted/50 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-gold" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
