export interface <%= entityName.name %> {
  id?: string;<%attributes.forEach(attribute => {%>
  <%=attribute.name%>: <%=attribute.type.toLowerCase();%>;<%})%>
}
