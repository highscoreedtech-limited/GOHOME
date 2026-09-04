import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { cn } from "@/lib/utils";
import type { JacobsWellContent, GalleryImage } from "@/types";

interface JacobsWellPageProps {
  content: JacobsWellContent;
  gallery: GalleryImage[];
}

export function JacobsWellPage({ content, gallery }: JacobsWellPageProps) {
  const { hero, story, stats, howWeHelp, closing } = content;
  const [leadParagraph, ...restOfStory] = story;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        subtitleStyle="plain"
        image={hero.image}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Jacob's Well", href: "/jacobs-well" },
        ]}
      />

      <section className="bg-white py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Lead paragraph, gold accent, larger type */}
            {leadParagraph && (
              <Reveal>
                <p className="border-l-4 border-brand-gold pl-6 text-lg leading-relaxed text-brand-ink sm:text-xl">
                  {leadParagraph}
                </p>
              </Reveal>
            )}

            {/* Remaining paragraphs, each paired with a photo */}
            <div className="mt-10 space-y-10">
              {restOfStory.map((paragraph, i) => {
                const photo = gallery[i];
                const imageOnRight = i % 2 === 0;

                if (!photo) {
                  return (
                    <p key={i} className="text-lg leading-relaxed text-brand-muted">
                      {paragraph}
                    </p>
                  );
                }

                return (
                  <Reveal key={i}>
                    <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
                      <p
                        className={cn(
                          "text-lg leading-relaxed text-brand-muted",
                          imageOnRight ? "md:order-1" : "md:order-2"
                        )}
                      >
                        {paragraph}
                      </p>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className={cn(
                          "h-64 w-full rounded-xl object-cover",
                          imageOnRight ? "md:order-2" : "md:order-1"
                        )}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {stats && stats.length > 0 && (
            <Reveal>
              <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-6 rounded-2xl bg-brand-cream p-8 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-serif text-3xl font-bold text-brand-gold">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-brand-muted">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal>
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-brand-cream p-8">
              <h2 className="font-serif text-2xl text-brand-ink">
                {howWeHelp.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {howWeHelp.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-brand-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto mt-10 max-w-3xl border-l-4 border-brand-gold pl-6">
              <p className="font-serif text-xl italic text-brand-ink">
                &ldquo;{closing.quote}&rdquo;
              </p>
              <p className="mt-2 text-sm text-brand-muted">{closing.note}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-brand-cream py-10 sm:py-14">
        <Container>
          <h2 className="mb-6 text-center font-serif text-2xl text-brand-ink sm:text-3xl">
            {hero.title} in Pictures
          </h2>
          <GalleryGrid images={gallery} />
        </Container>
      </section>

      <section className="bg-brand-dark py-10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-sans text-white">
              Support {hero.title.toLowerCase()} and help this work continue.
            </p>
            <Link
              href="/contact"
              className="rounded-md bg-brand-gold px-6 py-2.5 font-sans text-sm font-medium text-brand-dark transition-colors hover:bg-brand-goldLight"
            >
              Get Involved
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}