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

import { MenuService } from '../../../../servicios/menu.service';
@Component({
  selector: 'app-ruta-2',
  templateUrl: './ruta-2.component.html',
  styleUrl: './ruta-2.component.css'
})
export class Ruta2Component {

  openTab = 1;
  metodosFracaso: MetodoFracaso[] = [];
  riesgos: Riesgo[] = [];
  biologicos: Biologico[] = [];
  tiposDm: TipoDm[] = [];
  id_control: number | null = null;
  id_primeraConsulta: number | null = null;
  id_vacunacion: number | null = null;
  isReadOnly = false;
  isReadOnlyPrimeraConsulta = false;
  isReadOnlyVacunacion = false;
  isExpanded = true;
  isVisible = true;
  isEditing = false;

  selectedMetodoFracaso: number | null = null;

  controlPrenatal: ControlPrenatal = {
    cod_fracaso: 0,
    edad_gestacional: '',
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
    per_intergenesico: false,
    num_proceso:0
  };

  primeraConsulta: PrimeraConsulta = {
    cod_riesgo: 0,
    cod_dm: 0,
    peso_previo: '',
    tal_consulta: '',
    imc_consulta: '',
    diag_nutricional: '',
    hta: '',
    dm: '',
    fact_riesgo: '',
    expo_violencia: false,
    ries_depresion: false,
    for_gestacion: '',
    for_parto: '',
    for_cesarea: '',
    for_aborto: '',
    fec_lactancia: new Date(),
    fec_consejeria: new Date(),
    id_usuario: 0,
    num_proceso:0
  };

  vacunacion: Vacunacion = {
    id_usuario: 0,
    cod_biologico: 0,
    fec_unocovid: new Date(),
    fec_doscovid: new Date(),
    fec_refuerzo: new Date(),
    fec_influenza: new Date,
    fec_tetanico: new Date(),
    fec_dpt: new Date()

  }


