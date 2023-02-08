require('dotenv').config();

const express = require('express');
const session = require('express-session');

const sessionOptions = {
  secret: 'Mike is my favorite teacher',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600_000
  }
};

const app = express();

const ourSession = session(sessionOptions);
app.use(ourSession);
app.use((req, res, next) => {
  req.session.operationCount ||= 0;
  req.session.operationCount++;

  next();
});

app.get('/add', add);
app.get('/subtract', subtract);
app.get('/sum', sum);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function add(req, res) {
  try {
    if (req.query.a === undefined || req.query.b === undefined)
      throw Error('Both a and b are required.');

    if (isNaN(req.query.a) || isNaN(req.query.b))
      throw Error('Both a and b must be numbers.');

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const sum = a + b;

    writeResponse(req, res, 200, { result: sum });
  }
  catch (e) {
    writeResponse(req, res, 400, { error: e.message });
  }
}

function subtract(req, res) {
  try {
    if (req.query.a === undefined || req.query.b === undefined)
      throw Error('Both a and b are required.');

    if (isNaN(req.query.a) || isNaN(req.query.b))
      throw Error('Both a and b must be numbers.');

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const difference = a - b;

    writeResponse(req, res, 200, { result: difference });
  }
  catch (e) {
    writeResponse(req, res, 400, { error: e.message });
  }
}

function sum(req, res) {
  try {
    if (req.query.num === undefined)
      throw Error("At least one num value required.");

    const nums = (req.query.num instanceof Array ? req.query.num : [req.query.num]);

    let sum = 0;

    nums.forEach((n) => {
      if (isNaN(n)) {
        throw Error("All nums values must be a number.");
      }
      sum += parseInt(n);
    });

    writeResponse(req, res, 200, { result: sum });
  }
  catch (e) {
    writeResponse(req, res, 400, { error: e.message });
  }
}

function writeResponse(req, res, status, object) {
  object.operationCount = req.session.operationCount;
  res.status(status).json(object);
}