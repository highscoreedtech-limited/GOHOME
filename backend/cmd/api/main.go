// Command api is the entry point of the backend.
//
// `package main` with a `func main()` is what makes a Go program an executable
// (libraries use other package names). By convention, runnable commands live
// under cmd/<name>/, so `go run ./cmd/api` starts the server.
package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"newjerusalem/internal/config"
	"newjerusalem/internal/contact"
	"newjerusalem/internal/event"
	"newjerusalem/internal/httpx"
	"newjerusalem/internal/message"
)

func main() {
	cfg := config.Load()

	// Structured JSON logs go to stdout. slog is the standard library logger.
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	// ---- Composition root -------------------------------------------------
	// This is the ONE place that knows the concrete types. We build each
	// layer and inject dependencies downward: repo -> service -> handler.
	// To move to Postgres later, swap NewInMemoryRepository() for a Postgres
	// repository here; nothing else changes.
	messageHandler := message.NewHandler(
		message.NewService(message.NewInMemoryRepository()),
	)
	eventHandler := event.NewHandler(
		event.NewService(event.NewInMemoryRepository()),
	)
	contactHandler := contact.NewHandler(
		contact.NewService(contact.NewInMemoryRepository(), logger),
	)

	// ---- Routes -----------------------------------------------------------
	// The pattern "GET /api/messages/{id}" is method + path with a named
	// wildcard, read later via r.PathValue("id"). Standard library, Go 1.22+.
	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) {
		httpx.JSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	mux.HandleFunc("GET /api/messages", messageHandler.List)
	mux.HandleFunc("GET /api/messages/{id}", messageHandler.Get)
	mux.HandleFunc("GET /api/events", eventHandler.List)
	mux.HandleFunc("POST /api/contact", contactHandler.Create)

	// Wrap the router with middleware. Order: Recover (outermost) catches
	// panics from everything inside; Logger times the request; CORS sets
	// headers for the browser.
	handler := httpx.Chain(mux,
		httpx.Recover(logger),
		httpx.Logger(logger),
		httpx.CORS(cfg.AllowedOrigin),
	)

	// ---- HTTP server ------------------------------------------------------
	// Timeouts protect the server from slow or stuck clients. Always set them.
	srv := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           handler,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	// ---- Graceful shutdown ------------------------------------------------
	// NotifyContext gives us a context that is cancelled when the OS sends an
	// interrupt (Ctrl+C) or SIGTERM (how orchestrators stop containers).
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	// Run the server in a goroutine so main can wait for the shutdown signal.
	go func() {
		logger.Info("server listening", "addr", srv.Addr, "allowedOrigin", cfg.AllowedOrigin)
		// ListenAndServe blocks until the server stops. On graceful shutdown it
		// returns http.ErrServerClosed, which is expected, not a real error.
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Error("server error", "error", err)
			os.Exit(1)
		}
	}()

	<-ctx.Done() // block here until a shutdown signal arrives
	logger.Info("shutdown signal received, draining connections")

	// Give in-flight requests up to 10s to finish before forcing close.
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		logger.Error("graceful shutdown failed", "error", err)
	}
	logger.Info("server stopped")
}
