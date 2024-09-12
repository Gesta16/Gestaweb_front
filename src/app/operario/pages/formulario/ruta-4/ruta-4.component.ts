import { Component } from '@angular/core';

@Component({
  selector: 'app-ruta-4',
  templateUrl: './ruta-4.component.html',
  styleUrl: './ruta-4.component.css'
})
export class Ruta4Component {
  openTab = 1;
  toggleTabs($tabNumber: number) {
  this.openTab = $tabNumber;
  }

}
