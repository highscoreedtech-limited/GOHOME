import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="grid min-h-[60vh] place-items-center bg-brand-dark">
        <Container className="text-center">
          <p className="eyebrow">Page Not Found</p>
          <h1 className="mt-4 font-serif text-5xl font-bold text-white sm:text-6xl">
            404
          </h1>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            The page you are looking for has moved or no longer exists. Let us
            walk you back home.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/" size="lg">
              Return Home
            </Button>
          </div>
          <p className="mt-10">
            <Link
              href="/contact"
              className="text-sm font-semibold text-brand-goldLight hover:text-brand-gold"
            >
              Need help? Contact us
            </Link>
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
