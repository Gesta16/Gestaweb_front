import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../servicios/admin.service'; 
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service'; // Asegúrate de la ruta correcta
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { TipoDocumento } from '../../../modelos/tipo-documento.model'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css'] 
})
export class ListAdminComponent implements OnInit {
  title = 'modal';
  isSmallScreen: boolean = false;
  admins: any[] = []; 
  tiposDocumento: TipoDocumento[] = []; // Lista para tipos de documento

  constructor(
    private adminService: AdminService, // Servicio para Admins
    private tipoDocumentoService: TipoDocumentoService, // Servicio para Tipo Documento
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.loadAdmins(); 
    this.loadTiposDocumento(); // Carga los tipos de documento
  }

  private checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = window.innerWidth < 1024;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = event.target.innerWidth < 1024;
    }
  }

  abrirModal(): void {
    const dialogRef = this._matDialog.open(AddAdminComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAdmins(); 
      }
    });
  }

  private loadAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (response: any) => {
        this.admins = response.admin; 
      },
      (error: any) => {
        console.error('Error al obtener Admins:', error);
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
