import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { RutaSeguimientoComponent } from './pages/ruta-seguimiento/ruta-seguimiento.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {path: 'ruta-seguimiento', component:RutaSeguimientoComponent, data: { title: 'Seguimiento', icon: 'fa-solid fa-chart-pie', showInMenu: true }}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UsuarioRoutingModule { 
  static getRoutes(): Routes{
    return routes;
  }
}
