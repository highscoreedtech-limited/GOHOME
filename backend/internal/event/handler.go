package event

import (
	"net/http"

	"newjerusalem/internal/httpx"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// List handles `GET /api/events`, returning all events for the calendar.
func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	items, err := h.svc.List(r.Context())
	if err != nil {
		httpx.Error(w, http.StatusInternalServerError, "could not load events")
		return
	}
	httpx.JSON(w, http.StatusOK, items)
}
