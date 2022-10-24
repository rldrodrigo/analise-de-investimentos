import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TesourosComponent } from './pages/tesouros/tesouros.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    TesourosComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule
  ]
})
export class AdminModule { }
