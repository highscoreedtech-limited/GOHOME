// Package contact handles contact-form submissions: validate, store, and (later)
// email. It replaces the frontend's mailto handoff with a real endpoint.
package contact

import (
	"regexp"
	"strings"
	"time"
)

// Submission is a stored contact message (what would become a DB row).
type Submission struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Subject   string    `json:"subject"`
	Message   string    `json:"message"`
	CreatedAt time.Time `json:"createdAt"`
}

// CreateRequest is the INBOUND shape from the form. Keeping the request DTO
// separate from the stored Submission is good hygiene: the client never sets
// ID or CreatedAt, so those do not appear here.
type CreateRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

// emailRe is compiled ONCE at startup. regexp.MustCompile panics if the pattern
// is invalid, which is what you want for a constant pattern: fail loudly and
// immediately, not per-request.
var emailRe = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

// Validate returns a map of field -> error message. An empty map means valid.
// Mirrors the client-side rules so behavior is consistent on both sides.
func (r CreateRequest) Validate() map[string]string {
	errs := make(map[string]string)
	if strings.TrimSpace(r.Name) == "" {
		errs["name"] = "Please enter your name."
	}
	switch {
	case strings.TrimSpace(r.Email) == "":
		errs["email"] = "Please enter your email."
	case !emailRe.MatchString(strings.TrimSpace(r.Email)):
		errs["email"] = "Please enter a valid email address."
	}
	if strings.TrimSpace(r.Message) == "" {
		errs["message"] = "Please enter your message."
	}
	return errs
}
