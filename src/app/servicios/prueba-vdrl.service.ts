import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PruebaVDRL } from '../modelos/prueba-vdrl.model'; // Ajusta la ruta si es necesario
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class PruebaVDRLService {
  private apiUrl = environment.apiUrl +'prueba-no-treponemica-VDRL'; // URL de tu API Laravel para Tipo de Documento

  constructor(private http: HttpClient) { }

  // Obtiene todos los tipos de documentos
  getPruebaVDRL(): Observable<{ estado: string; 'Prueba No Treponemica VDRL': PruebaVDRL[] }> {
    return this.http.get<{ estado: string; 'Prueba No Treponemica VDRL': PruebaVDRL[] }>(this.apiUrl);
  }
}
