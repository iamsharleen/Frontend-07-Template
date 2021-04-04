var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  // method1() {
  //   this.log('method 1 just ran');
  // }

  // method2() {
  //   this.log('method 2 just ran');
  // }

  // async prompting() {
  //   const answers = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Your project name",
  //       default: this.appname // Default to current folder name
  //     },
  //     {
  //       type: "confirm",
  //       name: "cool",
  //       message: "Would you like to enable the Cool feature?"
  //     }
  //   ]);

  //   this.log("app name", answers.name);
  //   this.log("cool feature", answers.cool);
  // }



  initPackage() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    };
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

  }


  async copyTol() {
    this.fs.copyTpl(
      this.templatePath('t.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    );
  }

  // install() {
  //   this.npmInstall();
  // }

};