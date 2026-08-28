# Backend Architecture (Go), Recommendation

_Status: proposed. The site is currently frontend-only; this is the plan for adding a Go backend without rewriting the UI._

## Why this is low-risk

The frontend was built with a clean **data-access seam**. The UI never reads local data directly; it goes through a thin layer:

| Concern            | Current source (frontend-only)         | Swap target (backend)                |
| ------------------ | -------------------------------------- | ------------------------------------ |
| Messages Library   | `lib/library.ts` (reads `data/*`)      | `GET /api/messages`, `/api/messages/{id}` |
| Events calendar    | `lib/calendar.ts` (reads `data/*`)     | `GET /api/events`                    |
| Contact form       | `ContactForm` `handleSubmit` (mailto)  | `POST /api/contact`                  |
| Reading progress / bookmarks | `lib/reading.ts` (localStorage) | stays local, or syncs when auth lands |

Only those files change. Cards, pages, the reader, search, filters, and calendar UI stay as they are.

## Recommended stack

- **Language:** Go 1.22+
- **Router:** `chi` (stdlib-compatible, middleware-friendly), or stdlib `net/http` with the 1.22 method-based mux for a zero-dependency start.
- **Database:** PostgreSQL. Access via `pgx` + `sqlc` (type-safe queries generated from SQL, no heavy ORM).
- **Migrations:** `golang-migrate` (plain SQL, versioned).
- **Config:** environment variables via `envconfig`; never commit secrets.
- **Validation:** `go-playground/validator` on request DTOs.
- **Logging:** stdlib `log/slog` (structured JSON).
- **Auth (phase 2):** short-lived JWT access + rotating refresh cookie, or a hosted IdP. Only needed for the admin/CMS surface, not for public reads.

Keep it boring and standard. This team should be able to run it, not marvel at it.

## Layout (clean, layered)

```
backend/
  cmd/api/main.go            # wiring: config, db, router, server
  internal/
    config/                  # env loading
    http/                    # handlers (DTOs in, JSON out), middleware, router
    messages/                # domain: service + repository + models
    events/
    contact/
    platform/db/             # pgx pool, migrations runner
  migrations/                # 0001_init.sql ...
  sqlc.yaml
  Makefile
```

**Dependency direction:** `http` → `service` → `repository` → `db`. Handlers hold no business logic; repositories hold no HTTP. This keeps each layer unit-testable in isolation.

## Data models (mirror the TypeScript types)

The Go structs should match the shapes the frontend already consumes so the JSON drops in unchanged.

```go
type Message struct {
    ID                 string     `json:"id"`
    Title              string     `json:"title"`
    Author             string     `json:"author"`
    Category           string     `json:"category"`
    Description        string     `json:"description"`
    Tags               []string   `json:"tags"`
    CoverImage         *string    `json:"coverImage,omitempty"`
    Pages              *int       `json:"pages,omitempty"`
    EstimatedReadingTime *string  `json:"estimatedReadingTime,omitempty"`
    Featured           bool       `json:"featured,omitempty"`
    PublishedAt        *string    `json:"publishedAt,omitempty"`
    Chapters           []Chapter  `json:"chapters,omitempty"`
    Content            *string    `json:"content,omitempty"`
}

type Chapter struct {
    ID      string `json:"id"`
    Title   string `json:"title"`
    Content string `json:"content"`
}

type Event struct {
    ID          string  `json:"id"`
    Title       string  `json:"title"`
    Category    string  `json:"category"`
    Time        *string `json:"time,omitempty"`
    Location    *string `json:"location,omitempty"`
    Description *string `json:"description,omitempty"`
    Date        *string `json:"date,omitempty"`
    Start       *string `json:"start,omitempty"`
    End         *string `json:"end,omitempty"`
    Weekday     *int    `json:"weekday,omitempty"`
}
```

`omitempty` matters: the frontend already treats missing metadata gracefully (no `0 pages`, optional Table of Contents), so the API should simply omit absent fields.

## API surface (v1)

Public, read-only, cacheable:

```
GET  /api/messages?category=&q=&featured=   -> Message[]   (list; search/filter can also stay client-side)
GET  /api/messages/{id}                      -> Message
GET  /api/events                             -> Event[]
POST /api/contact                            -> 202 Accepted
GET  /healthz                                -> 200
```

Admin (phase 2, authenticated) for the ministry to publish without a developer:

```
POST/PUT/DELETE /api/admin/messages, /api/admin/events
```

### Contact endpoint

`POST /api/contact` replaces the `mailto` handoff. Validate, persist to a `contact_messages` table (so nothing is ever lost), then send email via a provider (Postmark/Resend/SES) from a background goroutine or a small outbox worker. Add **rate limiting** and a honeypot/Turnstile check, public POST endpoints get abused.

## How the frontend switches over

1. Make the accessor functions in `lib/library.ts` / `lib/calendar.ts` `async` and have them `fetch` the API (they are already the only callers). Server Components can call the API directly; client components fetch or receive props.
2. Point `ContactForm.handleSubmit` at `POST /api/contact` and keep the existing success/error UI.
3. Set `NEXT_PUBLIC_API_URL`; keep local `data/*` as fixtures for tests and offline dev.

No component markup changes.

## Cross-cutting concerns

- **CORS:** allow the site origin(s) only.
- **Caching:** `Cache-Control` on public GETs; optionally a CDN in front. Reads are the hot path.
- **Migrations in CI/CD:** run `migrate up` on deploy; never hand-edit prod schema.
- **Testing:** table-driven unit tests per service; repository tests against a disposable Postgres (testcontainers); a few HTTP handler tests.
- **Observability:** structured logs now; add metrics/tracing (OpenTelemetry) when traffic warrants.
- **Deployment:** single static Go binary in a distroless container. Fly.io / Render / a small VM all work; managed Postgres (Neon/Supabase/RDS).

## Phasing

1. **Phase 1, read APIs + contact.** Messages and events served from Postgres; contact form persists + emails. Frontend flips its data layer. Highest value, lowest risk.
2. **Phase 2, admin/auth.** Let the ministry publish messages and events themselves.
3. **Phase 3, accounts (optional).** Sync reading progress and bookmarks across devices; until then `localStorage` is fine and honest.

## What NOT to do

- No ORM-heavy framework or microservices for a site this size, one modular monolith.
- Do not block the request thread on outbound email; queue it.
- Do not move reading-progress/bookmarks to the backend before there is user auth; the current local-first approach is correct for now.
