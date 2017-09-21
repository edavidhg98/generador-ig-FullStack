import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesSharedModule } from '../entities-shared.module';

import { <%= entityName.pascal %>ListComponent } from './<%= entityName.kebab %>-list.component';

@NgModule({
  imports: [
    CommonModule,
    EntitiesSharedModule
  ],
  exports: [
    <%= entityName.pascal %>ListComponent
  ],
  declarations: [
    <%= entityName.pascal %>ListComponent
  ],
  providers: []
})
export class <%= entityName.pascal %>SharedModule { }
