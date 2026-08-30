# GOHOME / New Jerusalem City — Project Guide (Hand-off Doc)

> Paste this whole file into an AI chat (Claude, ChatGPT, etc.) before asking it
> to change anything. It explains the tech stack, where every feature lives, the
> rules to follow, and step-by-step recipes for the changes you will most often
> want. When you ask the AI for a change, also paste the specific file(s) named
> in the relevant recipe below.

---

## 1. What this project is

A website for the **New Jerusalem City / GOHOME** ministry. It has two parts:

- **Frontend** — the website people see. Built with **Next.js 14 (App Router) +
  TypeScript + Tailwind CSS**. Lives at the repo root.
- **Backend** — an optional **Go** API (messages, events, contact). Lives in
  `backend/`. The site works WITHOUT it (it uses local data files); the backend
  is for later, when content is managed from a database.

Repo: `github.com/highscoreedtech-limited/GOHOME` (branch `main`).

### Tech at a glance
- Next.js 14 App Router, React 18, TypeScript (strict)
- Tailwind CSS 3 (theme in `tailwind.config.ts`)
- Framer Motion (animations), lucide-react (icons), embla-carousel (sliders)
- Import alias: `@/` means the repo root. e.g. `@/data/site` = `data/site.ts`.

---

## 2. The single most important idea: content is data-driven

**You almost never edit components to change words or pictures.** All the text
and image paths live in plain data files under `data/`. The components just
display whatever is in those files.

So: to change wording, add a message, swap an image, edit the menu, or update
contact details, you edit a file in **`data/`** (and maybe drop an image in
**`public/`**). See the recipes in section 8.

---

## 3. How to run it locally

You need Node.js installed. Open a terminal in the project folder.

```bash
npm install        # first time only
npm run dev        # start the site at http://localhost:3000
```

To check everything still compiles before pushing:

```bash
npm run build      # must finish with no errors
```

Optional backend (only if you are working on it), in a second terminal:

```bash
cd backend
go run ./cmd/api   # API at http://localhost:8080
```

---

## 4. Rules the AI (and you) must follow

1. **No em dashes (the long `—` dash).** The whole site deliberately avoids
   them. Use commas, colons, or periods instead. This applies to all text.
2. **Images go in `public/`** and are referenced by a path that starts with `/`.
   Example: a file `public/holy-trinity.jpg` is used as `"/holy-trinity.jpg"`.
3. **Filename capitalization matters on the live site.** `Holy-Trinity.jpg` and
   `holy-trinity.jpg` are different on the server. Reference the exact name.
4. **Change content in `data/`, not in components,** whenever possible.
5. **After any change, run `npm run build`** to confirm there are no errors.
6. **Keep the existing style.** Match the colors, fonts, and spacing already in
   use (see section 6). Do not restyle the whole site for a small change.
7. **To publish changes:** `git add .` then `git commit -m "what changed"` then
   `git push`.

---

## 5. Page map (every route and the file that owns it)

Routes come from the folder structure under `app/`. Each `page.tsx` is a page.

| URL                     | File                              | What it is                          |
| ----------------------- | --------------------------------- | ----------------------------------- |
| `/`                     | `app/page.tsx`                    | Home page (composes many sections)  |
| `/about`                | `app/about/page.tsx`              | About Us                            |
| `/messages`             | `app/messages/page.tsx`           | Messages Library (browse/search)    |
| `/messages/[id]`        | `app/messages/[id]/page.tsx`      | One message's details page          |
| `/messages/[id]/read`   | `app/messages/[id]/read/page.tsx` | The distraction-free reader         |
| `/events`               | `app/events/page.tsx`             | Events calendar                     |
| `/gallery`              | `app/gallery/page.tsx`            | Photo gallery with lightbox         |
| `/contact`              | `app/contact/page.tsx`            | Contact Us form                     |
| (any unknown URL)       | `app/not-found.tsx`               | 404 page                            |
| (wraps every page)      | `app/layout.tsx`                  | Fonts, `<html>`, site-wide metadata |
| (global CSS)            | `app/globals.css`                 | Base styles + focus rings           |

The **Home page** (`app/page.tsx`) stacks these sections in order: Header, Hero,
Upcoming Events, Latest Messages, Quick Links, Join Our Mission, Our Work,
Gallery Highlights, Footer.

---

## 6. Design system (colors, fonts)

Defined in **`tailwind.config.ts`**. Use these class names, do not hardcode hex.

- `brand-dark` `#14171B` (dark header/sections), `brand-darker` (deeper)
- `brand-gold` `#A9863A` (buttons, accents), `brand-goldLight`, `brand-goldDark`
- `brand-cream` `#F3F1EC` (light section backgrounds), `brand-creamAlt`
- `brand-ink` `#1C1F24` (dark text), `brand-muted` (grey text)

Fonts (loaded in `app/layout.tsx`): **Playfair Display** = `font-serif`
(headings), **Inter** = `font-sans` (body). Use the `font-serif` / `font-sans`
classes.

---

## 7. Where each feature lives

### Content data files (`data/`) — edit these to change words/images

