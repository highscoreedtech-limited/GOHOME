import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { navItems } from "@/data/nav";
import { quickLinks } from "@/data/messages";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";

const socials = [
  { label: "Facebook", href: site.social.facebook, icon: Facebook },
  { label: "Instagram", href: site.social.instagram, icon: Instagram },
  { label: "YouTube", href: site.social.youtube, icon: Youtube },
  { label: "Twitter", href: site.social.twitter, icon: Twitter },
];

/** Site footer, dark, four columns, social row, contact info, copyright. */
export function Footer() {
  const year = new Date().getFullYear();
  const primaryLinks = navItems.filter((i) => !i.children).slice(0, 6);

  return (
    <footer className="border-t border-white/10 bg-brand-darker">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-brand-gold hover:text-brand-goldLight"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h4 className="font-serif text-base font-bold text-white">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {primaryLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/60 transition-colors hover:text-brand-goldLight"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get Involved */}
          <nav aria-label="Get involved">
            <h4 className="font-serif text-base font-bold text-white">
              Get Involved
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 transition-colors hover:text-brand-goldLight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-bold text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <span>{site.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" />
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-brand-goldLight"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-brand-goldLight"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="font-serif italic text-brand-goldLight/70">
            {site.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
