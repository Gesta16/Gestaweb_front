import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../modelos/usuario.model';
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../modelos/tipo-documento.model';
import { DepartamentoService } from '../../../servicios/departamento.service';
import { Departamento } from '../../../modelos/departamento.model';
import { MunicipioService } from '../../../servicios/municipio.service';
import { Municipio } from '../../../modelos/municipio.model';
import { PoblacionDiferencialService } from '../../../servicios/poblacion-diferencial.service';
import { PoblacionDiferencial } from '../../../modelos/poblacion-diferencial.model'; 
import { IpsService } from '../../../servicios/ips.service';
import { Ips } from '../../../modelos/ips.model'; 

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent implements OnInit {
  usuario: Usuario | null = null;
  tiposDocumento: TipoDocumento[] = [];
  listDepartamentos: Departamento[] = [];
  listMunicipios: Municipio[] = [];
  listPoblacionDiferencial: PoblacionDiferencial[] = [];
  listIps: Ips[] = [];

  constructor(
    public _matDialogRef: MatDialogRef<VerUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario },
    private tipoDocumentoService: TipoDocumentoService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private poblacionDiferencialService: PoblacionDiferencialService,
    private ipsService: IpsService,
  ) {}

  ngOnInit(): void {
    this.usuario = { ...this.data.usuario }; 
    this.loadTiposDocumento();
    this.loadDepartamentos();
    this.loadMunicipios(this.usuario?.cod_departamento); 
    this.loadPoblacionDiferencial();
    this.loadIps();
  }

  private loadTiposDocumento(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe(
      response => {
        this.tiposDocumento = response.documento;
      },
      error => {
        console.error('Error al obtener Tipos de Documento:', error);
      }
    );
  }

  getTipoDocumentoNombre(cod_documento?: number): string {
    if (cod_documento === undefined) return 'Desconocido';
    const tipo = this.tiposDocumento.find(td => td.cod_documento === cod_documento);
    return tipo ? tipo.nom_documento : '';
  }

  private loadDepartamentos(): void {
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

  getDepartamento(cod_departamento?: number): string {
    if (cod_departamento === undefined) return 'Desconocido';
    const depart = this.listDepartamentos.find(dep => dep.cod_departamento === cod_departamento);
    return depart ? depart.nom_departamento : '';
  }

  private loadMunicipios(cod_departamento?: number): void {
    this.municipioService.getMunicipios(cod_departamento).subscribe(
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

  getMunicipio(cod_municipio?: number): string {
    if (cod_municipio === undefined) return 'Desconocido';
    const munic = this.listMunicipios.find(mun => mun.cod_municipio === cod_municipio);
    return munic ? munic.nom_municipio : '';
  }

  private loadPoblacionDiferencial(): void {
    this.poblacionDiferencialService.getPoblacionDiferencial().subscribe(
      (data: { estado: string; poblacion: PoblacionDiferencial[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.poblacion)) {
          this.listPoblacionDiferencial = data.poblacion;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Población Diferencial:', error);
      }
    );
  }  

  getPoblacionDiferencial(cod_poblacion?: number): string {
    if (cod_poblacion === undefined) return '';
    const poblacion = this.listPoblacionDiferencial.find(p => p.cod_poblacion === cod_poblacion);
    return poblacion ? poblacion.nom_poblacion : '';
  }

  private loadIps(): void {
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
  
  getIps(cod_ips?: number): string {
    if (cod_ips === undefined) return '';
    const ips = this.listIps.find(i => i.cod_ips === cod_ips);
    return ips ? ips.nom_ips : '';
  }  

  cerrar(): void {
    this._matDialogRef.close();
  }
}
