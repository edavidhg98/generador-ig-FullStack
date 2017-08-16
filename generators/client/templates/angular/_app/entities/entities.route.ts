import { Routes } from '@angular/router';
<% for (let entity of entities) { %>
import { <%= _.camelCase(entity.name) %>Routes } from './<%= _.kebabCase(entity.name)%>/<%= _.kebabCase(entity.name)%>.route';<%}%>

export const entitiesRoutes: Routes = [
  {
    path: 'entities',
    children: [
      <%_ for (let i = 0; i < entities.length; i++) { _%>
      ...<%=  _.camelCase(entities[i].name) %>Routes<%if (i < entities.length -1) { %>,<% } %>
      <%_ } _%>
    ]
  }
];
