require("dotenv").config();

const http = require("http");
const url = require("url");

const server = http.createServer(requestHandler);
server.listen(process.env.PORT, process.env.HOST, startHandler);

function requestHandler(req, res) {
  console.log("Handling request.");

  try {
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
  catch (e) {
    writeResponse(res, 400, { error: e.message });
  }
}

function add(req, res) {
  const query = getQuery(req);

  if(query.a === undefined || query.b === undefined) {
    throw Error("Both a and b are required.");
  }

  const a = parseFloat(query.a);
  const b = parseFloat(query.b);

  if(isNaN(a) || isNaN(b)) {
    throw Error("Both a and b must be numbers.");
  }

  const sum = a + b;
  writeResponse(res, 200, { sum: sum });
}

function subtract(req, res) {
  const query = getQuery(req);

  if (query.a === undefined || query.b === undefined) {
    throw Error("Both a and b are required.");
  }

  const a = parseFloat(query.a);
  const b = parseFloat(query.b);

  if (isNaN(a) || isNaN(b)) {
    throw Error("Both a and b must be numbers.");
  }

  const difference = a - b;
  writeResponse(res, 200, { difference: difference });
}

function sum(req, res) {
  const query = getQuery(req);
  const nums = (query.num instanceof Array ? query.num : [query.num]);

  if (query.num === undefined) {
    throw Error("num is required and must contain at least one value.");
  }

  let sum = 0;

  nums.forEach((num) => {
    const value = parseFloat(num);
    if (isNaN(value)) {
      throw Error("num can only conatain numbers.");
    }

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