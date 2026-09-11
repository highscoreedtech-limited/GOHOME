import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MessagesLibrary } from "@/components/library/MessagesLibrary";

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
        <MessagesLibrary />
      </main>
      <Footer />
    </>
  );
}
