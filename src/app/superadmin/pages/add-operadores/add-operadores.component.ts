import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-operadores',
  templateUrl: './add-operadores.component.html',
  styleUrl: './add-operadores.component.css'
})
export class AddOperadoresComponent {
  constructor(public dialogRef: MatDialogRef<AddOperadoresComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
