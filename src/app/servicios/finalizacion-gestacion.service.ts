import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinalizacionGestacion } from '../modelos/finalizacion-gestacion.model'; // Ajusta la ruta si es necesario
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class FinalizacionGestacionService {
  private apiUrl = environment.apiUrl +'finalizacion-gestacion'; // URL de tu API Laravel para Tipo de Documento

  constructor(private http: HttpClient) { }

  // Obtiene todos los tipos de documentos
  getFinalizacionGestacion(): Observable<{ estado: string; 'Finalizacion Gestacion': FinalizacionGestacion[] }> {
    return this.http.get<{ estado: string; 'Finalizacion Gestacion': FinalizacionGestacion[] }>(this.apiUrl);
  }

  crearFinalizacionGestacion(finalizacion: FinalizacionGestacion): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, finalizacion, {headers});
  }

  getFinalizacionGestacionbyId(id: number,num_proceso:number): Observable<{ estado: string; finalizacion: FinalizacionGestacion }> {
    return this.http.get<{ estado: string; finalizacion: FinalizacionGestacion }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateFinalizacionGestacion(id: number, finalizacion: FinalizacionGestacion): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/${id}`, finalizacion, { headers });
  }
}

