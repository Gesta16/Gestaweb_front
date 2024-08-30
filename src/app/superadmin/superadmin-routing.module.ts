import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddSuperAdminComponent } from './pages/add-super-admin/add-super-admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {path: 'add-superAdmin', component:AddSuperAdminComponent},
      {path: 'dashboard', component:DashboardComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'list-admin', component: ListAdminComponent, data: { title: 'List-admin', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
      {path: 'list-superadmin', component: ListSuperadminComponent,data: { title: 'List-superadmin', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
      {path: 'Perfil-superadmin', component: PerfilComponent,data: { title: 'Perfil-superadmin', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
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
