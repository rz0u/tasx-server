-- schema.sql
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'done');

CREATE TABLE IF NOT EXISTS tasks (
  id            SERIAL PRIMARY KEY,
  title         TEXT NOT NULL,
  description   TEXT,
  status        task_status NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at  TIMESTAMPTZ
);

-- sample data
INSERT INTO tasks (title, description, status, created_at, completed_at) VALUES
('Read NestJS docs', 'Skim controllers/providers', 'pending', NOW(), NULL),
('Design schema', 'Tables + relations', 'in_progress', NOW() - INTERVAL '1 day', NULL),
('Ship MVP', 'Deploy to staging', 'done', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day');
