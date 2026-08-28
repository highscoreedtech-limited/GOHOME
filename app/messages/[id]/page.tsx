import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, BookText, Layers } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { ErrorState } from "@/components/ui/States";
import { BookCover } from "@/components/library/BookCover";
import { BookmarkButton } from "@/components/library/BookmarkButton";
import { ReadCta } from "@/components/library/ReadCta";
import { getAllItems, getItemById, hasChapters } from "@/lib/library";

// Pre-render a static page per resource (data is local).
export function generateStaticParams() {
  return getAllItems().map((item) => ({ id: item.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const item = getItemById(params.id);
  if (!item) return { title: "Message not found" };
  return {
    title: item.title,
    description: item.description,
  };
}

export default function MessageDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const item = getItemById(params.id);

  if (!item) {
    return (
      <>
        <Header />
        <main className="bg-brand-cream">
          <ErrorState
            title="Message not found"
            message="The message you're looking for could not be found."
            action={{ label: "Back to Messages Library", href: "/messages" }}
          />
        </main>
        <Footer />
      </>
    );
  }

  const chaptered = hasChapters(item);

  return (
    <>
      <Header />
      <main className="bg-brand-cream py-10 sm:py-14">
        <Container>
          <Link
            href="/messages"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-gold transition-colors hover:text-brand-goldDark"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Messages Library
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            {/* Left: cover + actions */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <BookCover
                  src={item.coverImage}
                  title={item.title}
                  category={item.category}
                  className="mx-auto aspect-[3/4] w-full max-w-[280px] rounded-2xl shadow-card"
                  sizes="(max-width: 1024px) 280px, 320px"
                  priority
                />

                <div className="mx-auto mt-6 max-w-[280px] space-y-3">
                  <ReadCta id={item.id} />
                  <BookmarkButton
                    id={item.id}
                    variant="labelled"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right: details */}
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
                {item.category}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-brand-ink sm:text-4xl">
                {item.title}
              </h1>
              <p className="mt-2 text-brand-muted">by {item.author}</p>

              {/* Optional metadata, only present fields */}
              {(item.estimatedReadingTime || item.pages || chaptered) && (
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-brand-ink/70">
                  {item.estimatedReadingTime && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-brand-gold" />
                      {item.estimatedReadingTime}
                    </span>
                  )}
                  {item.pages && (
                    <span className="inline-flex items-center gap-1.5">
                      <BookText className="h-4 w-4 text-brand-gold" />
                      {item.pages} pages
                    </span>
                  )}
                  {chaptered && (
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-brand-gold" />
                      {item.chapters!.length} chapters
                    </span>
                  )}
                </div>
              )}

              <p className="mt-6 text-lg leading-relaxed text-brand-ink/80">
                {item.description}
              </p>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-ink/70 ring-1 ring-black/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Optional Table of Contents */}
              {chaptered && (
                <div className="mt-10">
                  <h2 className="font-serif text-xl font-bold text-brand-ink">
                    Table of Contents
                  </h2>
                  <ol className="mt-4 divide-y divide-black/5 overflow-hidden rounded-2xl border border-black/5 bg-white">
                    {item.chapters!.map((chapter, i) => (
                      <li key={chapter.id}>
                        <Link
                          href={`/messages/${item.id}/read#${chapter.id}`}
                          className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-brand-cream"
                        >
                          <span className="font-serif text-lg font-bold text-brand-gold/40">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-medium text-brand-ink group-hover:text-brand-gold">
                            {chapter.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
