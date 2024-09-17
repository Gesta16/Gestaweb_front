import { Component } from '@angular/core';

@Component({
  selector: 'app-ruta-5',
  templateUrl: './ruta-5.component.html',
  styleUrl: './ruta-5.component.css'
})
export class Ruta5Component {
  openTab = 1;
  toggleTabs($tabNumber: number) {
  this.openTab = $tabNumber;
  }

}
