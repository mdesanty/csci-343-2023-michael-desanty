require("dotenv").config();

const http = require("http");
const url = require("url");

const server = http.createServer(requestHandler);
server.listen(process.env.PORT, process.env.HOST, startHandler);

function requestHandler(req, res) {
  console.log("Handling request.");

  const urlParts = url.parse(req.url, true);
  const method = req.method;
  const path = urlParts.pathname;

  if (method !== "GET") {
    writeResponse(res, 405, { error: `Method ${method} not allowed.` });
    return;
  }

  switch (path) {
    case "/add":
      add(req, res);
      break;
    case "/subtract":
      subtract(req, res);
      break;
    case "/sum":
      sum(req, res);
      break;
    default:
      writeResponse(res, 400, { error: `<p>Invalid path ${path}.</p>` });
      break;
  }
}

function add(req, res) {
  const query = getQuery(req);

  const a = parseFloat(query.a);
  const b = parseFloat(query.b);

  const sum = a + b;
  writeResponse(res, 200, { sum: sum });
}

function subtract(req, res) {
  const query = getQuery(req);

  const a = parseFloat(query.a);
  const b = parseFloat(query.b);

  const difference = a - b;
  writeResponse(res, 200, { difference: difference });
}

function sum(req, res) {
  const query = getQuery(req);
  const nums = (query.num instanceof Array ? query.num : [query.num]);

  let sum = 0;

  nums.forEach((num) => {
    sum += parseFloat(num);
  });

  writeResponse(res, 200, { sum: sum });
}

function getQuery(req) {
  return url.parse(req.url, true).query;
}

function startHandler() {
  const address = server.address();
  console.log(`Server listening at ${address.address}:${address.port}`);
}

function writeResponse(res, status, object) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(object));
}