import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoConsultaMensual } from '../modelos/seguimiento-consulta-mensual.model'; 

@Injectable({
  providedIn: 'root'
})
export class SeguimientoConsultaMensualService {
  private apiUrl = 'http://127.0.0.1:8000/api/seguimiento-consulta-mensual'; 

  constructor(private http: HttpClient) { }

  getSeguimientosConsulta(): Observable<{ estado: string; data: SeguimientoConsultaMensual[] }> {
    return this.http.get<{  estado: string; data: SeguimientoConsultaMensual[] }>(this.apiUrl);
  }

  crearSeguimientoConsulta(seguimiento: SeguimientoConsultaMensual): Observable<any> {

    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
 
    return this.http.post(this.apiUrl, seguimiento,{headers});
  }

  getSeguimientoConsultabyId(id: number): Observable<{ estado: string; seguimiento: SeguimientoConsultaMensual }> {
    return this.http.get<{ estado: string; seguimiento: SeguimientoConsultaMensual }>(`${this.apiUrl}/${id}`);
  }

  updateSeguimientoConsulta(id:number, data: SeguimientoConsultaMensual): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/${id}`, data, { headers });
  }

}
