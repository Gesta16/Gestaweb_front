import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AddUsuariosComponent } from './pages/formulario/add-usuarios/add-usuarios.component';
import { ListUsuariosComponent } from '../operario/pages/list-usuarios/list-usuarios.component';
import { RutaGestanteComponent } from '../operario/pages/ruta-gestante/ruta-gestante.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {path: 'add-usuarios', component:AddUsuariosComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'list-usuarios', component:ListUsuariosComponent, data: { title: 'Usuarios', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-gestante', component:RutaGestanteComponent},
      
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class OperarioRoutingModule { 
  static getRoutes(): Routes{
    return routes;
  }
}
