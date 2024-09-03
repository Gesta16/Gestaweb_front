import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSuperAdminComponent } from '../add-super-admin/add-super-admin.component';
@Component({
  selector: 'app-list-superadmin',
  templateUrl: './list-superadmin.component.html',
  styleUrl: './list-superadmin.component.css'
})
export class ListSuperadminComponent {
  title = 'modal';
  constructor(private _matDialog: MatDialog){}
  abrirModal():void{
    this._matDialog.open(AddSuperAdminComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    })
  }
}
