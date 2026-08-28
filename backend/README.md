# New Jerusalem City, Backend (Go)

Phase 1 of the backend from [`../docs/BACKEND.md`](../docs/BACKEND.md): read APIs
for **messages** and **events**, plus a **contact** endpoint. Zero external
dependencies (standard library only), so it runs with one command.

## Run it

```bash
cd backend
go run ./cmd/api
```

Then, in another terminal:

```bash
curl http://localhost:8080/healthz
curl "http://localhost:8080/api/messages?latest=4"
curl http://localhost:8080/api/messages/destiny-angels
curl http://localhost:8080/api/events
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","subject":"Hello","message":"Peace be with you."}'
```

Stop with `Ctrl+C` (the server drains in-flight requests, then exits).

Config via env vars (with defaults): `PORT` (8080), `ALLOWED_ORIGIN`
(http://localhost:3000).

## Endpoints

| Method | Path                    | Purpose                                  |
| ------ | ----------------------- | ---------------------------------------- |
| GET    | `/healthz`              | Liveness check                           |
| GET    | `/api/messages`         | List; `?category=`, `?q=`, `?latest=N`   |
| GET    | `/api/messages/{id}`    | One message (404 if missing)             |
| GET    | `/api/events`           | All calendar events                      |
| POST   | `/api/contact`          | Submit contact form (202, or 422 errors) |

## Project layout

```
backend/
  cmd/api/main.go          composition root: wire deps, routes, run server
  internal/
    config/                env-based settings
    httpx/                 JSON helpers + middleware (logging, recover, CORS)
    message/               model, repository, service, handler, seed
    event/                 same layering
    contact/               validation, store, service (goroutine email), handler
```

Each feature is its own package with four layers:

- **model**, the data shape (a struct with `json` tags).
- **repository**, an INTERFACE for storage + an in-memory implementation.
- **service**, business logic (filter, search, latest, validate).
- **handler**, translates HTTP to/from the service.

The service depends on the repository *interface*, so swapping in Postgres later
means writing one new type and changing one line in `main.go`.

## Go concepts this codebase teaches

- **Packages & modules**, `go.mod` defines the module; each folder is a package.
- **Exported vs private**, Capitalized names are public, lowercase are private.
- **Structs & JSON tags**, `json:"coverImage,omitempty"` controls serialization.
- **Pointers for optional fields**, `*string` can be nil, so `omitempty` drops it.
- **Interfaces & dependency injection**, `Repository` is the seam for Postgres.
- **Methods & receivers**, `func (s *Service) List(...)` attaches behavior.
- **Error handling**, errors are returned and checked, no exceptions; sentinel
  errors (`ErrNotFound`) + `errors.Is` map cleanly to HTTP status codes.
- **Goroutines & context**, `go s.notify(...)` for background email;
  `context.Context` for cancellation; graceful shutdown on SIGINT/SIGTERM.
- **Concurrency safety**, `sync.RWMutex` guards shared maps across request
  goroutines.
- **Standard-library routing**, `mux.HandleFunc("GET /api/messages/{id}", ...)`
  and `r.PathValue("id")` (Go 1.22+), no router library.

## Connecting the frontend (next step)

In the Next.js app, make the accessors in `lib/library.ts` / `lib/calendar.ts`
`fetch` from `NEXT_PUBLIC_API_URL` instead of reading local data, and point the
contact form at `POST /api/contact`. No component markup changes.

## Toward production (Phase 2+)

- Swap `InMemoryRepository` for a Postgres one (`pgx` + `sqlc`, `golang-migrate`).
- Real email in `contact.Service.notify` (Postmark/Resend/SES) via a durable queue.
- On publish, call a Next.js revalidation hook so new content appears within seconds.
- Add auth for an admin surface (`/api/admin/...`).
- Tests: table-driven unit tests per service; httptest for handlers.
