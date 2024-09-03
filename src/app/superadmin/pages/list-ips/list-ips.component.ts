import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIpsComponent } from '../add-ips/add-ips.component';

@Component({
  selector: 'app-list-ips',
  templateUrl: './list-ips.component.html',
  styleUrl: './list-ips.component.css'
})
export class ListIpsComponent {
  title = 'modal';
  constructor(private _matDialog: MatDialog){}
  abrirModal():void{
    this._matDialog.open(AddIpsComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    })
  }
}
