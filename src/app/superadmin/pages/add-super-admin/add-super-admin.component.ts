import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-super-admin',
  templateUrl: './add-super-admin.component.html',
  styleUrl: './add-super-admin.component.scss'
})
export class AddSuperAdminComponent {


  constructor(public dialogRef: MatDialogRef<AddSuperAdminComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
