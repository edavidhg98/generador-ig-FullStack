<%let attributesKeys = Object.keys(attributes);%>
export interface <%= entityName.name %> {
  id?: string;<%attributesKeys.forEach((attributeKey) => {%>
  <%=attributeKey%>: <%=attributes[attributeKey].toLowerCase();%>;<%})%>
}
