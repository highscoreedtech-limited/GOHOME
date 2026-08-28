import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { EventCalendar } from "@/components/events/EventCalendar";
import { toKey } from "@/lib/calendar";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Events",
  description:
    "The New Jerusalem City events calendar: weekly prayer and adoration, outreaches, seminars, novenas, and feast celebrations.",
};

// Render dynamically so "today" reflects the actual request day.
export const dynamic = "force-dynamic";

export default function EventsPage() {
  const todayKey = toKey(new Date());

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="What's On"
          title="Events Calendar"
          subtitle="Weekly prayer and adoration, outreaches, seminars, novenas, and feast celebrations across the New Jerusalem City."
          subtitleStyle="plain"
          image={images.aboutHero}
          breadcrumb={[{ label: "Home", href: "/" }]}
        />
        <section className="bg-brand-cream py-14 sm:py-20">
          <Container>
            <EventCalendar todayKey={todayKey} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
