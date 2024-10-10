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
  ReadonlyFinalizacionGestacion = false;
  id_FinalizacionGestacion: number | null = null;
  ReadonlyLaboratorioIntraparto = false;
  id_LaboratorioIntraparto: number | null = null;
  ReadonlySeguimiento = false;
  id_Seguimiento: number | null = null;
  ReadonlyMortalidadPreparto = false;
  id_MortalidadPreparto: number | null = null;

  isEditing = false;

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
  }

  toggleTabs(tabNumber: number) {
    if (this.isEditing) {
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor, guarda los cambios antes de cambiar de pestaña.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    this.openTab = tabNumber;
  }

  toggleEditFinalizacionGestacion() {
    if (!this.ReadonlyFinalizacionGestacion) return;
    this.ReadonlyFinalizacionGestacion = false;
    this.isEditing = true;
  }

  toggleEditLaboratorioIntraparto() {
    if (!this.ReadonlyLaboratorioIntraparto) return;
    this.ReadonlyLaboratorioIntraparto = false;
    this.isEditing = true;
  }

  toggleEditSeguimiento() {
    if (!this.ReadonlySeguimiento) return;
    this.ReadonlySeguimiento = false;
    this.isEditing = true;
  }

  toggleEditMortalidadPreparto() {
    if (!this.ReadonlyMortalidadPreparto) return;
    this.ReadonlyMortalidadPreparto = false;
    this.isEditing = true;
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

    if (this.id_FinalizacionGestacion) {
      // Editar finalización de gestación existente
      this.finalizacionGestacionServicio.updateFinalizacionGestacion(this.id_FinalizacionGestacion, this.finalizacionGestacion).subscribe({
        next: (response) => {
          console.log('Finalización de gestación actualizada:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Finalización de gestación editada correctamente',
            icon: 'success',
          }).then(() => {
            this.ReadonlyFinalizacionGestacion = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar la finalización de gestación:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar la finalización de gestación',
            icon: 'error',
          });
        }
      });
    } else {
      if (this.id !== null) {
        this.finalizacionGestacion.id_usuario = this.id;
      }

      // Crear nueva finalización de gestación
      this.finalizacionGestacionServicio.crearFinalizacionGestacion(this.finalizacionGestacion).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Finalización de gestación guardada correctamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.id_FinalizacionGestacion = response.cod_finalizacion ?? null;
            this.ReadonlyFinalizacionGestacion = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_FinalizacionGestacion)
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar la finalización de gestación',
          });
          console.error('Error al guardar la finalización de gestación', error.error);
        }
      });
    }
  }




  getFinalizacionGestacion(): void {
    if (this.id !== null && this.id > 0) {
      this.finalizacionGestacionServicio.getFinalizacionGestacionbyId(this.id).subscribe(
        (response) => {
          this.finalizacionGestacion = response.finalizacion;
          console.log(response);
          this.ReadonlyFinalizacionGestacion = true;
          this.id_FinalizacionGestacion = response.finalizacion.cod_finalizacion ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos de la finalización de la gestación:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de la finalización de la gestación.');
    }
  }


  guardarLaboratorioIntraparto() {
    if (this.id_LaboratorioIntraparto) {
      // Editar laboratorio intraparto existente
      this.laboratorioIntrapartoServicio.updateLaboratorioIntraparto(this.id_LaboratorioIntraparto, this.laboratorioIntraparto).subscribe({
        next: (response) => {
          console.log('Laboratorio intraparto actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Laboratorio intraparto editado correctamente',
            icon: 'success',
          }).then(() => {
            this.ReadonlyLaboratorioIntraparto = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el laboratorio intraparto:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el laboratorio intraparto',
            icon: 'error',
          });
        }
      });
    } else {
      if (this.id !== null) {
        this.laboratorioIntraparto.id_usuario = this.id;
      }

      // Crear nuevo laboratorio intraparto
      this.laboratorioIntrapartoServicio.crearLaboratorio(this.laboratorioIntraparto).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Registro de laboratorio intraparto guardado correctamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.id_LaboratorioIntraparto = response.cod_intraparto ?? null;
            this.ReadonlyLaboratorioIntraparto = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_LaboratorioIntraparto);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el registro de laboratorio intraparto',
          });
          console.error('Error al guardar el registro de laboratorio intraparto', error.error);
        }
      });
    }
  }



  getLaboratoriosIntraparto(): void {
    if (this.id !== null && this.id > 0) {
      this.laboratorioIntrapartoServicio.getLaboratoriobyId(this.id).subscribe(
        (response) => {
          this.laboratorioIntraparto = response.data;
          console.log(response);
          this.ReadonlyLaboratorioIntraparto = true;
          this.id_LaboratorioIntraparto = response.data.cod_intraparto ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos del laboratorio intraparto:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos del laboratorio intraparto.');
    }
  }



  guardarSeguimiento() {
    if (this.id_Seguimiento) {
      // Editar seguimiento existente
      this.seguimientoPostObstetricoServicio.updateSeguimientoPostObstetrico(this.id_Seguimiento, this.seguimiento).subscribe({
        next: (response) => {
          console.log('Seguimiento actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Seguimiento editado correctamente',
            icon: 'success',
          }).then(() => {
            this.ReadonlySeguimiento = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el seguimiento:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el seguimiento',
            icon: 'error',
          });
        }
      });
    } else {
      if (this.id !== null) {
        this.seguimiento.id_usuario = this.id;
      }

      // Crear nuevo seguimiento
      this.seguimientoPostObstetricoServicio.crearSeguimiento(this.seguimiento).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Seguimiento guardado correctamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.id_Seguimiento = response.cod_evento ?? null;
            this.ReadonlySeguimiento = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_Seguimiento);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el seguimiento',
          });
          console.error('Error al guardar el seguimiento', error.error);
        }
      });
    }
  }


  getSeguimiento(): void {
    if (this.id !== null && this.id > 0) {
      this.seguimientoPostObstetricoServicio.getSeguimientobyId(this.id).subscribe(
        (response) => {
          this.seguimiento = response.seguimiento;
          console.log(response);
          this.ReadonlySeguimiento = true;
          this.id_Seguimiento = response.seguimiento.cod_evento ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos del seguimiento:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos del seguimiento.');
    }
  }


  guardarMortalidadPreparto() {
    if (this.id_MortalidadPreparto) {
      // Editar mortalidad preparto existente
      this.mortalidadPrepartoService.updateMortalidadPreparto(this.id_MortalidadPreparto, this.mortalidadPreparto).subscribe({
        next: (response) => {
          console.log('Mortalidad preparto actualizada:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Mortalidad preparto editada correctamente',
            icon: 'success',
          }).then(() => {
            this.ReadonlyMortalidadPreparto = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar la mortalidad preparto:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar la mortalidad preparto',
            icon: 'error',
          });
        }
      });
    } else {
      if (this.id !== null) {
        this.mortalidadPreparto.id_usuario = this.id;
      }

      // Crear nuevo registro de mortalidad preparto
      this.mortalidadPrepartoService.crearMortalidadPreparto(this.mortalidadPreparto).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Registro de mortalidad preparto guardado correctamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.id_MortalidadPreparto = response.cod_mortalpreparto ?? null;
            this.ReadonlyMortalidadPreparto = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_MortalidadPreparto);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el registro de mortalidad preparto',
          });
          console.error('Error al guardar el registro de mortalidad preparto', error.error);
        }
      });
    }
  }


  getMortalidadPreparto(): void {
    if (this.id !== null && this.id > 0) {
      this.mortalidadPrepartoService.getMortalidadPrepartobyId(this.id).subscribe(
        (response) => {
          this.mortalidadPreparto = response.mortalidad;
          console.log(response);
          this.ReadonlyMortalidadPreparto = true;
          this.id_MortalidadPreparto = response.mortalidad.cod_mortalpreparto ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos de mortalidad preparto:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de mortalidad preparto.');
    }
  }



  volver() {
    this.router.navigate(['/ruta-gestante', this.id]);
  }
}
