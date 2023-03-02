const pgClient = require('../config/pgClient');

function index(req, res) {
  pgClient.query('SELECT id, name, author_id FROM books ORDER BY name')
    .then(results => {
      res.json(results.rows);
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    })
}

function show(req, res) {
  pgClient.query('SELECT id, name, author_id FROM books WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json(results.rows[0]);
      }
      else {
        res.status(404).json({ error: `Book not found for id ${req.params.id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    })
}

function create(req, res) {
  const book = req.body;

  const sql = 'INSERT INTO books (name, author_id) VALUES ($1, $2) RETURNING id';
  pgClient.query(sql, [book.name, book.author_id])
    .then(results => {
      res.location(`/books/${results.rows[0].id}`);
      res.json({ message: 'Book created successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    });
}

function update(req, res) {
  const book = req.body;

  const sql = 'UPDATE books SET name = $1, author_id = $2 WHERE id = $3';
  pgClient.query(sql, [book.name, book.author_id, req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json({ message: 'Book updated successfully' });
      }
      else {
        res.status(404).json({ error: `Book not found for id ${req.params.id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    });
}

function destroy(req, res) {
  pgClient.query('DELETE FROM books WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json({ message: 'Book deleted successsfully' })
      }
      else {
        res.status(404).json({ error: `Book not found for id ${req.params.id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    });
}

const booksController = {
  index,
  show,
  create,
  update,
  destroy
}
module.exports = booksController;