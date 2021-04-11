var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  async initPackage() {
    let answer = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname
      }
    ])

    const pkgJson = {
      "name": answer.name,
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "mocha --require @babel/register",
        "build": "webpack",
        "coverage": "nyc mocha --require @babel/register"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {

      },
      "dependencies": {

      }
    };
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

    this.npmInstall(["vue"], { 'save-dev': false });
    this.npmInstall([
      "webpack@4.44.2",
      "webpack-cli",
      "vue-loader",
      "vue-style-loader",
      "css-loader",
      "vue-template-compiler",
      "copy-webpack-plugin@6.0.3",
      "mocha",
      "nyc",
      "@babel/register",
      "@babel/preset-env",
      "@babel/core",
      "babel-loader",
      "babel-plugin-istanbul",
      "@istanbuljs/nyc-config-babel",
    ], { 'save-dev': true });

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
    );

    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc'),
    );

    this.fs.copyTpl(
      this.templatePath('HelloWorld.vue'),
      this.destinationPath('src/HelloWorld.vue'),
    );

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answer.name },
    );

    this.fs.copyTpl(
      this.templatePath('sample-test.js'),
      this.destinationPath('test/sample-test.js'),
    );

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
    );
  }

  // install() {
  //   this.npmInstall();
  // }

};