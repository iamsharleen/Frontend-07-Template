# 学习笔记

## Yeoman

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


## Webpack

* webpack
* webpack-cli

`webpack.config.js`

* entry：入口
* output：输出
* loader

## Babel
* @babel/core
* @babel/cli
* @babel/preset-env

`.bablerc`
```
{
    "presets":["@babel/preset-env"]
}
```
`webpack.config.js`: babel-loader
