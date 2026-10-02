"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  BookOpen,
  Video,
  Images,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  Settings,
  ExternalLink,
  Plus,
  Search,
  Bell,
  X,
  Pencil,
  Trash2,
  ArrowRight,
  UploadCloud,
  Star,
  ArrowUp,
  ArrowDown,
  Layers,
  FileText,
  Wand2,
  Play,
  Menu,
  type LucideIcon,
} from "lucide-react";
import { getAllItems, CATEGORIES, hasChapters } from "@/lib/library";
import { getAllVideos, VIDEO_CATEGORIES } from "@/lib/videos";
import { getCategoryTheme } from "@/components/library/categoryTheme";
import { BookCover } from "@/components/library/BookCover";
import { cn } from "@/lib/utils";
import type { LibraryItem } from "@/types";

type View = "dashboard" | "messages" | "videos" | "covers";
type ChapterDraft = { key: string; title: string; content: string };
type Mode = "chapters" | "single";

const REAL_CATEGORIES = CATEGORIES.filter((c) => c !== "All");
const uid = () => Math.random().toString(36).slice(2, 9);
const words = (t: string) => (t.trim() ? t.trim().split(/\s+/).length : 0);
const fileName = (p: string) => p.split("/").pop() ?? p;
const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "-";

/**
 * Content Studio: a front-end prototype of the ministry admin dashboard.
 * A dark sidebar shell with Dashboard, Messages, Videos and Cover Images views,
 * driven by the real site data. Composing opens a side drawer. Nothing is saved
 * yet; Publish / Save Draft are inert until the Sanity backend is connected.
 */
