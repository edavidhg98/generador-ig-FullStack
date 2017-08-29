'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.entity = opts.entity;
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
        {
          entityName: this.entityNameFormats,
          attributes: this.entity.attributes,
          attributesGroupByPosition: this._getAttributesGroupByPosition(this.entity.attributes),
          attributesWithoutPosition: this._getAttributesWithoutPosition(this.entity.attributes),
          _: _
        }
      );
    });
  }

  _getAttributesGroupByPosition(attributes) {
    // Arreglo de attributos ordenados por posición.
    const attributesSortedByPosition = this._sortAttributesByPosition(attributes);

    // Objeto JSON con los atributos agrupados por filas.
    const attributesGroupByPosition =  _.groupBy(attributesSortedByPosition, 'position.row');

    // Quitar los atributos sin posicion, y convertir el JSON a un array
    let attributesArrayGroupByPosition = [];
    for (let key in attributesGroupByPosition) {
      if (key !== 'undefined') {
        attributesArrayGroupByPosition.push(attributesGroupByPosition[key]);
      }
    }
    // Arreglo de attributos agrupados por posiciones.
    return attributesArrayGroupByPosition;
  }

  _getAttributesWithoutPosition(attributes) {
    return attributes.filter(attribute => attribute.position === undefined);
  }

  _sortAttributesByPosition(attributes) {
    return attributes.sort((a, b) => {
      if (a.position === undefined || (a.position.row === undefined || a.position.col === undefined)) {
         return -1;
      }
      if (b.position === undefined || (b.position.row === undefined || b.position.col === undefined)) {
         return 1;
      }
      return (a.position.row - b.position.row) || (a.position.col - b.position.col);
   });
  }
}
