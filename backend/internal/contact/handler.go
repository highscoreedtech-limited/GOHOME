package contact

import (
	"encoding/json"
	"net/http"

	"newjerusalem/internal/httpx"
)

type Handler struct {
	svc *Service
}

func NewHandler(svc *Service) *Handler {
	return &Handler{svc: svc}
}

// Create handles `POST /api/contact`.
func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
	// Cap the body at 1 MiB so a malicious client cannot exhaust memory.
	// `1 << 20` is 1 shifted left 20 bits = 1,048,576 bytes.
	r.Body = http.MaxBytesReader(w, r.Body, 1<<20)

	var req CreateRequest
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields() // reject unexpected fields instead of ignoring them
	if err := dec.Decode(&req); err != nil {
		httpx.Error(w, http.StatusBadRequest, "invalid JSON body")
		return
	}

	sub, fieldErrors, err := h.svc.Create(r.Context(), req)
	if len(fieldErrors) > 0 {
		// 422 Unprocessable Entity: the JSON parsed, but the values are invalid.
		httpx.JSON(w, http.StatusUnprocessableEntity, map[string]any{"errors": fieldErrors})
		return
	}
	if err != nil {
		httpx.Error(w, http.StatusInternalServerError, "could not submit your message")
		return
	}

	// 202 Accepted: we stored it and will deliver the email out of band.
	httpx.JSON(w, http.StatusAccepted, map[string]string{
		"id":     sub.ID,
		"status": "received",
	})
}
