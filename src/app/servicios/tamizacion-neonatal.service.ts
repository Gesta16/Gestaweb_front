import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TamizacionNeonatal } from '../modelos/tamizacion-neonatal.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class TamizacionNeonatalService {
  private apiUrl = environment.apiUrl +'tamizaciones-neonatales'; 

  constructor(private http: HttpClient) { }

  getTamizaciones(): Observable<{ estado: string; data: TamizacionNeonatal[] }> {
    return this.http.get<{ estado: string; data: TamizacionNeonatal[] }>(this.apiUrl);
  }

  crearTamizacion(tamizacion: TamizacionNeonatal): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, tamizacion, {headers});
  }

  getTamizacionbyId(id: number,num_proceso: number): Observable<{ estado: string; data: TamizacionNeonatal }> {
    return this.http.get<{ estado: string; data: TamizacionNeonatal }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateTamizacion(id: number, tamizacion: TamizacionNeonatal): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/${id}`, tamizacion, { headers });
  }
  
}
