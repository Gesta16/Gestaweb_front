import { Component } from '@angular/core';
import { HemoclasificacionService } from '../../../../servicios/hemoclasificacion.service';
import { Hemoclasificacion } from '../../../../modelos/hemoclasificacion.model';
import { Antibiograma } from '../../../../modelos/antibiograma.model';
import { AntibiogramaService } from '../../../../servicios/antibiograma.service';
import { ActivatedRoute, Route } from '@angular/router';
import { LaboratorioITrimestre } from '../../../../modelos/laboratorio-isemestre.model';
import { LaboratorioisemestreService } from '../../../../servicios/laboratorioisemestre.service';
import Swal from 'sweetalert2';
import { LaboratorioIITrimestre } from '../../../../modelos/laboratorio-iisemestre.model';
import { LaboratorioiisemestreService } from '../../../../servicios/laboratorioiisemestre.service';
import { LaboratorioIIITrimestre } from '../../../../modelos/laboratorio-iiisemestre.model';
import { LaboratorioiiisemestreService } from '../../../../servicios/laboratorioiiisemestre.service';
import { PruebaVDRLService } from '../../../../servicios/prueba-vdrl.service';
import { PruebaRprService } from '../../../../servicios/prueba-rpr.service';
import { PruebaVDRL } from '../../../../modelos/prueba-vdrl.model';
import { PruebaRPR } from '../../../../modelos/prueba-rpr.model';
import { Its } from '../../../../modelos/its.model';
import { ItsService } from '../../../../servicios/its.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta-3',
  templateUrl: './ruta-3.component.html',
  styleUrl: './ruta-3.component.css'
})
export class Ruta3Component {
  openTab = 1;

  hemoclasificaciones: Hemoclasificacion[] = [];
  antibiogramas: Antibiograma[] = [];
  id: number | null = null;
  num_proceso: number | null = null;

  Vdrl: PruebaVDRL[] = [];
  Rpr: PruebaRPR[] = [];
  isReadOnlyLaboratorioI = false;
  isReadOnlyLaboratorioII = false;
  isReadOnlyLaboratorioIII = false;
  isReadOnlyIts = false;


  id_laboratorioI: number | null = null;
  id_laboratorioII: number | null = null;
  id_laboratorioIII: number | null = null;
  id_its: number | null = null;

  isEditing = false;

  laboratorioITrimestre: LaboratorioITrimestre = {
    cod_laboratorio: 0,
    id_operador: 0,
    id_usuario: 0,
    cod_hemoclasifi: 0,
    cod_antibiograma: 0,
    fec_hemoclasificacion: '',
    hem_laboratorio: '',
    fec_hemograma: '',
    gli_laboratorio: '',
    fec_glicemia: '',
    ant_laboratorio: '',
    fec_antigeno: '',
    pru_vih: '',
    fec_vih: '',
    pru_sifilis: '',
    fec_sifilis: '',
    uro_laboratorio: '',
    fec_urocultivo: '',
    fec_antibiograma: '',
    ig_rubeola: '',
    fec_rubeola: '',
    ig_toxoplasma: '',
    fec_toxoplasma: '',
    hem_gruesa: '',
    fec_hemoparasito: '',
    pru_antigenos: '',
    fec_antigenos: '',
    eli_recombinante: '',
    fec_recombinante: '',
    coo_cuantitativo: '',
    fec_coombs: '',
    fec_ecografia: '',
    eda_gestacional: '',
    rie_biopsicosocial: '',
    num_proceso: 0
  };

  laboratorioIITrimestre: LaboratorioIITrimestre = {
    cod_doslaboratorio: 0,
    id_operador: 0,
    id_usuario: 0,
    pru_vih: '',
    fec_vih: '',
    pru_sifilis: '',
    fec_sifilis: '',
    pru_oral: '',
    pru_uno: '',
    pru_dos: '',
    fec_prueba: '',
    rep_citologia: '',
    fec_citologia: '',
    ig_toxoplasma: '',
    fec_toxoplasma: '',
    pru_avidez: '',
    fec_avidez: '',
    tox_laboratorio: '',
    fec_toxoplasmosis: '',
    hem_gruesa: '',
    fec_hemoparasito: '',
    coo_cualitativo: '',
    fec_coombs: '',
    fec_ecografia: '',
    eda_gestacional: '',
    rie_biopsicosocial: '',
    num_proceso: 0

  };

