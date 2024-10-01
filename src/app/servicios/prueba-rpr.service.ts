import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PruebaRPR } from '../modelos/prueba-rpr.model';

@Injectable({
  providedIn: 'root'
})
export class PruebaRprService {

  private apiUrl = 'http://127.0.0.1:8000/api/prueba-no-treponemica-RPR'; // URL de tu API Laravel para Tipo de Documento

  constructor(private http: HttpClient) { }

  // Obtiene todos los tipos de documentos
  getPruebaRPR(): Observable<{ estado: string; 'Prueba no Treponemica RPR': PruebaRPR[] }> {
    return this.http.get<{ estado: string; 'Prueba no Treponemica RPR': PruebaRPR[] }>(this.apiUrl);
  }}