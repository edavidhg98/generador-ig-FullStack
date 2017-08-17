'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const constants = require('../generator-constants');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.entity = opts.entity;
  }

  writing() {
    let destinationServerDirectory = 'api';
    if (this.typeOfApp === constants.APP_TYPE_ANGULAR_FULLSTACK) {
      destinationServerDirectory = 'server/' + destinationServerDirectory;
      this._writeClientEntity();
    }
    this._writeServerEntity(destinationServerDirectory);
  }

  _writeClientEntity() {
    const entityName = _.kebabCase(this.entity.name);
    const entityNameFormats = this._getNaminFormats(this.entity.name);
    let layersNames = ['.service.ts', '.model.ts', '.component.ts',
                      '.component.html', '.module.ts', '.route.ts',
                      '-upsert.component.ts', '-upsert.component.html',
                      '-details.component.ts', '-details.component.html'];

    layersNames.forEach(layerName => {
      this.fs.copyTpl(
        this.templatePath(`client/angular/entity/_entity${layerName}`),
        this.destinationPath(`src/app/entities/${entityName}/${entityName}${layerName}`),
        { entityName: entityNameFormats, attributes: this.entity.attributes, _: _ }
      );
    });
  }

  _writeServerEntity(destinationServerDirectory) {
    const entityName = _.kebabCase(this.entity.name);
    const entityNameFormats = this._getNaminFormats(this.entity.name);
    let layersNames = ['model', 'repository', 'controller'];

    layersNames.forEach(layerName => {
      this.fs.copyTpl(
        this.templatePath(`server/api/entidad/_entidad.${layerName}.js`),
        this.destinationPath(`${destinationServerDirectory}/${entityName}/${entityName}.${layerName}.js`),
        { entityName: entityNameFormats, attributes: this.entity.attributes, relationships: this.entity.relationships }
      );
    });

    this.fs.copyTpl(
      this.templatePath('server/api/entidad/_index.js'),
      this.destinationPath(`${destinationServerDirectory}/${entityName}/index.js`),
      { entityName: entityNameFormats }
    );
  }

  _getNaminFormats(name) {
    return {
        name: name,
        kebab: _.kebabCase(name),
        camel: _.camelCase(name),
        pascal: _.startCase(name).replace(' ', ''),
        start: _.startCase(name)
    }
  }
};