  laboratorioIIITrimestre: LaboratorioIIITrimestre = {
    id_operador: 0,
    id_usuario: 0,
    hemograma: '',
    fec_hemograma: '',
    pru_vih: '',
    fec_vih: '',
    pru_sifilis: '',
    fec_sifilis: '',
    ig_toxoplasma: '',
    fec_toxoplasma: '',
    cul_rectal: '',
    fec_rectal: '',
    fec_biofisico: '',
    edad_gestacional: '',
    rie_biopsicosocial: '',
    num_proceso: 0

  };

  its: Its = {
    cod_its: 0,
    id_operador: 0,
    id_usuario: 0,
    cod_vdrl: 0,
    cod_rpr: 0,
    eli_vih: '',
    fec_vih: new Date(),
    fec_vdrl: new Date(),
    fec_rpr: new Date(),
    rec_tratamiento: '',
    rec_pareja: '',
    num_proceso: 0

  };



  constructor(private itsService: ItsService, private vdrlService: PruebaVDRLService, private rprService: PruebaRprService, private laboratorioIIISemestreservice: LaboratorioiiisemestreService, private laboratorioIISemestreservice: LaboratorioiisemestreService, private laboratorioISemestreservice: LaboratorioisemestreService, private route: ActivatedRoute, private hemoclasificacionService: HemoclasificacionService, private antibiogramaService: AntibiogramaService, private router: Router,) { }

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
      this.getPrimerLaboratorio();
      this.getSegundoLaboratorio();
      this.getTercerLaboratorio();
      this.getIts();
    } else {
      console.log('No se proporcionó un ID válido.');
    }

    this.cargarHemoclasificacion();
    this.cargarAntibiograma();
    this.cargarRPR();
    this.cargarVDRL();

  }

  toggleTabs(tabNumber: number) {
    // Definimos los grupos de tabs permitidos para cada formulario
    const grupo1 = [1, 2, 3, 4];
    const grupo2 = [5, 6, 7];
    const grupo3 = [8, 9];
    const grupo4 = [10];


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
      
      else if (grupo4.includes(this.openTab)) {
        if (!grupo4.includes(tabNumber)) {
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


  toggleEditLaboratorioI() {
    if (!this.isReadOnlyLaboratorioI) return;
    this.isReadOnlyLaboratorioI = false;
    this.isEditing = true;
  }

  toggleEditLaboratorioII() {
    if (!this.isReadOnlyLaboratorioII) return;
    this.isReadOnlyLaboratorioII = false;
    this.isEditing = true;
  }

  toggleEditLaboratorioIII() {
    if (!this.isReadOnlyLaboratorioIII) return;
    this.isReadOnlyLaboratorioIII = false;
    this.isEditing = true;
  }

  toggleEditIts() {
    if (!this.isReadOnlyIts) return;
    this.isReadOnlyIts = false;
    this.isEditing = true;
  }

  cargarHemoclasificacion(): void {
    this.hemoclasificacionService.getHemoclasificaciones().subscribe(response => {
      this.hemoclasificaciones = response.Hemoclasificacion;
      console.log(response)
    }, error => {
      console.error('Error al cargar hemoclasificacion:', error);
    });
  }

  cargarVDRL(): void {
    this.vdrlService.getPruebaVDRL().subscribe(response => {
      this.Vdrl = response['Prueba No Treponemica VDRL'];
      console.log(response)
    }, error => {
      console.error('Error al cargar las pruebas VDRL:', error);
    });
  }

  cargarRPR(): void {
    this.rprService.getPruebaRPR().subscribe(response => {
      console.log('Respuesta del servicio:', response); // Verifica la respuesta
      if (response.estado === 'Ok') {
        this.Rpr = response['Prueba no Treponemica RPR']; // Usa el nombre correcto
        console.log('Datos de RPR:', this.Rpr); // Comprueba que se asigna correctamente
      } else {
        console.error('Estado no OK:', response.estado);
      }
    }, error => {
      console.error('Error al cargar las pruebas RPR:', error);
    });
  }



  cargarAntibiograma(): void {
    this.antibiogramaService.getAntibiogramas().subscribe(response => {
      this.antibiogramas = response.antibiograma;
      console.log(response)
    }, error => {
      console.error('Error al cargar antibiograma:', error);
    });
  }

  guardarPrimerLaboratorio(): void {

    if (this.id_laboratorioI) {
      // Editar usuario existente
      this.laboratorioISemestreservice.updateLaboratorioISemestre(this.id_laboratorioI, this.laboratorioITrimestre).subscribe({
        next: (response) => {
          console.log('Primer laboratorio trimestre actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Primer laboratorio trimestre editado con éxito',
            icon: 'success',
          }).then(() => {
            this.isReadOnlyLaboratorioI = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Primer laboratorio trimestre:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el Primer laboratorio trimestre',
            icon: 'error',
          });
        }
      });
    } else {

      if (this.id !== null) {
        this.laboratorioITrimestre.id_usuario = this.id;
      }
      this.laboratorioITrimestre.num_proceso = this.num_proceso !== null ? this.num_proceso : 0; 

      console.log(this.laboratorioITrimestre);
      this.laboratorioISemestreservice.createLaboratorioPrimerSemestre(this.laboratorioITrimestre).subscribe({
        next: (response) => {
          console.log('Laboratorio del primer semestre creado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Laboratorio del primer semestre  creado con éxito',
            icon: 'success',
          }).then(() => {
            this.id_laboratorioI = response.data.cod_laboratorio ?? null;
            this.isReadOnlyLaboratorioI = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al crear el Laboratorio del primer semestre :', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear el Laboratorio del primer semestre ',
            icon: 'error',
          });
        }
      });
    }
  }

  getPrimerLaboratorio(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.laboratorioISemestreservice.getLaboratorioISemestrebyId(this.id,this.num_proceso ??0).subscribe(
        (response) => {
          this.laboratorioITrimestre = response.data;
          console.log(response);
          this.isReadOnlyLaboratorioI = true;
          this.id_laboratorioI = this.laboratorioITrimestre.cod_laboratorio;
        },
        (error) => {
          console.error('Error al obtener el laboratorio del primer trimestre:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo laboratorio del primer trimestre.');
    }
  }

  guardarSegundoLaboratorio(): void {

    if (this.id_laboratorioII) {
      // Editar usuario existente
      this.laboratorioIISemestreservice.updateLaboratorioIISemestre(this.id_laboratorioII, this.laboratorioIITrimestre).subscribe({
        next: (response) => {
          console.log('Segundo laboratorio trimestre actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Segundo laboratorio trimestre editado con éxito',
            icon: 'success',
          }).then(() => {
            this.isReadOnlyLaboratorioII = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Segundo laboratorio trimestre:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el Segundo laboratorio trimestre',
            icon: 'error',
          });
        }
      });
    } else {

      if (this.id !== null) {
        this.laboratorioIITrimestre.id_usuario = this.id;
      }
      this.laboratorioIITrimestre.num_proceso = this.num_proceso !== null ? this.num_proceso : 0; 


      console.log(this.laboratorioIITrimestre);
      this.laboratorioIISemestreservice.createLaboratorioSegundoSemestre(this.laboratorioIITrimestre).subscribe({
        next: (response) => {
          console.log('Laboratorio del segundo semestre creado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Laboratorio del segundo semestre  creado con éxito',
            icon: 'success',
          }).then(() => {
            this.id_laboratorioII = response.data.cod_doslaboratorio ?? null;
            this.isReadOnlyLaboratorioII = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al crear el Laboratorio del segundo semestre :', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear el Laboratorio del segundo semestre ',
            icon: 'error',
          });
        }
      });
    }
  }

  getSegundoLaboratorio(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.laboratorioIISemestreservice.getLaboratorioIISemestrebyId(this.id,this.num_proceso ??0).subscribe(
        (response) => {
          this.laboratorioIITrimestre = response.data;
          console.log(response);
          this.isReadOnlyLaboratorioII = true;
          this.id_laboratorioII = this.laboratorioIITrimestre.cod_doslaboratorio;
        },
        (error) => {
          console.error('Error al obtener el laboratorio del segundo trimestre:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo laboratorio del segundo trimestre.');
    }
  }

  guardarTercerLaboratorio(): void {
    if (this.id_laboratorioIII) {
      // Editar usuario existente
      this.laboratorioIIISemestreservice.updateLaboratorioIIISemestre(this.id_laboratorioIII, this.laboratorioIIITrimestre).subscribe({
        next: (response) => {
          console.log('Tercer laboratorio trimestre actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Tercer laboratorio trimestre editado con éxito',
            icon: 'success',
          }).then(() => {
            this.isReadOnlyLaboratorioIII = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Tercer laboratorio trimestre:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el Tercer laboratorio trimestre',
            icon: 'error',
          });
        }
      });
    } else {

      if (this.id !== null) {
        this.laboratorioIIITrimestre.id_usuario = this.id;
      }

      this.laboratorioIIITrimestre.num_proceso = this.num_proceso !== null ? this.num_proceso : 0; 


      console.log(this.laboratorioIIITrimestre);
      this.laboratorioIIISemestreservice.createLaboratorioTercerSemestre(this.laboratorioIIITrimestre).subscribe({
        next: (response) => {
          console.log('Laboratorio del tercer semestre creado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Laboratorio del tercer semestre  creado con éxito',
            icon: 'success',
          }).then(() => {
            this.id_laboratorioIII = response.data.cod_treslaboratorio ?? null;
            this.isReadOnlyLaboratorioIII = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al crear el Laboratorio del tercer semestre :', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear el Laboratorio del tercer semestre ',
            icon: 'error',
          });
        }
      });
    }
  }

  getTercerLaboratorio(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.laboratorioIIISemestreservice.getLaboratorioIIISemestrebyId(this.id,this.num_proceso ??0).subscribe(
        (response) => {
          this.laboratorioIIITrimestre = response.data;
          console.log(response);
          this.isReadOnlyLaboratorioIII = true;
          this.id_laboratorioIII = this.laboratorioIIITrimestre.cod_treslaboratorio ?? null;


        },
        (error) => {
          console.error('Error al obtener el laboratorio del tercer trimestre:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo laboratorio del tercer trimestre.');
    }
  }


  guardarIts(): void {
    if (this.id_its) {
      // Editar usuario existente
      this.itsService.updateIts(this.id_its, this.its).subscribe({
        next: (response) => {
          console.log('Its actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Its editado con éxito',
            icon: 'success',
          }).then(() => {
            this.isReadOnlyIts = true;
            this.isEditing = false;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el Its:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar las Its',
            icon: 'error',
          });
        }
      });
    } else {

      if (this.id !== null) {
        this.its.id_usuario = this.id;
      }

      this.its.num_proceso = this.num_proceso !== null ? this.num_proceso : 0; 


      console.log(this.its);
      this.itsService.createIts(this.its).subscribe({
        next: (response) => {
          console.log('Its creada:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Its agregada con éxito',
            icon: 'success',
          }).then(() => {
            this.id_its = response.data.cod_its ?? null;
            this.isReadOnlyIts = true;
            this.isEditing = false;
            console.log(response);
          });
        },
        error: (error) => {
          console.error('Error al crear la its :', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear la its ',
            icon: 'error',
          });
        }
      });
    }
  }

  getIts(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.itsService.getItsId(this.id,this.num_proceso ??0).subscribe(
        (response) => {
          this.its = response.data;
          console.log(response);
          this.id_its = this.its.cod_its ?? null;
          this.isReadOnlyIts = true;

        },
        (error) => {
          console.error('Error al obtener its:', error);
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo its.');
    }
  }

  volver() {
    this.router.navigate(['/ruta-gestante', this.id]); // Navegar a la ruta con el ID
  }
}
