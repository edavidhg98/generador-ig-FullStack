import { Routes } from '@angular/router';
import { entityRoutes } from './entity/entity.route';

export const entitiesRoutes: Routes = [
  {
    path: 'entities',
    children: [
      ...entityRoutes
    ]
  }
];
