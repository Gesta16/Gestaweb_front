import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import Swal from 'sweetalert2';

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
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
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
    this.seguimientoConsulta = new SeguimientoConsultaMensual(0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0);

    this.seguimientoComplementario = new SeguimientoComplementario(0, 0, 0, '', '', '', '', '', '');

    this.micronutriente = new Micronutriente(0, 0, '', '', '', '');
  }

  ngOnInit() {
    this.getNumerosControl();
    this.getRiesgos();
    this.getFormasMedicion();
    this.getDiagnosticosNutricionales();
    this.getNumSesionesCurso();

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });
  }

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  getNumerosControl() {
    this.numeroControlService.getNumerosControl().subscribe(response => {
      if (response.estado === 'Ok') {
        this.numerosControl = response['numero_controles'];
        console.log(response);
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
        this.formaMedicion = response['Forma_Medicion'];
        // console.log(this.formaMedicion); 
      }
    }, error => {
      console.error('Error al obtener la forma de medición', error);
    });
  }

  getDiagnosticosNutricionales() {
    this.diagnosticoNutricionalService.getDiagnosticosNutricionales().subscribe(response => {
      if (response.estado === 'Ok') {
        this.diagnostico = response['diagnostico'];
        // console.log(this.diagnostico); 
      }
    }, error => {
      console.error('Error al obtener el diagnostico', error);
    });
  }

  getNumSesionesCurso() {
    this.numSesionesCursoService.getNumSesionesCurso().subscribe(response => {
      if (response.estado === 'Ok') {
        this.numSesiones = response['Sesiones_Curso'];
        // console.log(this.numSesiones); 
      }
    }, error => {
      console.error('Error al obtener el numero de sesiones', error);
    });
  }

  guardarSeguimientoConsulta() {
    if (this.id !== null) {
      this.seguimientoConsulta.id_usuario = this.id;
    }

    this.seguimientoConsultaMensualService.crearSeguimientoConsulta(this.seguimientoConsulta).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Seguimiento de consulta mensual guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el seguimiento de consulta mensual',
      });
    });
  }


  guardarSeguimientoComplementario() {
    if (this.id !== null) {
      this.seguimientoComplementario.id_usuario = this.id;
    }

    this.seguimientoComplementarioService.crearSeguimientoComplementario(this.seguimientoComplementario).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Seguimiento complementario guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el seguimiento complementario',
      });
    });
  }


  guardarMicronutriente() {
    if (this.id !== null) {
      this.micronutriente.id_usuario = this.id;
    }

    this.micronutrientesService.crearMicronutriente(this.micronutriente).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Micronutriente guardado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
      }
    , error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el micronutriente',
      });
    });
  }


  volver() {
    this.router.navigate(['/ruta-gestante', this.id]); // Navegar a la ruta con el ID
  }

}
