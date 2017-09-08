const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const <%= entityName.camel %>Schema = new Schema({<%attributes.forEach((attribute, index) => { %>
  <%= attribute.name %>: { type: <%= attribute.type %><%- include _entidad-validations -%> }<%_ if (index < attributes.length - 1 || relationships) { _%>,<%_ } _%>
  <% }); %>
});

module.exports = mongoose.model('<%= entityName.pascal %>', <%= entityName.camel %>Schema);
