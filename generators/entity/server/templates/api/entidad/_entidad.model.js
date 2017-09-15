const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const <%= entityName.camel %>Schema = new Schema({<%attributes.forEach((attribute, index) => { %>
  <%= attribute.name %>: { type: <%= attribute.type %><%- include _entidad-validations -%> }<%_ if (index < attributes.length - 1 || relationships) { _%>,<%_ } _%>
  <% }); %>
  <%- include _entidad-relationships _%>
}, { toJSON: { virtuals: true } });


<%_ for(let oneToManyRelationShip of oneToManyRelationShips) { _%>
<%= entityName.camel %>Schema.virtual('<%= oneToManyRelationShip.fieldName %>', {
  ref: '<%= oneToManyRelationShip.entityRef %>',
  localField: '<%= oneToManyRelationShip.localField %>',
  foreignField: '<%= oneToManyRelationShip.foreignField %>'
});
<%_ } _%>

module.exports = mongoose.model('<%= entityName.pascal %>', <%= entityName.camel %>Schema);
