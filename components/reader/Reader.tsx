"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Coffee,
  List,
  X,
  Bookmark,
  BookmarkCheck,
  Minus,
  Plus,
} from "lucide-react";
import type { LibraryItem, ReaderTheme } from "@/types";
import { getReadableBlocks, hasChapters } from "@/lib/library";
import { useBookmarks, useReaderPrefs, useReading, getReadingRecord } from "@/lib/reading";
import { ErrorState } from "@/components/ui/States";
import { cn } from "@/lib/utils";

// Reading font sizes (px) indexed by prefs.fontScale.
const FONT_SIZES = [16, 18, 20, 23];
const DEFAULT_FONT_INDEX = 1;

type ThemeTokens = {
  page: string;
  bar: string;
  border: string;
  muted: string;
  faintBg: string;
  control: string;
  controlActive: string;
};

const THEMES: Record<ReaderTheme, ThemeTokens> = {
  light: {
    page: "bg-brand-cream text-brand-ink",
    bar: "bg-brand-cream/90",
    border: "border-black/10",
    muted: "text-brand-muted",
    faintBg: "bg-black/5",
    control: "text-brand-ink/70 hover:bg-black/5",
    controlActive: "bg-brand-gold text-brand-dark",
  },
  sepia: {
    page: "bg-[#f4ecd8] text-[#43392a]",
    bar: "bg-[#f4ecd8]/90",
    border: "border-[#43392a]/15",
    muted: "text-[#43392a]/60",
    faintBg: "bg-[#43392a]/10",
    control: "text-[#43392a]/70 hover:bg-[#43392a]/10",
    controlActive: "bg-brand-gold text-brand-dark",
  },
  dark: {
    page: "bg-brand-darker text-white/80",
    bar: "bg-brand-darker/90",
    border: "border-white/10",
    muted: "text-white/50",
    faintBg: "bg-white/5",
    control: "text-white/70 hover:bg-white/10",
    controlActive: "bg-brand-gold text-brand-dark",
  },
};

