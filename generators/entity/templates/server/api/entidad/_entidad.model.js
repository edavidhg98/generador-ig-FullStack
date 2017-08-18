const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const <%= entityName.camel %>Schema = new Schema({<%attributes.forEach((attribute, index) => {%>
  <%= attribute.name %>: { type: <%= attribute.type %><%- include _entidad-validations -%> }<%_ if (index < attributes.length - 1 || relationships) { _%>,<%_ } _%>
  <%_ }); _%>

  <%_ for (let i = 0; relationships && i< relationships.length; i++) { _%>
    <%= relationships[i].attribute %>: { type: Schema.ObjectId, ref: '<%= relationships[i].entity%>' }
    <%_ if (i < relationships.length - 1) { _%>,<%_ } _%>
  <%_} _%>
});

module.exports = mongoose.model('<%= entityName.pascal %>', <%= entityName.camel %>Schema);
