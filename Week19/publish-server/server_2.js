let http = require('http');
let fs = require("fs");

http.createServer((request, response) => {
  console.log(request.headers);
  let outFile = fs.createWriteStream("../server/public/index.html")
  request.pipe(outFile);
}).listen(8082)