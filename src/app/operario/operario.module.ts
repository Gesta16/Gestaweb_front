import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { SharedModule } from '../shared.module';

import { OperarioRoutingModule } from './operario-routing.module';
import { AddUsuariosComponent } from './pages/formulario/add-usuarios/add-usuarios.component';
import { Ruta2Component } from './pages/formulario/ruta-2/ruta-2.component';
import { Ruta3Component } from './pages/formulario/ruta-3/ruta-3.component';
import { Ruta4Component } from './pages/formulario/ruta-4/ruta-4.component';
import { Ruta5Component } from './pages/formulario/ruta-5/ruta-5.component';
import { Ruta6Component } from './pages/formulario/ruta-6/ruta-6.component';

import { ListUsuariosComponent } from '../operario/pages/list-usuarios/list-usuarios.component';
import { RutaGestanteComponent } from '../operario/pages/ruta-gestante/ruta-gestante.component';

@NgModule({
  declarations: [
    AddUsuariosComponent,
    Ruta2Component,
    Ruta3Component,
    Ruta4Component,
    Ruta5Component,
    Ruta6Component,
    ListUsuariosComponent,
    RutaGestanteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OperarioRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class OperarioModule { }
