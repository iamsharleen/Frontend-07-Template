# 发布系统
* 线上服务系统 - server
* 发布系统 - publish-server
* 发布工具 - publish-tool

## Server

### 利用Express
```
mkdir server

npx express-generator

npm install

npm start  
// default port: 3000
```

public文件夹的文件可以被访问。

### 在VM上布署server

安装最新版的nodejs:

sudo npm install -g n

n latest

使用scp命令把文件复制到VM上


## publish-server 和 publish-tool

### 创建项目
```
mkdir publish-server
npm init

mkdir publish-tool
npm init
````

创建`server.js`
```
let http = require('http');

http.createServer((req, res) => {
  console.log(req);
  res.end("Hello World")
}).listen(8082)
```

创建`publish.js`
```
let http = require('http');
let request = http.request({
  hostname: "127.0.0.1",
  port: 8082,
}, rep => {
  console.log(rep);
})
request.end();
```

### Node.js的流

**流式传输**

#### 可读的流 stram.Readable

 https://nodejs.org/docs/latest-v13.x/api/stream.html#stream_class_stream_readable

`publish.js`：读取文件
```
// 文件系统
let fs = require('fs');

let file = fs.createReadStream("./sample.html");
file.on('data', chunk => {
  console.log(chunk.toString());
});
file.on('end', chunk => {
  console.log("Read finish!");
});
```

`publish.js`：把文件内容添加到流，发送到服务器
```
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
file.on('data', chunk => {
  console.log(chunk.toString());
  request.write(chunk);
})
file.on('end', chunk => {
  request.end();
})
```

`server.js`：服务器接收内空

```
let http = require('http');

http.createServer((request, response) => {
  request.on('data', chunk => {
    console.log(chunk.toString());
  })
  request.on('end', chunk => {
    response.end("Success!")
  })
}).listen(8082)
```

#### 可写的流 stram.Writable

Writable.write()：异步


`server.js`：在服务器上接收并生成文件
```
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
```

#### 多文件发布

##### 使用readable.pipe()

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

##### 文件大小

`publish.js`：使用fs.stat()读取文件大小
```
fs.stat("./sample.html", (err, stats) => {
  let request = http.request({
    hostname: "127.0.0.1",
    port: 8082,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stats.size,
    }
  }, response => {
    console.log(response);
  });
  
  //...

});
```


##### 多文件

**压缩和解压**
* archiver

npm install --save archiver

`publish.js`
```
const archive = archiver('zip', {
  zlib: { level: 9 }
})

archive.directory('./sample/', false);
archive.finalize();
archive.pipe(request);

```

* unzipper

npm install --save unzipper

`server.js`
```
let http = require('http');
let unzipper = require('unzipper');

http.createServer((request, response) => {
  console.log(request.headers);

  request.pipe(unzipper.Extract({ path: '../server/public/' }))
}).listen(8082)
```

#### 用GitHub oAuth做一个登录实例


create app

App ID: 111034
Client ID: Iv1.487edef191c186b3
Client Secure:8adc4786ea606d84248a6ee5a3275d5d641c87cf


1. 打开https://github.com/login/oauth/authorize(tool)
2. auth路由：接受code，用code+client_id+client_secret换token(server)
3. 创建server，接受token，后点击发布(tool)
4. publish路由：用token获取用户信息，检查权限，接受发布(server)