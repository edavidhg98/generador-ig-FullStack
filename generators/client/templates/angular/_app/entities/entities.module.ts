import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<%_ for (let entity of entities) { _%>
import { <%= convertToPascalFormat(entity.name) %>Module } from './<%= _.kebabCase(entity.name)%>/<%= _.kebabCase(entity.name)%>.module';
<%_ } _%>

@NgModule({
  imports: [
    CommonModule,
    <%_ entities.forEach((entity, index) => { _%>
      <%= convertToPascalFormat(entity.name) %>Module<% if (index < entities.length -1) { %>, <% } %>
    <%_ }); _%>
  ]
})
export class EntitiesModule { }
<%_
  function convertToPascalFormat(name) {
    const kebabName = _.kebabCase(name);
    return _.startCase(kebabName).replace(/ /g, '');
  }
_%>