  constructor(private route: ActivatedRoute, 
    private vacunacionService: VacunacionService, 
    private biologicoService: BiologicoService, 
    private primeraConsultaService: PrimeraConsultaService,
    private tipoDmService: TipoDmService, 
    private metodoFracasoService: MetodoFracasoService, 
    private riesgoService: RiesgoService, 
    private router: Router, 
    private controlPrenatalService: ControlPrenatalService,
    private menuService: MenuService) { }
  id: number | null = null;
  num_proceso: number | null = null;


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });

    this.route.paramMap.subscribe(params => {
      this.num_proceso = +params.get('num_proceso')!; // Obtiene el ID como número
      console.log('num_proceso:', this.num_proceso);
    });

    if (this.id !== null && this.id > 0) {
      this.getControlPrenatal();
      this.getPrimeraConsulta();
      this.getVacunacion();
    } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.cargarMetodosFracaso();
    this.cargarRiesgos();
    this.cargarTipoDm();
    this.cargarBiologicos();
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
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

  toggleTabs(tabNumber: number) {
    // Definimos los grupos de tabs permitidos para el cambio
    const grupo1 = [1, 2];
    const grupo2 = [3, 4];
    const grupo3 = [5];


    if (this.isEditing) {

      if (grupo1.includes(this.openTab)) {
        if (!grupo1.includes(tabNumber)) {
          Swal.fire({
            title: 'Advertencia',
            text: 'Por favor, guarda los cambios antes de cambiar de pestaña.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }
      }

      else if (grupo2.includes(this.openTab)) {
        if (!grupo2.includes(tabNumber)) {
          Swal.fire({
            title: 'Advertencia',
            text: 'Por favor, guarda los cambios antes de cambiar de pestaña.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }
      }

      else if (grupo3.includes(this.openTab)) {
        if (!grupo3.includes(tabNumber)) {
          Swal.fire({
            title: 'Advertencia',
            text: 'Por favor, guarda los cambios antes de cambiar de pestaña.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
          return;
        }
      }
    }

    this.openTab = tabNumber;
  }


  toggleEdit() {
    if (!this.isReadOnly) return;
    this.isReadOnly = false;
    this.isEditing = true;
  }

  toggleEditPrimeraConsulta() {
    if (!this.isReadOnlyPrimeraConsulta) return;
    this.isReadOnlyPrimeraConsulta = false;
    this.isEditing = true;
  }

  toggleEditVacunacion() {
    if (!this.isReadOnlyVacunacion) return;
    this.isReadOnlyVacunacion = false;
    this.isEditing = true;
  }

  guardarControlPrenatal(): void {

    if (this.id_control) {
      // Editar usuario existente
      this.controlPrenatalService.updateControlPrenatal(this.id_control, this.controlPrenatal).subscribe({
        next: (response) => {
          console.log('Control Prenatal actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Control Prenatal actualizado con éxito',
            icon: 'success',
          }).then(() => {
            this.isReadOnly = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Control Prenatal:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el Control Prenatal',
            icon: 'error',
          });
        }
      });
    } else {

      if (this.id !== null) {
        this.controlPrenatal.id_usuario = this.id; // Asigna el ID al objeto controlPrenatal
      }
      this.controlPrenatal.num_proceso = this.num_proceso !== null ? this.num_proceso : 0; 

      console.log(this.controlPrenatal);
      this.controlPrenatalService.createControl(this.controlPrenatal).subscribe({
        next: (response) => {
          console.log('Control prenatal creado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Control prenatal creado con éxito',
            icon: 'success',
          }).then(() => {
            this.id_control = response.data.cod_control ?? null;

            this.isEditing = false;
            console.log(response)
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
  }

  getControlPrenatal(): void {



    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.controlPrenatalService.getControlById(this.id,this.num_proceso ??0).subscribe(
        (response) => {
          this.controlPrenatal = response.Control;
          console.log(response);
          this.id_control = response.Control.cod_control ?? null;
          this.isReadOnly = true;

        },
        (error) => {
          console.error('Error al obtener el usuario:', error);

        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a ingresar nueva informacion.');
    }
  }

  guardarPrimeraConsulta(): void {

    if (this.id_primeraConsulta) {
      // Editar usuario existente
      this.primeraConsultaService.updatePrimeraConsulta(this.id_primeraConsulta, this.primeraConsulta).subscribe({
        next: (response) => {
          console.log('Primera Consulta actualizada:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Primera Consulta actualizada con éxito',
            icon: 'success',
          }).then(() => {
            this.isReadOnlyPrimeraConsulta = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar la primera consulta:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar la primera consulta',
            icon: 'error',
          });
        }
      });
    } else {

      if (this.id !== null) {
        this.primeraConsulta.id_usuario = this.id;
      }
      this.primeraConsulta.num_proceso = this.num_proceso !== null ? this.num_proceso : 0; 
      console.log(this.primeraConsulta);
      this.primeraConsultaService.createConsulta(this.primeraConsulta).subscribe({
        next: (response) => {
          console.log('Primera Consulta creada:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Primera Consulta creada con éxito',
            icon: 'success',
          }).then(() => {
            this.id_primeraConsulta = response.consulta.cod_consulta ?? null;

            this.isEditing = false;
            console.log(response)
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
  }

  getPrimeraConsulta(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.primeraConsultaService.getPrimeraConsulta(this.id,this.num_proceso??0).subscribe(
        (response) => {
          this.primeraConsulta = response.consulta;
          console.log(response);
          this.isReadOnlyPrimeraConsulta = true;

          this.id_primeraConsulta = response.consulta.cod_consulta ?? null;
        },
        (error) => {
          console.error('Error al obtener la informacion:', error);

        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear una nueva consulta.');
    }
  }

  guardarVacunacion(): void {

    if (this.id_vacunacion) {

      this.vacunacionService.updateVacunacion(this.id_vacunacion, this.vacunacion).subscribe({
        next: (response) => {
          console.log('Vacunacion actualizada:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Vacunacion actualizada con éxito',
            icon: 'success',
          }).then(() => {
            this.isReadOnlyVacunacion = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar la vacunacion:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar la vacunacion',
            icon: 'error',
          });
        }
      });
    } else {

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
            this.isReadOnlyVacunacion = true;
            this.id_vacunacion = response.vacunacion.cod_vacunacion ?? null;

            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al crear la Vacunacion:', error);

        }
      });
    }
  }

  getVacunacion(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.vacunacionService.getVacunacionById(this.id).subscribe(
        (response) => {
          this.vacunacion = response.vacunacion;
          console.log(response);
          this.id_vacunacion = response.vacunacion.cod_vacunacion ?? null;
          this.isReadOnlyVacunacion = true;

        },
        (error) => {
          console.error('Error al obtener la vacunacion:', error);

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
