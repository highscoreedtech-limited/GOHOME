# New Jerusalem City

A production-grade, fully responsive marketing site for the fictional church/ministry
**New Jerusalem City** — _Prayers. Mercy. Purpose._ Built as a pixel-faithful rebuild
of the reference design.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript** (strict)
- **Tailwind CSS 3** — design tokens live in [`tailwind.config.ts`](tailwind.config.ts)
- **Framer Motion** — entrance, scroll-reveal, dropdown + card micro-interactions
- **lucide-react** — all icons
- **embla-carousel-react** — mobile/tablet events carousel
- **clsx** + **tailwind-merge** — `cn()` class helper ([`lib/utils.ts`](lib/utils.ts))

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
app/          Route entry (layout, home page, 404) + global styles
components/    UI + section components (Header, Hero, EventCard, Footer, …)
  ui/         Primitives (Button, Container, Reveal, Pill)
data/         All content + image sources (single source of truth)
lib/          cn() class-merge helper
types/        Shared TypeScript interfaces
```

## Design tokens

Defined once in `tailwind.config.ts` and reused everywhere:

| Token            | Value      | Use                                   |
| ---------------- | ---------- | ------------------------------------- |
| `brand-dark`     | `#14171B`  | Header + dark sections                |
| `brand-gold`     | `#A9863A`  | CTAs, tags, links, highlights         |
| `brand-cream`    | `#F3F1EC`  | Light section backgrounds             |
| `brand-ink`      | `#1C1F24`  | Body text on light                    |

Fonts: **Playfair Display** (serif display) + **Inter** (sans UI), loaded via
`next/font` and exposed as CSS variables (`--font-serif`, `--font-sans`).

## Swapping placeholder images

Every image is a placeholder from `picsum.photos`, referenced through
[`data/images.ts`](data/images.ts). Replace the URLs there (or point them at
files in `/public`) — no component markup needs to change.

## Accessibility

Semantic landmarks, `alt` text on every image, `aria` labels on nav/menu toggles,
keyboard-navigable dropdowns, visible focus rings, and `prefers-reduced-motion`
support (see [`app/globals.css`](app/globals.css)).
