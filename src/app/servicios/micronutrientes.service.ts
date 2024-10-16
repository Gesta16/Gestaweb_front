import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Micronutriente } from '../modelos/micronutrientes.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class MicronutrientesService {
  private apiUrl = environment.apiUrl +'micronutrientes'; 

  constructor(private http: HttpClient) { }

  getMicronutrientes(): Observable<{ estado: string; data: Micronutriente[] }> {
    return this.http.get<{ estado: string; data: Micronutriente[] }>(this.apiUrl);
  }

  crearMicronutriente(micronutriente: Micronutriente): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, micronutriente, {headers});
  }

  getMicronutrientebyId(id: number,num_proceso:number): Observable<{ estado: string; micronutriente: Micronutriente }> {
    return this.http.get<{ estado: string; micronutriente: Micronutriente }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateMicronutriente(id:number, data: Micronutriente): Observable<any> {
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
