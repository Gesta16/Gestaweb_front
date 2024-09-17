import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../modelos/tipo-documento.model'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private apiUrl = 'http://127.0.0.1:8000/api/documento'; // URL de tu API Laravel para Tipo de Documento

  constructor(private http: HttpClient) { }

  // Obtiene todos los tipos de documentos
  getTipoDocumentos(): Observable<{ estado: string; documento: TipoDocumento[] }> {
    return this.http.get<{ estado: string; documento: TipoDocumento[] }>(this.apiUrl);
  }
}
