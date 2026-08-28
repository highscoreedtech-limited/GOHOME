package contact

import "testing"

// TestCreateRequest_Validate is a classic table-driven test: one row per input
// scenario, asserting which fields (if any) fail validation.
func TestCreateRequest_Validate(t *testing.T) {
	tests := []struct {
		name      string
		req       CreateRequest
		wantErrs  []string // which field keys should be present
		wantValid bool
	}{
		{
			name:      "valid",
			req:       CreateRequest{Name: "Jane", Email: "jane@example.com", Message: "Peace"},
			wantValid: true,
		},
		{
			name:     "missing name",
			req:      CreateRequest{Email: "jane@example.com", Message: "Peace"},
			wantErrs: []string{"name"},
		},
		{
			name:     "invalid email",
			req:      CreateRequest{Name: "Jane", Email: "not-an-email", Message: "Peace"},
			wantErrs: []string{"email"},
		},
		{
			name:     "all missing",
			req:      CreateRequest{},
			wantErrs: []string{"name", "email", "message"},
		},
		{
			name:     "whitespace only is empty",
			req:      CreateRequest{Name: "   ", Email: "  ", Message: "  "},
			wantErrs: []string{"name", "email", "message"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			errs := tt.req.Validate()

			if tt.wantValid {
				if len(errs) != 0 {
					t.Fatalf("expected valid, got errors: %v", errs)
				}
				return
			}

			for _, key := range tt.wantErrs {
				if _, ok := errs[key]; !ok {
					t.Errorf("expected an error for %q, got errors: %v", key, errs)
				}
			}
			if len(errs) != len(tt.wantErrs) {
				t.Errorf("got %d errors %v, want %d for %v", len(errs), errs, len(tt.wantErrs), tt.wantErrs)
			}
		})
	}
}
