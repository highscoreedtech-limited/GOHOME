// Package event provides the calendar events API. It follows the same layering
// as the message package (model, repository, service, handler) so the pattern
// becomes familiar.
package event

import (
	"context"
	"sync"
)

// Event mirrors the frontend CalendarEvent. Exactly one scheduling shape is set
// per event: Date (single day), Start+End (range), or Weekday (weekly). The
// frontend expands these into calendar cells; the API just serves the raw list.
type Event struct {
	ID          string  `json:"id"`
	Title       string  `json:"title"`
	Category    string  `json:"category"`
	Time        *string `json:"time,omitempty"`
	Location    *string `json:"location,omitempty"`
	Description *string `json:"description,omitempty"`
	Date        *string `json:"date,omitempty"`
	Start       *string `json:"start,omitempty"`
	End         *string `json:"end,omitempty"`
	Weekday     *int    `json:"weekday,omitempty"`
}

func ptr[T any](v T) *T { return &v }

// Repository is the storage contract for events.
type Repository interface {
	List(ctx context.Context) ([]Event, error)
}

// InMemoryRepository satisfies Repository from an in-memory slice.
type InMemoryRepository struct {
	mu    sync.RWMutex
	items []Event
}

func NewInMemoryRepository() *InMemoryRepository {
	return &InMemoryRepository{items: seed()}
}

func (r *InMemoryRepository) List(_ context.Context) ([]Event, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	// Return a COPY so callers cannot mutate our backing slice by accident.
	out := make([]Event, len(r.items))
	copy(out, r.items)
	return out, nil
}
