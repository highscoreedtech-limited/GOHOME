package message

import (
	"context"
	"errors"
	"testing"
)

// fakeRepo is a TEST DOUBLE: a hand-written implementation of the Repository
// interface used only in tests. Because Service depends on the interface, we
// can feed it exactly the data a test needs, with no database involved. This is
// the payoff of programming to interfaces.
type fakeRepo struct {
	items []Message
	err   error // set this to simulate a storage failure
}

func (f fakeRepo) List(context.Context) ([]Message, error) {
	return f.items, f.err
}

func (f fakeRepo) GetByID(_ context.Context, id string) (Message, error) {
	for _, m := range f.items {
		if m.ID == id {
			return m, nil
		}
	}
	return Message{}, ErrNotFound
}

// sample data used across tests.
func sample() []Message {
	return []Message{
		{ID: "a", Title: "The Power of Prayer", Author: "Vivian", Category: "Prayer", Tags: []string{"prayer"}, PublishedAt: ptr("2024-05-05")},
		{ID: "b", Title: "Walking in Faith", Author: "John Doe", Category: "Faith", Tags: []string{"faith"}, PublishedAt: ptr("2024-03-12")},
		{ID: "c", Title: "Destiny Angels", Author: "Sheila", Category: "Faith", Tags: []string{"angels"}, PublishedAt: ptr("2024-06-10")},
	}
}

func TestService_List(t *testing.T) {
	svc := NewService(fakeRepo{items: sample()})

	// Table-driven: each case is one scenario. The table reads like a spec.
	tests := []struct {
		name     string
		category string
		query    string
		wantIDs  []string
	}{
		{name: "no filter returns all", wantIDs: []string{"a", "b", "c"}},
		{name: "filter by category", category: "Faith", wantIDs: []string{"b", "c"}},
		{name: "category All is a no-op", category: "All", wantIDs: []string{"a", "b", "c"}},
		{name: "search by title term", query: "prayer", wantIDs: []string{"a"}},
		{name: "search by author", query: "john", wantIDs: []string{"b"}},
		{name: "search with no match", query: "zzz", wantIDs: []string{}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := svc.List(context.Background(), tt.category, tt.query)
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !equalIDs(got, tt.wantIDs) {
				t.Errorf("got ids %v, want %v", ids(got), tt.wantIDs)
			}
		})
	}
}

func TestService_Latest(t *testing.T) {
	svc := NewService(fakeRepo{items: sample()})

	// Newest publishedAt first: c (2024-06-10), a (2024-05-05), b (2024-03-12).
	got, err := svc.Latest(context.Background(), 2)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	want := []string{"c", "a"}
	if !equalIDs(got, want) {
		t.Errorf("Latest(2) = %v, want %v", ids(got), want)
	}
}

func TestService_Get_NotFound(t *testing.T) {
	svc := NewService(fakeRepo{items: sample()})

	_, err := svc.Get(context.Background(), "does-not-exist")
	// errors.Is walks wrapped errors; here it checks the sentinel value.
	if !errors.Is(err, ErrNotFound) {
		t.Errorf("got %v, want ErrNotFound", err)
	}
}

// helpers ---------------------------------------------------------------------

func ids(ms []Message) []string {
	out := make([]string, len(ms))
	for i, m := range ms {
		out[i] = m.ID
	}
	return out
}

func equalIDs(ms []Message, want []string) bool {
	got := ids(ms)
	if len(got) != len(want) {
		return false
	}
	for i := range got {
		if got[i] != want[i] {
			return false
		}
	}
	return true
}
