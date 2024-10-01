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

@Component({
  selector: 'app-ruta-3',
  templateUrl: './ruta-3.component.html',
  styleUrl: './ruta-3.component.css'
})
export class Ruta3Component {
  openTab = 1;
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  hemoclasificaciones: Hemoclasificacion[] = [];
  antibiogramas: Antibiograma[] = [];
  id: number | null = null;
  Vdrl: PruebaVDRL[] = [];
  Rpr: PruebaRPR[] = [];

  laboratorioITrimestre: LaboratorioITrimestre = {
    cod_laboratorio: 0,
    id_operador: 0,
    id_usuario: 0,
    cod_hemoclasifi: 0,
    cod_antibiograma: 0,
    fec_hemoclasificacion: '',
    hem_laboratorio: '',
    fec_hemograma: '',
    gli_laboratorio: 0,
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
    eda_gestacional: 0,
    rie_biopsicosocial: ''
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
    eda_gestacional: 0,
    rie_biopsicosocial: ''
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
    edad_gestacional: 0,
    rie_biopsicosocial: ''
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
    rec_pareja: ''
  };



  constructor(private itsService:ItsService ,private vdrlService: PruebaVDRLService, private rprService: PruebaRprService, private laboratorioIIISemestreservice: LaboratorioiiisemestreService, private laboratorioIISemestreservice: LaboratorioiisemestreService, private laboratorioISemestreservice: LaboratorioisemestreService, private route: ActivatedRoute, private hemoclasificacionService: HemoclasificacionService, private antibiogramaService: AntibiogramaService) { }

  ngOnInit(): void {
    this.cargarHemoclasificacion();
    this.cargarAntibiograma();
    this.cargarRPR();
    this.cargarVDRL();

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });
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
    if (this.id !== null) {
      this.laboratorioITrimestre.id_usuario = this.id;
    }

    console.log(this.laboratorioITrimestre);
    this.laboratorioISemestreservice.createLaboratorioPrimerSemestre(this.laboratorioITrimestre).subscribe({
      next: (response) => {
        console.log('Laboratorio del primer semestre creado:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Laboratorio del primer semestre  creado con éxito',
          icon: 'success',
        }).then(() => {
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

  guardarSegundoLaboratorio(): void {
    if (this.id !== null) {
      this.laboratorioIITrimestre.id_usuario = this.id;
    }

    console.log(this.laboratorioIITrimestre);
    this.laboratorioIISemestreservice.createLaboratorioSegundoSemestre(this.laboratorioIITrimestre).subscribe({
      next: (response) => {
        console.log('Laboratorio del segundo semestre creado:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Laboratorio del segundo semestre  creado con éxito',
          icon: 'success',
        }).then(() => {
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

  guardarTercerLaboratorio(): void {
    if (this.id !== null) {
      this.laboratorioIIITrimestre.id_usuario = this.id;
    }

    console.log(this.laboratorioIIITrimestre);
    this.laboratorioIIISemestreservice.createLaboratorioTercerSemestre(this.laboratorioIIITrimestre).subscribe({
      next: (response) => {
        console.log('Laboratorio del tercer semestre creado:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Laboratorio del tercer semestre  creado con éxito',
          icon: 'success',
        }).then(() => {
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


  guardarIts(): void {
    if (this.id !== null) {
      this.its.id_usuario = this.id;
    }

    console.log(this.its);
    this.itsService.createIts(this.its).subscribe({
      next: (response) => {
        console.log('Its creada:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Its agregada con éxito',
          icon: 'success',
        }).then(() => {
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
