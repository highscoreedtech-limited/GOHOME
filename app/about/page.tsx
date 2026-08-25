import type { Metadata } from "next";
import Image from "next/image";
import {
  Flame,
  Quote,
  Check,
  ArrowRight,
  Ship,
  MapPin,
  CalendarDays,
  User,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { about } from "@/data/about";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story, motto, membership covenant and activities of the Supper Table of the New Jerusalem City, Enugu, Nigeria.",
};

// Icons paired with the "at a glance" facts, in order.
const factIcons: LucideIcon[] = [MapPin, CalendarDays, User, BookOpen];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          eyebrow={about.hero.eyebrow}
          title={about.hero.title}
          subtitle={about.hero.subtitle}
          image={images.aboutHero}
          breadcrumb={[{ label: "Home", href: "/" }]}
        />

        {/* Story + at-a-glance fact card */}
        <section className="bg-brand-cream py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Narrative */}
              <div className="min-w-0 lg:col-span-7">
                <Reveal>
                  <p className="eyebrow text-brand-gold">Our Story</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-brand-ink sm:text-4xl">
                    A ministry prepared in the quiet, for such a time as this
                  </h2>
                </Reveal>

                <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-brand-ink/75 sm:text-base">
                  {about.story.map((paragraph, i) => (
                    <Reveal as="div" key={i} delay={i * 0.05}>
                      {/* Lead paragraph gets a subtle drop-cap emphasis */}
                      <p className={i === 0 ? "text-lg text-brand-ink/85" : ""}>
                        {paragraph}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Sticky fact card + image */}
              <div className="lg:col-span-5">
                <Reveal delay={0.1} className="lg:sticky lg:top-24">
                  <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-card">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={images.aboutStory}
                        alt="Members of the New Jerusalem City in fellowship"
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold text-brand-ink">
                        At a Glance
                      </h3>
                      <dl className="mt-4 space-y-4">
                        {about.facts.map((fact, i) => {
                          const Icon = factIcons[i] ?? MapPin;
                          return (
                            <div key={fact.label} className="flex gap-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
                                <Icon className="h-4 w-4" />
                              </span>
                              <div>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                                  {fact.label}
                                </dt>
                                <dd className="text-sm font-medium text-brand-ink">
                                  {fact.value}
                                </dd>
                              </div>
                            </div>
                          );
                        })}
                      </dl>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* Owner + Motto feature cards */}
        <section className="bg-brand-creamAlt py-16 sm:py-20">
          <Container>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Owner — dark card */}
              <Reveal>
                <div className="flex h-full flex-col justify-center rounded-2xl bg-brand-dark p-8 shadow-card sm:p-10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-goldLight">
                    <Flame className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-serif text-2xl font-bold text-white">
                    {about.owner.heading}
                  </h2>
                  <p className="mt-3 text-white/75">
                    The Chief Executive Officer (CEO), according to our parlance,
                    is the{" "}
                    <span className="font-semibold text-brand-goldLight">
                      Holy Spirit
                    </span>
                    .
                  </p>
                </div>
              </Reveal>

              {/* Motto — gold-accented card */}
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col justify-center rounded-2xl border border-brand-gold/30 bg-white p-8 shadow-card sm:p-10">
                  <Quote className="h-8 w-8 text-brand-gold" aria-hidden="true" />
                  <h2 className="sr-only">{about.motto.heading}</h2>
                  <blockquote className="mt-3">
                    <p className="font-serif text-xl font-medium italic leading-snug text-brand-ink sm:text-2xl">
                      {about.motto.quote}
                    </p>
                    <cite className="mt-4 block text-sm font-semibold not-italic text-brand-gold">
                      — {about.motto.note}
                    </cite>
                  </blockquote>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Membership Requirements — three-pronged covenant */}
        <section className="bg-brand-cream py-16 sm:py-20 lg:py-24">
          <Container>
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow text-brand-gold">The Covenant</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-ink sm:text-4xl">
                {about.membership.heading}
              </h2>
              <p className="mt-4 text-brand-ink/70">{about.membership.intro}</p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {about.membership.covenant.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div className="relative h-full rounded-2xl border border-black/5 bg-white p-7 shadow-card">
                    <span
                      aria-hidden="true"
                      className="font-serif text-5xl font-bold text-brand-gold/25"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-serif text-xl font-bold text-brand-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Activities checklist + Works/Tasks */}
        <section className="bg-brand-dark py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="eyebrow">What We Do</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
                    {about.activities.heading}
                  </h2>
                  <p className="mt-4 max-w-xl text-white/70">
                    {about.activities.intro}
                  </p>
                </Reveal>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {about.activities.items.map((item, i) => (
                    <Reveal as="li" key={item} delay={i * 0.05}>
                      <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-brand-surface/60 p-4">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-dark">
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-white/85">{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* Works / Tasks callout */}
              <div className="lg:col-span-5">
                <Reveal delay={0.15} className="lg:sticky lg:top-24">
                  <div className="rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-brand-surface to-brand-dark p-8">
                    <p className="eyebrow">Works / Tasks</p>
                    <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                      Spiritual &amp; Corporal Works of Mercy
                    </h3>
                    <p className="mt-3 text-white/70">{about.works.body}</p>
                    <Button href={about.works.cta.href} className="mt-6">
                      {about.works.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </section>

        {/* Closing CTA — Enter the Ark */}
        <section className="relative overflow-hidden bg-brand-gold py-20 sm:py-24">
          <Ship
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 text-brand-dark/10"
          />
          <Container className="relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold leading-snug text-brand-dark sm:text-4xl">
                {about.closing.quote}
              </h2>
              <div className="mt-8 flex justify-center">
                <Button
                  href={about.closing.cta.href}
                  size="lg"
                  className="bg-brand-dark text-white hover:bg-brand-darker"
                >
                  {about.closing.cta.label}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
