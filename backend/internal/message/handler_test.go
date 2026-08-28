package message

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// TestHandler_Get exercises the HTTP layer WITHOUT a real network, using
// httptest. We build a request, record the response, call the handler
// directly, and assert on the captured status code.
func TestHandler_Get(t *testing.T) {
	h := NewHandler(NewService(fakeRepo{items: sample()}))

	tests := []struct {
		name       string
		id         string
		wantStatus int
	}{
		{name: "found", id: "a", wantStatus: http.StatusOK},
		{name: "missing", id: "nope", wantStatus: http.StatusNotFound},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/api/messages/"+tt.id, nil)
			// The router normally fills {id}; in a unit test we set it ourselves.
			req.SetPathValue("id", tt.id)

			rec := httptest.NewRecorder()
			h.Get(rec, req)

			if rec.Code != tt.wantStatus {
				t.Errorf("status = %d, want %d (body: %s)", rec.Code, tt.wantStatus, rec.Body.String())
			}
			if ct := rec.Header().Get("Content-Type"); ct != "application/json; charset=utf-8" {
				t.Errorf("Content-Type = %q, want JSON", ct)
			}
		})
	}
}

// TestHandler_List_Latest checks the ?latest=N path returns newest-first.
func TestHandler_List_Latest(t *testing.T) {
	h := NewHandler(NewService(fakeRepo{items: sample()}))

	req := httptest.NewRequest(http.MethodGet, "/api/messages?latest=1", nil)
	rec := httptest.NewRecorder()
	h.List(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200", rec.Code)
	}
	// c is newest (2024-06-10); a light body check keeps the test simple.
	if body := rec.Body.String(); !strings.Contains(body, `"id":"c"`) {
		t.Errorf("expected newest message c in body, got: %s", body)
	}
}
