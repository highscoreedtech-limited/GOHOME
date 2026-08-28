package contact

import (
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// TestHandler_Create checks the POST endpoint end to end at the HTTP layer:
// the right status code for good input, bad input, and malformed JSON.
func TestHandler_Create(t *testing.T) {
	// Discard log output during tests so it does not clutter the run.
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	h := NewHandler(NewService(NewInMemoryRepository(), logger))

	tests := []struct {
		name       string
		body       string
		wantStatus int
	}{
		{
			name:       "valid submission is accepted",
			body:       `{"name":"Jane","email":"jane@example.com","subject":"Hi","message":"Peace"}`,
			wantStatus: http.StatusAccepted, // 202
		},
		{
			name:       "invalid fields are rejected",
			body:       `{"name":"","email":"bad","message":""}`,
			wantStatus: http.StatusUnprocessableEntity, // 422
		},
		{
			name:       "malformed json is a bad request",
			body:       `{"name":`,
			wantStatus: http.StatusBadRequest, // 400
		},
		{
			name:       "unknown field is rejected",
			body:       `{"name":"Jane","email":"jane@example.com","message":"Hi","hacker":true}`,
			wantStatus: http.StatusBadRequest, // DisallowUnknownFields
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodPost, "/api/contact", strings.NewReader(tt.body))
			req.Header.Set("Content-Type", "application/json")
			rec := httptest.NewRecorder()

			h.Create(rec, req)

			if rec.Code != tt.wantStatus {
				t.Errorf("status = %d, want %d (body: %s)", rec.Code, tt.wantStatus, rec.Body.String())
			}
		})
	}
}
