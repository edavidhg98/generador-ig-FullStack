'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.appName = opts.appName;
    this.entities = opts.entities;
  }

  writing() {
    this._writeSourceFolder();
    this._writeCommonFiles();
    this._writeAngularEntitiesModule();
    this._writeAngularLayoutsComponents();
    this.fs.copy(this.templatePath('angular/_app/home'), this.destinationPath('src/app/home'));
    this.fs.copy(this.templatePath('angular/e2e'), this.destinationPath('e2e'));
  }

  _writeSourceFolder() {
    this.fs.copyTpl(this.templatePath('angular/src'), this.destinationPath('src'), { appName: this.appName });
  }

  _writeAngularEntitiesModule() {
    let fileNames = [ '.module', '.route', '-shared.module' ];

    fileNames.forEach(fileName => {
      this.fs.copyTpl(
        this.templatePath(`angular/_app/entities/entities${fileName}.ts`),
        this.destinationPath(`src/app/entities/entities${fileName}.ts`),
        { entities: this.entities, _: _ }
      );
    });
  }

  _writeAngularLayoutsComponents() {
    this.fs.copyTpl(
      this.templatePath('angular/_app/layouts'),
      this.destinationPath('src/app/layouts'),
      { entities: this.entities, appName: this.appName,  _: _ }
    );
  }

  _writeCommonFiles() {
    this.fs.copy(this.templatePath('angular/.angular-cli.json'), this.destinationPath('.angular-cli.json'));
    this.fs.copy(this.templatePath('angular/.editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('angular/.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('angular/karma.conf.js'), this.destinationPath('karma.conf.js'));
    this.fs.copy(this.templatePath('angular/protractor.conf.js'), this.destinationPath('protractor.conf.js'));
    this.fs.copy(this.templatePath('angular/tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copy(this.templatePath('angular/tslint.json'), this.destinationPath('tslint.json'));
  }

  install() {
    this.installDependencies();
  }
};
