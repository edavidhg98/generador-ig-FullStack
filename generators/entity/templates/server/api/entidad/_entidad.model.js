const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<%
  let counter = 1;
  let finalLength = attributes.length;
%>
const <%= entityName.camel %>Schema = new Schema({<%attributes.forEach(attribute => {%>
  <%=attribute.name%>: <%=attribute.type%><%if(counter++ < finalLength || relationships) {%>,<%}%><%});%><%for (let i = 0; relationships && i< relationships.length; i++) {%>
  <%= relationships[i].attribute %>: { type: Schema.ObjectId, ref: '<%= relationships[i].entity%>' }<%if(i < relationships.length - 1) {%>,<%}%><%}%>
});

module.exports = mongoose.model('<%= entityName.pascal %>', <%= entityName.camel %>Schema);
