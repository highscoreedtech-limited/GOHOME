import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowDown,
  Utensils,
  HeartHandshake,
  BookOpen,
  Flame,
  UserCheck,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { JacobsWellContent } from "@/types";

/**
 * Bespoke Trinity Kitchen page (a Jacob's Well work of charity): a dark hero,
 * a mission quote, the boys' three-step journey (feeding, teaching, the
 * sacraments), a dark "how we serve" grid, a pull quote, a photo spread, and a
 * closing call to support. Copy is read from the trinity-kitchen data; the
 * step scaffolding and icons are presentational.
 */

/** Icons for the "How We Serve the Boys" grid, in the order of the data items. */
const SERVE_ICONS: LucideIcon[] = [
  Utensils,
  HeartHandshake,
  BookOpen,
  Flame,
  UserCheck,
  Heart,
];

export function TrinityKitchenPage({
  content,
}: {
  content: JacobsWellContent;
}) {
  const { hero, story, howWeHelp, closing } = content;
  const [mission, feeding, teaching, sacraments] = story;

  const steps = [
    {
      num: "01",
      eyebrow: "First, A Table",
      title: "Feeding the Boys",
      body: feeding,
      image: "/tk-classroom.jpg",
    },
    {
      num: "02",
      eyebrow: "Then, The Word",
      title: "Teaching the Faith",
      body: teaching,
      image: "/tk-tent-teaching.jpg",
    },
    {
      num: "03",
      eyebrow: "At Last, The Sacraments",
      title: "Toward Baptism & Communion",
      body: sacraments,
      image: "/Trinity-k1.jpg",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-dark">
        {/* Dot texture + warm glow */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(169,134,58,0.5)_1px,transparent_1px)] [background-size:34px_34px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(169,134,58,0.16)_0%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        />

        <Container className="relative">
          <div className="flex min-h-[460px] flex-col justify-center py-20 sm:min-h-[520px]">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-xs text-brand-cream/60 sm:text-sm"
            >
              <Link href="/" className="transition-colors hover:text-brand-goldLight">
                Home
              </Link>
              <ArrowRight className="h-3 w-3 text-brand-cream/40" />
              <Link
                href="/jacobs-well"
                className="transition-colors hover:text-brand-goldLight"
              >
                Jacob&apos;s Well
              </Link>
              <ArrowRight className="h-3 w-3 text-brand-cream/40" />
              <span className="text-brand-goldLight">Trinity Kitchen</span>
            </nav>

            <Reveal>
              <p className="eyebrow text-brand-goldLight">{hero.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl font-bold leading-[0.98] text-brand-cream sm:text-6xl lg:text-7xl">
                {hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-cream/80">
                {hero.subtitle}
              </p>

              <div className="mt-9 flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-brand-gold px-7 py-3.5 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-goldLight"
                >
                  Support This Work
                </Link>
                <a
                  href="#journey"
                  className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-brand-cream/40 px-7 py-3.5 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-cream hover:bg-white/5"
                >
                  See the Boys&apos; Journey
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* MISSION QUOTE */}
      <section className="bg-brand-cream pt-16 sm:pt-20">
        <Container>
          <Reveal>
            <blockquote className="relative mx-auto flex max-w-4xl gap-6 rounded-2xl border border-brand-gold/20 bg-white p-8 shadow-[0_18px_44px_rgba(27,23,18,0.06)] sm:gap-8 sm:p-12">
              <span
                aria-hidden
                className="shrink-0 font-serif text-6xl leading-none text-brand-gold/40"
              >
                &ldquo;
              </span>
              <p className="font-serif text-xl font-medium italic leading-relaxed text-brand-ink sm:text-2xl">
                {mission}
              </p>
            </blockquote>
          </Reveal>
        </Container>
      </section>

      {/* THE BOYS' JOURNEY */}
      <section id="journey" className="scroll-mt-24 bg-brand-cream py-20 sm:py-28">
        <Container>
          <Reveal className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
            <p className="eyebrow text-brand-goldDark">How It Unfolds</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-ink sm:text-4xl">
              The Boys&apos; Journey
            </h2>
          </Reveal>

          <div className="space-y-16 sm:space-y-24">
            {steps.map((step, i) => (
              <Reveal
                key={step.num}
                className={cnRow(i % 2 === 1)}
              >
                {/* Text */}
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark font-serif text-base font-bold text-brand-goldLight">
                      {step.num}
                    </span>
                    <span className="eyebrow text-brand-goldDark">
                      {step.eyebrow}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-ink sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 leading-[1.75] text-brand-muted">
                    {step.body}
                  </p>
                </div>

                {/* Media */}
                <div className="flex-1">
                  {step.image ? (
                    <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-brand-gold/15 shadow-[0_24px_50px_rgba(27,23,18,0.14)]">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 520px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/11] items-center justify-center rounded-2xl border border-brand-gold/15 bg-gradient-to-br from-brand-ink to-brand-dark shadow-[0_24px_50px_rgba(27,23,18,0.14)]">
                      <Flame
                        className="h-16 w-16 text-brand-gold"
                        strokeWidth={1.1}
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW WE SERVE THE BOYS */}
      <section className="bg-brand-dark py-20 sm:py-24">
        <Container>
          <Reveal className="mx-auto mb-14 max-w-xl text-center">
            <p className="eyebrow text-brand-goldLight">What We Provide</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-brand-cream sm:text-4xl">
              {howWeHelp.heading}
            </h2>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {howWeHelp.items.map((item, i) => {
              const Icon = SERVE_ICONS[i % SERVE_ICONS.length];
              return (
                <Reveal
                  key={item}
                  delay={Math.min(i * 0.05, 0.3)}
                  className="bg-brand-dark p-8 sm:p-9"
                >
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/15">
                    <Icon className="h-5 w-5 text-brand-gold" strokeWidth={1.7} />
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-brand-cream">
                    {serveTitle(item)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-cream/60">
                    {item}.
                  </p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-brand-cream py-24 sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <span
              aria-hidden
              className="font-serif text-6xl leading-none text-brand-gold/40"
            >
              &ldquo;
            </span>
            <p className="mt-3 font-serif text-2xl font-medium italic leading-[1.5] text-brand-ink sm:text-3xl">
              {closing.quote}
            </p>
            <p className="eyebrow mt-6 text-brand-goldDark">{closing.note}</p>
          </Reveal>
        </Container>
      </section>

      {/* TRINITY KITCHEN IN PICTURES */}
      <section className="bg-brand-cream pb-24 sm:pb-28">
        <Container>
          <Reveal className="mb-11 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-brand-goldDark">Moments</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-brand-ink sm:text-4xl">
                Trinity Kitchen in Pictures
              </h2>
            </div>
            <Link
              href="/gallery"
              className="group inline-flex shrink-0 items-center gap-2 rounded-md border-[1.5px] border-brand-goldDark px-6 py-3 text-sm font-semibold text-brand-goldDark transition-colors hover:bg-brand-goldDark hover:text-white"
            >
              See the Full Gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <PictureCard
              src="/tk-classroom.jpg"
              category="Catechism"
              title="Gathered for the Word"
            />
            <PictureCard
              src="/tk-tent-teaching.jpg"
              category="Teaching"
              title="A Father Among the Boys"
            />
          </Reveal>

          <p className="mt-5 text-sm text-brand-muted">
            More photos from Trinity Kitchen coming soon, this spread will grow
            into a full grid as new moments are shared.
          </p>
        </Container>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-gradient-to-br from-brand-goldDark to-brand-gold px-6 py-20 text-center">
        <Reveal className="mx-auto max-w-xl">
          <h2 className="font-serif text-3xl font-bold text-brand-dark sm:text-4xl">
            Help Set a Table for These Boys
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-brand-dark/80">
            Your support feeds, teaches, and walks a boy toward the sacraments of
            the Church.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center rounded-md bg-brand-dark px-8 py-4 text-sm font-bold text-brand-cream transition-colors hover:bg-brand-darker"
          >
            Support Trinity Kitchen
          </Link>
        </Reveal>
      </section>
    </>
  );
}

/** A caption card for the photo spread. */
function PictureCard({
  src,
  category,
  title,
}: {
  src: string;
  category: string;
  title: string;
}) {
  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-2xl shadow-[0_20px_46px_rgba(27,23,18,0.12)] lg:min-h-[360px]">
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 620px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-brand-goldLight">
          {category}
        </p>
        <h3 className="font-serif text-lg font-semibold text-brand-cream">
          {title}
        </h3>
      </div>
    </div>
  );
}

/** Alternate the row direction so photos zig-zag down the page. */
function cnRow(reverse: boolean): string {
  return [
    "flex flex-col items-center gap-8 lg:gap-16",
    reverse ? "lg:flex-row-reverse" : "lg:flex-row",
  ].join(" ");
}

/** Derive a short heading from a "how we serve" item sentence. */
function serveTitle(item: string): string {
  const map: Record<string, string> = {
    "Daily meals and a safe place to gather": "Daily Meals & Shelter",
    "Personal mentorship and Christian teaching": "Mentorship & Teaching",
    "Weekly catechism classes on the faith": "Weekly Catechism",
    "Preparation for Baptism": "Preparation for Baptism",
    "Preparation for Confirmation and Holy Communion":
      "Confirmation & Communion",
    "Ongoing support after the sacraments are received": "Ongoing Support",
  };
  return map[item] ?? item;
}
