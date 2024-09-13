import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InicioRoutingModule } from './inicio-routing.module';


import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
