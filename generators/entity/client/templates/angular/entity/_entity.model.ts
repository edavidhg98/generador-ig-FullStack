<%_ for (let relationship of manyToOneRelationShips) { _%>
import { <%= relationship.entityRef.pascal %> } from '../<%= relationship.entityRef.kebab %>/<%= relationship.entityRef.kebab %>.model';
<%_ } _%>

export interface <%= entityName.pascal %> {
  _id?: string;<%attributes.forEach(attribute => {%>
  <%= attribute.name %>: <%=attribute.type %>;<%})%>

  <%_ for (let relationship of manyToOneRelationShips) { _%>
  id<%= relationship.entityRef.pascal %>: String;
  <%= relationship.entityRef.camel %>: <%= relationship.entityRef.pascal %>;
  <%_ } _%>
}
