'use strict';
const _ = require('lodash');

function getNaminFormats(name) {
  return {
      name: name,
      kebab: _.kebabCase(name),
      camel: _.camelCase(name),
      pascal: _.startCase(name).replace(' ', ''),
      start: _.startCase(name)
  }
}

module.exports = {
  getNaminFormats
}
