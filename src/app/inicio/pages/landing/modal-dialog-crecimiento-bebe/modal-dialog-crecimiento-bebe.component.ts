import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog-crecimiento-bebe',
  standalone: true,
  imports: [],
  templateUrl: './modal-dialog-crecimiento-bebe.component.html',
  styleUrl: './modal-dialog-crecimiento-bebe.component.scss'
})
export class ModalDialogCrecimientoBebeComponent {
  constructor(public _matDialogRef: MatDialogRef<ModalDialogCrecimientoBebeComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
  }

  cerrar(){
    this._matDialogRef.close();
  }
}
