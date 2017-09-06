import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesSharedModule } from '../entities-shared.module';

import { <%= entityName.pascal %>Component } from './<%= entityName.kebab %>.component';
import { <%= entityName.pascal %>ListComponent } from './<%= entityName.kebab %>-list.component';
import { <%= entityName.pascal %>UpSertComponent } from './<%= entityName.kebab %>-upsert.component';
import { <%= entityName.pascal %>DetailsComponent } from './<%= entityName.kebab %>-details.component';
import { <%= entityName.pascal %>Service } from './<%= entityName.kebab %>.service';


<% if(relationships){
  relationships.forEach(relation => {-%>    
    import { <%= relation.entRel.naminFormat.pascal %>Module } from '../<%= relation.entRel.naminFormat.kebab %>/<%= relation.entRel.naminFormat.kebab %>.module';
 <%});    
}%>



@NgModule({
  imports: [
    CommonModule,
    EntitiesSharedModule
    <% if(relationships){
      relationships.forEach(relation => {
      %>
      ,<%=relation.entRel.naminFormat.pascal%>Module
     <%});    
    }%>
  ],
  exports: [
    <%= entityName.pascal %>Component,
    <%= entityName.pascal %>ListComponent,
    <%= entityName.pascal %>UpSertComponent,
    <%= entityName.pascal %>DetailsComponent
  ],
  declarations: [
    <%= entityName.pascal %>Component,
    <%= entityName.pascal %>ListComponent,
    <%= entityName.pascal %>UpSertComponent,
    <%= entityName.pascal %>DetailsComponent
  ],
  providers: [ <%= entityName.pascal %>Service ]
})
export class <%= entityName.pascal %>Module { }
