import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesSharedModule } from '../entities-shared.module';
import { <%= entityName.pascal%>SharedModule } from '../<%= entityName.kebab%>/<%= entityName.kebab%>-shared.module';

<%_
  for (let relationship of oneToManyRelationShips) {
    // Validar que no hayan relaciones entre la misma tabla
    if (relationship.entityRef.camel !== entityName.camel) {
_%>
import { <%= relationship.entityRef.pascal%>SharedModule } from '../<%= relationship.entityRef.kebab%>/<%= relationship.entityRef.kebab%>-shared.module';
<%_ }} _%>

import { <%= entityName.pascal %>Component } from './<%= entityName.kebab %>.component';
import { <%= entityName.pascal %>UpSertComponent } from './<%= entityName.kebab %>-upsert.component';
import { <%= entityName.pascal %>DetailsComponent } from './<%= entityName.kebab %>-details.component';
import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';

@NgModule({
  imports: [
    CommonModule,
    EntitiesSharedModule,
    <%= entityName.pascal %>SharedModule<%_if(oneToManyRelationShips.length > 0){_%>,<%_}_%>
    <%
      oneToManyRelationShips.forEach((relationship, index) => {
      // Validar que no hayan relaciones entre la misma tabla
      if (relationship.entityRef.camel !== entityName.camel) {
    %>
    <%= relationship.entityRef.pascal %>SharedModule<%_if (index < oneToManyRelationShips.length -1) { _%>,<%_ } _%>
    <% }}); %>
  ],
  declarations: [
    <%= entityName.pascal %>Component,
    <%= entityName.pascal %>UpSertComponent,
    <%= entityName.pascal %>DetailsComponent
  ],
  providers: [ <%= entityName.pascal %>Service ]
})
export class <%= entityName.pascal %>Module { }
