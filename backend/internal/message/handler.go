package message

import (
	"errors"
	"net/http"
	"strconv"

	"newjerusalem/internal/httpx"
)

// Handler adapts HTTP requests to service calls. It is the ONLY layer that
// knows about http; the service and repository stay transport-agnostic (they
// would work the same from a CLI, a queue worker, or gRPC).
type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// List handles `GET /api/messages`.
//
// Query params:
//
//	?category=Prayer   filter by category
//	?q=prayer          search
//	?latest=4          shortcut: the 4 most recently published
//
// A handler's signature is always (http.ResponseWriter, *http.Request): w is
// where you write the response, r describes the request.
func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()

	// ?latest=N takes precedence and drives the home "Latest Messages" list.
	if n, err := strconv.Atoi(q.Get("latest")); err == nil && n > 0 {
		items, err := h.svc.Latest(r.Context(), n)
		if err != nil {
			httpx.Error(w, http.StatusInternalServerError, "could not load messages")
			return
		}
		httpx.JSON(w, http.StatusOK, items)
		return
	}

	items, err := h.svc.List(r.Context(), q.Get("category"), q.Get("q"))
	if err != nil {
		httpx.Error(w, http.StatusInternalServerError, "could not load messages")
		return
	}
	httpx.JSON(w, http.StatusOK, items)
}

// Get handles `GET /api/messages/{id}`.
//
// r.PathValue("id") reads the {id} segment from the route pattern (a Go 1.22
// standard-library feature, no router library needed).
func (h *Handler) Get(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	m, err := h.svc.Get(r.Context(), id)
	if errors.Is(err, ErrNotFound) {
		httpx.Error(w, http.StatusNotFound, "message not found")
		return
	}
	if err != nil {
		httpx.Error(w, http.StatusInternalServerError, "could not load message")
		return
	}
	httpx.JSON(w, http.StatusOK, m)
}