| File               | Controls                                                            |
| ------------------ | ------------------------------------------------------------------ |
| `data/site.ts`     | Site name, tagline, **hero copy**, encouragement heading, mission card copy, "Our Work" heading, and **contact info** (email, phones, address, opening hours) + social links |
| `data/nav.ts`      | The whole top navigation menu and its dropdowns                    |
| `data/library.ts`  | **All Messages Library content**: every message, its chapters, and the list of CATEGORIES |
| `data/messages.ts` | Home page "Latest Messages" list, and the "Quick Links" list      |
| `data/events.ts`   | Home page "Upcoming Events" cards (title, description, image)      |
| `data/calendar.ts` | The `/events` calendar entries (dates, weekly repeats, ranges)    |
| `data/verses.ts`   | The rotating scripture verses in the hero's Daily Encouragement    |
| `data/about.ts`    | All text on the About page                                          |
| `data/work.ts`     | "Our Work" pillars + turns the gallery image list into gallery data |
| `data/images.ts`   | Central map of image paths (hero, about, event thumbnails, message thumbnails, gallery list) |

### Logic helpers (`lib/`) — usually no need to edit

| File             | Purpose                                                              |
| ---------------- | ------------------------------------------------------------------- |
| `lib/library.ts` | Reads messages from `data/library.ts` (list, get by id, search, filter, latest, hasChapters). The UI calls these, not the data file directly. |
| `lib/calendar.ts`| Calendar math (build the month grid, find events on a day, upcoming) |
| `lib/reading.ts` | Saves bookmarks, reading progress, and reader settings in the browser (localStorage) |
| `lib/api.ts`     | Talks to the Go backend when configured; otherwise the site uses local data |
| `lib/utils.ts`   | `cn()` helper for combining CSS classes                             |

### Types (`types/index.ts`)
All the TypeScript "shapes" (what fields a Message, Event, etc. have). If you add
a new field to content, add it here too.

### Components (`components/`) — the reusable UI pieces

- **Layout/shared:** `Header.tsx`, `Footer.tsx`, `Logo.tsx`, `NavDropdown.tsx`
  (desktop menu dropdowns), `MobileNav.tsx` (phone slide-out menu),
  `PageHero.tsx` (the banner at the top of inner pages), `SectionHeader.tsx`.
- **Home sections:** `Hero.tsx`, `DailyEncouragementCard.tsx`,
  `EventsCarousel.tsx` + `EventCard.tsx`, `MessageListItem.tsx`,
  `QuickLinksCard.tsx`, `JoinMissionCard.tsx`, `OurWorkGrid.tsx`,
  `GalleryHighlights.tsx`.
- **UI building blocks (`components/ui/`):** `Button.tsx`, `Container.tsx`
  (centered page width), `Pill.tsx` (little tag), `Reveal.tsx` (scroll-in
  animation), `States.tsx` (empty/error/skeleton states).
- **Messages Library (`components/library/`):** `MessagesLibrary.tsx` (the whole
  browse experience: search + filters + grid), `LibraryCard.tsx` (a book card),
  `FeaturedCard.tsx`, `BookCover.tsx` (cover image with fallback), `SearchBar.tsx`,
  `CategoryFilters.tsx`, `ContinueReading.tsx`, `BookmarkButton.tsx`,
  `ReadCta.tsx` (the Read Now / Continue Reading button).
- **Reader (`components/reader/Reader.tsx`):** the full reading screen (font
  size, light/sepia/dark mode, table of contents, progress).
- **Gallery (`components/gallery/GalleryGrid.tsx`):** grid + lightbox popup.
- **Events (`components/events/EventCalendar.tsx`):** the month calendar.
- **Contact (`components/contact/ContactForm.tsx`):** the contact form.

---

## 8. Recipes: how to make common changes (A to Z)

Each recipe says which file to open. Paste that file to the AI along with this
guide and your request.

### A. Change the hero (home page top) wording or button
File: **`data/site.ts`**, the `hero` object (`eyebrow`, `title`, `body`, `cta`).
`body` is a list of paragraphs; leave it `[]` for no paragraph.

### B. Change the rotating Bible verses in the hero
File: **`data/verses.ts`**. Add/edit items `{ quote, citation }`.

### C. Edit the navigation menu or a dropdown
File: **`data/nav.ts`**. Each item is `{ label, href }`. Items with a `children`
list become a dropdown. To add a normal link, copy an existing `{ label, href }`
line. Dropdown rows can have an `icon` (imported at the top from lucide-react).

### D. Add a new message to the Messages Library
File: **`data/library.ts`**. Copy an existing object in `libraryItems` and edit
it. Rules:
- `id` must be unique and URL-safe (lowercase, dashes), e.g. `"grace-and-mercy"`.
  The page becomes `/messages/grace-and-mercy`.
- Give it a `title`, `author`, `category` (must be one of the `CATEGORIES` list
  at the top of the file), `description`, `tags`, and a `coverImage`.
- For a **book with chapters**: add a `chapters: [ { id, title, content }, ... ]`.
  A Table of Contents appears automatically.
- For a **simple message**: use `content: "..."` instead of chapters (no Table
  of Contents shows). Separate paragraphs with a blank line inside the string.
