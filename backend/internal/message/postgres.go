package message

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// PostgresRepository is the production storage: it satisfies the SAME Repository
// interface as InMemoryRepository, so swapping it in (in main.go) requires no
// changes to the service or handlers. tags and chapters are stored as JSONB
// columns, so a message is a single row (no joins needed to read it).
type PostgresRepository struct {
	pool *pgxpool.Pool
}

func NewPostgresRepository(pool *pgxpool.Pool) *PostgresRepository {
	return &PostgresRepository{pool: pool}
}

const messageColumns = `id, title, author, category, description, tags,
	cover_image, pages, estimated_reading_time, featured, published_at,
	chapters, content`

func (r *PostgresRepository) List(ctx context.Context) ([]Message, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT `+messageColumns+` FROM messages ORDER BY published_at DESC NULLS LAST`)
	if err != nil {
		return nil, err
	}
	defer rows.Close() // always close rows to return the connection to the pool

	var out []Message
	for rows.Next() {
		m, err := scanMessage(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, m)
	}
	return out, rows.Err()
}

func (r *PostgresRepository) GetByID(ctx context.Context, id string) (Message, error) {
	row := r.pool.QueryRow(ctx,
		`SELECT `+messageColumns+` FROM messages WHERE id = $1`, id)

	m, err := scanMessage(row)
	if errors.Is(err, pgx.ErrNoRows) {
		return Message{}, ErrNotFound // translate driver error to our sentinel
	}
	return m, err
}

// rowScanner is implemented by both pgx.Row (single) and pgx.Rows (loop), so one
// scanMessage works for GetByID and List.
type rowScanner interface {
	Scan(dest ...any) error
}

func scanMessage(s rowScanner) (Message, error) {
	var (
		m           Message
		tagsJSON    []byte
		chaptersJSON []byte
	)
	// Scan reads columns positionally into these destinations. NULL columns
	// scan into nil for the pointer fields (*string, *int).
	err := s.Scan(
		&m.ID, &m.Title, &m.Author, &m.Category, &m.Description, &tagsJSON,
		&m.CoverImage, &m.Pages, &m.EstimatedReadingTime, &m.Featured,
		&m.PublishedAt, &chaptersJSON, &m.Content,
	)
	if err != nil {
		return Message{}, err
	}
	if len(tagsJSON) > 0 {
		_ = json.Unmarshal(tagsJSON, &m.Tags)
	}
	if len(chaptersJSON) > 0 {
		_ = json.Unmarshal(chaptersJSON, &m.Chapters)
	}
	return m, nil
}
