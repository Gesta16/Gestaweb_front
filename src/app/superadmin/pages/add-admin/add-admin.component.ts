import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../servicios/admin.service'; 
import { Admin } from '../../../modelos/admin.model'; 
import { IpsService } from '../../../servicios/ips.service';
import { Ips } from '../../../modelos/ips.model'; 
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../modelos/tipo-documento.model'; 
import { DepartamentoService } from '../../../servicios/departamento.service';
import { Departamento } from '../../../modelos/departamento.model'; 
import { MunicipioService } from '../../../servicios/municipio.service';
import { Municipio } from '../../../modelos/municipio.model'; 

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  admin: Admin = {
    id_admin: 0,
    cod_ips: 0,
    nom_admin: '',
    ape_admin: '',
    email_admin: '',
    tel_admin: '',
    cod_documento: 0,
    documento_admin: '',
    cod_departamento: 0,
    cod_municipio: 0,
    
  };
  listIps: Ips[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];

  constructor(
    public _matDialogRef: MatDialogRef<AddAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService,
    private ipsService: IpsService,
    private tipoDocumentoService: TipoDocumentoService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
  ) {}

  ngOnInit(): void {
    this.getIps();
    this.getTipoDocumentos();
    this.getDepartamentos();
    this.getMunicipios();
  }

  onSubmit(): void {
    this.adminService.createAdmin(this.admin).subscribe(
      response => {
        this._matDialogRef.close(true);
      },
      error => {
        console.error('Error al crear Admin:', error);
      }
    );
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.getMunicipios(departamentoId); // Llama al método para filtrar los municipios por departamento
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
    this._matDialogRef.close();
  }
}
