import { Component } from '@angular/core';

@Component({
  selector: 'app-ruta-3',
  templateUrl: './ruta-3.component.html',
  styleUrl: './ruta-3.component.css'
})
export class Ruta3Component {
  openTab = 1;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

}
