let http = require('http');
let fs = require("fs");

http.createServer((request, response) => {
  let outFile = fs.createWriteStream("../server/public/index.html")
  request.on('data', chunk => {
    outFile.write(chunk);
  })
  request.on('end', () => {
    outFile.end();
    response.end("Success!")
  })
}).listen(8082)