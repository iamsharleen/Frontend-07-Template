let http = require('http');
let https = require('https');
let querystring = require("querystring");
let unzipper = require('unzipper');

//  2. auth路由：接受code，用code+client_id+client_secret换token
function auth(request, response) {
  let query = request.url.match(/^\/auth\?([\s\S]+)/)[1];
  console.log(query);
  query = querystring.parse(query);
  console.log(query);

  getToken(query.code, (info) => {
    console.log(info);
    //response.write(JSON.stringify(info));
    response.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`);

    response.end();
  });
}

function getToken(code, callback) {
  let request = https.request({
    hostname: 'github.com',
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.487edef191c186b3&client_secret=8adc4786ea606d84248a6ee5a3275d5d641c87cf`,
    port: 443,
    method: 'POST'
  }, (rep) => {
    let body = "";
    rep.on('data', chunk => {
      body += chunk.toString();
    })

    rep.on('end', chunk => {
      //console.log(body);
      let o = querystring.parse(body);
      console.log(o);
      callback(o);
    })
  })
  request.end();
}

// 4. publish路由：用token获取用户信息，检查权限，接受发布
function publish(request, response) {
  let query = request.url.match(/^\/publish\?([\s\S]+)/)[1];
  query = querystring.parse(query);

  if (query.token) {
    getUser(query.token, info => {
      console.log(info);
      if (info.login === "iamsharleen") {
        // publish
        // request.pipe(outFile);
        request.pipe(unzipper.Extract({ path: '../server/public/' }))
      }
    });
  }
}


function getUser(token, callback) {
  //https://api.github.com/user
  let request = https.request({
    hostname: 'api.github.com',
    path: `/user`,
    port: 443,
    method: 'GET',
    headers: {
      "Authorization": `token ${token}`,
      "User-Agent": " sk-toy-publish"
    }
  }, (resp) => {
    let body = "";
    resp.on('data', chunk => {
      body += chunk.toString();
    })
    resp.on('end', chunk => {
      callback(JSON.parse(body));
    })
  })
  request.end();
}


http.createServer((req, res) => {
  console.log(req);

  if (req.url.match(/^\/auth\?/)) {
    return auth(req, res);
  }
  if (req.url.match(/^\/publish\?/)) {
    return publish(req, res);
  }
  // let outFile = fs.createWriteStream("../server/public/index.html")
  // req.pipe(outFile);
  // res.end("Hello World")
}).listen(8082)