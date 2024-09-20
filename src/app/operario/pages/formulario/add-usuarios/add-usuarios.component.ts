import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { UsuarioService } from '../../../../servicios/usuario.service';
import { Usuario } from '../../../../modelos/usuario.model'; 
import Swal from 'sweetalert2';
import { DepartamentoService } from '../../../../servicios/departamento.service';
import { Departamento } from '../../../../modelos/departamento.model'; 
import { MunicipioService } from '../../../../servicios/municipio.service';
import { Municipio } from '../../../../modelos/municipio.model'; 
import { IpsService } from '../../../../servicios/ips.service';
import { Ips } from '../../../../modelos/ips.model'; 
import { TipoDocumentoService } from '../../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../../modelos/tipo-documento.model'; 
import { PoblacionDiferencialService } from '../../../../servicios/poblacion-diferencial.service';
import { PoblacionDiferencial } from '../../../../modelos/poblacion-diferencial.model'; 

@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.css']
})
export class AddUsuariosComponent {
  openTab = 1;
  usuario: Usuario = {
    id_usuario: 0,
    cod_ips: 0,
    nom_usuario: '',
    ape_usuario: '',
    email_usuario: '',
    tel_usuario: '',
    cel_usuario: '',
    dir_usuario: '',
    fec_nacimiento: '',
    edad_usuario: '',
    cod_documento: 0,
    documento_usuario: 0,
    fec_diag_usuario: '',
    fec_ingreso: '',
    cod_departamento: 0,
    cod_municipio: 0,
    cod_poblacion: 0,
  };

  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];
  listIps: Ips[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  listPoblacionDiferencial: PoblacionDiferencial[] = [];
  

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private ipsService: IpsService,
    private tipoDocumentoService: TipoDocumentoService,
    private poblacionDiferencialService: PoblacionDiferencialService,
  
  ) {}

  ngOnInit(): void {
    this.getDepartamentos();
    this.getMunicipios();
    this.getIps();
    this.getTipoDocumentos();
    this.getPoblacionDiferencial();
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.getMunicipios(departamentoId); // Llama al método para filtrar los municipios por departamento
  }

  toggleTabs(tabNumber: number) {
    this.openTab = tabNumber;
  }

  guardarUsuario() {
    this.usuarioService.createUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        Swal.fire({
          title: 'Éxito',
          text: 'Usuario creado con éxito',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/ruta-gestante']); 
        });
      },
      error: (error) => {
        console.error('Error al crear el usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al crear el usuario',
          icon: 'error',
        });
      }
    });
  }

  getDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe(
      (data: { estado: string; departamento: Departamento[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.departamento)) {
          this.listDepartamentos = data.departamento;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Departamentos:', error);
      }
    );
  }

  getMunicipios(departamentoId?: number): void {
    if (departamentoId) { 
      this.municipioService.getMunicipios(departamentoId).subscribe(
        (data: { estado: string; Municipios: Municipio[] }) => {
          if (data.estado === "Ok" && Array.isArray(data.Municipios)) {
            this.listMunicipios = data.Municipios;
          } else {
            console.error('Estructura de datos inesperada:', data);
          }
        },
        (error: any) => {
          console.error('Error al obtener los datos de Municipios:', error);
        }
      );
     }
  }

  getIps(): void {
    this.ipsService.getIps().subscribe(
      (data: { estado: string; ips: Ips[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.ips)) {
          this.listIps = data.ips;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de IPS:', error);
      }
    );
  }

  getTipoDocumentos(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe(
      (data: { estado: string; documento: TipoDocumento[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.documento)) {
          this.listTipoDocumentos = data.documento;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Tipo Documento:', error);
      }
    );
  }

  getPoblacionDiferencial(): void {
    this.poblacionDiferencialService.getPoblacionDiferencial().subscribe(
      (data: { estado: string; poblacion: PoblacionDiferencial[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.poblacion)) {
          this.listPoblacionDiferencial = data.poblacion;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Departamentos:', error);
      }
    );
  }
  
}
