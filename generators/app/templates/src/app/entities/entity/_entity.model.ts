<%
  let attributesKeys = Object.keys(attributes);
  let counter = 1;
  let finalLength = attributesKeys.length;
%>
export interface <%= entityName.name %> {
  id?: string;<%attributesKeys.forEach((attributeKey) => {%>
  <%=attributeKey%>: <%=attributes[attributeKey].toLowerCase();%><%if(counter++ < finalLength) {%>;<%}%><%})%>
}
