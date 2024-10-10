import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListIpsComponent } from './pages/list-ips/list-ips.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ListOperadoresComponent } from './pages/list-operadores/list-operadores.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {path: 'dashboard', component:DashboardComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'list-admin', component: ListAdminComponent, data: { title: 'Administradores', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
      {path: 'list-superadmin', component: ListSuperadminComponent,data: { title: 'Superadmin', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
      {path: 'list-ips', component: ListIpsComponent,data: { title: 'IPS', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
      {path: 'list-operadores', component: ListOperadoresComponent,data: { title: 'IPS', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
      {path: 'perfil-superadmin', component: PerfilComponent,data: { title: 'Perfil', icon: 'fa-solid fa-user', showInMenu: true}},
      {path: 'reporte', component: ReporteComponent,data: { title: 'Perfil', icon: 'fa-solid fa-user', showInMenu: true}}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SuperadminRoutingModule {
  static getRoutes(): Routes{
    return routes;
  }
 }
