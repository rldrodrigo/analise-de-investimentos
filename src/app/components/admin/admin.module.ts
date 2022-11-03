import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { TesourosComponent } from './pages/tesouros/tesouros.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TesouroComponent } from './pages/tesouros/tesouro/tesouro.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    TesourosComponent,
    TesouroComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ]
})
export class AdminModule { }
