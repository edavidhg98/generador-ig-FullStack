'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.entity = opts.entity;
    this.entityNameFormats = opts.entityNameFormats;
  }

  writing() {
    this._writeClientEntity();
  }

  _writeClientEntity() {
    const entityName = this.entityNameFormats.kebab;
    let layersNames = ['.service.ts', '.model.ts', '.component.ts',
                      '.component.html', '.module.ts', '.route.ts',
                      '-upsert.component.ts', '-upsert.component.html',
                      '-details.component.ts', '-details.component.html'];

    layersNames.forEach(layerName => {
      this.fs.copyTpl(
        this.templatePath(`angular/entity/_entity${layerName}`),
        this.destinationPath(`src/app/entities/${entityName}/${entityName}${layerName}`),
        { entityName: this.entityNameFormats,
          attributes: this.entity.attributes,
          _: _
        }
      );
    });
  }

}
