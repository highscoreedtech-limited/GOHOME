package message

import (
	"context"
	"errors"
	"sync"
)

// ErrNotFound is a SENTINEL error: a package-level error value callers can
// compare against with errors.Is(err, ErrNotFound). This lets the handler map
// "not found" to HTTP 404 without string matching.
var ErrNotFound = errors.New("message not found")

// Repository is the storage CONTRACT. The service depends on this interface,
// not on any concrete database. Swapping the in-memory store for a Postgres
// store later means writing a new type that satisfies these methods; nothing
// else changes. This is "dependency inversion", the key to the whole layering.
//
// Every method takes a context.Context first. Context carries cancellation and
// deadlines (e.g. the client hung up, or a query is taking too long). The
// in-memory store ignores it, but a real DB driver will use it.
type Repository interface {
	List(ctx context.Context) ([]Message, error)
	GetByID(ctx context.Context, id string) (Message, error)
}

// InMemoryRepository stores messages in a map. It satisfies Repository.
//
// sync.RWMutex guards the map because each HTTP request runs in its own
// goroutine (a lightweight thread). Concurrent map access without a lock is a
// data race. RWMutex allows many simultaneous READERS or one WRITER.
type InMemoryRepository struct {
	mu    sync.RWMutex
	items map[string]Message
	order []string // remembers insertion order for stable listing
}

// NewInMemoryRepository builds the store and fills it with seed data.
// Returning a *pointer* means callers share one store, not copies.
func NewInMemoryRepository() *InMemoryRepository {
	r := &InMemoryRepository{items: make(map[string]Message)}
	for _, m := range seed() {
		r.items[m.ID] = m
		r.order = append(r.order, m.ID)
	}
	return r
}

// List returns all messages in insertion order.
//
// `(r *InMemoryRepository)` is the RECEIVER: it makes List a METHOD on the
// type. Using a pointer receiver lets the method see the shared state.
func (r *InMemoryRepository) List(_ context.Context) ([]Message, error) {
	r.mu.RLock()         // take a read lock
	defer r.mu.RUnlock() // release it when the function returns
	out := make([]Message, 0, len(r.order))
	for _, id := range r.order {
		out = append(out, r.items[id])
	}
	return out, nil
}

// GetByID returns one message or ErrNotFound.
//
// The comma-ok form `m, ok := map[key]` tells us whether the key existed.
func (r *InMemoryRepository) GetByID(_ context.Context, id string) (Message, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	m, ok := r.items[id]
	if !ok {
		return Message{}, ErrNotFound // return the zero value + the error
	}
	return m, nil
}
