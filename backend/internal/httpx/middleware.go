package httpx

import (
	"log/slog"
	"net/http"
	"time"
)

// Middleware wraps an http.Handler to add behavior (logging, CORS, etc.).
//
// In Go, functions are values. An http.Handler is any type with a
// ServeHTTP(w, r) method. A Middleware takes a handler and returns a NEW
// handler that runs some code, then calls the original. This is how you
// compose cross-cutting concerns without touching each handler.
type Middleware func(http.Handler) http.Handler

// Chain wraps h with the given middlewares. The FIRST middleware in the list
// ends up OUTERMOST (runs first on the way in, last on the way out), which is
// the intuitive order: Recover, then Logger, then CORS, then your handler.
func Chain(h http.Handler, middlewares ...Middleware) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		h = middlewares[i](h)
	}
	return h
}

// statusRecorder wraps http.ResponseWriter to remember the status code, so the
// logger can report it. The default status is 200 until WriteHeader is called.
type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (r *statusRecorder) WriteHeader(code int) {
	r.status = code
	r.ResponseWriter.WriteHeader(code)
}

// Logger logs one line per request: method, path, status, and how long it took.
func Logger(l *slog.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
			next.ServeHTTP(rec, r)
			l.Info("request",
				"method", r.Method,
				"path", r.URL.Path,
				"status", rec.status,
				"duration", time.Since(start).String(),
			)
		})
	}
}

// Recover turns a panic in any handler into a clean 500 instead of crashing the
// whole server. `defer` schedules a function to run when the surrounding
// function returns (including during a panic); `recover()` stops the panic.
func Recover(l *slog.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if err := recover(); err != nil {
					l.Error("panic recovered", "error", err, "path", r.URL.Path)
					Error(w, http.StatusInternalServerError, "internal server error")
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}

// CORS lets the browser on `allowedOrigin` call this API from another origin.
// Browsers first send a preflight OPTIONS request for anything non-trivial;
// we answer it here with 204 (No Content).
func CORS(allowedOrigin string) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
