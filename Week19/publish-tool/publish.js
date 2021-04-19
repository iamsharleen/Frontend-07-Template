let http = require('http');
let archiver = require('archiver');
let child_process = require('child_process');
let querystring = require("querystring")

// 1. 打开https://github.com/login/oauth/authorize
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.487edef191c186b3`);

// 3. 创建server，接受token，后点击发
http.createServer((req, res) => {
  let query = req.url.match(/^\/\?([\s\S]+)/)[1];
  query = querystring.parse(query);
  console.log(query);
  publish(query.token);
}).listen(8083);

function publish(token) {
  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: "POST",
    path: `/publish?token=${token}`,
    headers: {
      'Content-Type': 'application/octet-stream',
      //'Content-Length': stats.size,
    }
  }, rep => {
    console.log(rep);
  })

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.directory('./sample/', false);
  archive.finalize();
  archive.pipe(request);

  archive.on('end', chunk => {
    request.end();
  })
}