export function Reader({ item }: { item: LibraryItem }) {
  const blocks = useMemo(() => getReadableBlocks(item), [item]);
  const chaptered = hasChapters(item);

  const { prefs, setFontScale, setTheme } = useReaderPrefs();
  const { isSaved, toggle } = useBookmarks();
  const { setProgress } = useReading();

  const [progress, setLocalProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const restoredRef = useRef(false);
  const blockEls = useRef<(HTMLElement | null)[]>([]);

  const theme = THEMES[prefs.theme] ?? THEMES.light;
  const fontSize = FONT_SIZES[prefs.fontScale] ?? FONT_SIZES[DEFAULT_FONT_INDEX];
  const saved = isSaved(item.id);

  /* On mount: jump to a #chapter hash if present (from the details TOC),
     otherwise restore the last saved reading position. Runs once. */
  useEffect(() => {
    if (restoredRef.current || blocks.length === 0) return;
    restoredRef.current = true;

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        requestAnimationFrame(() =>
          target.scrollIntoView({ block: "start" }),
        );
        return;
      }
    }

    const savedProgress = getReadingRecord(item.id)?.progress ?? 0;
    if (savedProgress > 0.02) {
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, savedProgress * h);
      });
    }
  }, [item.id, blocks.length]);

  /* Track scroll progress (rAF-throttled) and persist it. */
  useEffect(() => {
    if (blocks.length === 0) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 1;
        setLocalProgress(p);
        setProgress(item.id, p);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [item.id, setProgress, blocks.length]);

  /* Scroll-spy for the active chapter (only when chaptered). */
  useEffect(() => {
    if (!chaptered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const idx = blockEls.current.indexOf(visible[0].target as HTMLElement);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    blockEls.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [chaptered, blocks.length]);

  /* Close popovers/drawers with Escape. */
  useEffect(() => {
    if (!settingsOpen && !tocOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSettingsOpen(false);
        setTocOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen, tocOpen]);

  const scrollToBlock = useCallback((index: number) => {
    const el = blockEls.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  }, []);

  const fontDown = () => setFontScale(Math.max(0, prefs.fontScale - 1));
  const fontUp = () =>
    setFontScale(Math.min(FONT_SIZES.length - 1, prefs.fontScale + 1));

  const pct = Math.round(progress * 100);

  if (blocks.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <ErrorState
          title="Unable to open this message"
          message="This message has no readable content yet."
          action={{ label: "Back to Messages Library", href: "/messages" }}
        />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen transition-colors", theme.page)}>
      {/* Toolbar */}
      <header
        className={cn(
          "sticky top-0 z-30 border-b backdrop-blur",
          theme.bar,
          theme.border,
        )}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
          <Link
            href="/messages"
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
              theme.control,
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Messages Library</span>
            <span className="sm:hidden">Library</span>
          </Link>

          <p className="mx-auto hidden min-w-0 truncate px-2 font-serif text-sm font-semibold md:block">
            {item.title}
          </p>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <span className={cn("mr-1 text-xs font-medium tabular-nums", theme.muted)}>
              {pct}%
            </span>

            {/* Reading settings (font size + theme) in a compact popover so the
                toolbar stays within the viewport on small screens. */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSettingsOpen((o) => !o)}
                aria-expanded={settingsOpen}
                aria-label="Reading settings"
                className={cn(
                  "flex h-8 items-center justify-center gap-0.5 rounded-lg px-2 transition-colors",
                  settingsOpen ? theme.controlActive : theme.control,
                )}
              >
                <span className="text-xs font-bold">A</span>
                <span className="text-sm font-bold">A</span>
              </button>

              <AnimatePresence>
                {settingsOpen && (
                  <>
                    <button
                      type="button"
                      aria-hidden="true"
                      tabIndex={-1}
                      onClick={() => setSettingsOpen(false)}
                      className="fixed inset-0 z-30 cursor-default"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute right-0 top-full z-40 mt-2 w-56 rounded-xl border p-3 shadow-dropdown",
                        theme.page,
                        theme.border,
                      )}
                    >
                      <p className={cn("text-xs font-semibold uppercase tracking-wide", theme.muted)}>
                        Font size
                      </p>
                      <div className={cn("mt-2 flex items-center justify-between rounded-lg p-1", theme.faintBg)}>
                        <ControlButton
                          theme={theme}
                          onClick={fontDown}
                          disabled={prefs.fontScale <= 0}
                          label="Decrease font size"
                        >
                          <Minus className="h-4 w-4" />
                        </ControlButton>
                        <span className="text-sm font-semibold">
                          {["Small", "Default", "Large", "X-Large"][prefs.fontScale]}
                        </span>
                        <ControlButton
                          theme={theme}
                          onClick={fontUp}
                          disabled={prefs.fontScale >= FONT_SIZES.length - 1}
                          label="Increase font size"
                        >
                          <Plus className="h-4 w-4" />
                        </ControlButton>
                      </div>

                      <p className={cn("mt-3 text-xs font-semibold uppercase tracking-wide", theme.muted)}>
                        Reading mode
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-1">
                        <ThemeButton theme={theme} current={prefs.theme} value="light" onSelect={setTheme} icon={Sun} label="Light mode" />
                        <ThemeButton theme={theme} current={prefs.theme} value="sepia" onSelect={setTheme} icon={Coffee} label="Sepia mode" />
                        <ThemeButton theme={theme} current={prefs.theme} value="dark" onSelect={setTheme} icon={Moon} label="Dark mode" />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Bookmark */}
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save for later"}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                saved ? theme.controlActive : theme.control,
              )}
            >
              {saved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </button>

            {/* TOC (mobile) */}
            {chaptered && (
              <button
                type="button"
                onClick={() => setTocOpen(true)}
                aria-label="Open table of contents"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-colors lg:hidden",
                  theme.control,
                )}
              >
                <List className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-transparent">
          <div
            className="h-full bg-brand-gold transition-[width] duration-150"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
          />
        </div>
      </header>

      {/* Body */}
      <div
        className={cn(
          "mx-auto max-w-5xl gap-10 px-4 py-10 sm:px-6",
          chaptered ? "lg:grid lg:grid-cols-[240px_1fr]" : "",
        )}
      >
        {/* TOC sidebar (desktop) */}
        {chaptered && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className={cn("mb-3 text-xs font-semibold uppercase tracking-wide", theme.muted)}>
                Table of Contents
              </p>
              <TocList
                blocks={blocks}
                activeIndex={activeIndex}
                onSelect={scrollToBlock}
                theme={theme}
              />
            </div>
          </aside>
        )}

        {/* Reading column */}
        <article className="min-w-0">
          <div className="mx-auto max-w-prose">
            <p className={cn("text-xs font-semibold uppercase tracking-wide text-brand-gold")}>
              {item.category}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl">
              {item.title}
            </h1>
            <p className={cn("mt-3 text-sm", theme.muted)}>
              By {item.author}
              {item.estimatedReadingTime ? ` · ${item.estimatedReadingTime}` : ""}
            </p>
            <hr className={cn("my-8", theme.border)} />

            <ReaderContent
              blocks={blocks}
              chaptered={chaptered}
              fontSize={fontSize}
              registerRef={(i, el) => {
                blockEls.current[i] = el;
              }}
            />

            <hr className={cn("mt-10", theme.border)} />
            <p className={cn("mt-4 text-center text-sm", theme.muted)}>
              {pct}% complete
            </p>

            {/* Chapter navigation (only when chaptered) */}
            {chaptered && (
              <nav
                aria-label="Chapter navigation"
                className="mt-6 flex items-center justify-between gap-3"
              >
                <button
                  type="button"
                  onClick={() => scrollToBlock(activeIndex - 1)}
                  disabled={activeIndex <= 0}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40",
                    theme.border,
                    theme.control,
                  )}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => scrollToBlock(activeIndex + 1)}
                  disabled={activeIndex >= blocks.length - 1}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40",
                    theme.border,
                    theme.control,
                  )}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </div>
        </article>
      </div>

      {/* TOC drawer (mobile) */}
      <AnimatePresence>
        {chaptered && tocOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setTocOpen(false)}
          />
        )}
        {chaptered && tocOpen && (
          <motion.div
            className={cn(
              "fixed inset-x-0 bottom-0 z-40 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t p-5 lg:hidden",
              theme.page,
              theme.border,
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Table of contents"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-serif text-lg font-bold">Table of Contents</p>
              <button
                type="button"
                onClick={() => setTocOpen(false)}
                aria-label="Close table of contents"
                className={cn("rounded-md p-1.5", theme.control)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <TocList
              blocks={blocks}
              activeIndex={activeIndex}
              onSelect={scrollToBlock}
              theme={theme}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------- Sub-parts -------------------------------- */

function TocList({
  blocks,
  activeIndex,
  onSelect,
  theme,
}: {
  blocks: { id: string; title?: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
  theme: ThemeTokens;
}) {
  return (
    <ol className="space-y-1">
      {blocks.map((block, i) => (
        <li key={block.id}>
          <button
            type="button"
            onClick={() => onSelect(i)}
            aria-current={i === activeIndex ? "true" : undefined}
            className={cn(
              "flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
              i === activeIndex
                ? "bg-brand-gold/15 font-semibold text-brand-gold"
                : theme.control,
            )}
          >
            <span className="tabular-nums opacity-60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">{block.title ?? "Read"}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

/**
 * Memoized reading content — re-renders only when the text, chapter mode or
 * font size changes, NOT on every scroll-driven progress update.
 */
const ReaderContent = memo(function ReaderContent({
  blocks,
  chaptered,
  fontSize,
  registerRef,
}: {
  blocks: { id: string; title?: string; content: string }[];
  chaptered: boolean;
  fontSize: number;
  registerRef: (index: number, el: HTMLElement | null) => void;
}) {
  return (
    <div style={{ fontSize, lineHeight: 1.75 }}>
      {blocks.map((block, i) => (
        <section
          key={block.id}
          id={block.id}
          ref={(el) => registerRef(i, el)}
          className="scroll-mt-24"
        >
          {chaptered && block.title && (
            <h2 className="mb-4 mt-10 font-serif text-2xl font-bold first:mt-0">
              {block.title}
            </h2>
          )}
          {block.content.split(/\n\n+/).map((para, p) => (
            <p key={p} className="mb-5">
              {para}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
});

function ControlButton({
  children,
  onClick,
  disabled,
  label,
  theme,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
  theme: ThemeTokens;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:pointer-events-none disabled:opacity-40",
        theme.control,
      )}
    >
      {children}
    </button>
  );
}

function ThemeButton({
  value,
  current,
  onSelect,
  icon: Icon,
  label,
  theme,
}: {
  value: ReaderTheme;
  current: ReaderTheme;
  onSelect: (t: ReaderTheme) => void;
  icon: typeof Sun;
  label: string;
  theme: ThemeTokens;
}) {
  const active = current === value;
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "flex h-9 w-full items-center justify-center rounded-lg transition-colors",
        active ? theme.controlActive : theme.control,
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
