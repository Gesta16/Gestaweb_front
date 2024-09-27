import { Component, OnInit } from '@angular/core';
import { TerminacionGestacionService } from '../../../../servicios/terminacion-gestacion.service';
import { TerminacionGestacion } from '../../../../modelos/terminacion-gestacion.model';
import { MetodoAnticonceptivoService } from '../../../../servicios/metodo-anticonceptivo.service';
import { MetodoAnticonceptivo } from '../../../../modelos/metodo-anticonceptivo.model';
import { PruebaVDRLService } from '../../../../servicios/prueba-vdrl.service';
import { PruebaVDRL } from '../../../../modelos/prueba-vdrl.model';
import { FinalizacionGestacionService } from '../../../../servicios/finalizacion-gestacion.service';
import { FinalizacionGestacion } from '../../../../modelos/finalizacion-gestacion.model';
import { LaboratorioIntrapartoService } from '../../../../servicios/laboratorio-intraparto.service';
import { LaboratorioIntraparto } from '../../../../modelos/laboratorio-intraparto.model';
import { SeguimientoPostObstetricoService } from '../../../../servicios/seguimiento-post-obstetrico.service';
import { SeguimientoPostObstetrico } from '../../../../modelos/seguimiento-post-obstetrico.model'; // Ajustar ruta si es necesario

@Component({
  selector: 'app-ruta-5',
  templateUrl: './ruta-5.component.html',
  styleUrls: ['./ruta-5.component.css']
})
export class Ruta5Component implements OnInit {
  openTab = 1;
  terminaciones: TerminacionGestacion[] = [];
  metodos: MetodoAnticonceptivo[] = [];
  pruebaVDRL: PruebaVDRL[] = [];
  finalizacionGestacion: FinalizacionGestacion;
  laboratorioIntraparto: LaboratorioIntraparto;
  seguimiento: SeguimientoPostObstetrico; // Cambiado a SeguimientoPostObstetrico

  constructor(
    private terminacionGestacionService: TerminacionGestacionService,
    private metodoAnticonceptivoService: MetodoAnticonceptivoService,
    private pruebaVDRLService: PruebaVDRLService,
    private finalizacionGestacionServicio: FinalizacionGestacionService,
    private laboratorioIntrapartoServicio: LaboratorioIntrapartoService,
    private seguimientoPostObstetricoServicio: SeguimientoPostObstetricoService // Servicio nuevo
  ) {
    this.finalizacionGestacion = new FinalizacionGestacion(0, 0, '');
    this.laboratorioIntraparto = new LaboratorioIntraparto(0, 0, '', '', '', '', '', '', '');
    this.seguimiento = new SeguimientoPostObstetrico(0, 0, '', '', ''); 
  }

  ngOnInit() {
    this.getTerminaciones();
    this.getMetodosAnticonceptivos();
    this.getPruebaVDRL();
  }

  toggleTabs(tabNumber: number) {
    this.openTab = tabNumber;
  }

  getTerminaciones() {
    this.terminacionGestacionService.getTerminacionGestacion().subscribe(response => {
      if (response.estado === 'Ok') {
        this.terminaciones = response['Terminacion gestacion'];
      }
    }, error => {
      console.error('Error al obtener terminaciones', error);
    });
  }

  getMetodosAnticonceptivos() {
    this.metodoAnticonceptivoService.getMetodosAnticonceptivos().subscribe(response => {
      if (response.estado === 'Ok') {
        this.metodos = response['Metodo Anticonceptivo'];
      }
    }, error => {
      console.error('Error al obtener los metodos', error);
    });
  }

  getPruebaVDRL() {
    this.pruebaVDRLService.getPruebaVDRL().subscribe(response => {
      if (response.estado === 'Ok') {
        this.pruebaVDRL = response['Prueba No Treponemica VDRL'];
      }
    }, error => {
      console.error('Error al obtener las pruebas VDRL', error);
    });
  }

  guardarFinalizacionGestacion() {
    this.finalizacionGestacionServicio.crearFinalizacionGestacion(this.finalizacionGestacion).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Finalización de gestación guardada correctamente', response);
      }
    }, error => {
      console.error('Error al guardar la finalización de gestación', error.error);
    });
  }

  guardarLaboratorioIntraparto() {
    this.laboratorioIntrapartoServicio.crearLaboratorio(this.laboratorioIntraparto).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Registro de laboratorio intraparto guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el registro de laboratorio intraparto', error.error);
    });
  }

  guardarSeguimiento() {
    this.seguimientoPostObstetricoServicio.crearSeguimiento(this.seguimiento).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Seguimiento guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el seguimiento', error.error);
    });
  }
}
