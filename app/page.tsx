import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { EventsCarousel } from "@/components/EventsCarousel";
import { MessageListItem } from "@/components/MessageListItem";
import { QuickLinksCard } from "@/components/QuickLinksCard";
import { JoinMissionCard } from "@/components/JoinMissionCard";
import { OurWorkGrid } from "@/components/OurWorkGrid";
import { GalleryHighlights } from "@/components/GalleryHighlights";

import { events } from "@/data/events";
import { latestMessages } from "@/data/messages";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero showQuoteCard />

        {/* Community band: events + latest messages, with sidebar rail */}
        <section className="bg-brand-cream py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Main column */}
              <div className="lg:col-span-8">
                {/* Upcoming Events */}
                <Reveal>
                  <SectionHeader
                    title="Upcoming Events"
                    link={{ label: "View All Events", href: "/events" }}
                  />
                </Reveal>
                <Reveal delay={0.1} className="mt-6">
                  <EventsCarousel events={events} />
                </Reveal>

                {/* Latest Messages */}
                <Reveal className="mt-14">
                  <SectionHeader
                    title="Latest Messages"
                    link={{ label: "View All Messages", href: "/messages" }}
                  />
                </Reveal>
                <Reveal delay={0.1} className="mt-6 space-y-2">
                  {latestMessages.map((message) => (
                    <MessageListItem key={message.id} message={message} />
                  ))}
                </Reveal>
              </div>

              {/* Sidebar rail */}
              <aside className="space-y-6 lg:col-span-4">
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
