# 发布系统

## Express
```
mkdir server

npx express-generator

npm install

npm start  
// default port: 3000
```

## Node.js

### Stream

* Writable
  * fs.createWriteStream()
* Readable
  * fs.createReadStream()
* Duplex
* Transform
### readable.pipe()
`publish.js`
```
// ...
let file = fs.createReadStream("./sample.html");
file.pipe(request);
```
`server.js`
```
  let outFile = fs.createWriteStream("../server/public/index.html")
  request.pipe(outFile);
```
### 文件大小 fs.stat()
```
fs.stat("./sample.html", (err, stats) => {
  stats.size;
});

```
### 压缩和解压
#### archiver

npm install --save archiver

使用：
`publish.js`
```
const archive = archiver('zip', {
  zlib: { level: 9 }
})

archive.directory('./sample/', false);
archive.finalize();
archive.pipe(request);

```

#### unzipper

npm install --save unzipper

使用：
`server.js`
```
let http = require('http');
let unzipper = require('unzipper');

http.createServer((request, response) => {
  console.log(request.headers);

  request.pipe(unzipper.Extract({ path: '../server/public/' }))
}).listen(8082)
```

## GitHub oAuth

* App ID
* Client ID
* Client Secure

1. 打开https://github.com/login/oauth/authorize(tool)
2. auth路由：接受code，用code+client_id+client_secret换token(server)
3. 创建server，接受token，后点击发布(tool)
4. publish路由：用token获取用户信息，检查权限，接受发布(server)

## Git Hooks

Directory: /.git/hooks

* pre-commit
* pre-push

只检查要提交的版本
```
git stash push -k
git stash list

git stash pop
```

## ESLint

```
npm init

npm install --save-dev eslint

npx eslint --init

npx eslint ./index.js
```

##　headless browser

### Headless Chrome

https://developers.google.com/web/updates/2017/04/headless-chrome?hl=en

```
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"

chrome --headless

chrome --headless --dump-dom about:blank

```

### puppeteer

https://developers.google.com/web/tools/puppeteer/get-started

npm install --save-dev 

```
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/main.html');
  const imgs = await page.$$('.carousel>div');
  console.log(imgs)
  await browser.close();
})();
````