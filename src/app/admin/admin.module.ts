import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { PerfilAdminComponent } from './pages/perfil-admin/perfil-admin.component';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { RutaGestanteComponent } from './pages/ruta-gestante/ruta-gestante.component';



@NgModule({
  declarations: [
    PerfilAdminComponent,
    ListUsuariosComponent,
    RutaGestanteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
