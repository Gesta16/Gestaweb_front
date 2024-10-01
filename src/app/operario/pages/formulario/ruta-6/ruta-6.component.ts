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
import { Router } from '@angular/router';

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

  constructor(
    private datosRecienNacidoService: DatosRecienNacidoService,
    private estudioHipotiroidismoService: EstudioHipotiroidismoService,
    private rutaPYMSService: RutaPYMSService,
    private hemoclasificacionService: HemoclasificacionService,
    private tamizacionNeonatalService: TamizacionNeonatalService,
    private router: Router,
  ) { 
    this.datosRecienNacido = new DatosRecienNacido(0, '', 0, '', 0, 0, '', '');
    this.estudioHipotiroidismo = new EstudioHipotiroidismo(0, '', '', '', '', '', '');
    this.nuevaRuta = new RutaPYMS(0, '', '', '', '');
    this.nuevaTamizacion = new TamizacionNeonatal(0, 0, '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.getHemoclasificaciones();
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
    this.datosRecienNacidoService.crearDatosRecienNacido(this.datosRecienNacido).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Registro de recién nacido guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el registro de recién nacido', error.error);
    });
  }

  guardarEstudioHipotiroidismo() {
    this.estudioHipotiroidismoService.crearEstudioHipotiroidismo(this.estudioHipotiroidismo).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Registro de estudio de hipotiroidismo guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el registro de estudio de hipotiroidismo', error.error);
    });
  }

  guardarRutaPYMS() {
    this.rutaPYMSService.crearRuta(this.nuevaRuta).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Registro de ruta guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el registro de ruta', error.error);
    });
  }

  guardarTamizacionNeonatal() {
    this.tamizacionNeonatalService.crearTamizacion(this.nuevaTamizacion).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Registro de tamización neonatal guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el registro de tamización neonatal', error.error);
    });
  }

  volver() {
    this.router.navigate(['/ruta-gestante']);
  }

}
