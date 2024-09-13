import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  constructor(public _matDialogRef: MatDialogRef<AddAdminComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
  }

  cerrar(){
    this._matDialogRef.close();
  }
}
