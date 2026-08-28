package message

import (
	"context"
	"sort"
	"strings"
)

// Service holds the business logic. It depends on the Repository INTERFACE,
// so in tests we can pass a fake repo, and in prod a Postgres one.
type Service struct {
	repo Repository
}

// NewService is a "constructor". Go has no constructors built in; by convention
// we write New<Type> functions that take dependencies and return the value.
// Passing the repo in (rather than creating it inside) is dependency injection.
func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

// List returns messages, optionally narrowed by category and a search query.
func (s *Service) List(ctx context.Context, category, query string) ([]Message, error) {
	items, err := s.repo.List(ctx)
	if err != nil {
		// Go's error handling: functions return an error as the last value and
		// the caller checks it. No exceptions. Explicit and boring on purpose.
		return nil, err
	}

	if category != "" && category != "All" {
		items = keep(items, func(m Message) bool { return m.Category == category })
	}

	if q := strings.ToLower(strings.TrimSpace(query)); q != "" {
		items = keep(items, func(m Message) bool { return matches(m, q) })
	}

	return items, nil
}

// Get returns a single message by id (or ErrNotFound from the repository).
func (s *Service) Get(ctx context.Context, id string) (Message, error) {
	return s.repo.GetByID(ctx, id)
}

// Latest returns the n most recently published messages (publishedAt desc).
// ISO date strings ("2024-05-18") sort lexicographically the same as
// chronologically, so a plain string compare is enough.
func (s *Service) Latest(ctx context.Context, n int) ([]Message, error) {
	items, err := s.repo.List(ctx)
	if err != nil {
		return nil, err
	}
	sort.SliceStable(items, func(i, j int) bool {
		return published(items[i]) > published(items[j])
	})
	if n > 0 && len(items) > n {
		items = items[:n] // slice re-slice: take the first n
	}
	return items, nil
}

// keep filters a slice, returning only the elements for which pred is true.
// `pred func(Message) bool` is a function PARAMETER: we pass behavior around.
func keep(items []Message, pred func(Message) bool) []Message {
	out := make([]Message, 0, len(items))
	for _, m := range items {
		if pred(m) {
			out = append(out, m)
		}
	}
	return out
}

// matches reports whether a message matches a lowercase search query across
// title, author, description, category, and tags.
func matches(m Message, q string) bool {
	hay := strings.ToLower(strings.Join(append([]string{
		m.Title, m.Author, m.Description, m.Category,
	}, m.Tags...), " "))
	// Every whitespace-separated term must be present (AND semantics).
	for _, term := range strings.Fields(q) {
		if !strings.Contains(hay, term) {
			return false
		}
	}
	return true
}

// published safely reads the optional PublishedAt pointer, returning "" if nil.
// This is the standard nil-check before dereferencing a pointer.
func published(m Message) string {
	if m.PublishedAt == nil {
		return ""
	}
	return *m.PublishedAt // the `*` dereferences the pointer to read its value
}
