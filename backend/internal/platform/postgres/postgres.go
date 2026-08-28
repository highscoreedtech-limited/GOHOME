// Package postgres holds the database connection pool shared by the Postgres
// repositories. It is the only place that imports the pgx driver.
package postgres

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

// NewPool opens a connection pool and verifies it with a Ping. A *pool* keeps a
// set of reusable connections; each query borrows one and returns it. Sharing
// one pool across the app is the correct pattern (never open a connection per
// request).
func NewPool(ctx context.Context, dsn string) (*pgxpool.Pool, error) {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, fmt.Errorf("create pool: %w", err) // %w wraps the error
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("ping database: %w", err)
	}
	return pool, nil
}
