-- Schema for Phase 1. Apply with a migration tool such as golang-migrate:
--   migrate -database "$DATABASE_URL" -path backend/migrations up
--
-- tags and chapters are stored as JSONB so a message is one self-contained row.

CREATE TABLE messages (
    id                     text PRIMARY KEY,
    title                  text NOT NULL,
    author                 text NOT NULL,
    category               text NOT NULL,
    description            text NOT NULL DEFAULT '',
    tags                   jsonb NOT NULL DEFAULT '[]',
    cover_image            text,
    pages                  integer,
    estimated_reading_time text,
    featured               boolean NOT NULL DEFAULT false,
    published_at           text,
    chapters               jsonb,
    content                text
);

CREATE INDEX messages_published_at_idx ON messages (published_at DESC);

CREATE TABLE events (
    id          text PRIMARY KEY,
    title       text NOT NULL,
    category    text NOT NULL,
    time        text,
    location    text,
    description text,
    date        text,
    start_date  text,
    end_date    text,
    weekday     integer
);

CREATE TABLE contact_messages (
    id         text PRIMARY KEY,
    name       text NOT NULL,
    email      text NOT NULL,
    subject    text NOT NULL DEFAULT '',
    message    text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
