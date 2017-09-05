export interface <%= entityName.pascal %> {
  _id?: string;<%attributes.forEach(attribute => {%>
  <%= attribute.name %>: <%=attribute.type %>;<%})%>
}
