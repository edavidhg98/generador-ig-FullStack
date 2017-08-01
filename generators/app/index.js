'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const path = require('path');
const fs = require('fs');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the majestic ' + chalk.red('generator-ig-fullstack') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: '¿Cuál es el nombre de tu aplicación?',
        default: 'IG-FullStack'
      },
      {
        type: 'input',
        name: 'configFile',
        message: '¿Cuál es el nombre del archivo de configuración?',
        default: 'config.json'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      const configSettings = fs.readFileSync(path.join(props.configFile), 'utf8');
      this.config = JSON.parse(configSettings);
    });
  }

  writing() {
    this.config.entities.forEach((entity) => {
      let entityNameFormats = {
        name: entity.name,
        kebab: _.kebabCase(entity.name),
        camel: _.camelCase(entity.name),
        pascal: entity.name,
        start: _.startCase(entity.name)
      }
      this._writeServerCrudOperations(entity, entityNameFormats);
      this._writeAngularCrudOperations(entity, entityNameFormats);
    });

    this.fs.copyTpl(
      this.templatePath('src/app/entities/entities.module.ts'),
      this.destinationPath('src/app/entities/entities.module.ts'),
      { entities: this.config.entities, _: _ }
    );
  }

  _writeServerCrudOperations(entity, entityNameFormats) {
    const entityName = _.kebabCase(entity.name);
    let layersNames = ['model', 'repository', 'controller'];
    layersNames.forEach(layerName => {
      this.fs.copyTpl(
        this.templatePath(`server/api/entidad/_entidad.${layerName}.js`),
        this.destinationPath(`server/api/${entityName}/${entityName}.${layerName}.js`),
        { entityName: entityNameFormats, attributes: entity.attributes }
      );
    });

    this.fs.copyTpl(
      this.templatePath('server/api/entidad/_index.js'),
      this.destinationPath(`server/api/${entityName}/index.js`),
      { entityName: entityNameFormats }
    );
  }

  _writeAngularCrudOperations(entity, entityNameFormats) {
    const entityName = _.kebabCase(entity.name);
    let layersNames = ['.service.ts', '.model.ts', '.component.ts',
                      '.component.html', '.module.ts', '.route.ts',
                      '-delete-modal.component.ts', '-upsert.component.ts', '-upsert.component.html'];

    layersNames.forEach(layerName => {
      this.fs.copyTpl(
        this.templatePath(`src/app/entities/entity/_entity${layerName}`),
        this.destinationPath(`src/app/entities/${entityName}/${entityName}.${layerName}`),
        { entityName: entityNameFormats, attributes: entity.attributes, _: _ }
      );
    })
  }

  install() {
    this.installDependencies();
  }
};
