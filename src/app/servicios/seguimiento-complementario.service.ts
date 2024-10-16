import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoComplementario } from '../modelos/seguimiento-complementario.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoComplementarioService {
  private apiUrl = environment.apiUrl +'seguimientos-complementarios'; 

  constructor(private http: HttpClient) { }

  getSeguimientosComplementario(): Observable<{ estado: string; data: SeguimientoComplementario[] }> {
    return this.http.get<{ estado: string; data: SeguimientoComplementario[] }>(this.apiUrl);
  }

  crearSeguimientoComplementario(seguimiento: SeguimientoComplementario): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, seguimiento, {headers});
  }

  getSeguimientoComplementariobyId(id: number,num_proceso:number): Observable<{ estado: string; seguimiento: SeguimientoComplementario }> {
    return this.http.get<{ estado: string; seguimiento: SeguimientoComplementario }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateSeguimientoComplementario(id:number, data: SeguimientoComplementario): Observable<any> {
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
