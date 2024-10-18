import { Component } from '@angular/core';

import { MenuService } from '../../../servicios/menu.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ReporteService, } from '../../../servicios/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {

  isExpanded = true;
  isVisible = true;
  dataForm: FormGroup;

  // Controla el estado abierto/cerrado de los paneles del acordeón
  accordionState: Record<string, boolean> = {
    persona: true,
    factoresEmbarazo: false,
    nivelRiesgo: false,
    factoresPosparto: false
  };

  constructor(private menuService: MenuService,
    private fb: FormBuilder,
    private reporteService: ReporteService
  ) {
    // Inicializar el formulario
    this.dataForm = this.fb.group({
      edad: this.fb.array([]),
      estrato: this.fb.array([]),
      regimen: this.fb.array([]),
      factoresEmbarazo: this.fb.array([]),
      nivelRiesgo: this.fb.array([]),
      factoresPosparto: this.fb.array([])
    });
  }

  // Método que se llama cuando se selecciona o deselecciona un checkbox
  onCheckboxChange(event: any, formArrayName: string) {
    const formArray: FormArray = this.dataForm.get(formArrayName) as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      const index = formArray.controls.findIndex(ctrl => ctrl.value === event.target.value);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  togglePanel(panel: string) {
    // Cambia el estado del panel seleccionado
    if (panel in this.accordionState) {
      this.accordionState[panel] = !this.accordionState[panel];
    }
  }

  ngOnInit() {
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }


  exportarReporte() {
    this.reporteService.generarReporte(this.dataForm.value).subscribe({
      next: (data) => {
        if (data) {
          if (data.size > 0) {
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Reporte.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          } else {
            console.log('No hay datos para exportar');
          }
        } else {
          console.log('Error al generar el reporte');
        }
      },
      error: (error) => {
        console.error('Error al generar el reporte:', error);
      }
    })
  }

}
