import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  isReadOnly = false;
  isReadOnlyEdad = true;
  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];
  listIps: Ips[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  listPoblacionDiferencial: PoblacionDiferencial[] = [];
  id: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private ipsService: IpsService,
    private tipoDocumentoService: TipoDocumentoService,
    private poblacionDiferencialService: PoblacionDiferencialService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
  
      if (this.id > 0) { 
        this.getUsuario();
      } else {
        console.log('No se proporcionó un ID válido.');
      }
    });
    this.getDepartamentos();
    this.getIps();
    this.getTipoDocumentos();
    this.getPoblacionDiferencial();
  }
  
  getUsuario(): void {
    if (this.id !== null && this.id > 0) { // Verificar que el ID sea válido
      this.usuarioService.getUsuarioById(this.id).subscribe(
        (response) => {
          this.usuario = response.usuario;
          this.isReadOnly = true;
          console.log(response);
          this.getMunicipios(this.usuario.cod_departamento); 
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo encontrar el usuario. Verifica el ID.',
            icon: 'error',
          });
        }
      );
    } else {
      console.log('No se proporcionó ID, se asume que se va a crear un nuevo usuario.');
    }
  }

  toggleEdit() {
    this.isReadOnly = false;
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.usuario.cod_departamento = departamentoId; // Actualizar el departamento en el IPS
    this.getMunicipios(departamentoId); // Actualizar la lista de municipios
  }

  toggleTabs(tabNumber: number) {
    this.openTab = tabNumber;
  }

  guardarUsuario() {
    // Verificar si estamos editando un usuario existente (si tiene un 'id')
    if (this.id) {
      // Editar usuario existente
      this.usuarioService.updateUsuario(this.id, this.usuario).subscribe({
        next: (response) => {
          console.log('Usuario actualizado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Usuario actualizado con éxito',
            icon: 'success',
          }).then(() => {
            this.isReadOnly = true;
          });
        },
        error: (error) => {
          console.error('Error al actualizar el usuario:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al actualizar el usuario',
            icon: 'error',
          });
        }
      });
    } else {
      // Crear nuevo usuario
      this.usuarioService.createUsuario(this.usuario).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          Swal.fire({
            title: 'Éxito',
            text: 'Usuario creado con éxito',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/list-usuarios']);
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
  }
  

  calcularEdad(): void {
    if (this.usuario.fec_nacimiento) {
      const hoy = new Date();
      const fechaNacimiento = new Date(this.usuario.fec_nacimiento);
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      this.usuario.edad_usuario = edad.toString();
    } else {
      this.usuario.edad_usuario = '';
    }
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

  volver() {
    if (this.id == null || this.id == 0) {
      this.router.navigate(['/list-usuarios']);
    } else {
      this.router.navigate(['/ruta-gestante', this.id]);
    }
  }

}
