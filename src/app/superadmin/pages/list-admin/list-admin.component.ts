import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../servicios/admin.service'; 
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { TipoDocumento } from '../../../modelos/tipo-documento.model';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css'] 
})
export class ListAdminComponent implements OnInit {
  title = 'modal';
  isSmallScreen: boolean = false;
  admins: any[] = [];
  tiposDocumento: TipoDocumento[] = [];
  paginatedAdmins: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  constructor(
    private adminService: AdminService,
    private tipoDocumentoService: TipoDocumentoService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.loadAdmins();
    this.loadTiposDocumento();
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
        this.updatePagination();
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

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.admins.length / this.itemsPerPage);
    this.paginatedAdmins = this.admins.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
