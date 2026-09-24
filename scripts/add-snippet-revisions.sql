CREATE TABLE iF"
  id SERIAL PRIMARY KEY,
  snippet_id VARCHAR(64) NOT NULL,
  version_number INT NOT NULL,
  content TEXT NOT NULL,
  editor_id VARCHAR(64),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(snippet_id, version_number);