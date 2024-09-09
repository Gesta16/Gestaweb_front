import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AddUsuariosComponent } from './pages/formulario/add-usuarios/add-usuarios.component';
import { ControlPrenatalComponent } from './pages/formulario/control-prenatal/control-prenatal.component';
import { PrimeraConsultaComponent } from './pages/formulario/primera-consulta/primera-consulta.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {path: 'add-usuarios', component:AddUsuariosComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'control-prenatal', component:ControlPrenatalComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'primera-consulta', component:PrimeraConsultaComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
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
