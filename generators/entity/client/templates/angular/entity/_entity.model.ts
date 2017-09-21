<%_
  for (let relationship of relationships) {
    // Validar que no hayan relaciones entre la misma tabla
    if (relationship.entityRef.camel !== entityName.camel) {
_%>
import { <%= relationship.entityRef.pascal %> } from '../<%= relationship.entityRef.kebab %>/<%= relationship.entityRef.kebab %>.model';
<%_ }} _%>

export interface <%= entityName.pascal %> {
  _id?: string;<%attributes.forEach(attribute => {%>
  <%= attribute.name %>: <%=attribute.type %>;<%})%>

  <%_ for (let relationship of manyToOneRelationShips) { _%>
  id<%= relationship.entityRef.pascal %>?: String;
  <%= relationship.entityRef.camel %>?: <%= relationship.entityRef.pascal %>;
  <%_ } _%>

  <%_ for (let relationship of oneToManyRelationShips) { _%>
  <%= relationship.entityRef.camel %>s?: <%= relationship.entityRef.pascal %>[];
  <%_ } _%>
}
