let http = require('http');
let fs = require('fs');


let request = http.request({
  hostname: "127.0.0.1",
  port: 8082,
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
  }
}, response => {
  console.log(response);
});

let file = fs.createReadStream("./sample.html");
file.pipe(request);

file.on('end', chunk => {
  request.end();
})