import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog-alimentacion',
  standalone: true,
  imports: [],
  templateUrl: './modal-dialog-alimentacion.component.html',
  styleUrl: './modal-dialog-alimentacion.component.scss'
})
export class ModalDialogAlimentacionComponent {
  constructor(public _matDialogRef: MatDialogRef<ModalDialogAlimentacionComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
  }

  cerrar(){
    this._matDialogRef.close();
  }
}
