DROP DATABASE IF EXISTS books_db;
CREATE DATABASE books_db;

\c books_db

DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  author VARCHAR(255) NOT NULL
);

INSERT INTO books(name, author) VALUES
  ('The Cat in the Hat', 'Dr. Seuss'),
  ('Goodnight Moon', 'Margaret Wise Brown'),
  ('The Princess Bride', 'William Goldman'),
  ('The Silence of the Lambs', 'Thomas Harris'),
  ('Somehow I Manage', 'Michael G. Scott');