const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<%
  let counter = 1;
  let finalLength = attributes.length;
%>
const <%= entityName.camel %>Schema = new Schema({<%attributes.forEach(attribute => {%>
    <%=attribute.name%>: <%=attribute.type%><%if(counter++ < finalLength) {%>,<%}%><%});%>
});

module.exports = mongoose.model('<%= entityName.pascal %>', <%= entityName.camel %>Schema);
