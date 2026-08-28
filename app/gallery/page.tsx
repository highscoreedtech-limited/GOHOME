import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { galleryImages } from "@/data/work";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Moments from the New Jerusalem City — worship, outreach, and community life in pictures.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Moments"
          title="Gallery"
          subtitle="Worship, outreach, and community life across the New Jerusalem City — captured in pictures."
          subtitleStyle="plain"
          image={images.aboutHero}
          breadcrumb={[{ label: "Home", href: "/" }]}
        />
        <section className="bg-brand-cream py-16 sm:py-20">
          <Container>
            <GalleryGrid images={galleryImages} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
