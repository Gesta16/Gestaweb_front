import { Component } from '@angular/core';

import { MenuService } from '../../../servicios/menu.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  isExpanded = true;
  isVisible = true;
  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  // Información que va en el contenedor de filtros
  sections = [
    {
      title: 'Persona',
      isOpen: false,
      filters: [
        {
          label: 'Edad',
          options: ['Menor a 18', '18 a 28', '28 a 38', 'Mayor a 38']
        },
        {
          label: 'Estrato Social',
          options: ['1', '2', '3', 'Mayor de 4']
        },
        {
          label: 'Régimen',
          options: ['Contributivo', 'Subsidiado']
        }
      ]
    },
    {
      title: 'Factores de embarazo',
      isOpen: false,
      filters: [
        {
          label: 'Factores',
          options: ['Planeado', 'No planeado', 'Fracaso anticonceptivo', 'Método del fracaso']
        }
      ]
    },
    {
      title: 'Nivel de Riesgo',
      isOpen: false,
      filters: [
        {
          label: 'Riesgo',
          options: ['Muy alto riesgo', 'Alto riesgo', 'Moderado riesgo', 'Bajo riesgo']
        }
      ]
    },
    {
      title: 'Factores Posparto',
      isOpen: false,
      filters: [
        {
          label: 'Factores',
          options: ['Nacimiento vivo', 'Nacimiento muerto', 'Prematuro']
        }
      ]
    },
    {
      title: 'Otros Factores',
      isOpen: false,
      filters: [
        {
          label: 'Fecha',
          options: ['Nacimiento vivo', 'Nacimiento muerto', 'Prematuro']
        }
      ]
    }
  ];
}
