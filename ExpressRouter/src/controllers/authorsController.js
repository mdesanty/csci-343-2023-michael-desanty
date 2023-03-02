const pgClient = require('../config/pgClient');

function index(req, res) {
  pgClient.query('SELECT id, first_name, last_name, middle_name, salutation FROM authors ORDER BY last_name')
    .then(results => {
      res.json(results.rows);
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    })
}

function show(req, res) {
  pgClient.query('SELECT id, first_name, last_name, middle_name, salutation FROM authors WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json(results.rows[0]);
      }
      else {
        res.status(404).json({ error: `Author not found for id ${req.params.id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    })
}

function create(req, res) {
  const author = req.body;

  const sql = 'INSERT INTO authors (first_name, last_name, middle_name, salutation) VALUES ($1, $2, $3, $4) RETURNING id';
  pgClient.query(sql, [author.first_name, author.last_name, author.middle_name, author.salutation])
    .then(results => {
      res.location(`/authors/${results.rows[0].id}`);
      res.json({ message: 'Author created successfully'});
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    });
}

function update(req, res) {
  const author = req.body;

  const sql = 'UPDATE authors SET first_name = $1, last_name = $2, middle_name = $3, salutation = $4 WHERE id = $5';
  pgClient.query(sql, [author.first_name, author.last_name, author.middle_name, author.salutation, req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json({ message: 'Author updated successfully' });
      }
      else {
        res.status(404).json({ error: `Author not found for id ${req.params.id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    });
}

function destroy(req, res) {
  pgClient.query('DELETE FROM authors WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json({ message: 'Author deleted successsfully' })
      }
      else {
        res.status(404).json({ error: `Author not found for id ${req.params.id}` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Encountered error: ${error}` });
    });
}

const authorsController = {
  index,
  show,
  create,
  update,
  destroy
}
module.exports = authorsController;