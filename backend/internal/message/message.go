// Package message is a self-contained "domain": the model, storage, business
// logic, and HTTP handlers for library messages. Keeping a feature in one
// package makes it easy to reason about and, later, to split out.
package message

// Chapter is one section of a chaptered message.
type Chapter struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

// Message mirrors the LibraryItem shape the frontend already consumes, so the
// JSON we emit drops in with no changes on the client.
//
// Note the POINTER fields (*string, *int). A plain string is never nil, so it
// would always serialize (e.g. "coverImage":""). A *string CAN be nil, and with
// `omitempty` a nil pointer is left out of the JSON entirely. That is exactly
// how the frontend treats optional metadata: absent, not empty. Pointers are
// Go's idiomatic way to say "this value is optional".
type Message struct {
	ID                   string    `json:"id"`
	Title                string    `json:"title"`
	Author               string    `json:"author"`
	Category             string    `json:"category"`
	Description          string    `json:"description"`
	Tags                 []string  `json:"tags"`
	CoverImage           *string   `json:"coverImage,omitempty"`
	Pages                *int      `json:"pages,omitempty"`
	EstimatedReadingTime *string   `json:"estimatedReadingTime,omitempty"`
	Featured             bool      `json:"featured,omitempty"`
	PublishedAt          *string   `json:"publishedAt,omitempty"`
	Chapters             []Chapter `json:"chapters,omitempty"`
	Content              *string   `json:"content,omitempty"`
}

// ptr is a tiny helper to take the address of a literal value, e.g. ptr("10 min
// read"). You cannot write &"..." in Go, so this generic helper fills the gap.
// `[T any]` makes it work for any type (a Go generic).
func ptr[T any](v T) *T { return &v }
