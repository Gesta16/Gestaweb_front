import { Component } from '@angular/core';

@Component({
  selector: 'app-ruta-2',
  templateUrl: './ruta-2.component.html',
  styleUrl: './ruta-2.component.css'
})
export class Ruta2Component {
  openTab = 1;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

}
