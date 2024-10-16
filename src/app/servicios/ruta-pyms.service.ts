import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutaPYMS } from '../modelos/ruta-pyms.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class RutaPYMSService {
  private apiUrl = environment.apiUrl +'rutas-pyms'; 

  constructor(private http: HttpClient) { }

  getRutas(): Observable<{ estado: string; data: RutaPYMS[] }> {
    return this.http.get<{ estado: string; data: RutaPYMS[] }>(this.apiUrl);
  }

  crearRuta(ruta: RutaPYMS): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, ruta, {headers});
  }

  getRutaPymsId(id: number,num_proceso:number): Observable<{ estado: string; data: RutaPYMS }> {
    return this.http.get<{ estado: string; data: RutaPYMS }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateRuta(id: number, ruta: RutaPYMS): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/${id}`, ruta, { headers });
  }
  

}