export function AdminApp() {
  const messages = useMemo(() => getAllItems(), []);
  const videos = useMemo(() => getAllVideos(), []);
  const covers = useMemo(() => {
    const map = new Map<string, { src: string; used: string }>();
    messages.forEach((m) => {
      if (m.coverImage) map.set(m.coverImage, { src: m.coverImage, used: "Messages" });
    });
    return [...map.values()];
  }, [messages]);

  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [editing, setEditing] = useState<LibraryItem | null>(null);

  const counts = {
    messages: messages.length,
    videos: videos.length,
    covers: covers.length,
  };

  function openComposer(item?: LibraryItem) {
    setEditing(item ?? null);
    setComposerOpen(true);
  }

  return (
    <div className="flex min-h-screen bg-brand-cream text-brand-ink">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <Sidebar
        view={view}
        counts={counts}
        open={sidebarOpen}
        onNavigate={(v) => {
          setView(v);
          setSidebarOpen(false);
        }}
      />

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {view === "dashboard" && (
          <DashboardView
            messages={messages}
            videos={videos}
            coversCount={counts.covers}
            onNew={() => openComposer()}
            onMenu={() => setSidebarOpen(true)}
            onGoto={setView}
          />
        )}
        {view === "messages" && (
          <MessagesView
            messages={messages}
            onNew={() => openComposer()}
            onEdit={openComposer}
            onMenu={() => setSidebarOpen(true)}
          />
        )}
        {view === "videos" && (
          <VideosView videos={videos} onMenu={() => setSidebarOpen(true)} />
        )}
        {view === "covers" && (
          <CoversView covers={covers} onMenu={() => setSidebarOpen(true)} />
        )}
      </div>

      {composerOpen && (
        <MessageComposer
          item={editing}
          authors={Array.from(new Set(messages.map((m) => m.author))).sort()}
          onClose={() => setComposerOpen(false)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Sidebar
 * ------------------------------------------------------------------ */

function Sidebar({
  view,
  counts,
  open,
  onNavigate,
}: {
  view: View;
  counts: { messages: number; videos: number; covers: number };
  open: boolean;
  onNavigate: (v: View) => void;
}) {
  const primary: { key: View; label: string; icon: LucideIcon; badge?: number }[] =
    [
      { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
      { key: "messages", label: "Messages", icon: BookOpen, badge: counts.messages },
      { key: "videos", label: "Videos", icon: Video, badge: counts.videos },
      { key: "covers", label: "Cover Images", icon: ImageIcon, badge: counts.covers },
    ];
  const secondary: { label: string; icon: LucideIcon }[] = [
    { label: "Events", icon: Calendar },
    { label: "Gallery", icon: Images },
    { label: "Tiers", icon: Sparkles },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-brand-dark p-4 transition-transform lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2 pb-6 pt-2">
        <Image
          src="/nj-logo.png"
          alt="New Jerusalem City"
          width={1859}
          height={1470}
          priority
          className="h-10 w-auto shrink-0 object-contain"
        />
        <div className="leading-tight">
          <p className="font-serif text-sm font-bold text-brand-cream">
            NEW JERUSALEM CITY
          </p>
          <p className="text-[9px] font-semibold tracking-[0.12em] text-brand-gold">
            CONTENT STUDIO
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5">
        {primary.map(({ key, label, icon: Icon, badge }) => {
          const active = view === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate(key)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-brand-gold/15 font-semibold text-brand-cream"
                  : "text-brand-cream/70 hover:bg-white/5 hover:text-brand-cream",
              )}
            >
              <Icon
                className={cn("h-4.5 w-4.5", active ? "text-brand-gold" : "")}
                style={{ width: 18, height: 18 }}
              />
              {label}
              {typeof badge === "number" && (
                <span
                  className={cn(
                    "ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold",
                    active
                      ? "bg-brand-gold/25 text-brand-goldLight"
                      : "bg-white/10 text-brand-cream/60",
                  )}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="my-3 h-px bg-white/10" />

        {secondary.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            title="Coming soon"
            className="flex cursor-default items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-brand-cream/45"
          >
            <Icon style={{ width: 18, height: 18 }} />
            {label}
          </button>
        ))}

        <div className="my-3 h-px bg-white/10" />

        <button
          type="button"
          className="flex cursor-default items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-brand-cream/45"
        >
          <Settings style={{ width: 18, height: 18 }} />
          Settings
        </button>
      </nav>

      {/* Footer */}
      <div className="mt-auto flex flex-col gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-gold transition-colors hover:bg-white/5"
        >
          <ExternalLink style={{ width: 18, height: 18 }} />
          View Live Site
        </a>
        <div className="flex items-center gap-3 border-t border-white/10 px-2 pt-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-goldDark font-serif text-sm font-bold text-brand-dark">
            CA
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-brand-cream">Content Admin</p>
            <p className="text-[10px] text-brand-cream/50">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ *
 * Shared top bar
 * ------------------------------------------------------------------ */

function TopBar({
  title,
  right,
  onMenu,
}: {
  title: string;
  right?: React.ReactNode;
  onMenu: () => void;
}) {
  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-black/10 bg-white px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open menu"
          className="rounded-md p-2 text-brand-muted hover:bg-black/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-serif text-xl font-bold text-brand-ink sm:text-2xl">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">{right}</div>
    </header>
  );
}

function SearchPill({ placeholder }: { placeholder: string }) {
  return (
    <div className="hidden items-center gap-2 rounded-lg border border-black/10 bg-brand-cream px-3.5 py-2 text-sm text-brand-muted sm:flex sm:w-64">
      <Search className="h-4 w-4" />
      <input
        className="w-full bg-transparent outline-none placeholder:text-brand-muted/70"
        placeholder={placeholder}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Dashboard
 * ------------------------------------------------------------------ */

function DashboardView({
  messages,
  videos,
  coversCount,
  onNew,
  onMenu,
  onGoto,
}: {
  messages: LibraryItem[];
  videos: ReturnType<typeof getAllVideos>;
  coversCount: number;
  onNew: () => void;
  onMenu: () => void;
  onGoto: (v: View) => void;
}) {
  const stats = [
    { icon: BookOpen, value: messages.length, label: "Total Messages" },
    { icon: Video, value: videos.length, label: "Total Videos" },
    { icon: ImageIcon, value: coversCount, label: "Cover Images" },
    { icon: Pencil, value: 0, label: "Drafts Awaiting Review" },
  ];

  return (
    <>
      <TopBar
        title="Dashboard"
        onMenu={onMenu}
        right={
          <>
            <SearchPill placeholder="Search content..." />
            <Bell className="h-5 w-5 text-brand-muted" />
          </>
        }
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className={cardCls + " p-5"}>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gold/10">
                <Icon className="h-4.5 w-4.5 text-brand-goldDark" style={{ width: 18, height: 18 }} />
              </div>
              <div className="font-serif text-3xl font-bold text-brand-ink">
                {value}
              </div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-brand-muted">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onNew}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-dark px-5 py-3 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-darker"
          >
            <Plus className="h-4 w-4" />
            New Message
          </button>
          <button
            type="button"
            onClick={() => onGoto("videos")}
            className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-gold"
          >
            <Plus className="h-4 w-4" />
            Add Video
          </button>
          <button
            type="button"
            onClick={() => onGoto("covers")}
            className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-gold"
          >
            <Plus className="h-4 w-4" />
            Upload Cover Image
          </button>
        </div>

        {/* Recent */}
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <div className={cardCls}>
            <PanelHead title="Recent Messages" onView={() => onGoto("messages")} />
            {messages.slice(0, 4).map((m) => {
              const theme = getCategoryTheme(m.category);
              return (
                <div
                  key={m.id}
                  className="flex items-center gap-4 border-b border-black/5 px-6 py-4 last:border-0"
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md">
                    <BookCover src={m.coverImage} title={m.title} category={m.category} className="h-full w-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-brand-ink">
                      {m.title}
                    </div>
                    <div className={cn("text-[11px] font-semibold", theme.label)}>
                      {m.category}
                    </div>
                  </div>
                  <StatusBadge status="Published" />
                  <span className="hidden w-20 text-right text-xs text-brand-muted sm:block">
                    {fmtDate(m.publishedAt)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={cardCls}>
            <PanelHead title="Recent Videos" onView={() => onGoto("videos")} />
            {videos.slice(0, 3).map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-3 border-b border-black/5 px-6 py-4 last:border-0"
              >
                <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded bg-gradient-to-br from-brand-ink to-brand-dark">
                  <Play className="h-3.5 w-3.5 fill-brand-cream text-brand-cream" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-brand-ink">
                    {v.title}
                  </div>
                  <div className="text-[11px] text-brand-muted">
                    {v.category}
                    {v.duration ? ` · ${v.duration}` : ""}
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4">
              <button
                type="button"
                onClick={() => onGoto("videos")}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-brand-gold/50 py-2.5 text-[13px] font-semibold text-brand-goldDark transition-colors hover:bg-brand-gold/10"
              >
                <Plus className="h-4 w-4" />
                Add New Video
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function PanelHead({ title, onView }: { title: string; onView: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
      <h2 className="font-serif text-lg font-bold text-brand-ink">{title}</h2>
      <button
        type="button"
        onClick={onView}
        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-goldDark hover:text-brand-gold"
      >
        View All <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Messages list
 * ------------------------------------------------------------------ */

function MessagesView({
  messages,
  onNew,
  onEdit,
  onMenu,
}: {
  messages: LibraryItem[];
  onNew: () => void;
  onEdit: (item: LibraryItem) => void;
  onMenu: () => void;
}) {
  const [active, setActive] = useState("All");
  const chips = ["All", ...REAL_CATEGORIES];
  const rows =
    active === "All" ? messages : messages.filter((m) => m.category === active);

  return (
    <>
      <TopBar
        title="Messages"
        onMenu={onMenu}
        right={
          <span className="text-xs text-brand-muted">
            {messages.length} total
          </span>
        }
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        {/* Filter bar */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-black/10 bg-white px-3.5 py-2 text-sm text-brand-muted sm:max-w-xs">
            <Search className="h-4 w-4 shrink-0" />
            <input
              className="w-full bg-transparent outline-none placeholder:text-brand-muted/70"
              placeholder="Search messages..."
            />
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors",
                  active === c
                    ? "bg-brand-dark text-brand-cream"
                    : "border border-black/10 text-brand-muted hover:border-brand-gold/40",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onNew}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-goldDark px-4 py-2 text-xs font-bold text-brand-dark transition-colors hover:bg-brand-gold"
          >
            <Plus className="h-3.5 w-3.5" />
            New Message
          </button>
        </div>

        {/* Table */}
        <div className={cardCls + " overflow-hidden"}>
          <div className="hidden grid-cols-[40px_1.9fr_1fr_1fr_110px_80px] gap-4 border-b border-black/10 bg-brand-cream px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-brand-muted sm:grid">
            <span />
            <span>Title</span>
            <span>Category</span>
            <span>Date</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          {rows.map((m) => {
            const theme = getCategoryTheme(m.category);
            return (
              <div
                key={m.id}
                className="flex items-center gap-4 border-b border-black/5 px-5 py-3.5 last:border-0 sm:grid sm:grid-cols-[40px_1.9fr_1fr_1fr_110px_80px]"
              >
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded">
                  <BookCover src={m.coverImage} title={m.title} category={m.category} className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-brand-ink">
                    {m.title}
                  </div>
                  <div className={cn("text-[11px] font-semibold sm:hidden", theme.label)}>
                    {m.category} · {fmtDate(m.publishedAt)}
                  </div>
                </div>
                <span className={cn("hidden text-[13px] font-semibold sm:block", theme.label)}>
                  {m.category}
                </span>
                <span className="hidden text-[13px] text-brand-muted sm:block">
                  {fmtDate(m.publishedAt)}
                </span>
                <span className="hidden sm:block">
                  <StatusBadge status="Published" />
                </span>
                <div className="flex shrink-0 justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(m)}
                    aria-label="Edit"
                    className="text-brand-muted hover:text-brand-ink"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    className="text-brand-muted hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Videos grid
 * ------------------------------------------------------------------ */

function VideosView({
  videos,
  onMenu,
}: {
  videos: ReturnType<typeof getAllVideos>;
  onMenu: () => void;
}) {
  const [active, setActive] = useState("All");
  const chips = [...VIDEO_CATEGORIES];
  const rows =
    active === "All" ? videos : videos.filter((v) => v.category === active);

  return (
    <>
      <TopBar
        title="Videos"
        onMenu={onMenu}
        right={<span className="text-xs text-brand-muted">{videos.length} total</span>}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors",
                  active === c
                    ? "bg-brand-dark text-brand-cream"
                    : "border border-black/10 text-brand-muted hover:border-brand-gold/40",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-brand-goldDark px-4 py-2 text-xs font-bold text-brand-dark transition-colors hover:bg-brand-gold"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Video
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((v) => (
            <div key={v.id} className={cardCls + " overflow-hidden"}>
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-brand-ink to-brand-dark">
                <Play className="h-8 w-8 fill-brand-cream/90 text-brand-cream/90" />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-black/50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  {v.category}
                </span>
                {v.duration && (
                  <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {v.duration}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="mb-2 line-clamp-2 text-[13px] font-semibold leading-snug text-brand-ink">
                  {v.title}
                </div>
                <div className="flex items-center justify-between">
                  <StatusBadge status="Published" />
                  <div className="flex gap-2.5">
                    <Pencil className="h-3.5 w-3.5 text-brand-muted" />
                    <Trash2 className="h-3.5 w-3.5 text-brand-muted" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="flex min-h-[190px] flex-col items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-dashed border-brand-gold/50 text-brand-goldDark transition-colors hover:bg-brand-gold/10"
          >
            <Plus className="h-6 w-6" />
            <span className="text-[13px] font-semibold">Add New Video</span>
          </button>
        </div>
      </main>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Cover images (media)
 * ------------------------------------------------------------------ */

function CoversView({
  covers,
  onMenu,
}: {
  covers: { src: string; used: string }[];
  onMenu: () => void;
}) {
  return (
    <>
      <TopBar
        title="Cover Images"
        onMenu={onMenu}
        right={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-goldDark px-4 py-2 text-xs font-bold text-brand-dark transition-colors hover:bg-brand-gold"
          >
            <Plus className="h-3.5 w-3.5" />
            Upload Images
          </button>
        }
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="mb-7 flex items-center gap-5 rounded-xl border-[1.5px] border-dashed border-black/15 bg-white p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10">
            <UploadCloud className="h-6 w-6 text-brand-goldDark" />
          </div>
          <div>
            <div className="text-sm font-semibold text-brand-ink">
              Drag and drop cover images here
            </div>
            <div className="text-xs text-brand-muted">
              or click Upload Images. JPG, PNG up to 10MB. Recommended 1200x800px.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {covers.map((c) => (
            <div key={c.src} className={cardCls + " overflow-hidden"}>
              <div className="relative aspect-[4/3]">
                <BookCover src={c.src} title={fileName(c.src)} className="h-full w-full" />
              </div>
              <div className="p-2.5">
                <div className="truncate text-[11.5px] font-semibold text-brand-ink">
                  {fileName(c.src)}
                </div>
                <div className="mt-0.5 text-[10px] text-brand-muted">
                  Used in {c.used}
                </div>
              </div>
            </div>
          ))}
          {covers.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-brand-muted">
              No cover images yet. Upload images or add covers to your messages.
            </p>
          )}
        </div>
      </main>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * New / Edit message composer (side drawer)
 * ------------------------------------------------------------------ */

function MessageComposer({
  item,
  authors,
  onClose,
}: {
  item: LibraryItem | null;
  authors: string[];
  onClose: () => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [author, setAuthor] = useState(item?.author ?? "");
  const [category, setCategory] = useState<string>(
    item?.category ?? REAL_CATEGORIES[0] ?? "",
  );
  const [description, setDescription] = useState(item?.description ?? "");
  const [tagsText, setTagsText] = useState(item?.tags.join(", ") ?? "");
  const [readingTime, setReadingTime] = useState(item?.estimatedReadingTime ?? "");
  const [publishedAt, setPublishedAt] = useState(
    (item?.publishedAt ?? new Date().toISOString()).slice(0, 10),
  );
  const [featured, setFeatured] = useState(Boolean(item?.featured));
  const [mode, setMode] = useState<Mode>(
    item && hasChapters(item) ? "chapters" : item ? "single" : "chapters",
  );
  const [singleContent, setSingleContent] = useState(item?.content ?? "");
  const [chapters, setChapters] = useState<ChapterDraft[]>(
    item && hasChapters(item)
      ? item.chapters!.map((c) => ({ key: uid(), title: c.title ?? "", content: c.content }))
      : [{ key: uid(), title: "", content: "" }],
  );
  const [coverUrl, setCoverUrl] = useState<string | undefined>(item?.coverImage);
  const [notice, setNotice] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const addChapter = () =>
    setChapters((cs) => [...cs, { key: uid(), title: "", content: "" }]);
  const removeChapter = (key: string) =>
    setChapters((cs) => (cs.length > 1 ? cs.filter((c) => c.key !== key) : cs));
  const updateChapter = (key: string, patch: Partial<ChapterDraft>) =>
    setChapters((cs) => cs.map((c) => (c.key === key ? { ...c, ...patch } : c)));
  const moveChapter = (key: string, dir: -1 | 1) =>
    setChapters((cs) => {
      const i = cs.findIndex((c) => c.key === key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= cs.length) return cs;
      const next = [...cs];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  function estimate() {
    const n =
      mode === "chapters"
        ? chapters.reduce((a, c) => a + words(c.content), 0)
        : words(singleContent);
    setReadingTime(`${Math.max(1, Math.round(n / 200))} min read`);
  }

  function onPickCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setCoverUrl(URL.createObjectURL(f));
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-brand-cream">
      {/* Top bar */}
      <div className="flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-black/10 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-brand-muted hover:bg-black/5"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="font-serif text-lg font-bold text-brand-ink sm:text-xl">
            {item ? "Edit Message" : "New Message"}
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() =>
              setNotice("Drafts will be saved once the backend is connected.")
            }
            className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-gold"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() =>
              setNotice(
                "Publishing is not connected yet. Once the Sanity backend is wired up, this will post your message to the live library.",
              )
            }
            className="rounded-lg bg-brand-dark px-5 py-2 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-darker"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
          {notice && (
            <div className="mb-5 rounded-lg border border-brand-gold/30 bg-brand-gold/10 p-3 text-xs text-brand-ink">
              {notice}
            </div>
          )}

          <FieldLabel>Cover Image</FieldLabel>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mb-5 block w-full overflow-hidden rounded-lg border-[1.5px] border-dashed border-black/15 bg-brand-cream"
          >
            {coverUrl ? (
              <div className="relative aspect-[16/10]">
                <BookCover src={coverUrl} title={title || "Cover"} category={category} className="h-full w-full" />
              </div>
            ) : (
              <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 text-brand-muted">
                <ImageIcon className="h-6 w-6 text-brand-goldDark" />
                <span className="text-xs">
                  Drag image here or{" "}
                  <span className="font-semibold text-brand-goldDark">browse</span>
                </span>
              </div>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onPickCover} className="hidden" />

          <FieldLabel>Title</FieldLabel>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The Power of Prayer in Daily Life"
            className={fieldCls + " mb-5"}
          />

          <FieldLabel>Author</FieldLabel>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            list="composer-authors"
            placeholder="e.g. The Holy Spirit"
            className={fieldCls + " mb-5"}
          />
          <datalist id="composer-authors">
            {authors.map((a) => (
              <option key={a} value={a} />
            ))}
          </datalist>

          <FieldLabel>Category</FieldLabel>
          <div className="mb-5 flex flex-wrap gap-2">
            {REAL_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full px-3.5 py-2 text-xs font-medium transition-colors",
                  category === c
                    ? "bg-brand-dark text-brand-cream"
                    : "border border-black/10 text-brand-muted hover:border-brand-gold/40",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <FieldLabel>Short description</FieldLabel>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="One or two sentences shown on the card."
            className={fieldCls + " mb-5 resize-y"}
          />

          {/* Body mode */}
          <FieldLabel>Message Body</FieldLabel>
          <div className="mb-3 inline-flex rounded-lg border border-black/10 bg-brand-cream p-1">
            {(
              [
                ["chapters", "Chapters", Layers],
                ["single", "One write-up", FileText],
              ] as [Mode, string, LucideIcon][]
            ).map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  mode === key ? "bg-brand-gold text-white" : "text-brand-muted",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          {mode === "single" ? (
            <textarea
              value={singleContent}
              onChange={(e) => setSingleContent(e.target.value)}
              rows={18}
              placeholder="Write the message content here..."
              className={fieldCls + " mb-5 resize-y font-serif leading-relaxed"}
            />
          ) : (
            <div className="mb-5 space-y-3">
              {chapters.map((c, i) => (
                <div key={c.key} className="rounded-lg border border-black/10 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-dark font-serif text-[11px] font-bold text-brand-goldLight">
                      {i + 1}
                    </span>
                    <input
                      value={c.title}
                      onChange={(e) => updateChapter(c.key, { title: e.target.value })}
                      placeholder={`Chapter ${i + 1} title`}
                      className={fieldCls + " font-serif"}
                    />
                    <div className="flex shrink-0">
                      <MiniBtn label="Up" onClick={() => moveChapter(c.key, -1)} disabled={i === 0}>
                        <ArrowUp className="h-3.5 w-3.5" />
                      </MiniBtn>
                      <MiniBtn label="Down" onClick={() => moveChapter(c.key, 1)} disabled={i === chapters.length - 1}>
                        <ArrowDown className="h-3.5 w-3.5" />
                      </MiniBtn>
                      <MiniBtn label="Delete" onClick={() => removeChapter(c.key)} disabled={chapters.length === 1}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </MiniBtn>
                    </div>
                  </div>
                  <textarea
                    value={c.content}
                    onChange={(e) => updateChapter(c.key, { content: e.target.value })}
                    rows={10}
                    placeholder="Chapter text..."
                    className={fieldCls + " resize-y font-serif leading-relaxed"}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addChapter}
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-gold/50 px-3.5 py-2 text-xs font-semibold text-brand-goldDark hover:bg-brand-gold/10"
              >
                <Plus className="h-3.5 w-3.5" />
                Add chapter
              </button>
            </div>
          )}

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Reading time</FieldLabel>
              <div className="flex gap-1.5">
                <input
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  placeholder="12 min read"
                  className={fieldCls}
                />
                <button
                  type="button"
                  onClick={estimate}
                  title="Estimate"
                  className="shrink-0 rounded-lg border border-black/10 px-2.5 text-brand-goldDark hover:border-brand-gold"
                >
                  <Wand2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <FieldLabel>Publish date</FieldLabel>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className={fieldCls}
              />
            </div>
          </div>

          <FieldLabel>Tags</FieldLabel>
          <input
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="rosary, prayer, our lady"
            className={fieldCls + " mb-5"}
          />

          <button
            type="button"
            onClick={() => setFeatured((f) => !f)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-sm transition-colors",
              featured
                ? "border-brand-gold bg-brand-gold/10 text-brand-ink"
                : "border-black/10 text-brand-muted hover:border-brand-gold/40",
            )}
          >
            <span className="inline-flex items-center gap-2">
              <Star className={cn("h-4 w-4", featured && "fill-brand-gold text-brand-gold")} />
              Feature this message
            </span>
            <span className={cn("relative h-5 w-9 rounded-full", featured ? "bg-brand-gold" : "bg-black/15")}>
              <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all", featured ? "left-[1.125rem]" : "left-0.5")} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Small shared bits
 * ------------------------------------------------------------------ */

const cardCls =
  "rounded-xl border border-black/10 bg-white";
const fieldCls =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-brand-ink outline-none transition-colors placeholder:text-brand-muted/60 focus:border-brand-gold";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold text-brand-ink">
      {children}
    </label>
  );
}

function StatusBadge({ status }: { status: "Published" | "Draft" }) {
  const published = status === "Published";
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-1 text-[11px] font-bold",
        published
          ? "bg-emerald-100 text-emerald-800"
          : "bg-brand-ink/10 text-brand-muted",
      )}
    >
      {status}
    </span>
  );
}

function MiniBtn({
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
      className="flex h-7 w-7 items-center justify-center rounded-md text-brand-muted hover:bg-black/5 hover:text-brand-ink disabled:opacity-30"
    >
      {children}
    </button>
  );
}
