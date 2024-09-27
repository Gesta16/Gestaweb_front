import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TerminacionGestacion } from '../modelos/terminacion-gestacion.model'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class TerminacionGestacionService {
  private apiUrl = 'http://127.0.0.1:8000/api/terminacion-gestacion'; // URL de tu API Laravel para Tipo de Documento

  constructor(private http: HttpClient) { }

  // Obtiene todos los tipos de documentos
  getTerminacionGestacion(): Observable<{ estado: string; 'Terminacion gestacion': TerminacionGestacion[] }> {
    return this.http.get<{ estado: string; 'Terminacion gestacion': TerminacionGestacion[] }>(this.apiUrl);
  }
}
