import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AddSuperAdminComponent } from './pages/add-super-admin/add-super-admin.component';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { ListIpsComponent } from './pages/list-ips/list-ips.component';
import { PerfilComponent } from './pages/perfil/perfil.component';



@NgModule({
  declarations: [
    AddSuperAdminComponent,
    DashboardComponent,
    ListAdminComponent,
    ListSuperadminComponent,
    ListIpsComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule
  ]
})
export class SuperadminModule { }
