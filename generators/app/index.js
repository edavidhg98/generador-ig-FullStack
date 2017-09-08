const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');
const utils = require('../utils');
const constants = require('../generator-constants');

module.exports = class extends Generator {
  prompting() {
    this._printInterGrupoLogo();

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
      },
      {
        type: 'list',
        name: 'typeOfApp',
        message: '¿Cuál es el tipo de aplicación a construir?',
        choices: constants.APP_TYPES
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.typeOfApp = props.typeOfApp;
      this.appName = utils.getNaminFormats(props.appName);

      try {
        const configSettings = JSON.parse(fs.readFileSync(path.join(props.configFile), 'utf8'));
        this.entities = this._processEntities(configSettings.entities);
        this.globalMessages = configSettings.globalMessages;
      } catch (error) {
        this.log(yosay(chalk.red(`No se ha encontrado el archivo de configuración, o no es un archivo JSON valido:
         ${props.configFile}`)));
        this.log(chalk.green('Se ha abortado el proceso de generación del proyecto'));
        throw error;
      }
    });
  }

  _processEntities(entities) {
    if (entities) {
      entities.forEach((entity) => {
        if (entity.relationships) {
          entity.relationships = this._uniq(entity.relationships);
        }
      });

      entities.forEach((entity) => {
        if (entity.name !== 'TR_ADMISION_OBSERVACIONES') {
          entity.relationships = null;
        }
      });

      entities.forEach((entity) => {
        if (entity.relationships) {
          entity.relationships.forEach((relation) => {
            const entRel = entities.find(ent => ent.name === relation.entityRef);
            if (entRel) {
              relation.entRel = Object.assign({}, entRel);
              relation.entRel.naminFormat = utils.getNaminFormats(entRel.name);
            }
          });
        }
      });
      return entities;
    }
  }

  _uniq(relationships) {
    const seen = {};
    return relationships.filter((item) => {
      return seen.hasOwnProperty(item.entityRef) ? false : (seen[item.entityRef] = true);
    });
  }

  static circu(relationships, entity) {
    return relationships.filter(item => item.entityRef !== entity.name);
  }

  writing() {
    this._writeEntities();
    this._writeServer();
    let namePackageJSON = 'server-package.json';
    if (this.typeOfApp === constants.APP_TYPE_ANGULAR_FULLSTACK) {
      this._writeClient();
      namePackageJSON = 'full-stack-package.json';
    }

    this.fs.copyTpl(this.templatePath(namePackageJSON),
      this.destinationPath('package.json'),
      { appName: this.appName, typeOfApp: this.typeOfApp });
  }

  _writeEntities() {
    this.entities.forEach((entity) => {
      this.composeWith(
        require.resolve('../entity'),
        {
          appName: this.appName,
          typeOfApp: this.typeOfApp,
          entity,
          globalMessages: this.globalMessages
        }
      );
    });
  }

  _writeClient() {
    this.composeWith(
      require.resolve('../client'),
      {
        appName: this.appName,
        typeOfApp: this.typeOfApp,
        entities: this.entities,
        globalMessages: this.globalMessages
      }
    );
  }

  _writeServer() {
    this.composeWith(
      require.resolve('../server'),
      {
        appName: this.appName,
        typeOfApp: this.typeOfApp,
        entities: this.entities,
        globalMessages: this.globalMessages
      }
    );
  }

  _printInterGrupoLogo() {
    this.log('\n');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓░░░░░░░░░░▓▓░░░░░░▓▓▓░░░░░░░░▓▓▓▓░░▓░░░▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░▓▓▓▓░░░▓▓▓▓▓░░░▓▓░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░▓▓▓░░░░░░░░░░░░▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░▓▓▓▓░░░░▓▓▓░░░▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓░░░░░░░░░▓▓▓▓░░░▓▓▓▓░░░▓▓▓▓░░░░▓▓▓▓░░░░░░░▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓░░░░▓▓▓▓▓░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░▓▓░░▓▓░░░▓▓▓▓▓░░░▓▓░░░▓░░░░░▓▓▓▓▓▓░░░░░░░▓▓▓▓▓');
    this.log('    ▓▓░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░▓▓░░░▓▓▓▓▓░░░▓▓░░░░▓▓▓░░░░▓▓▓░░░▓▓▓▓░░░▓▓▓');
    this.log('    ▓▓░░░░▓▓▓▓▓░░░░░▓▓▓▓▓░░░▓▓▓▓▓░░░▓▓▓▓▓░░░▓▓░░░▓▓▓▓▓░░░▓▓░░░▓▓▓▓▓▓░░░▓▓');
    this.log('    ▓▓▓░░░▓▓▓▓▓▓▓▓░░▓▓▓▓▓░░▓▓▓▓▓▓░░░▓▓▓▓▓░░░▓▓░░░▓▓▓▓▓░░░▓▓░░░▓▓▓▓▓▓░░░▓▓');
    this.log('    ▓▓▓▓░░░░▓▓▓▓░░░░▓▓▓▓▓░░▓▓▓▓▓▓░░░░▓▓▓░░░░▓▓░░░▓▓▓▓░░░░▓▓▓░░░▓▓▓▓░░░▓▓▓');
    this.log('    ▓▓▓▓▓░░░░░░░░▓░░▓▓▓▓▓░░▓▓▓▓▓▓▓░░░░░░▓░░░▓▓░░░░░░░░░▓▓▓▓▓▓░░░░░░░░▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    this.log('                     ¡Bienvenido al generador FullStack!                 ');
    this.log('\n');
  }

  install() {
    // this.installDependencies();
  }
};
