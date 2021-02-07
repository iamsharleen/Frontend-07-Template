
const net = require("net");
const parser = require("./parser.js");
const render = require("./render.js");
const images = require("images")

class Request {
  constructor(options) {
    this.method = options.method || "Get";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = "application/x-www-form-urlencoded";
    }

    if (this.headers['Content-Type'] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (this.headers['Content-Type'] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('$');
    }

    this.headers["Content-Length"] = this.bodyText.length;
  }

  /**
   * 在Request的构造器中收集必要信息
   * 设计一个send函数，把请求发送到服务器
   * 异步的
   * @param {*} connection 
   */
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new RespnseParser;

      if (connection) {
        connection.write(this.toString());
      } else {
        console.log(this.host, this.port);
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          console.log(this.toString());
          connection.write(this.toString());
        })
      }
      connection.on('data', (data) => {
        console.log("Data--> ", data.toString());
        parser.receive(data.toString());
        if (parser.isFinished) {
          resolve(parser.response);
          connection.end();
        }
      });
      connection.on('error', (err) => {
        console.log("Error--> ");
        reject(err)
        connection.end();
      })
    })
  }

  toString() {
    //不能有缩进
    return `POST / HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`

    //     return `POST / HTTP/1.1\r
    // X-Foo2: customed\r
    // Content-Type: application/x-www-form-urlencoded\r
    // Content-Length: 11\r
    // \r
    // name = winter`;
  }

}


class RespnseParser {
  constructor() {
    //状态机
    //TODO 改成函数写法
    this.WAITTING_STATUS_LINE = 0;
    this.WAITTING_STATUS_LINE_END = 1;
    this.WAITTING_HEADER_NAME = 2;
    this.WAITTING_HEADER_SPACE = 3;
    this.WAITTING_HEADER_VALUE = 4;
    this.WAITTING_HEADER_LINE_END = 5;
    this.WAITTING_HEADER_BLOCK_END = 6;
    this.WAITTING_BODY = 7;

    this.current = this.WAITTING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;

  }
  receive(string) {
    // console.log("Rceived string-->\r\n", string);
    // console.log("------>END")
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
    // console.log("statusLine --> ", this.statusLine);
    // console.log("headers --> ", this.headers);
    // console.log("headerName --> ", this.headerName);
    // console.log("headerValue --> ", this.headerValue);
    // console.log("bodyParser --> ", this.bodyParser);
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  /**
   * 用状态机解析字符串
   */
  receiveChar(c) {
    if (this.current === this.WAITTING_STATUS_LINE) {
      if (c === '\r') {
        this.current = this.WAITTING_STATUS_LINE_END;
      } else {
        this.statusLine += c;
      }
    } else if (this.current === this.WAITTING_STATUS_LINE_END) {
      if (c === '\n') {
        this.current = this.WAITTING_HEADER_NAME;
      }
    } else if (this.current === this.WAITTING_HEADER_NAME) {
      if (c === ':') {
        this.current = this.WAITTING_HEADER_SPACE;
      } else if (c === '\r') {
        this.current = this.WAITTING_HEADER_BLOCK_END;
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser();
        }
      } else {
        this.headerName += c;
      }
    } else if (this.current === this.WAITTING_HEADER_SPACE) {
      if (c === ' ') {
        this.current = this.WAITTING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITTING_HEADER_VALUE) {
      if (c === '\r') {
        this.current = this.WAITTING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += c;
      }
    } else if (this.current === this.WAITTING_HEADER_LINE_END) {
      if (c === '\n') {
        this.current = this.WAITTING_HEADER_NAME;
      }
    } else if (this.current === this.WAITTING_HEADER_BLOCK_END) {
      if (c === '\n') {
        this.current = this.WAITTING_BODY;
      }
    } else if (this.current === this.WAITTING_BODY) {
      // console.log(c)
      this.bodyParser.receiveChar(c);
    }
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WAITTING_LENGTH = 0;
    this.WAITTING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITTING_NEW_LINE = 3;
    this.WAITTING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;

    this.current = this.WAITTING_LENGTH;
  }


  receiveChar(char) {
    if (this.current === this.WAITTING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true;
        }
        this.current = this.WAITTING_LENGTH_LINE_END;
      } else {
        this.length *= 16;
        this.length += parseInt(char, 16);
      }
    } else if (this.current === this.WAITTING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char);
      this.length--;
      if (this.length === 0) {
        this.current = this.WAITTING_NEW_LINE;
      }
    } else if (this.current === this.WAITTING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITTING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITTING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITTING_LENGTH;
      }
    }
  }
}

void async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8080",
    path: "/",
    headers: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "winter"
    }

  })

  let response = await request.send();
  //console.log(response);
  //实际上应该采用异步分段处理
  let dom = parser.parseHTML(response.body);

  let viewport = images(800, 600)
  render(viewport, dom)
  viewport.save("viewport.jpg")

  //console.log(JSON.stringify(dom, null, " "));

}();


