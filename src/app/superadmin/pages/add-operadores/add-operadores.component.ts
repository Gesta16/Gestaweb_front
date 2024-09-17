import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OperadorService } from '../../../servicios/operador.service';
import { Operador } from '../../../modelos/operador.model';
import { IpsService } from '../../../servicios/ips.service';
import { Ips } from '../../../modelos/ips.model'; 
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service'; 
import { TipoDocumento } from '../../../modelos/tipo-documento.model';
import { AdminService } from '../../../servicios/admin.service'; 
import { Admin } from '../../../modelos/admin.model';
import { DepartamentoService } from '../../../servicios/departamento.service';
import { Departamento } from '../../../modelos/departamento.model'; 
import { MunicipioService } from '../../../servicios/municipio.service';
import { Municipio } from '../../../modelos/municipio.model'; 

@Component({
  selector: 'app-add-operadores',
  templateUrl: './add-operadores.component.html',
  styleUrls: ['./add-operadores.component.css']
})

export class AddOperadoresComponent implements OnInit {
  operador: Operador = {
    id_operador: 0,
    id_admin: 0,
    cod_ips: 0,
    nom_operador: '',
    ape_operador: '',
    tel_operador: '',
    email_operador: '',
    esp_operador: '',
    documento_operador: '',
    cod_documento: 0,
    cod_departamento: 0,
    cod_municipio: 0,
  };

  listIps: Ips[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  listAdmin: Admin[] = [];
  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddOperadoresComponent>,
    private operadorService: OperadorService,
    private ipsService: IpsService, 
    private tipoDocumentoService: TipoDocumentoService,
    private adminService: AdminService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
  ) {}

  ngOnInit(): void {
    this.getIps(); 
    this.getTipoDocumentos(); 
    this.getAdmins();
    this.getDepartamentos();
    this.getMunicipios();
  }

  onSubmit(): void {
    this.operadorService.createOperador(this.operador).subscribe(
      response => {
        // Cierra el diálogo y pasa un valor de confirmación
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error al crear Operador:', error);
      }
    );
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.getMunicipios(departamentoId); 
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

  getAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (data: { estado: string; admin: Admin[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.admin)) {
          this.listAdmin = data.admin;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Tipo Documento:', error);
      }
    );
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

  cerrar(): void {
    this.dialogRef.close();
  }
}
