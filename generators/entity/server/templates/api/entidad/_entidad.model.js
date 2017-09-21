const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const <%= entityName.camel %>Schema = new Schema({<%attributes.forEach((attribute, index) => { %>
  <%= attribute.name %>: { type: <%= attribute.type %><%- include _entidad-validations -%> }<%_ if (index < attributes.length - 1 || relationships) { _%>,<%_ } _%>
  <% }); %>
  <%- include _entidad-relationships _%>
}, { toJSON: { virtuals: true } });

<%_ if (manyToOneRelationShips.length > 0) { _%>
/** Relaciones Many-To-One */
<%_ for (let relationship of manyToOneRelationShips) { _%>
<%= entityName.camel %>Schema.virtual('<%= relationship.entityRef.camel %>', {
  ref: '<%= relationship.entityRef.start %>',
  localField: 'id<%= relationship.entityRef.start %>',
  foreignField: '_id',
  justOne: true
});
<%_ }}_%>

<%_ if (oneToManyRelationShips.length > 0) { _%>
/** Relaciones One-To-Many */
<%_ for(let oneToManyRelationShip of oneToManyRelationShips) { _%>
<%= entityName.camel %>Schema.virtual('<%= oneToManyRelationShip.entityRef.camel %>s', {
  ref: '<%= oneToManyRelationShip.entityRef.start %>',
  localField: '<%= oneToManyRelationShip.localField %>',
  foreignField: 'id<%= entityName.start %>'
});
<%_ }}_%>

module.exports = mongoose.model('<%= entityName.pascal %>', <%= entityName.camel %>Schema);
