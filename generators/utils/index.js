const _ = require('lodash');

function getNaminFormats(name) {
  const kebabName = _.kebabCase(name);
  const pascalName = _.startCase(kebabName).replace(/ /g, '');

  return {
    name,
    kebab: kebabName,
    camel: _.camelCase(name),
    pascal: pascalName,
    start: _.startCase(name)
  };
}

module.exports = {
  getNaminFormats
};
