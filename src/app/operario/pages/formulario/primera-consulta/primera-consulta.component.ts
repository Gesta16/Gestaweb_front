import { Component } from '@angular/core';

@Component({
  selector: 'app-primera-consulta',
  templateUrl: './primera-consulta.component.html',
  styleUrl: './primera-consulta.component.css'
})
export class PrimeraConsultaComponent {
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
}
