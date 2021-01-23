
# 学习笔记
## 浏览器渲染过程

URL-(HTTP)-> HTML -(parse)-> DOM -(css computing)-> DOM with CSS -(layout)-> DOM with position -(render)-> Bitmap


## 状态机

1. 有限状态机
    * 没有状态，纯函数
    * Moore: 有确定的下一个状态
    * Mealy：根据输入决定下一个状态
    ```
    // 状态机
    function state(input){
        return next;// 下一个状态
    }
    
    while(input){
        // 把状态机的返回值作为下一个状态
        state = state(input);
    }
    ```


## HTTP请求
URL --> HTML

### HTTP协议解析
#### ISO-OSI七层网络模型
* 应用 -- 表示 -- 会话 -- 传输 -- 网络 ----- 数据链路 -- 物理
* HTTP ---------------- TCP -- Internet -- 4G/5G/WIFI
* HTTP: require("http")
* TCP: require("net")

#### TCP
数据包
* 流：传输数据
* 端口
* require('net')

#### IP
根据地址找到数据包从哪到哪
* 包
* IP地址
* libnet/libpcap(C++库)


#### HTTP协议
1. Request
    * Request line
        * method: POST/GET/PUT/...
        * path: default /
        * version: 1.1
    * headers: 
        * KV pairs
        * 以空行结束
    * body: 根据Content-Type格式
    * 换行符: \r\n
    ```
    POST / HTTP/1.1
    Host: 127.0.0.1
    Content-Type: application/x-www-form-urlencoded
    
    field=aaa&code=x%3D1
    ```
* Response
    * status line
        * version
        * status code: 500 404 200
        * text
    * headers
    * body: node默认返回chunked格式
    ```
    HTTP/1.1 200 OK
    Content-Type: text/html
    Date: Sat, 23 Jan 2021 06:01:11 GMT
    Connection: keep-alive
    Transfer-Encoding: chunked
    
    26
    <html><body>Hello World</html></body>
    0
    ```
## 查漏补缺

### \r和\n
* \r回车：回到当前行的行首
* \n换行：转到下一行的起始位置
* UNIX系统每行结尾只有\n, Windows每行结尾是\r\n

# 提交内容
1.　服务器代码：server.js
2.　客户端代码：client.js

