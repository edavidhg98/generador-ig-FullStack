import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<%_ for (let entity of entities) { _%>
import { <%= _.startCase(entity.name).replace(' ', '') %>Module } from './<%= _.kebabCase(entity.name)%>/<%= _.kebabCase(entity.name)%>.module';
<%_ } _%>

@NgModule({
  imports: [
    CommonModule,
    <%_ entities.forEach((entity, index) => { _%>
      <%= _.startCase(entity.name).replace(' ', '') %>Module<% if (index < entities.length -1) { %>, <% } %>
    <%_ }); _%>
  ]
})
export class EntitiesModule { }
