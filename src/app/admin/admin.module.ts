import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { PerfilAdminComponent } from './pages/perfil-admin/perfil-admin.component';

import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    PerfilAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
