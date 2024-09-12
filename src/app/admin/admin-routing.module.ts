import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PerfilAdminComponent } from './pages/perfil-admin/perfil-admin.component';

const routes:Routes =[
  {
    path: '',
    children:[
      {path: 'perfil-admin', component:PerfilAdminComponent, data: { title: 'Perfil', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
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
