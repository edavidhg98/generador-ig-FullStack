const constants = require('../generator-constants');
const fs = require('fs');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.typeOfApp = opts.typeOfApp;
    this.entity = opts.entity;
  }

  writing() {

  }
}
