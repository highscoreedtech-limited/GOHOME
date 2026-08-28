package contact

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

// PostgresRepository stores contact submissions in a table so nothing is lost.
type PostgresRepository struct {
	pool *pgxpool.Pool
}

func NewPostgresRepository(pool *pgxpool.Pool) *PostgresRepository {
	return &PostgresRepository{pool: pool}
}

func (r *PostgresRepository) Save(ctx context.Context, s Submission) error {
	// Parameterized query ($1, $2, ...): the driver sends values separately from
	// the SQL text, which prevents SQL injection. Never build SQL with string
	// concatenation of user input.
	_, err := r.pool.Exec(ctx,
		`INSERT INTO contact_messages (id, name, email, subject, message, created_at)
		 VALUES ($1, $2, $3, $4, $5, $6)`,
		s.ID, s.Name, s.Email, s.Subject, s.Message, s.CreatedAt,
	)
	return err
}
