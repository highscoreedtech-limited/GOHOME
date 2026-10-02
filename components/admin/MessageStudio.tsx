"use client";

import { useMemo, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ImagePlus,
  X,
  Star,
  FileText,
  Layers,
  Wand2,
  Info,
} from "lucide-react";
import { getAllItems, CATEGORIES } from "@/lib/library";
import { hasChapters } from "@/lib/library";
import { BookCover } from "@/components/library/BookCover";
import { cn } from "@/lib/utils";
import type { LibraryItem } from "@/types";

type ChapterDraft = { key: string; title: string; content: string };
type Mode = "chapters" | "single";
type Tab = "compose" | "all";

const REAL_CATEGORIES = CATEGORIES.filter((c) => c !== "All");

const uid = () => Math.random().toString(36).slice(2, 9);

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

/**
 * Message Studio: a front-end prototype of the admin dashboard for posting
 * messages to the library. It mirrors every field of a library message, shows a
 * live card preview, and lets you load an existing message to edit. Nothing is
 * saved yet; "Publish" is inert until the Sanity backend is connected.
 */
export function MessageStudio() {
  const existing = useMemo(() => getAllItems(), []);
  const authors = useMemo(
    () => Array.from(new Set(existing.map((i) => i.author))).sort(),
    [existing],
  );

  const [tab, setTab] = useState<Tab>("compose");

  // Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState<string>(REAL_CATEGORIES[0] ?? "");
  const [description, setDescription] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [publishedAt, setPublishedAt] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [featured, setFeatured] = useState(false);
  const [mode, setMode] = useState<Mode>("chapters");
  const [singleContent, setSingleContent] = useState("");
  const [chapters, setChapters] = useState<ChapterDraft[]>([
    { key: uid(), title: "", content: "" },
  ]);
  const [coverUrl, setCoverUrl] = useState<string | undefined>();
  const [coverName, setCoverName] = useState<string | undefined>();
  const [notice, setNotice] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const tags = tagsText
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const chapterCount = mode === "chapters" ? chapters.filter((c) => c.content.trim()).length : 0;
  const meta = [
    readingTime,
    chapterCount > 0 ? `${chapterCount} chapters` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  function resetForm() {
    setTitle("");
    setAuthor("");
    setCategory(REAL_CATEGORIES[0] ?? "");
    setDescription("");
    setTagsText("");
    setReadingTime("");
    setPublishedAt(new Date().toISOString().slice(0, 10));
    setFeatured(false);
    setMode("chapters");
    setSingleContent("");
    setChapters([{ key: uid(), title: "", content: "" }]);
    setCoverUrl(undefined);
    setCoverName(undefined);
    setNotice(null);
  }

  function loadForEdit(item: LibraryItem) {
    setTitle(item.title);
    setAuthor(item.author);
    setCategory(item.category);
    setDescription(item.description);
    setTagsText(item.tags.join(", "));
    setReadingTime(item.estimatedReadingTime ?? "");
    setPublishedAt((item.publishedAt ?? "").slice(0, 10));
    setFeatured(Boolean(item.featured));
    setCoverUrl(item.coverImage);
    setCoverName(item.coverImage ? item.coverImage.split("/").pop() : undefined);
    if (hasChapters(item)) {
      setMode("chapters");
      setChapters(
        item.chapters!.map((c) => ({
          key: uid(),
          title: c.title ?? "",
          content: c.content,
        })),
      );
      setSingleContent("");
    } else {
      setMode("single");
      setSingleContent(item.content ?? "");
      setChapters([{ key: uid(), title: "", content: "" }]);
    }
    setTab("compose");
    setNotice(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onPickCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUrl(URL.createObjectURL(file));
    setCoverName(file.name);
  }

  function estimateReadingTime() {
    const words =
      mode === "chapters"
        ? chapters.reduce((n, c) => n + countWords(c.content), 0)
        : countWords(singleContent);
    const minutes = Math.max(1, Math.round(words / 200));
    setReadingTime(`${minutes} min read`);
  }

  // Chapter helpers
  const addChapter = () =>
    setChapters((cs) => [...cs, { key: uid(), title: "", content: "" }]);
  const removeChapter = (key: string) =>
    setChapters((cs) => (cs.length > 1 ? cs.filter((c) => c.key !== key) : cs));
  const updateChapter = (key: string, patch: Partial<ChapterDraft>) =>
    setChapters((cs) =>
      cs.map((c) => (c.key === key ? { ...c, ...patch } : c)),
    );
  const moveChapter = (key: string, dir: -1 | 1) =>
    setChapters((cs) => {
      const i = cs.findIndex((c) => c.key === key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= cs.length) return cs;
      const next = [...cs];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const canPublish = title.trim() && author.trim() && description.trim();

  return (
    <div className="min-h-screen bg-brand-creamAlt">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-dark text-brand-goldLight">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold leading-none text-brand-ink">
                Message Studio
              </p>
              <p className="text-xs text-brand-muted">New Jerusalem City</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg px-3 py-2 text-sm font-medium text-brand-muted transition-colors hover:bg-black/5 hover:text-brand-ink"
            >
              Clear
            </button>
            <button
              type="button"
              disabled={!canPublish}
              onClick={() =>
                setNotice(
                  "Publishing is not connected yet. Once the backend (Sanity) is wired up, this button will post your message to the library.",
                )
              }
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                canPublish
                  ? "bg-brand-gold text-white hover:bg-brand-goldDark"
                  : "cursor-not-allowed bg-black/10 text-brand-muted",
              )}
            >
              Publish
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-7xl gap-1 px-4 sm:px-6">
          {(
            [
              ["compose", "Compose"],
              ["all", `All Messages (${existing.length})`],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "-mb-px border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
                tab === key
                  ? "border-brand-gold text-brand-ink"
                  : "border-transparent text-brand-muted hover:text-brand-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {notice && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-4 text-sm text-brand-ink">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-goldDark" />
            <p>{notice}</p>
            <button
              type="button"
              onClick={() => setNotice(null)}
              className="ml-auto shrink-0 text-brand-muted hover:text-brand-ink"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {tab === "compose" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* FORM */}
            <form
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <Section title="Details" icon={FileText}>
                <Field label="Title" required>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Wonders of the Rosary"
                    className={inputCls}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Author" required>
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. The Holy Spirit"
                      list="authors"
                      className={inputCls}
                    />
                    <datalist id="authors">
                      {authors.map((a) => (
                        <option key={a} value={a} />
                      ))}
                    </datalist>
                  </Field>

                  <Field label="Category">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={inputCls}
                    >
                      {REAL_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  label="Short description"
                  hint="One or two sentences shown on the card and at the top of the message."
                  required
                >
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="A short summary of the teaching..."
                    className={cn(inputCls, "resize-y")}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Tags" hint="Separate with commas.">
                    <input
                      value={tagsText}
                      onChange={(e) => setTagsText(e.target.value)}
                      placeholder="rosary, prayer, our lady"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Published date">
                    <input
                      type="date"
                      value={publishedAt}
                      onChange={(e) => setPublishedAt(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Reading time">
                    <div className="flex gap-2">
                      <input
                        value={readingTime}
                        onChange={(e) => setReadingTime(e.target.value)}
                        placeholder="12 min read"
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={estimateReadingTime}
                        title="Estimate from the writing"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 text-sm font-medium text-brand-ink transition-colors hover:border-brand-gold hover:text-brand-goldDark"
                      >
                        <Wand2 className="h-4 w-4" />
                        Auto
                      </button>
                    </div>
                  </Field>
                  <Field label="Feature this message">
                    <button
                      type="button"
                      onClick={() => setFeatured((f) => !f)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition-colors",
                        featured
                          ? "border-brand-gold bg-brand-gold/10 text-brand-ink"
                          : "border-black/10 bg-white text-brand-muted hover:border-brand-gold/40",
                      )}
                    >
                      <span className="inline-flex items-center gap-2">
                        <Star
                          className={cn(
                            "h-4 w-4",
                            featured && "fill-brand-gold text-brand-gold",
                          )}
                        />
                        {featured ? "Featured" : "Not featured"}
                      </span>
                      <span
                        className={cn(
                          "relative h-5 w-9 rounded-full transition-colors",
                          featured ? "bg-brand-gold" : "bg-black/15",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all",
                            featured ? "left-[1.125rem]" : "left-0.5",
                          )}
                        />
                      </span>
                    </button>
                  </Field>
                </div>
              </Section>

              {/* Cover image */}
              <Section title="Cover image" icon={ImagePlus}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 sm:w-56">
                    <BookCover
                      src={coverUrl}
                      title={title || "Cover preview"}
                      category={category}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-gold hover:text-brand-goldDark"
                    >
                      <ImagePlus className="h-4 w-4" />
                      {coverUrl ? "Change image" : "Upload image"}
                    </button>
                    {coverName && (
                      <p className="flex items-center gap-2 text-xs text-brand-muted">
                        {coverName}
                        <button
                          type="button"
                          onClick={() => {
                            setCoverUrl(undefined);
                            setCoverName(undefined);
                          }}
                          className="text-brand-muted hover:text-brand-ink"
                          aria-label="Remove image"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </p>
                    )}
                    <p className="max-w-xs text-xs text-brand-muted">
                      If you leave this empty, a branded cover is shown
                      automatically for the category.
                    </p>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={onPickCover}
                      className="hidden"
                    />
                  </div>
                </div>
              </Section>

              {/* Writing */}
              <Section title="The message" icon={Layers}>
                <div className="mb-4 inline-flex rounded-lg border border-black/10 bg-white p-1">
                  {(
                    [
                      ["chapters", "In chapters", Layers],
                      ["single", "One write-up", FileText],
                    ] as [Mode, string, typeof Layers][]
                  ).map(([key, label, Icon]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setMode(key)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                        mode === key
                          ? "bg-brand-gold text-white"
                          : "text-brand-muted hover:text-brand-ink",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>

                {mode === "single" ? (
                  <Field
                    label="Full write-up"
                    hint="Write freely. Leave a blank line between paragraphs."
                  >
                    <textarea
                      value={singleContent}
                      onChange={(e) => setSingleContent(e.target.value)}
                      rows={14}
                      placeholder="Write the message here..."
                      className={cn(inputCls, "resize-y font-serif leading-relaxed")}
                    />
                  </Field>
                ) : (
                  <div className="space-y-4">
                    {chapters.map((c, i) => (
                      <div
                        key={c.key}
                        className="rounded-xl border border-black/10 bg-white p-4"
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-dark font-serif text-xs font-bold text-brand-goldLight">
                            {i + 1}
                          </span>
                          <input
                            value={c.title}
                            onChange={(e) =>
                              updateChapter(c.key, { title: e.target.value })
                            }
                            placeholder={`Chapter ${i + 1} title`}
                            className={cn(inputCls, "font-serif")}
                          />
                          <div className="flex shrink-0 items-center gap-0.5">
                            <IconBtn
                              label="Move up"
                              onClick={() => moveChapter(c.key, -1)}
                              disabled={i === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </IconBtn>
                            <IconBtn
                              label="Move down"
                              onClick={() => moveChapter(c.key, 1)}
                              disabled={i === chapters.length - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </IconBtn>
                            <IconBtn
                              label="Delete chapter"
                              onClick={() => removeChapter(c.key)}
                              disabled={chapters.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </IconBtn>
                          </div>
                        </div>
                        <textarea
                          value={c.content}
                          onChange={(e) =>
                            updateChapter(c.key, { content: e.target.value })
                          }
                          rows={8}
                          placeholder="Chapter text..."
                          className={cn(
                            inputCls,
                            "resize-y font-serif leading-relaxed",
                          )}
                        />
                        <p className="mt-1.5 text-right text-xs text-brand-muted">
                          {countWords(c.content)} words
                        </p>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addChapter}
                      className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-gold/50 px-4 py-2.5 text-sm font-semibold text-brand-goldDark transition-colors hover:bg-brand-gold/10"
                    >
                      <Plus className="h-4 w-4" />
                      Add chapter
                    </button>
                  </div>
                )}
              </Section>
            </form>

            {/* LIVE PREVIEW */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Live preview
              </p>
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.06]">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <BookCover
                    src={coverUrl}
                    title={title || "Message title"}
                    category={category}
                    className="h-full w-full"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-brand-dark/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-goldLight backdrop-blur">
                    {category}
                  </span>
                  {featured && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      <Star className="h-3 w-3 fill-white" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold leading-snug text-brand-ink">
                    {title || "Your message title appears here"}
                  </h3>
                  <p className="mt-1.5 text-xs text-brand-muted">
                    by {author || "Author name"}
                  </p>
                  <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-brand-ink/70">
                    {description ||
                      "Your short description will appear here as a preview of the teaching."}
                  </p>
                  <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-black/5 pt-3.5">
                    <span className="text-xs text-brand-muted">
                      {meta || "reading time · chapters"}
                    </span>
                    <span className="text-sm font-semibold text-brand-goldDark">
                      Read Now
                    </span>
                  </div>
                </div>
              </div>

              {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-brand-muted"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </aside>
          </div>
        ) : (
          /* ALL MESSAGES */
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-brand-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                    Author
                  </th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">
                    Category
                  </th>
                  <th className="hidden px-4 py-3 font-semibold md:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {existing.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-black/5 last:border-0 hover:bg-black/[0.015]"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-brand-ink">
                        {item.title}
                      </div>
                      <div className="text-xs text-brand-muted sm:hidden">
                        {item.author} · {item.category}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-brand-muted sm:table-cell">
                      {item.author}
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-brand-muted">
                        {item.category}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-brand-muted md:table-cell">
                      {item.publishedAt ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => loadForEdit(item)}
                        className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-semibold text-brand-ink transition-colors hover:border-brand-gold hover:text-brand-goldDark"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-brand-ink outline-none transition-colors placeholder:text-brand-muted/60 focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/30";

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof FileText;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/60 p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-brand-ink">
        <Icon className="h-5 w-5 text-brand-goldDark" />
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-brand-ink">
        {label}
        {required && <span className="ml-1 text-brand-gold">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-brand-muted">{hint}</span>}
    </label>
  );
}

function IconBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-muted transition-colors hover:bg-black/5 hover:text-brand-ink disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}
