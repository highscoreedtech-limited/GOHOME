package contact

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"log/slog"
	"time"
)

// Service validates, stores, and (eventually) emails contact submissions.
type Service struct {
	repo   Repository
	logger *slog.Logger
}

func NewService(repo Repository, logger *slog.Logger) *Service {
	return &Service{repo: repo, logger: logger}
}

// Create validates and stores a submission.
//
// It returns THREE things: the saved submission, a map of field validation
// errors (empty if valid), and a system error. Separating "the user sent bad
// input" (fieldErrors -> 422) from "something broke on our side" (err -> 500)
// lets the handler pick the right status code.
func (s *Service) Create(ctx context.Context, req CreateRequest) (Submission, map[string]string, error) {
	if fieldErrors := req.Validate(); len(fieldErrors) > 0 {
		return Submission{}, fieldErrors, nil
	}

	sub := Submission{
		ID:        newID(),
		Name:      req.Name,
		Email:     req.Email,
		Subject:   req.Subject,
		Message:   req.Message,
		CreatedAt: time.Now().UTC(),
	}

	if err := s.repo.Save(ctx, sub); err != nil {
		return Submission{}, nil, err
	}

	// Send the notification email WITHOUT blocking the HTTP response.
	//
	// `go f()` starts a goroutine: f runs concurrently while Create returns
	// immediately. Email providers can be slow or briefly down, so the visitor
	// should not wait on them. (A production system would use a durable queue
	// so a crash cannot drop the email; a goroutine is the simple first step.)
	go s.notify(sub)

	return sub, nil, nil
}

// notify is a placeholder for real email delivery (Postmark/Resend/SES).
func (s *Service) notify(sub Submission) {
	s.logger.Info("new contact submission (email delivery TODO)",
		"id", sub.ID,
		"from", sub.Email,
		"subject", sub.Subject,
	)
}

// newID returns a short random hex id. crypto/rand is a cryptographically
// secure source; reading into a fixed-size byte slice fills it with randomness.
func newID() string {
	b := make([]byte, 8)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}
