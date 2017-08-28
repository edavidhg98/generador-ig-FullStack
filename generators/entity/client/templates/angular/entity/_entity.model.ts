export interface <%= entityName.pascal %> {
  id?: string;<%attributes.forEach(attribute => {%>
  <%= attribute.name %>: <%=attribute.type %>;<%})%>
}
