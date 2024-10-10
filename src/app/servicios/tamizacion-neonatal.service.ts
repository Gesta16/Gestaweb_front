import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TamizacionNeonatal } from '../modelos/tamizacion-neonatal.model'; 

@Injectable({
  providedIn: 'root'
})
export class TamizacionNeonatalService {
  private apiUrl = 'http://127.0.0.1:8000/api/tamizaciones-neonatales'; 

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

  getTamizacionbyId(id: number): Observable<{ estado: string; data: TamizacionNeonatal }> {
    return this.http.get<{ estado: string; data: TamizacionNeonatal }>(`${this.apiUrl}/${id}`);
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
