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
        default: 'ig-fullstack'
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
      this.appName = {
        name: props.appName,
        kebab: _.kebabCase(props.appName),
        camel: _.camelCase(props.appName),
        pascal: props.appName,
        start: _.startCase(props.appName)
      }
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
      this._writeServerCrudOperationsByEntity(entity, entityNameFormats);
      this._writeAngularCrudOperationsByEntity(entity, entityNameFormats);
    });

    this._writeAngularEntitiesModule(this.config.entities);
    this._writeAngularLayoutsComponents(this.config.entities, this.appName);
    this._writeAngularHomeComponents();
    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath('src'),
      { appName: this.appName }
    );
    // entry point Node Server
    this.fs.copyTpl(
        this.templatePath('server.js'),
        this.destinationPath('server.js'),
        { entities: this.config.entities, _: _ }
    );
    // file constants Node.js
    this.fs.copyTpl(
      this.templatePath('server-config'),
      this.destinationPath('server-config'),
      { appName: this.appName }
    );
    this._writeRootFolders();
    this._writeRootFiles();
    //this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'));
  }

  _writeServerCrudOperationsByEntity(entity, entityNameFormats) {
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

  _writeAngularCrudOperationsByEntity(entity, entityNameFormats) {
    const entityName = _.kebabCase(entity.name);
    let layersNames = ['.service.ts', '.model.ts', '.component.ts',
                      '.component.html', '.module.ts', '.route.ts',
                      '-delete-modal.component.ts',
                      '-upsert.component.ts', '-upsert.component.html',
                      '-details.component.ts', '-details.component.html'];

    layersNames.forEach(layerName => {
      this.fs.copyTpl(
        this.templatePath(`_app/entities/entity/_entity${layerName}`),
        this.destinationPath(`src/app/entities/${entityName}/${entityName}${layerName}`),
        { entityName: entityNameFormats, attributes: entity.attributes, _: _ }
      );
    })
  }

  _writeAngularEntitiesModule(entities) {
    let fileNames = [ '.module', '.route', '-shared.module' ];

    fileNames.forEach(fileName => {
      this.fs.copyTpl(
        this.templatePath(`_app/entities/entities${fileName}.ts`),
        this.destinationPath(`src/app/entities/entities${fileName}.ts`),
        { entities: this.config.entities, _: _ }
      );
    });
  }

  _writeAngularLayoutsComponents(entities, appName) {
    this.fs.copyTpl(
      this.templatePath('_app/layouts'),
      this.destinationPath('src/app/layouts'),
      { entities: this.config.entities, appName: appName,  _: _ }
    );
  }

  _writeAngularHomeComponents() {
    this.fs.copy(this.templatePath('_app/home'), this.destinationPath('src/app/home'));
  }

  _writeRootFolders() {
    this.fs.copy(this.templatePath('bin'), this.destinationPath('bin'));
    this.fs.copy(this.templatePath('e2e'), this.destinationPath('e2e'));
  }

  _writeRootFiles() {
    this.fs.copy(this.templatePath('_root-files'), this.destinationPath(''));
    this.fs.copy(this.templatePath('.angular-cli.json'), this.destinationPath('.angular-cli.json'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
  }

  install() {
    this.installDependencies();
  }
};
