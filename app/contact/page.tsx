import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  HandHeart,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/data/site";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Share your views, questions and thoughts with the New Jerusalem City. You can also send in your prayer and special requests.",
};

const socials = [
  { label: "Facebook", href: site.social.facebook, icon: Facebook },
  { label: "Instagram", href: site.social.instagram, icon: Instagram },
  { label: "YouTube", href: site.social.youtube, icon: Youtube },
  { label: "Twitter", href: site.social.twitter, icon: Twitter },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="Share your views, questions and thoughts with us. You can also send in your prayer and special requests."
          subtitleStyle="plain"
          image={images.aboutHero}
          breadcrumb={[{ label: "Home", href: "/" }]}
        />

        <section className="bg-brand-cream py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
              {/* Contact details */}
              <div className="lg:col-span-2">
                <ul className="space-y-5">
                  <ContactRow icon={Mail} label="Email">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="break-all transition-colors hover:text-brand-gold"
                    >
                      {site.contact.email}
                    </a>
                  </ContactRow>
                  <ContactRow icon={Phone} label="Phone">
                    <span className="flex flex-col">
                      <a
                        href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-brand-gold"
                      >
                        {site.contact.phone}
                      </a>
                      <a
                        href={`tel:${site.contact.phoneAlt.replace(/\s/g, "")}`}
                        className="transition-colors hover:text-brand-gold"
                      >
                        {site.contact.phoneAlt}
                      </a>
                    </span>
                  </ContactRow>
                  <ContactRow icon={MapPin} label="Address">
                    {site.contact.address}
                  </ContactRow>
                  <ContactRow icon={Clock} label="Opening Hours">
                    <span className="flex flex-col">
                      {site.contact.hours.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  </ContactRow>
                </ul>

                {/* Prayer request note */}
                <div className="mt-8 flex gap-3 rounded-2xl border border-brand-gold/20 bg-brand-creamAlt p-5">
                  <HandHeart className="h-6 w-6 shrink-0 text-brand-gold" />
                  <p className="text-sm text-brand-ink/75">
                    Have a prayer or special request? Send it through the form
                    and our intercessors will stand with you in prayer.
                  </p>
                </div>

                {/* Social */}
                <div className="mt-8">
                  <p className="text-sm font-semibold text-brand-ink">
                    Follow the ministry
                  </p>
                  <div className="mt-3 flex gap-2">
                    {socials.map(({ label, href, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-brand-ink/70 transition-colors hover:border-brand-gold hover:text-brand-gold"
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
          {label}
        </p>
        <p className="text-brand-ink">{children}</p>
      </div>
    </li>
  );
}
