import { Component } from '@angular/core';
import { DatosRecienNacidoService } from '../../../../servicios/datos-recien-nacido.service';
import { DatosRecienNacido } from '../../../../modelos/datos-recien-nacido.model';
import { EstudioHipotiroidismoService } from '../../../../servicios/estudio-hipotiroidismo.service';
import { EstudioHipotiroidismo } from '../../../../modelos/estudio-hipotiroidismo.model';
import { RutaPYMSService } from '../../../../servicios/ruta-pyms.service';
import { RutaPYMS } from '../../../../modelos/ruta-pyms.model';
import { HemoclasificacionService } from '../../../../servicios/hemoclasificacion.service';
import { Hemoclasificacion } from '../../../../modelos/hemoclasificacion.model';
import { TamizacionNeonatalService } from '../../../../servicios/tamizacion-neonatal.service';
import { TamizacionNeonatal } from '../../../../modelos/tamizacion-neonatal.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-6',
  templateUrl: './ruta-6.component.html',
  styleUrl: './ruta-6.component.css'
})
export class Ruta6Component {
  openTab = 1;
  datosRecienNacido: DatosRecienNacido;
  estudioHipotiroidismo: EstudioHipotiroidismo;
  nuevaRuta: RutaPYMS;
  nuevaTamizacion: TamizacionNeonatal;
  hemoclasificacion: Hemoclasificacion[] = [];
  id: number | null = null;
  ReadonlyDatosRecienNacido = false;
  id_DatosRecienNacido: number | null = null;
  ReadonlyEstudioHipotiroidismo = false;
  id_EstudioHipotiroidismo: number | null = null;
  ReadonlyTamizacionNeonatal = false;
  id_TamizacionNeonatal: number | null = null;
  ReadonlyRutaPYMS = false;
  id_RutaPYMS: number | null = null;

  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private datosRecienNacidoService: DatosRecienNacidoService,
    private estudioHipotiroidismoService: EstudioHipotiroidismoService,
    private rutaPYMSService: RutaPYMSService,
    private hemoclasificacionService: HemoclasificacionService,
    private tamizacionNeonatalService: TamizacionNeonatalService,
    private router: Router,
  ) {
    this.datosRecienNacido = new DatosRecienNacido(0, 0, '', '', '', '', '', '', '');
    this.estudioHipotiroidismo = new EstudioHipotiroidismo(0, 0, '', '', '', '', '', '');
    this.nuevaRuta = new RutaPYMS(0, 0, '', '', '', '');
    this.nuevaTamizacion = new TamizacionNeonatal(0, 0, 0, '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });

    if (this.id !== null && this.id > 0) {

      this.getDatosRecienNacido();
      this.getEstudioHipotiroidismo();
      this.getTamizacionNeonatal();
      this.getRutaPYMS();

    } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.getHemoclasificaciones();
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


  toggleEditDatosRecienNacido() {
    if (!this.ReadonlyDatosRecienNacido) return;
    this.ReadonlyDatosRecienNacido = false;
    this.isEditing = true;
  }

  toggleEditEstudioHipotiroidismo() {
    if (!this.ReadonlyEstudioHipotiroidismo) return;
    this.ReadonlyEstudioHipotiroidismo = false;
    this.isEditing = true;
  }

  toggleEditTamizacionNeonatal() {
    if (!this.ReadonlyTamizacionNeonatal) return;
    this.ReadonlyTamizacionNeonatal = false;
    this.isEditing = true;
  }

  toggleEditRutaPYMS() {
    if (!this.ReadonlyRutaPYMS) return;
    this.ReadonlyRutaPYMS = false;
    this.isEditing = true;
  }

  getHemoclasificaciones() {
    this.hemoclasificacionService.getHemoclasificaciones().subscribe(response => {
      if (response.estado === 'Ok') {
        this.hemoclasificacion = response['Hemoclasificacion'];
      }
    }, error => {
      console.error('Error al obtener la hemoclasificacion', error);
    });
  }

  guardarDatosRecienNacido() {
    if (this.id_DatosRecienNacido) {
      // Editar registro existente
      this.datosRecienNacidoService.updateDatosRecienNacido(this.id_DatosRecienNacido, this.datosRecienNacido).subscribe({
        next: (response) => {
          console.log('Datos del recién nacido actualizados:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Registro de recién nacido editado correctamente',
            icon: 'success',
          }).then(() => {
            this.ReadonlyDatosRecienNacido = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el registro de recién nacido:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el registro de recién nacido',
            icon: 'error',
          });
        }
      });
    } else {
      if (this.id !== null) {
        this.datosRecienNacido.id_usuario = this.id;
      }

      // Crear nuevo registro de recién nacido
      this.datosRecienNacidoService.crearDatosRecienNacido(this.datosRecienNacido).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Registro de recién nacido guardado correctamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.id_DatosRecienNacido = response.cod_recien ?? null;
            this.ReadonlyDatosRecienNacido = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_DatosRecienNacido);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el registro de recién nacido',
          });
          console.error('Error al guardar el registro de recién nacido', error.error);
        }
      });
    }
  }

  getDatosRecienNacido(): void {
    if (this.id !== null && this.id > 0) {
      this.datosRecienNacidoService.getDatosRecienNacidobyId(this.id).subscribe(
        (response) => {
          this.datosRecienNacido = response.data;
          console.log(response);
          this.ReadonlyDatosRecienNacido = true;
          this.id_DatosRecienNacido = response.data.cod_recien ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos del recién nacido:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos del recién nacido.');
    }
  }


  guardarEstudioHipotiroidismo() {
    if (this.id_EstudioHipotiroidismo) {
      // Editar registro existente
      this.estudioHipotiroidismoService.updateEstudioHipotiroidismo(this.id_EstudioHipotiroidismo, this.estudioHipotiroidismo).subscribe({
        next: (response) => {
          console.log('Estudio de hipotiroidismo actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Registro de estudio de hipotiroidismo editado correctamente',
            icon: 'success',
          }).then(() => {
            this.ReadonlyEstudioHipotiroidismo = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el registro de estudio de hipotiroidismo:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el registro de estudio de hipotiroidismo',
            icon: 'error',
          });
        }
      });
    } else {
      if (this.id !== null) {
        this.estudioHipotiroidismo.id_usuario = this.id;
      }

      // Crear nuevo registro de estudio de hipotiroidismo
      this.estudioHipotiroidismoService.crearEstudioHipotiroidismo(this.estudioHipotiroidismo).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Registro de estudio de hipotiroidismo guardado correctamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.id_EstudioHipotiroidismo = response.cod_estudio ?? null;
            this.ReadonlyEstudioHipotiroidismo = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_EstudioHipotiroidismo);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el registro de estudio de hipotiroidismo',
          });
          console.error('Error al guardar el registro de estudio de hipotiroidismo', error.error);
        }
      });
    }
  }

  getEstudioHipotiroidismo(): void {
    if (this.id !== null && this.id > 0) {
      this.estudioHipotiroidismoService.getEstudioHipotiroidismobyId(this.id).subscribe(
        (response) => {
          this.estudioHipotiroidismo = response.data;
          console.log(response);
          this.ReadonlyEstudioHipotiroidismo = true;
          this.id_EstudioHipotiroidismo = response.data.cod_estudio ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos del estudio de hipotiroidismo:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos del estudio de hipotiroidismo.');
    }
  }



  guardarRutaPYMS() {
    if (this.id_RutaPYMS) {
      // Editar registro existente
      this.rutaPYMSService.updateRuta(this.id_RutaPYMS, this.nuevaRuta).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Éxito',
            text: 'Registro de ruta editado correctamente',
            icon: 'success',
          }).then(() => {
            this.ReadonlyRutaPYMS = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el registro de ruta:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el registro de ruta',
            icon: 'error',
          });
        }
      });
    } else {
      if (this.id !== null) {
        this.nuevaRuta.id_usuario = this.id;
      }

      // Crear nuevo registro de ruta
      this.rutaPYMSService.crearRuta(this.nuevaRuta).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Registro de ruta guardado correctamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.id_RutaPYMS = response.cod_ruta ?? null;
            this.ReadonlyRutaPYMS = true;
            this.isEditing = false;
            console.log(response);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el registro de ruta',
          });
          console.error('Error al guardar el registro de ruta', error.error);
        }
      });
    }
  }

  getRutaPYMS(): void {
    if (this.id !== null && this.id > 0) {
      this.rutaPYMSService.getRutaPymsId(this.id).subscribe(
        (response) => {
          this.nuevaRuta = response.data;
          console.log(response);
          this.ReadonlyRutaPYMS = true;
          this.id_RutaPYMS = response.data.cod_ruta ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos de la ruta PYMS:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de la ruta PYMS.');
    }
  }



  guardarTamizacionNeonatal() {
    if (this.id_TamizacionNeonatal) {
      // Editar registro existente
      this.tamizacionNeonatalService.updateTamizacion(this.id_TamizacionNeonatal, this.nuevaTamizacion).subscribe({
        next: (response) => {
          console.log('Tamización neonatal actualizada:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Registro de tamización neonatal editado correctamente',
            icon: 'success',
          }).then(() => {
            this.ReadonlyTamizacionNeonatal = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el registro de tamización neonatal:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el registro de tamización neonatal',
            icon: 'error',
          });
        }
      });
    } else {
      if (this.id !== null) {
        this.nuevaTamizacion.id_usuario = this.id;
      }

      // Crear nuevo registro de tamización neonatal
      this.tamizacionNeonatalService.crearTamizacion(this.nuevaTamizacion).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Registro de tamización neonatal guardado correctamente',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.id_TamizacionNeonatal = response.cod_tamizacion ?? null;
            this.ReadonlyTamizacionNeonatal = true;
            this.isEditing = false;
            console.log(response);
            console.log(this.id_TamizacionNeonatal);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al guardar el registro de tamización neonatal',
          });
          console.error('Error al guardar el registro de tamización neonatal', error.error);
        }
      });
    }
  }

  getTamizacionNeonatal(): void {
    if (this.id !== null && this.id > 0) {
      this.tamizacionNeonatalService.getTamizacionbyId(this.id).subscribe(
        (response) => {
          this.nuevaTamizacion = response.data;
          console.log(response);
          this.ReadonlyTamizacionNeonatal = true;
          this.id_TamizacionNeonatal = response.data.cod_tamizacion ?? null;
        },
        (error) => {
          console.error('Error al obtener los datos de la tamización neonatal:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nuevos datos de tamización neonatal.');
    }
  }



  volver() {
    this.router.navigate(['/ruta-gestante', this.id]);
  }

}
