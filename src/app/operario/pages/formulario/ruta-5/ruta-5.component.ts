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
import { SeguimientoPostObstetrico } from '../../../../modelos/seguimiento-post-obstetrico.model';
import { MortalidadPerinatalService } from '../../../../servicios/mortalidad-perinatal.service';
import { MortalidadPerinatal } from '../../../../modelos/mortalidad-perinatal.model';
import { MortalidadPrepartoService } from '../../../../servicios/mortalidad-preparto.service';
import { MortalidadPreparto } from '../../../../modelos/mortalidad-preparto.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MenuService } from '../../../../servicios/menu.service';
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
  mortalidadPerinatal: MortalidadPerinatal[] = [];
  finalizacionGestacion: FinalizacionGestacion;
  laboratorioIntraparto: LaboratorioIntraparto;
  seguimiento: SeguimientoPostObstetrico;
  mortalidadPreparto: MortalidadPreparto;
  id: number | null = null;

  isExpanded = true;
  isVisible = true;

  constructor(
    private route: ActivatedRoute,
    private terminacionGestacionService: TerminacionGestacionService,
    private metodoAnticonceptivoService: MetodoAnticonceptivoService,
    private pruebaVDRLService: PruebaVDRLService,
    private finalizacionGestacionServicio: FinalizacionGestacionService,
    private laboratorioIntrapartoServicio: LaboratorioIntrapartoService,
    private seguimientoPostObstetricoServicio: SeguimientoPostObstetricoService,
    private mortalidadPerinatalService: MortalidadPerinatalService,
    private mortalidadPrepartoService: MortalidadPrepartoService,
    private router: Router,
    private menuService: MenuService
  ) {
    this.finalizacionGestacion = new FinalizacionGestacion(0, 0, 0, '');
    this.laboratorioIntraparto = new LaboratorioIntraparto(0, 0, 0, '', '', '', '', '', '', '');
    this.seguimiento = new SeguimientoPostObstetrico(0, 0, 0, '', '', '');
    this.mortalidadPreparto = new MortalidadPreparto(0, 0, 0, '');
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });

    if (this.id !== null && this.id > 0) { 

      this.getFinalizacionGestacion();
      this.getLaboratoriosIntraparto();
      this.getSeguimiento();
      this.getMortalidadPreparto();

      } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.getTerminaciones();
    this.getMetodosAnticonceptivos();
    this.getPruebaVDRL();
    this.getMortalidadPerinatal();
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
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

  getMortalidadPerinatal() {
    this.mortalidadPerinatalService.getMortalidadPerinatal().subscribe(response => {
      if (response.estado === 'Ok') {
        this.mortalidadPerinatal = response['Mortalidad Perinatal'];
      }
    }, error => {
      console.error('Error al obtener la mortalidad perinatal', error);
    });
  }

  guardarFinalizacionGestacion() {

    if (this.id !== null) {
      this.finalizacionGestacion.id_usuario = this.id;
    }

    this.finalizacionGestacionServicio.crearFinalizacionGestacion(this.finalizacionGestacion).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Finalización de gestación guardada correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar la finalización de gestación',
      });
      console.error('Error al guardar la finalización de gestación', error.error);
    });
  }

  getFinalizacionGestacion(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.finalizacionGestacionServicio.getFinalizacionGestacionbyId(this.id).subscribe(
        (response) => {
          this.finalizacionGestacion = response.finalizacion;
          console.log(response);
        },
        (error) => {
          console.error('Error al obtener los datos de la finalizacion de la gestacion:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de la finalizacion de la gestacion.');
    }
  }

  guardarLaboratorioIntraparto() {

    if (this.id !== null) {
      this.laboratorioIntraparto.id_usuario = this.id;
    }

    this.laboratorioIntrapartoServicio.crearLaboratorio(this.laboratorioIntraparto).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Registro de laboratorio intraparto guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el registro de laboratorio intraparto',
      });
      console.error('Error al guardar el registro de laboratorio intraparto', error.error);
    });
  }

  getLaboratoriosIntraparto(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.laboratorioIntrapartoServicio.getLaboratoriobyId(this.id).subscribe(
        (response) => {
          this.laboratorioIntraparto = response.data;
          console.log(response);
        },
        (error) => {
          console.error('Error al obtener los datos de los laboratorios de intraparto:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos.');
    }
  }
  

  guardarSeguimiento() {

    if (this.id !== null) {
      this.seguimiento.id_usuario = this.id;
    }

    this.seguimientoPostObstetricoServicio.crearSeguimiento(this.seguimiento).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Seguimiento guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el seguimiento',
      });
      console.error('Error al guardar el seguimiento', error.error);
    });
  }

  getSeguimiento(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.seguimientoPostObstetricoServicio.getSeguimientobyId(this.id).subscribe(
        (response) => {
          this.seguimiento = response.seguimiento;
          console.log(response);
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos.');
    }
  }

  guardarMortalidadPreparto() {

    if (this.id !== null) {
      this.mortalidadPreparto.id_usuario = this.id;
    }

    this.mortalidadPrepartoService.crearMortalidadPreparto(this.mortalidadPreparto).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Mortalidad preparto guardada correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar la mortalidad preparto',
      });
      console.error('Error al guardar la mortalidad preparto', error.error);
    });
  }

  getMortalidadPreparto(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.mortalidadPrepartoService.getMortalidadPrepartobyId(this.id).subscribe(
        (response) => {
          this.mortalidadPreparto = response.mortalidad;
          console.log(response);
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos.');
    }
  }


  volver() {
    this.router.navigate(['/ruta-gestante', this.id]); // Navegar a la ruta con el ID
  }
}
