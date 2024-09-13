import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuperAdminService } from '../../../servicios/super-admin.service';
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service'; // Asegúrate de la ruta correcta
import { TipoDocumento } from '../../../modelos/tipo-documento.model'; // Asegúrate de la ruta correcta
import { AddSuperAdminComponent } from '../add-super-admin/add-super-admin.component';

@Component({
  selector: 'app-list-superadmin',
  templateUrl: './list-superadmin.component.html',
  styleUrls: ['./list-superadmin.component.css']
})
export class ListSuperadminComponent implements OnInit {
  superAdmins: any[] = [];
  tiposDocumento: TipoDocumento[] = []; // Lista para tipos de documento

  constructor(
    private superAdminService: SuperAdminService,
    private tipoDocumentoService: TipoDocumentoService, // Servicio para Tipo Documento
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSuperAdmins();
    this.loadTiposDocumento(); // Carga los tipos de documento
  }

  abrirModal(): void {
    const dialogRef = this._matDialog.open(AddSuperAdminComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si el diálogo se cerró con éxito, recargar la lista
        this.loadSuperAdmins();
      }
    });
  }

  private loadSuperAdmins(): void {
    this.superAdminService.getSuperAdmins().subscribe(
      (response: any) => {
        this.superAdmins = response.superAdmin;
      },
      (error: any) => {
        console.error('Error al obtener SuperAdmins:', error);
      }
    );
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

  getTipoDocumentoNombre(cod_documento: number): string {
    const tipo = this.tiposDocumento.find(td => td.cod_documento === cod_documento);
    return tipo ? tipo.nom_documento : 'Desconocido';
  }
}
