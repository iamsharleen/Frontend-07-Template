const http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    //console.log("chunk-->", chunk);
    // chunk类型为Buffer,　不用toSritng
    body.push(chunk);

  }).on('end', () => {
    console.log(body);
    body = Buffer.concat(body).toString();
    console.log("body:", body);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(' Hello World\n');
  });

}).listen(8080);

console.log("Server started.")
