import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OperarioRoutingModule } from './operario-routing.module';
import { ControlPrenatalComponent } from './pages/formulario/control-prenatal/control-prenatal.component';
import { PrimeraConsultaComponent } from './pages/formulario/primera-consulta/primera-consulta.component';


@NgModule({
  declarations: [
  
    ControlPrenatalComponent,
       PrimeraConsultaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OperarioRoutingModule
  ]
})
export class OperarioModule { }
