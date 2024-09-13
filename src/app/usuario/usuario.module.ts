import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared.module';
import { UsuarioRoutingModule } from './usuario-routing.module';

import { RutaSeguimientoComponent } from './pages/ruta-seguimiento/ruta-seguimiento.component';



@NgModule({
  declarations: [
    RutaSeguimientoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsuarioRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }
