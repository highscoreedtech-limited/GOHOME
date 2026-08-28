package event

import "context"

// Service is a thin wrapper here (events have no filtering yet), but keeping the
// layer means adding logic later, like "only future events", touches one place.
type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) List(ctx context.Context) ([]Event, error) {
	return s.repo.List(ctx)
}
