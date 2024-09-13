import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared.module';

import { OperarioRoutingModule } from './operario-routing.module';

import { ListUsuariosComponent } from '../operario/pages/list-usuarios/list-usuarios.component';
import { RutaGestanteComponent } from '../operario/pages/ruta-gestante/ruta-gestante.component';

@NgModule({
  declarations: [
    ListUsuariosComponent,
    RutaGestanteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OperarioRoutingModule,
    SharedModule
  ]
})
export class OperarioModule { }
