import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoConsultaMensual } from '../modelos/seguimiento-consulta-mensual.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoConsultaMensualService {
  private apiUrl = environment.apiUrl +'seguimiento-consulta-mensual'; 

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

  getSeguimientoConsultabyId(id: number,num_proceso:number): Observable<{ estado: string; seguimiento: SeguimientoConsultaMensual }> {
    return this.http.get<{ estado: string; seguimiento: SeguimientoConsultaMensual }>(`${this.apiUrl}/${id}/${num_proceso}`);
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
