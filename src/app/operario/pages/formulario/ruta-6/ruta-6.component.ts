import { Component } from '@angular/core';

@Component({
  selector: 'app-ruta-6',
  templateUrl: './ruta-6.component.html',
  styleUrl: './ruta-6.component.css'
})
export class Ruta6Component {
  openTab = 1;
  toggleTabs($tabNumber: number) {
  this.openTab = $tabNumber;
  }

}
