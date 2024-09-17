import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared.module';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { AddSuperAdminComponent } from './pages/add-super-admin/add-super-admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListAdminComponent } from './pages/list-admin/list-admin.component';
import { ListSuperadminComponent } from './pages/list-superadmin/list-superadmin.component';
import { ListIpsComponent } from './pages/list-ips/list-ips.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { AddIpsComponent } from './pages/add-ips/add-ips.component';
import { ListOperadoresComponent } from './pages/list-operadores/list-operadores.component';
import { AddOperadoresComponent } from './pages/add-operadores/add-operadores.component';

import { SuperAdminService } from '../servicios/super-admin.service';
import { AdminService } from '../servicios/admin.service';
import { EditIpsComponent } from './pages/edit-ips/edit-ips.component';




@NgModule({
  declarations: [
    AddSuperAdminComponent,
    DashboardComponent,
    ListAdminComponent,
    ListSuperadminComponent,
    ListIpsComponent,
    PerfilComponent,
    AddAdminComponent,
    AddIpsComponent,
    ListOperadoresComponent,
    AddOperadoresComponent,
    EditIpsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    SuperadminRoutingModule,
    MatDialogModule
  ],
  providers: [
    SuperAdminService,
    AdminService,
    SharedModule,
  ]
})
export class SuperadminModule { }
