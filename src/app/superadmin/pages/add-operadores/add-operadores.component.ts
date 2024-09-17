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

@Component({
  selector: 'app-add-operadores',
  templateUrl: './add-operadores.component.html',
  styleUrls: ['./add-operadores.component.css']
})

export class AddOperadoresComponent implements OnInit {
  operador = {
    id_operador: '',
    id_admin: '',
    cod_ips: '',
    nom_operador: '',
    ape_operador: '',
    tel_operador: '',
    email_operador: '',
    esp_operador: '',
    documento_operador: '',
    cod_documento: '' 
  };

  listIps: Ips[] = [];
  listTipoDocumentos: TipoDocumento[] = [];
  listAdmin: Admin[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddOperadoresComponent>,
    private operadorService: OperadorService,
    private ipsService: IpsService, 
    private tipoDocumentoService: TipoDocumentoService,
    private adminService: AdminService 
  ) {}

  ngOnInit(): void {
    this.getIps(); 
    this.getTipoDocumentos(); 
    this.getAdmins();
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

  cerrar(): void {
    this.dialogRef.close();
  }
}
