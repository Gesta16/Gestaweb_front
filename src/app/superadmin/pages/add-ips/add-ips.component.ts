import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IpsService } from '../../../servicios/ips.service';
import { Ips } from '../../../modelos/ips.model'; 
import { DepartamentoService } from '../../../servicios/departamento.service';
import { Departamento } from '../../../modelos/departamento.model'; 
import { RegimenService } from '../../../servicios/regimen.service';
import { Regimen } from '../../../modelos/regimen.model'; 


@Component({
  selector: 'app-add-ips',
  templateUrl: './add-ips.component.html',
  styleUrls: ['./add-ips.component.scss']
})
export class AddIpsComponent {
  ips: Ips = {
    cod_ips: 0, 
    cod_regimen: 0, 
    cod_departamento: 0, 
    nom_ips: '',
    dir_ips: '',
    tel_ips: '', 
    email_ips: '',
    nit_ips: ''
  };

  // listIps: Ips[] = [];
  listDepartamentos: Departamento[] = [];
  listRegimenes: Regimen[] = [];

  constructor(
    public _matDialogRef: MatDialogRef<AddIpsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ipsService: IpsService,
    private departamentoService: DepartamentoService,
    private regimenService: RegimenService
  ) {}

  ngOnInit(): void {
    // this.getIps(); 
    this.getDepartamentos();
    this.getRegimenes();
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
        console.error('Error al obtener los datos de IPS:', error);
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
        console.error('Error al obtener los datos de IPS:', error);
      }
    );
  }

  onSubmit(): void {
    this.ipsService.createIps(this.ips).subscribe(
      response => {
       
        this._matDialogRef.close(true);
      },
      error => {
        console.error('Error al crear IPS:', error);
      }
    );
  }

  cerrar(): void {
    this._matDialogRef.close();
  }
}
