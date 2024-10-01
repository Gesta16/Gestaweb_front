import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AddUsuariosComponent } from './pages/formulario/add-usuarios/add-usuarios.component';
import { Ruta2Component } from './pages/formulario/ruta-2/ruta-2.component';
import { Ruta3Component } from './pages/formulario/ruta-3/ruta-3.component';
import { Ruta4Component } from './pages/formulario/ruta-4/ruta-4.component';
import { Ruta5Component } from './pages/formulario/ruta-5/ruta-5.component';
import { Ruta6Component } from './pages/formulario/ruta-6/ruta-6.component';

import { ListUsuariosComponent } from '../operario/pages/list-usuarios/list-usuarios.component';
import { RutaGestanteComponent } from '../operario/pages/ruta-gestante/ruta-gestante.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {path: 'add-usuarios', component:AddUsuariosComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'add-usuarios/:id', component:AddUsuariosComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-2', component:Ruta2Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      { path: 'ruta-2/:id', component: Ruta2Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-3', component:Ruta3Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-3/:id', component:Ruta3Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-4', component:Ruta4Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-4/:id', component:Ruta4Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-5', component:Ruta5Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-5/:id', component:Ruta5Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-6', component:Ruta6Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-6/:id', component:Ruta6Component, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'list-usuarios', component:ListUsuariosComponent, data: { title: 'Usuarios', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'ruta-gestante', component:RutaGestanteComponent},
      { path: 'ruta-gestante/:id', component: RutaGestanteComponent }, 

      
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