- Optional: `estimatedReadingTime`, `pages`, `featured: true`, `publishedAt`.

### E. Feature a message in the home "Latest Messages"
File: **`data/messages.ts`**, the `latestMessages` list. Copy an item and set
`id`, `title`, `excerpt`, `date`, `image` (a `/public` path), `href`
(`/messages/your-id`).

### F. Change a message's cover image
1. Put the image in `public/` (e.g. `public/grace-cover.png`).
2. In `data/library.ts`, set that message's `coverImage: "/grace-cover.png"`.

### G. Add photos to the Gallery / Gallery Highlights
1. Put images in `public/`, named like `gallery-10.jpg`.
2. In **`data/images.ts`**, add the paths to the `gallery` list.
   The `/gallery` page shows all of them; the home "Gallery Highlights" shows the
   first four.

### H. Change contact details (email, phone, address, hours)
File: **`data/site.ts`**, the `contact` object. Updates the footer AND the
contact page everywhere at once.

### I. Change the "Upcoming Events" cards on the home page
File: **`data/events.ts`**. Each event is `{ id, title, description, image, href }`.
Images come from `data/images.ts` (the `events` group) or a `/public` path.

### J. Change the /events calendar entries
File: **`data/calendar.ts`**. Each event uses ONE of:
- `date: "2026-11-15"` (single day),
- `start` + `end` (a range, e.g. a novena),
- `weekday: 6` (repeats weekly; 0 = Sunday ... 6 = Saturday).
Plus `title`, `category`, and optional `time`, `location`, `description`.

### K. Edit the About page
File: **`data/about.ts`** (story paragraphs, facts, motto, covenant, activities).

### L. Change the logo
Replace `public/nj-logo.png` (keep the name) OR change the path in
`components/Logo.tsx`.

### M. Change colors or fonts
File: **`tailwind.config.ts`** (colors under `theme.extend.colors.brand`, fonts
under `fontFamily`). Fonts are loaded in `app/layout.tsx`.

### N. Add a brand-new page
Create `app/your-page/page.tsx`. Start by copying `app/gallery/page.tsx` as a
template (it uses Header, PageHero, a section, Footer). Add a link to it in
`data/nav.ts` if it should appear in the menu.

### O. Change a button's link or label
Buttons are the `Button` component (`components/ui/Button.tsx`): `href` sets the
link, the text inside sets the label. Most button text/links come from `data/`.

---

## 9. Backend (Go) — short version

Only relevant if you work on the API. Folder: `backend/`.

- Run: `cd backend && go run ./cmd/api` (serves `http://localhost:8080`).
- Endpoints: `GET /api/messages`, `GET /api/messages/{id}`, `GET /api/events`,
  `POST /api/contact`, `GET /healthz`.
- Structure per feature (`internal/message`, `internal/event`, `internal/contact`):
  `*.go` model, `repository.go` (storage interface + in-memory), `service.go`
  (logic), `handler.go` (HTTP). `seed.go` has sample data.
- Uses in-memory data by default. Set `DATABASE_URL` to use Postgres (see
  `backend/README.md` and `backend/migrations/`).
- To connect the frontend to it: create a file `.env.local` at the repo root with
  `NEXT_PUBLIC_API_URL=http://localhost:8080`, then restart `npm run dev`. The
  contact form will POST to the backend; without it, the form falls back to
  opening the visitor's email app.
- Full backend explanation + Go learning notes: `backend/README.md`. Overall plan:
  `docs/BACKEND.md`.

---

## 10. What is NOT built yet (so the AI does not assume it exists)

- **Login / Sign Up (accounts):** in progress, not finished. The "Join Us" button
  links to `/join`, which does not exist yet.
- **Admin panel:** not built. Content is edited by hand in `data/` files.
- **These pages have menu links but no page yet:** `/join`, `/videos`,
  `/prayer-requests`, `/give`, `/volunteer`, `/tiers/*`, `/jacobs-well/*`,
  `/messages/nations` (and the other Messages dropdown category links). Visiting
  them shows the 404 page until built.
- **Live backend:** the Go API runs locally only; it is not deployed/hosted yet,
  so the live site currently uses local data everywhere.

---

## 11. How to prompt the other AI (templates)

Always paste THIS guide first. Then use a prompt like:

> "Using the project guide I pasted, I want to [change X]. Which file(s) do I
> edit? Show me the exact edited code and keep the existing style. Remember: no
> em dashes, images live in /public, and content changes go in the data/ files."

For a specific change, also paste the file named in the recipe. Example:

> "Here is my `data/library.ts`. Add a new message titled 'Walking in Grace' by
> 'Princess Vivian Mary Peace', category 'Spiritual Growth', with three
> chapters. Give me the full updated file."

Good habits to tell the AI:
- Ask it to return the **full updated file** (easier to paste back than a diff).
- After pasting the change in, run `npm run build` to catch mistakes.
- Change one thing at a time.

---

## 12. Quick reference: publish your changes

```bash
git add .
git commit -m "short description of what you changed"
git push
```

If the site is connected to Vercel/Railway, pushing to `main` deploys it.
