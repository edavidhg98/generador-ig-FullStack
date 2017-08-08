import { EntitiesModule } from './entities/entities.module';
import { AppMaterialModule } from './app.material.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidenavComponent } from './layouts/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';

import { appRoutes } from './app.routes';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    EntitiesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
