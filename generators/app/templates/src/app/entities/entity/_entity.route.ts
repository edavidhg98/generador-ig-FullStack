import { Routes } from '@angular/router';

import { <%= entityName.pascal %>Component } from './<%= entityName.kebab %>.component';
import { <%= entityName.pascal %>UpSertComponent } from './<%= entityName.kebab %>-upsert.component';

export const entityRoutes: Routes = [
  {
    path: '<%= entityName.name %>',
    children: [
      { path: '', component: <%= entityName.pascal %>Component },
      { path: 'create', component: <%= entityName.pascal %>UpSertComponent },
      { path: 'update/:id', component: <%= entityName.pascal %>UpSertComponent }
    ]
  }
];
