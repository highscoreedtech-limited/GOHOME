import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { MessagesLibrary } from "@/components/library/MessagesLibrary";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Messages Library",
  description:
    "Explore messages, books, devotionals, prayer guides and resources designed to strengthen your faith and deepen your spiritual journey.",
};

export default function MessagesLibraryPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Read & Grow"
          title="Messages Library"
          subtitle="Explore messages, books, devotionals, prayer guides and resources designed to strengthen your faith and deepen your spiritual journey."
          subtitleStyle="plain"
          image={images.aboutHero}
          breadcrumb={[{ label: "Home", href: "/" }]}
        />
        <MessagesLibrary />
      </main>
      <Footer />
    </>
  );
}
