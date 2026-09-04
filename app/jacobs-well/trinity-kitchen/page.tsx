import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JacobsWellPage } from "@/components/work/JacobsWellPage";
import { trinityKitchen, trinityKitchenGallery } from "@/data/trinity-kitchen";

export const metadata: Metadata = {
  title: "Trinity Kitchen",
  description:
    "Feeding, teaching, and walking with our boys toward the sacraments of the Church.",
};

export default function TrinityKitchenPage() {
  return (
    <>
      <Header />
      <main>
        <JacobsWellPage content={trinityKitchen} gallery={trinityKitchenGallery} />
      </main>
      <Footer />
    </>
  );
}