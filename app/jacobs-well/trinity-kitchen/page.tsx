import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrinityKitchenPage } from "@/components/work/TrinityKitchenPage";
import { trinityKitchen } from "@/data/trinity-kitchen";

export const metadata: Metadata = {
  title: "Trinity Kitchen",
  description:
    "Feeding, teaching, and walking with our boys toward the sacraments of the Church.",
};

export default function TrinityKitchenRoute() {
  return (
    <>
      <Header />
      <main>
        <TrinityKitchenPage content={trinityKitchen} />
      </main>
      <Footer />
    </>
  );
}