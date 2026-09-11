import { ArrowRight } from "lucide-react";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { MessagesCarousel } from "@/components/MessagesCarousel";
import { EventsCarousel } from "@/components/EventsCarousel";
import { QuickLinksCard } from "@/components/QuickLinksCard";
import { JoinMissionCard } from "@/components/JoinMissionCard";
import { OurWorkGrid } from "@/components/OurWorkGrid";
import { GalleryHighlights } from "@/components/GalleryHighlights";

import { events } from "@/data/events";
import { getFeaturedItems } from "@/lib/library";
import { site } from "@/data/site";

export default function HomePage() {
  const promoted = getFeaturedItems().slice(0, 3);

  return (
    <>
      <Header />

      <main>
        <Hero showQuoteCard />

        {/* Content band: promoted messages, then demoted events + sidebar */}
        <section className="bg-brand-cream pb-16 pt-12 sm:pb-20 sm:pt-14">
          <Container>
            {/* PRIMARY: Messages from the Holy Spirit */}
            <div className="border-t border-brand-gold/25 pt-12 sm:pt-14">
              <Reveal className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow text-brand-gold">Words For Today</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-brand-ink sm:text-4xl">
                    Messages from the Holy Spirit
                  </h2>
                  <p className="mt-3 max-w-xl text-brand-muted">
                    Prayers, teachings and prophetic words shared with the New
                    Jerusalem City family.
                  </p>
                </div>
                <Button href="/messages" size="lg" className="shrink-0 text-white">
                  View All Messages
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>

              <Reveal delay={0.1} className="mt-9">
                <MessagesCarousel items={promoted} />
              </Reveal>
            </div>

            {/* SECONDARY: Upcoming Events (demoted) + sidebar */}
            <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-10">
              <div className="min-w-0 lg:col-span-2">
                <Reveal className="flex items-baseline justify-between gap-4">
                  <h2 className="font-serif text-xl font-bold text-brand-ink sm:text-2xl">
                    Upcoming Events
                  </h2>
                  <a
                    href="/events"
                    className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-gold transition-colors hover:text-brand-goldDark"
                  >
                    View All Events
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Reveal>

                <Reveal delay={0.1} className="mt-6">
                  <EventsCarousel events={events} />
                </Reveal>
              </div>

              {/* Sidebar rail */}
              <aside className="min-w-0 space-y-6">
                <Reveal>
                  <QuickLinksCard />
                </Reveal>
                <Reveal delay={0.1}>
                  <JoinMissionCard />
                </Reveal>
              </aside>
            </div>
          </Container>
        </section>

        {/* Our Work */}
        <section className="bg-brand-creamAlt py-16 sm:py-20 lg:py-24">
          <Container>
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-bold text-brand-ink sm:text-3xl">
                {site.work.heading}
              </h2>
              <p className="mt-3 text-brand-muted">{site.work.body}</p>
            </Reveal>
            <div className="mt-10">
              <OurWorkGrid />
            </div>
          </Container>
        </section>

        {/* Gallery Highlights */}
        <section className="bg-brand-cream py-16 sm:py-20 lg:py-24">
          <Container>
            <Reveal>
              <SectionHeader
                title="Gallery Highlights"
                link={{ label: "View Gallery", href: "/gallery" }}
              />
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <GalleryHighlights />
            </Reveal>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
