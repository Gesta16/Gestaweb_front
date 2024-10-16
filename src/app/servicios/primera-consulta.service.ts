import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimeraConsulta } from '../modelos/primera-consulta.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class PrimeraConsultaService {

  private apiUrl = environment.apiUrl +'primera-consulta'; 

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<{ estado: string; consultas: PrimeraConsulta[] }> {
    return this.http.get<{ estado: string; consultas: PrimeraConsulta[] }>(this.apiUrl);
  }
  

  createConsulta(consulta: PrimeraConsulta): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(this.apiUrl, consulta, { headers });
  }

  getPrimeraConsulta(id: number,num_proceso: number): Observable<{ estado: string; consulta: PrimeraConsulta }> {
    return this.http.get<{ estado: string; consulta: PrimeraConsulta }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updatePrimeraConsulta(id:number, consulta: PrimeraConsulta): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/${id}`, consulta, { headers });
  }

}
