package contact

import (
	"context"
	"sync"
)

// Repository is the storage contract for submissions. Persisting every message
// means nothing is lost even if the email step fails later.
type Repository interface {
	Save(ctx context.Context, s Submission) error
}

// InMemoryRepository keeps submissions in a slice. In production this becomes a
// `contact_messages` table; the interface stays identical.
type InMemoryRepository struct {
	mu    sync.Mutex
	items []Submission
}

func NewInMemoryRepository() *InMemoryRepository {
	return &InMemoryRepository{}
}

func (r *InMemoryRepository) Save(_ context.Context, s Submission) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.items = append(r.items, s)
	return nil
}
