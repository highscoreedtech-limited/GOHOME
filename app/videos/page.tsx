import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { VideoGrid } from "@/components/videos/VideoGrid";
import { getAllVideos, getActiveVideoCategories } from "@/lib/videos";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Sermons, worship nights and testimonies from the New Jerusalem City, straight from our YouTube channel.",
};

export default function VideosPage() {
  const videos = getAllVideos();
  const categories = getActiveVideoCategories();

  return (
    <>
      <Header />
      <main>
        <section className="bg-brand-cream pb-16 pt-12 sm:pb-20 sm:pt-16">
          <Container>
            <Reveal>
              <p className="eyebrow text-brand-goldDark">Watch</p>
              <h1 className="mt-3.5 max-w-2xl font-serif text-4xl font-bold leading-[1.1] text-brand-ink sm:text-5xl">
                Videos
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-brand-muted">
                Sermons, worship nights and testimonies from the New Jerusalem
                City, straight from our YouTube channel.
              </p>
            </Reveal>

            <div className="mt-9 border-t border-black/10 pt-6">
              <VideoGrid
                videos={videos}
                categories={categories}
                channelUrl={site.social.youtube}
              />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
