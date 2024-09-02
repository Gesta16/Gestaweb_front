import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { AddSuperAdminComponent } from './pages/add-super-admin/add-super-admin.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { ListIpsComponent } from './pages/list-ips/list-ips.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';



@NgModule({
  declarations: [
    AddSuperAdminComponent,
    DashboardComponent,
    ListAdminComponent,
    ListSuperadminComponent,
    ListIpsComponent,
    PerfilComponent,
    AddAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SuperadminRoutingModule
  ]
})
export class SuperadminModule { }
