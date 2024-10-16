import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudioHipotiroidismo } from '../modelos/estudio-hipotiroidismo.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class EstudioHipotiroidismoService {
  private apiUrl = environment.apiUrl +'estudios-hipotiroidismo'; 

  constructor(private http: HttpClient) { }

  getEstudiosHipotiroidismo(): Observable<{ estado: string; data: EstudioHipotiroidismo[] }> {
    return this.http.get<{ estado: string; data: EstudioHipotiroidismo[] }>(this.apiUrl);
  }

  crearEstudioHipotiroidismo(estudio: EstudioHipotiroidismo): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, estudio, {headers});
  }

  getEstudioHipotiroidismobyId(id: number,num_proceso:number): Observable<{ estado: string; data: EstudioHipotiroidismo }> {
    return this.http.get<{ estado: string; data: EstudioHipotiroidismo }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateEstudioHipotiroidismo(id: number, estudio: EstudioHipotiroidismo): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/${id}`, estudio, { headers });
  }

}
