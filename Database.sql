CREATE DATABASE foodfy

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT not null
)

CREATE TABLE chefs (
  id SERIAL PRIMARY KEY not null,
  name TEXT,
  file_id INTEGER REFERENCES files(id),
  created_at timestamp DEFAULT 'now()'
)

CREATE TABLE recipes (
	id SERIAL primary key not null,
  chef_id integer null,
	title text,
	ingredients text[],
	preparation text[],
	information text,
	created_at timestamp DEFAULT 'now()'
)

CREATE TABLE recipe_files (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  file_id INTEGER REFERENCES files(id)
)