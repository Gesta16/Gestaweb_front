import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NumeroControlService } from '../../../../servicios/numero-control.service';
import { NumeroControl } from '../../../../modelos/numero-control.model';
import { RiesgoService } from '../../../../servicios/riesgo.service';
import { Riesgo } from '../../../../modelos/riesgo.model';
import { FormaMedicionService } from '../../../../servicios/forma-medicion.service';
import { FormaMedicion } from '../../../../modelos/forma-medicion.model';
import { DiagnosticoNutricionalService } from '../../../../servicios/diagnostico-nutricional.service';
import { DiagnosticoNutricional } from '../../../../modelos/diagnostico-nutricional.model';
import { NumSesionesCursoService } from '../../../../servicios/num-sesiones-curso.service';
import { NumSesionesCurso } from '../../../../modelos/num-sesiones-curso.model';
import { SeguimientoConsultaMensualService } from '../../../../servicios/seguimiento-consulta-mensual.service';
import { SeguimientoConsultaMensual } from '../../../../modelos/seguimiento-consulta-mensual.model';
import { SeguimientoComplementarioService } from '../../../../servicios/seguimiento-complementario.service';
import { SeguimientoComplementario } from '../../../../modelos/seguimiento-complementario.model';
import { MicronutrientesService } from '../../../../servicios/micronutrientes.service';
import { Micronutriente } from '../../../../modelos/micronutrientes.model';

@Component({
  selector: 'app-ruta-4',
  templateUrl: './ruta-4.component.html',
  styleUrl: './ruta-4.component.css'
})
export class Ruta4Component {
  openTab = 1;
  numerosControl: NumeroControl[] = [];
  riesgo: Riesgo[] = [];
  formaMedicion: FormaMedicion[] = [];
  diagnostico: DiagnosticoNutricional[] = [];
  numSesiones: NumSesionesCurso[] = [];

  seguimientoConsulta: SeguimientoConsultaMensual;
  seguimientoComplementario: SeguimientoComplementario;
  micronutriente: Micronutriente;

  constructor(
    private router: Router,
    private numeroControlService: NumeroControlService,
    private riesgoService: RiesgoService,
    private formaMedicionService: FormaMedicionService,
    private diagnosticoNutricionalService: DiagnosticoNutricionalService,
    private numSesionesCursoService: NumSesionesCursoService,
    private seguimientoConsultaMensualService: SeguimientoConsultaMensualService,
    private seguimientoComplementarioService: SeguimientoComplementarioService,
    private micronutrientesService: MicronutrientesService
  ) { 
    this.seguimientoConsulta = new SeguimientoConsultaMensual(0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0);
    
    this.seguimientoComplementario = new SeguimientoComplementario(0, 0, '', '', '', '', '', '');

    this.micronutriente = new Micronutriente(0, '', '', '', '');
  }

  ngOnInit() {
    this.getNumerosControl(); 
    this.getRiesgos();
    this.getFormasMedicion();
    this.getDiagnosticosNutricionales();
    this.getNumSesionesCurso();
  }

  toggleTabs($tabNumber: number) {
  this.openTab = $tabNumber;
  }

  getNumerosControl() {
    this.numeroControlService.getNumerosControl().subscribe(response => {
      if (response.estado === 'Ok') {
        this.numerosControl = response['numero controles']; 
        // console.log(this.numerosControl); 
      }
    }, error => {
      console.error('Error al obtener números de control', error);
    });
  }  

  getRiesgos() {
    this.riesgoService.getRiesgos().subscribe(response => {
      if (response.estado === 'Ok') {
        this.riesgo = response['riesgo']; 
        // console.log(this.riesgo); 
      }
    }, error => {
      console.error('Error al obtener los riegos', error);
    });
  }  

  getFormasMedicion() {
    this.formaMedicionService.getFormasMedicion().subscribe(response => {
      if (response.estado === 'Ok') {
        this.formaMedicion = response['Forma Medicion Edad Gestacional']; 
        // console.log(this.formaMedicion); 
      }
    }, error => {
      console.error('Error al obtener la forma de medición', error);
    });
  } 

  getDiagnosticosNutricionales() {
    this.diagnosticoNutricionalService.getDiagnosticosNutricionales().subscribe(response => {
      if (response.estado === 'Ok') {
        this.diagnostico = response['diagnostico nutricional mes']; 
        // console.log(this.diagnostico); 
      }
    }, error => {
      console.error('Error al obtener el diagnostico', error);
    });
  } 

  getNumSesionesCurso() {
    this.numSesionesCursoService.getNumSesionesCurso().subscribe(response => {
      if (response.estado === 'Ok') {
        this.numSesiones = response['Sesiones Curso Paternidad Maternidad']; 
        // console.log(this.numSesiones); 
      }
    }, error => {
      console.error('Error al obtener el numero de sesiones', error);
    });
  } 

  guardarSeguimientoConsulta() {
    this.seguimientoConsultaMensualService.crearSeguimientoConsulta(this.seguimientoConsulta).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Seguimiento de consulta mensual guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el seguimiento de consulta mensual', error.error);
    });
  }

  guardarSeguimientoComplementario() {
    this.seguimientoComplementarioService.crearSeguimientoComplementario(this.seguimientoComplementario).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Seguimiento complementario guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el seguimiento complementario', error.error);
    });
  }

  guardarMicronutriente() {
    this.micronutrientesService.crearMicronutriente(this.micronutriente).subscribe(response => {
      if (response.estado === 'Ok') {
        console.log('Micronutriente guardado correctamente', response);
      }
    }, error => {
      console.error('Error al guardar el micronutriente', error.error);
    });
  }

  volver() {
    this.router.navigate(['/ruta-gestante']);
  }

}
