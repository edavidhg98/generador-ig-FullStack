import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OrderByPipe } from './orderby.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    OrderByPipe
  ],
  exports: [
    FormsModule,
    HttpModule,
    RouterModule,
    OrderByPipe,
    NgbModule
  ]
})
export class EntitiesSharedModule { }
