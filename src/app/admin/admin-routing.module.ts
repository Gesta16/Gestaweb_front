import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { PerfilAdminComponent } from './pages/perfil-admin/perfil-admin.component';
import { RutaGestanteComponent } from './pages/ruta-gestante/ruta-gestante.component';

const routes:Routes =[
  {
    path: '',
    children:[
      {path: 'list-usuarios', component:ListUsuariosComponent, data: { title: 'Usuarios', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'perfil-admin', component:PerfilAdminComponent, data: { title: 'Perfil', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-gestante', component:RutaGestanteComponent, data: { title: 'Ruta', icon: 'fa-solid fa-chart-pie', showInMenu: false }},
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { 
  static getRoutes(): Routes{
    return routes;
  }
}
