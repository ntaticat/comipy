import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFabButton,
  ],
})
export class MainModule {}
