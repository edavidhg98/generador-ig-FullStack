import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

import { entitiesRoutes } from './entities/entities.route';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  ...entitiesRoutes
];
