require('dotenv').config();

const express = require('express');
const app = express();

app.get('/authors', getAuthors);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function getAuthors(req, res) {
  const authors = [
    {first_name: 'John', last_name: 'Something'},
    {first_name: 'Steve', last_name: 'Somethingelse'},
    {first_name: 'Joe', last_name: 'Jonson'},
    {first_name: 'Bill', last_name: 'Will'}
  ];

  res.json(authors);
}