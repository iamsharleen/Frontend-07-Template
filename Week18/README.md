# 工具链

## 初始化
### YEOMAN

* npm install -g yo
* npm install --save yeoman-generator
* npm link（把一个本地模块link到npm的标准模块）

`package.json` name必须是generator开头
```
{
  "name": "generator-toolchain",
  "version": "1.0.0",
  "description": "",
  "main": "generator/app/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "yeoman-generator": "^5.2.0"
  }
}
```


`\app\index.js`
* 每个method都会执行
* 支持async
* 用户交互: this.prompt
* 文件系统: this.fs.extendJSON(), this.fs.copyTpl()
* this.npmInstall()

## 构建
### Webpack

#### 打包工具：
Node代码->浏览器可用(基于JS)

#### 核心：
最终打包出js文件，html手工引用js文件

#### 多文件合并：
loader & plugin

#### 安装：

* webpack
* webpack-cli

* 全局安装
```
npm install webpack -g
npm install webpack-cli -g
```
* 项目内安装

```
npm install webpack-cli --save-dev
npx webpack
```
#### Config

`webpack.config.js`
* entry
* output
* loader
* plugin


### Babel

#### 安装

* @babel/core
* @babel/cli
* 
```
npm install -g @babel/core @babel/cli
```
#### 使用
```
babel ./src/app.js > app.txt
```

#### Config

1.独立使用 `.bablerc`

npm install --save-dev @babel/preset-env
```
{
    "presets":["@babel/preset-env"]
}
```

2.在Webpack中配置 `webpack.config.js`
```
{
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: { presets: ["@babel/preset-env"] }
    },
}
```

## 单元测试

测试工具：MOCHA, JEST

### MOCHA

针对js的测试框架

#### 安装
```
npm install --global mocha
```

#### 使用
1. 直接使用(依赖build)

`/test/test.js`

```
// add.js
// module.exports = add

var assert = require('assert');
var add = require('../add.js')

describe("test cases: ", () => {
  it('1 + 2 shoulc be 3', function () {
    assert.equal(add(1, 2), 3);
  });
})
```
command: mocha

2. 使用@babel/register

安装：npm install --save-dev @babel/core @babel/register

`/test/test.js`

```
// add.js
//export function add(){...}

var assert = require('assert');
import { add } from '../add.js'

describe("test cases: ", () => {
  it('1 + 2 shoulc be 3', function () {
    assert.equal(add(1, 2), 3);
  });
})
```
command: ./node_modules/.bin/mocha --require @babel/register

或

在`package.json`配置:

```
"scripts": {
    "test": "mocha --require @babel/register",
},
```
command: npm run test


### Code Coverage

工具：nyc

安装：npm install --save-dev nyc

command：
./node_modules/.bin/nyc ./node_modules/.bin/mocha --require @babel/register

配置
`.nycrc`
```
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```

在`package.json`中配置
```
"scripts": {
    "test": "mocha --require @babel/register",
    "coverage": "nyc mocha"
  },
```
command: npm run coverage



## 作业

1. test-demo
2. html-parser

Result:

File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------|---------|----------|---------|---------|-------------------
All files  |   97.97 |       84 |     100 |   97.97 |                   
 parser.js |   97.97 |       84 |     100 |   97.97 | 108,127,271       

3. generator-toytool

