import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes =  [
  {
    path:'',
    children:[
      {path:'landing', component: LandingComponent},
      {path:'menu', component: MenuComponent}

    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class InicioRoutingModule {
  static getRoutes(): Routes{
    return routes;
  }
 }
