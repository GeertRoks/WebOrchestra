const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write('Hello World');
    res.end();
  }).listen(8080);
