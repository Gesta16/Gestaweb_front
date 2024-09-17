import { Component } from '@angular/core';

@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrl: './add-usuarios.component.css'
})
export class AddUsuariosComponent {
  openTab = 1;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }
}
