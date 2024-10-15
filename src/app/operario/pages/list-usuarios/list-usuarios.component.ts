import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../../../servicios/usuario.service'; 
import { Usuario } from '../../../modelos/usuario.model'; 
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../modelos/tipo-documento.model';
import { Router } from '@angular/router';
import { VerUsuarioComponent } from '../ver-usuario/ver-usuario.component';

import { MenuService } from '../../../servicios/menu.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {
  selectedUserId: number | null = null;
  title = 'Gestión de Usuarios';
  isSmallScreen: boolean = false;
  usuarios: Usuario[] = [];
  tiposDocumento: TipoDocumento[] = [];
  paginatedUsuarios: Usuario[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 1;

  isExpanded = true;
  isVisible = true;

  constructor(
    private usuarioService: UsuarioService,
    private tipoDocumentoService: TipoDocumentoService,
    private router:Router,
    private _matDialog: MatDialog,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.loadUsuarios();
    this.loadTiposDocumento();
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
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

  // abrirModal(): void {
  //   const dialogRef = this._matDialog.open(AddAdminComponent, {
  //     enterAnimationDuration: '0ms',
  //     exitAnimationDuration: '0ms'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadUsuarios();
  //     }
  //   });
  // }
  abrirModalVer(usuario: Usuario): void {
    const dialogRef = this._matDialog.open(VerUsuarioComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { usuario: usuario } // Pasar los datos del usuario seleccionado al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios(); // Opcional, puedes volver a cargar los usuarios si necesitas
      }
    });
  }

  verUsuario(id: number): void {
    this.selectedUserId = id;
    console.log('ID del usuario seleccionado:', this.selectedUserId);
    
    this.router.navigate(['/ruta-gestante', this.selectedUserId]);
  }

  private loadUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      (response: any) => {
        this.usuarios = response.usuarios; 
        this.updatePagination();
      },
      (error: any) => {
        console.error('Error al obtener Usuarios:', error);
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
    this.totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
    this.paginatedUsuarios = this.usuarios.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
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
