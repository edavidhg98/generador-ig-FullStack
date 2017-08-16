import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<% for (let entity of entities) { %>
import { <%= entity.name %>Module } from './<%= _.kebabCase(entity.name)%>/<%= _.kebabCase(entity.name)%>.module';<%}%>


@NgModule({
  imports: [
    CommonModule,
    <%_ for (let i = 0; i < entities.length; i++) { _%>
      <%=entities[i].name %>Module<% if (i < entities.length -1) { %>, <% } %>
    <%_ } _%>
  ]
})
export class EntitiesModule { }
