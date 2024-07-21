DROP DATABASE IF EXISTS moodsync_db;
CREATE DATABASE moodsync_db;

\c moodsync_db;

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(50) NOT NULL,
--   email VARCHAR(75) NOT NULL,
--   password_hash VARCHAR,
--   phone_number VARCHAR(20) NOT NULL,
--   created_at TIMESTAMP,
--   last_login TIMESTAMP
-- );

-- CREATE TABLE moods (
--   id SERIAL PRIMARY KEY,
--   mood_name VARCHAR(30) NOT NULL,
--   mood_category VARCHAR,
--   mood_score INTEGER
-- );

-- CREATE TABLE journalEntries (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL,
--   content TEXT NOT NULL,
--   mood_id INTEGER NOT NULL,
--   created_at TIMESTAMP,
--   FOREIGN KEY (user_id)
--   REFERENCES users(id),
--   FOREIGN KEY (mood_id)
--   REFERENCES moods(id)
-- );

-- CREATE TABLE resources (
--   id SERIAL PRIMARY KEY,
--   title VARCHAR(30) NOT NULL,
--   DESCRIPTION TEXT,
--   category VARCHAR NOT NULL,
--   url VARCHAR
-- );