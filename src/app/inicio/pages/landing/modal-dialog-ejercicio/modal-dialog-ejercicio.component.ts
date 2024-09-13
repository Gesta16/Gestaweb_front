import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog-ejercicio',
  standalone: true,
  imports: [],
  templateUrl: './modal-dialog-ejercicio.component.html',
  styleUrl: './modal-dialog-ejercicio.component.scss'
})
export class ModalDialogEjercicioComponent {
  constructor(public _matDialogRef: MatDialogRef<ModalDialogEjercicioComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
  }

  cerrar(){
    this._matDialogRef.close();
  }
}
