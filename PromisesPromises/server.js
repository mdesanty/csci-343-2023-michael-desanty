require('dotenv').config();

const calculator = require('./asyncCalculator');

const express = require('express');
const app = express();

app.get('/add', add);
app.get('/subtract', subtract);
app.get('/sum', sum);
app.get('/calculate', addSubtractAndSum);
app.get('/build', build);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function add(req, res) {
  calculator.add(req.query.a, req.query.b)
    .then(sum => { res.json({ result: sum }); })
    .catch(error => { res.status(400).json({ error: error.message }); });
}

function subtract(req, res) {
  calculator.subtract(req.query.a, req.query.b)
    .then(value => { res.json({ result: value }); })
    .catch(error => { res.status(400).json({ error: error.message }); });
}

function sum(req, res) {
  calculator.sum(req.query.num)
    .then(value => { res.json({ result: value });})
    .catch(error => { res.status(400).json({ error: error.message }); });
}

function addSubtractAndSum(req, res) {
  let result = {};

  calculator.add(req.query.a, req.query.b)
    .then(value => {
      result.addResult = value;
      return calculator.subtract(req.query.a, req.query.b);
    })
    .then(value => {
      result.subtractResult = value;
      return calculator.sum(req.query.num);
    })
    .then(value => {
      result.sumResult = value;
      res.json(result);
    })
    .catch(error => { res.status(400).json({ error: error.message }) });
}

function build(req, res) {
  getBuildPromise(req.query.number)
    .then(value => { return value * 3; })
    .then(value => { return value * 4; })
    .then(value => { res.json({ result: value }); })
    .catch(error => { res.status(400).json({ error: error.message }) });
}

function getBuildPromise(number) {
  const promise = new Promise((resolve, reject) => {
    if (number === undefined)
      reject(new Error('Number is required.'));

    if (isNaN(number))
      reject(new Error('Number must be a number.'));

    const result = parseFloat(number) * 2;
    resolve(result);
  });

  return promise;
}