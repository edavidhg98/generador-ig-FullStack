const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<%
  let attributesKeys = Object.keys(attributes);
  let counter = 1;
  let finalLength = attributesKeys.length;
%>

const <%= entityName.camel %>Schema = new Schema({<%attributesKeys.forEach((attributeKey) => {%>
    <%=attributeKey%>: <%=attributes[attributeKey]%><%if(counter++ < finalLength) {%>,<%}%><%});%>
});

module.exports = mongoose.model('<%= entityName.pascal %>', <%= entityName.camel %>Schema);
