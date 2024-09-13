import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOperadoresComponent } from '../add-operadores/add-operadores.component';

@Component({
  selector: 'app-list-operadores',
  templateUrl: './list-operadores.component.html',
  styleUrl: './list-operadores.component.css'
})
export class ListOperadoresComponent {
  title = 'modal';
  constructor(private _matDialog: MatDialog){}
  
  abrirModal():void{
    this._matDialog.open(AddOperadoresComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    })
  }
}
