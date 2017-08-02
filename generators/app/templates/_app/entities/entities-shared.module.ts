import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../app.material.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppMaterialModule,
    RouterModule
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppMaterialModule,
    RouterModule
  ]
})
export class EntitiesSharedModule { }
