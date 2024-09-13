import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperadorService } from '../../../servicios/operador.service'; 
import { AddOperadoresComponent } from '../add-operadores/add-operadores.component';
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../modelos/tipo-documento.model';

@Component({
  selector: 'app-list-operadores',
  templateUrl: './list-operadores.component.html',
  styleUrls: ['./list-operadores.component.css'] 
})
export class ListOperadoresComponent implements OnInit {
  title = 'modal';
  isSmallScreen: boolean = false;
  operadores: any[] = []; 
  tiposDocumento: TipoDocumento[] = []; 

  constructor(
    private operadorService: OperadorService, 
    private tipoDocumentoService: TipoDocumentoService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.loadOperadores(); 
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
    const dialogRef = this._matDialog.open(AddOperadoresComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadOperadores(); 
      }
    });
  }

  private loadOperadores(): void {
    this.operadorService.getOperadores().subscribe(
      (response: any) => {
        this.operadores = response.operador; 
      },
      (error: any) => {
        console.error('Error al obtener Operadores:', error);
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
