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

import { MenuService } from '../../../../servicios/menu.service';
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

  isExpanded = true;
  isVisible = true;

  constructor(
    private route: ActivatedRoute,
    private datosRecienNacidoService: DatosRecienNacidoService,
    private estudioHipotiroidismoService: EstudioHipotiroidismoService,
    private rutaPYMSService: RutaPYMSService,
    private hemoclasificacionService: HemoclasificacionService,
    private tamizacionNeonatalService: TamizacionNeonatalService,
    private router: Router,
    private menuService: MenuService
  ) {
    this.datosRecienNacido = new DatosRecienNacido(0, 0, '', 0, '', 0, 0, '', '');
    this.estudioHipotiroidismo = new EstudioHipotiroidismo(0, 0, '', '', '', '', '', '');
    this.nuevaRuta = new RutaPYMS(0, 0, '', '', '', '');
    this.nuevaTamizacion = new TamizacionNeonatal(0, 0, 0, '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.getHemoclasificaciones();
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
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

    if (this.id !== null) {
      this.datosRecienNacido.id_usuario = this.id;
    }

    this.datosRecienNacidoService.crearDatosRecienNacido(this.datosRecienNacido).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Registro de recién nacido guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el registro de recién nacido',
      });
      console.error('Error al guardar el registro de recién nacido', error.error);
    });
  }

  guardarEstudioHipotiroidismo() {

    if (this.id !== null) {
      this.estudioHipotiroidismo.id_usuario = this.id;
    }

    this.estudioHipotiroidismoService.crearEstudioHipotiroidismo(this.estudioHipotiroidismo).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Registro de estudio de hipotiroidismo guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el registro de estudio de hipotiroidismo',
      });
      console.error('Error al guardar el registro de estudio de hipotiroidismo', error.error);
    });
  }

  guardarRutaPYMS() {

    if (this.id !== null) {
      this.nuevaRuta.id_usuario = this.id;
    }

    this.rutaPYMSService.crearRuta(this.nuevaRuta).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Registro de ruta guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el registro de ruta',
      });
      console.error('Error al guardar el registro de ruta', error.error);
    });
  }

  guardarTamizacionNeonatal() {

    if (this.id !== null) {
      this.nuevaTamizacion.id_usuario = this.id;
    }

    this.tamizacionNeonatalService.crearTamizacion(this.nuevaTamizacion).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Registro de tamización neonatal guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el registro de tamización neonatal',
      });
      console.error('Error al guardar el registro de tamización neonatal', error.error);
    });
  }


  volver() {
    this.router.navigate(['/ruta-gestante', this.id]); // Navegar a la ruta con el ID
  }

}
