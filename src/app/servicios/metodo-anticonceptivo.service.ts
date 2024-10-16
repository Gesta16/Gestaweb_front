import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetodoAnticonceptivo } from '../modelos/metodo-anticonceptivo.model'; // Ajusta la ruta si es necesario
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class MetodoAnticonceptivoService {
  private apiUrl = environment.apiUrl +'metodo-anticonceptivo'; // URL de tu API Laravel para Tipo de Documento

  constructor(private http: HttpClient) { }

  // Obtiene todos los tipos de documentos
  getMetodosAnticonceptivos(): Observable<{ estado: string; 'Metodo Anticonceptivo': MetodoAnticonceptivo[] }> {
    return this.http.get<{ estado: string; 'Metodo Anticonceptivo': MetodoAnticonceptivo[] }>(this.apiUrl);
  }
}

