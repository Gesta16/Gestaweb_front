import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ips',
  templateUrl: './add-ips.component.html',
  styleUrl: './add-ips.component.css'
})
export class AddIpsComponent {
  constructor(public _matDialogRef: MatDialogRef<AddIpsComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
  }

  cerrar(){
    this._matDialogRef.close();
  }
}
