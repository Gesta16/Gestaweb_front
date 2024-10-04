import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../modelos/tipo-documento.model'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  isEditing: boolean = false;
  user: any;
  tiposDocumento: TipoDocumento[] = [];

  constructor(
    private authService: AuthService,
    private tipoDocumentoService: TipoDocumentoService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadTiposDocumento();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
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
}
