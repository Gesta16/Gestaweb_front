import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InicioRoutingModule } from './inicio-routing.module';

import { MenuComponent } from './pages/menu/menu.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  declarations: [
    MenuComponent,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
