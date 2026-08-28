package event

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

// PostgresRepository satisfies event.Repository from a Postgres table.
type PostgresRepository struct {
	pool *pgxpool.Pool
}

func NewPostgresRepository(pool *pgxpool.Pool) *PostgresRepository {
	return &PostgresRepository{pool: pool}
}

func (r *PostgresRepository) List(ctx context.Context) ([]Event, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT id, title, category, time, location, description,
		        date, start_date, end_date, weekday
		 FROM events`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var out []Event
	for rows.Next() {
		var e Event
		if err := rows.Scan(
			&e.ID, &e.Title, &e.Category, &e.Time, &e.Location, &e.Description,
			&e.Date, &e.Start, &e.End, &e.Weekday,
		); err != nil {
			return nil, err
		}
		out = append(out, e)
	}
	return out, rows.Err()
}
