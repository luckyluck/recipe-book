import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Globals } from '../shared/globals';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
      HeaderComponent,
      HomeComponent
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
      RecipeService,
      DataStorageService,
      AuthService,
      Globals
  ]
})
export class CoreModule { }
