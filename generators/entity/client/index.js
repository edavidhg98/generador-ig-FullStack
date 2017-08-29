'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const util = require('util');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.entity = opts.entity;
    this.globalMessages = opts.globalMessages;
    this.entityNameFormats = opts.entityNameFormats;
    this.relationships = this.entity.relationships ? this.entity.relationships : [];
    this.manyToOneRelationShips = this.relationships.filter(x => x.typeRelationship.toLowerCase() === 'many-to-one');
    this.oneToManyRelationShips = this.relationships.filter(x => x.typeRelationship.toLowerCase() === 'one-to-many');
  }

  writing() {
    this._writeClientEntity();
  }

  _writeClientEntity() {
    const entityName = this.entityNameFormats.kebab;
    let layersNames = ['.service.ts', '.model.ts', '.component.ts',
                      '-list.component.ts', '-list.component.html', '.module.ts', '.route.ts',
                      '-upsert.component.ts', '-upsert.component.html',
                      '-details.component.ts', '-details.component.html'];

    layersNames.forEach(layerName => {
      this.fs.copyTpl(
        this.templatePath(`angular/entity/_entity${layerName}`),
        this.destinationPath(`src/app/entities/${entityName}/${entityName}${layerName}`),
        { entityName: this.entityNameFormats,
          attributes: this.entity.attributes,
          globalMessages: this.globalMessages,
          util:util,
          _: _
        }
      );
    });
  }
}
