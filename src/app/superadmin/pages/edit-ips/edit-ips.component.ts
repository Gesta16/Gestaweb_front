import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IpsService } from '../../../servicios/ips.service';
import { Ips } from '../../../modelos/ips.model';
import { DepartamentoService } from '../../../servicios/departamento.service';
import { Departamento } from '../../../modelos/departamento.model';
import { RegimenService } from '../../../servicios/regimen.service';
import { Regimen } from '../../../modelos/regimen.model';
import { MunicipioService } from '../../../servicios/municipio.service';
import { Municipio } from '../../../modelos/municipio.model';

@Component({
  selector: 'app-edit-ips',
  templateUrl: './edit-ips.component.html',
  styleUrls: ['./edit-ips.component.css']
})
export class EditIpsComponent implements OnInit {
  ips: Ips = {
    cod_ips: 0,
    cod_regimen: 0,
    cod_departamento: 0,
    nom_ips: '',
    dir_ips: '',
    tel_ips: '',
    email_ips: '',
    nit_ips: '',
    cod_municipio: 0,
  };

  listDepartamentos: Departamento[] = [];
  listRegimenes: Regimen[] = [];
  listMunicipios: Municipio[] = [];

  constructor(
    public _matDialogRef: MatDialogRef<EditIpsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ips: Ips },
    private ipsService: IpsService,
    private departamentoService: DepartamentoService,
    private regimenService: RegimenService,
    private municipioService: MunicipioService
  ) {}

  ngOnInit(): void {
    this.ips = { ...this.data.ips }; // Cargar los datos del IPS a editar
    this.getDepartamentos();
    this.getRegimenes();
    this.getMunicipios(this.ips.cod_departamento); // Cargar municipios del departamento actual
  }

  onDepartamentoChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departamentoId = +target.value;
    this.ips.cod_departamento = departamentoId; // Actualizar el departamento en el IPS
    this.getMunicipios(departamentoId); // Actualizar la lista de municipios
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

  getRegimenes(): void {
    this.regimenService.getRegimenes().subscribe(
      (data: { estado: string; regimen: Regimen[] }) => {
        if (data.estado === "Ok" && Array.isArray(data.regimen)) {
          this.listRegimenes = data.regimen;
        } else {
          console.error('Estructura de datos inesperada:', data);
        }
      },
      (error: any) => {
        console.error('Error al obtener los datos de Regímenes:', error);
      }
    );
  }

  onSubmit(): void {
    console.log('Datos a enviar:', this.ips); 
    this.ipsService.updateIps(this.ips).subscribe(
      response => {
        this._matDialogRef.close(true);
      },
      error => {
        console.error('Error al actualizar IPS:', error);
      }
    );
  }

  cerrar(): void {
    this._matDialogRef.close();
  }
}
