'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

const constants = require('../generator-constants');
const utils = require('../utils');

class EntityGenerator extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.entity = opts.entity;
    this.entityNameFormats = utils.getNaminFormats(this.entity.name);

    this.relationships = this.entity.relationships ? this.entity.relationships : [];
    this.manyToOneRelationShips = this.relationships.filter(x => x.typeRelationship.toLowerCase() === 'many-to-one');
    this.oneToManyRelationShips = this.relationships.filter(x => x.typeRelationship.toLowerCase() === 'one-to-many');
  }

  writing() {
    if (this._isAngularFullStackApp()) {
      this._writeAngularEntity();
    }
    this._writeServerEntity();
  }

  _writeAngularEntity() {
    this.composeWith(require.resolve('./client'), {
      typeOfApp: this.typeOfApp,
      entity: this._formatNamingEntityAttributes(this.entity),
      entityNameFormats: this.entityNameFormats,

      relationships: this.relationships,
      manyToOneRelationShips: this.manyToOneRelationShips,
      oneToManyRelationShips: this.oneToManyRelationShips
    });
  }

  // Cambia el formato de los nombres de los atributos de una entidad al formato Camel Case.
  _formatNamingEntityAttributes(entity) {
    const attributes = entity.attributes.map(e => {
      let name = e.name;
      e.name = _.camelCase(name);
      return e;
    });
    entity.attributes = attributes;
    return entity;
  }

  _writeServerEntity() {
    this.composeWith(require.resolve('./server'), {
      typeOfApp: this.typeOfApp,
      entity: this.entity,
      entityNameFormats: this.entityNameFormats,
      relationships: this.relationships,
      manyToOneRelationShips: this.manyToOneRelationShips,
      oneToManyRelationShips: this.oneToManyRelationShips
    });
  }

  _isAngularFullStackApp() {
    return this.typeOfApp === constants.APP_TYPE_ANGULAR_FULLSTACK;
  }
};

module.exports = EntityGenerator;
