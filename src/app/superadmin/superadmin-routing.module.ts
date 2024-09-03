import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddSuperAdminComponent } from './pages/add-super-admin/add-super-admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {path: 'add-superadmin', component:AddSuperAdminComponent},
      {path: 'dashboard', component:DashboardComponent, data: { title: 'Dashboard', icon: 'fa-solid fa-chart-pie', showInMenu: true }},
      {path: 'list-admin', component: ListAdminComponent, data: { title: 'Administradores', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
      {path: 'list-superadmin', component: ListSuperadminComponent,data: { title: 'Superadmin', icon: 'fa-solid fa-chart-pie', showInMenu: true}},
      {path: 'perfil-superadmin', component: PerfilComponent,data: { title: 'Perfil', icon: 'fa-solid fa-user', showInMenu: true}},
      {path: 'add-admin', component:AddAdminComponent}, // Sirve para ver la vista para crear un admin
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
