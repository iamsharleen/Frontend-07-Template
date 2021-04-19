let http = require('http');
let unzipper = require('unzipper');

http.createServer((request, response) => {
  console.log(request.headers);

  request.pipe(unzipper.Extract({ path: '../server/public/' }))
}).listen(8082)