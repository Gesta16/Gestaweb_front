import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MortalidadPreparto } from '../modelos/mortalidad-preparto.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class MortalidadPrepartoService {
  private apiUrl = environment.apiUrl +'mortalidad-preparto'; 

  constructor(private http: HttpClient) { }

  getMortalidadPreparto(): Observable<{ estado: string; data: MortalidadPreparto[] }> {
    return this.http.get<{ estado: string; data: MortalidadPreparto[] }>(this.apiUrl);
  }

  crearMortalidadPreparto(mortalidadPreparto: MortalidadPreparto): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, mortalidadPreparto, {headers});
  }

  getMortalidadPrepartobyId(id: number,num_proceso:number): Observable<{ estado: string; mortalidad: MortalidadPreparto }> {
    return this.http.get<{ estado: string; mortalidad: MortalidadPreparto }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateMortalidadPreparto(id: number, mortalidad: MortalidadPreparto): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/${id}`, mortalidad, { headers });
  }
}
