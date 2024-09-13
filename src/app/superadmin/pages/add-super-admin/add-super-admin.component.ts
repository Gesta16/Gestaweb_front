import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SuperAdminService } from '../../../servicios/super-admin.service'; 
import { SuperAdmin } from '../../../modelos/super-admin.model'; 
import { TipoDocumentoService } from '../../../servicios/tipo-documento.service';
import { TipoDocumento } from '../../../modelos/tipo-documento.model'; 

@Component({
  selector: 'app-add-super-admin',
  templateUrl: './add-super-admin.component.html',
  styleUrls: ['./add-super-admin.component.scss']
})
export class AddSuperAdminComponent {
  superAdmin = {
    nom_superadmin: '',
    ape_superadmin: '',
    email_superadmin: '',
    tel_superadmin: '',
    cod_documento: 0,
    documento_superadmin: ''
  };
  listTipoDocumentos: TipoDocumento[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddSuperAdminComponent>,
    private superAdminService: SuperAdminService,
    private tipoDocumentoService: TipoDocumentoService
  ) {}

  ngOnInit(): void {
    this.getTipoDocumentos();
  }

  onSubmit(): void {
    this.superAdminService.createSuperAdmin(this.superAdmin).subscribe(
      response => {
        // Cierra el diálogo y pasa un valor de confirmación
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error al crear SuperAdmin:', error);
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

  close(): void {
    this.dialogRef.close();
  }
}
