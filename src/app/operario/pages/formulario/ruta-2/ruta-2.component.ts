import { Component } from '@angular/core';
import { MetodoFracasoService } from '../../../../servicios/metodo-fracaso.service';
import { MetodoFracaso } from '../../../../modelos/metodo-fracaso.model';
import { ControlPrenatalService } from '../../../../servicios/control-prenatal.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ControlPrenatal } from '../../../../modelos/control-prenatal.model';
import { PrimeraConsulta } from '../../../../modelos/primera-consulta.model';
import { RiesgoService } from '../../../../servicios/riesgo.service';
import { Riesgo } from '../../../../modelos/riesgo.model';
import { TipoDmService } from '../../../../servicios/tipo-dm.service';
import { TipoDm } from '../../../../modelos/tipo-dm.model';
import { PrimeraConsultaService } from '../../../../servicios/primera-consulta.service';
import { BiologicoService } from '../../../../servicios/biologico.service';
import { Biologico } from '../../../../modelos/biologico.model';
import { Vacunacion } from '../../../../modelos/vacunacion.model';
import { VacunacionService } from '../../../../servicios/vacunacion.service';

@Component({
  selector: 'app-ruta-2',
  templateUrl: './ruta-2.component.html',
  styleUrl: './ruta-2.component.css'
})
export class Ruta2Component {

  openTab = 1;
  metodosFracaso: MetodoFracaso[] = [];
  riesgos: Riesgo[] = [];
  biologicos: Biologico[]=[];
  tiposDm: TipoDm[] = [];

  selectedMetodoFracaso: number | null = null;

  controlPrenatal: ControlPrenatal = {
    cod_fracaso: 0,
    edad_gestacional: 0,
    trim_ingreso: '',
    fec_mestruacion: new Date(),
    fec_parto: new Date(),
    emb_planeado: false,
    fec_anticonceptivo: false,
    fec_consulta: new Date(),
    fec_control: new Date(),
    ries_reproductivo: '',
    fac_asesoria: new Date(),
    usu_solicito: false,
    fec_terminacion: new Date(),
    per_intergenesico: false
  };

  primeraConsulta: PrimeraConsulta = {
    cod_riesgo: 0,
    cod_dm: 0,
    peso_previo: 0,
    tal_consulta: 0,
    imc_consulta: 0,
    diag_nutricional: '',
    hta: 0,
    dm: 0,
    fact_riesgo: '',
    expo_violencia: false,
    ries_depresion: false,
    for_gestacion: 0,
    for_parto: 0,
    for_cesarea: 0,
    for_aborto: 0,
    fec_lactancia: new Date(),
    fec_consejeria: new Date(),
    id_usuario: 0
  };

  vacunacion: Vacunacion ={
    id_usuario:0,
    cod_biologico: 0,
    fec_unocovid: new Date(),
    fec_doscovid: new Date(),
    fec_refuerzo: new Date(),
    fec_influenza: new Date,
    fec_tetanico: new Date(),
    fec_dpt: new Date()

  }


  constructor(private route: ActivatedRoute,private vacunacionService:VacunacionService , private biologicoService:BiologicoService, private primeraConsultaService:PrimeraConsultaService , private tipoDmService: TipoDmService, private metodoFracasoService: MetodoFracasoService, private riesgoService: RiesgoService, private router: Router, private controlPrenatalService: ControlPrenatalService) { }
  id: number | null = null;

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });

    if (this.id !== null && this.id > 0) { 
      this.getControlPrenatal();
      this.getPrimeraConsulta();
      this.getVacunacion();
    } else {
      console.log('No se proporcionó un ID válido, se asume que se va a crear un Control Prenatal.');
    }

    this.cargarMetodosFracaso();
    this.cargarRiesgos();
    this.cargarTipoDm();
    this.cargarBiologicos();
    
  }

  cargarMetodosFracaso(): void {
    this.metodoFracasoService.getMetodos().subscribe(response => {
      this.metodosFracaso = response.metodo;
    }, error => {
      console.error('Error al cargar métodos de fracaso:', error);
    });
  }

  cargarRiesgos(): void {
    this.riesgoService.getRiesgos().subscribe(response => {
      this.riesgos = response.riesgo;
      console.log(response)
    }, error => {
      console.error('Error al cargar los riesgos:', error);
    });
  }

  cargarBiologicos(): void {
    this.biologicoService.getBiologicos().subscribe(response => {
      this.biologicos = response.biologico;
      console.log(response)
    }, error => {
      console.error('Error al cargar los biologicos:', error);
    });
  }

  cargarTipoDm(): void {
    this.tipoDmService.getTipos().subscribe(response => {
      this.tiposDm = response.tipos;
      console.log(response)
    }, error => {
      console.error('Error al cargar los tipos de diabetes:', error);
    });
  }

  guardarControlPrenatal(): void {
    if (this.id !== null) {
      this.controlPrenatal.id_usuario = this.id; // Asigna el ID al objeto controlPrenatal
    }

    console.log(this.controlPrenatal);
    this.controlPrenatalService.createControl(this.controlPrenatal).subscribe({
      next: (response) => {
        console.log('Control prenatal creado:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Control prenatal creado con éxito',
          icon: 'success',
        }).then(() => {
        });
      },
      error: (error) => {
        console.error('Error al crear el control prenatal:', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al crear el control prenatal',
          icon: 'error',
        });
      }
    });
  }

  getControlPrenatal(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.controlPrenatalService.getControlById(this.id).subscribe(
        (response) => {
          this.controlPrenatal = response.Control;
          console.log(response);
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo encontrar el Control Prenatal. Verifica el ID.',
            icon: 'error',
          });
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo usuario.');
    }
  }

  guardarPrimeraConsulta(): void {
    if (this.id !== null) {
      this.primeraConsulta.id_usuario = this.id; 
    }

    console.log(this.primeraConsulta);
    this.primeraConsultaService.createConsulta(this.primeraConsulta).subscribe({
      next: (response) => {
        console.log('Primera Consulta creada:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Primera Consulta creada con éxito',
          icon: 'success',
        }).then(() => {
          // Puedes redirigir o hacer otra acción aquí si es necesario
        });
      },
      error: (error) => {
        console.error('Error al crear la primera consulta:', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al crear la primera consulta',
          icon: 'error',
        });
      }
    });
  }

  getPrimeraConsulta(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.primeraConsultaService.getPrimeraConsulta(this.id).subscribe(
        (response) => {
          this.primeraConsulta = response.consulta;
          console.log(response);
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo encontrar La primera consulta. Verifica el ID.',
            icon: 'error',
          });
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear una nueva consulta.');
    }
  }

  guardarVacunacion(): void {
    if (this.id !== null) {
      this.vacunacion.id_usuario = this.id; 
    }

    console.log(this.vacunacion);
    this.vacunacionService.createVacunacion(this.vacunacion).subscribe({
      next: (response) => {
        console.log('Vacunacion creada:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Vacunacion creada con éxito',
          icon: 'success',
        }).then(() => {
        });
      },
      error: (error) => {
        console.error('Error al crear la Vacunacion:', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al crear la Vacunacion',
          icon: 'error',
        });
      }
    });
  }

  getVacunacion(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.vacunacionService.getVacunacionById(this.id).subscribe(
        (response) => {
          this.vacunacion = response.vacunacion;
          console.log(response);
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo encontrar la informacion de vacunacion. Verifica el ID.',
            icon: 'error',
          });
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nueva informacion de vacunacion.');
    }
  }

  volver() {
    this.router.navigate(['/ruta-gestante', this.id]); // Navegar a la ruta con el ID
  }

}
