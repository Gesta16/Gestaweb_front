import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimeraConsulta } from '../modelos/primera-consulta.model';

@Injectable({
  providedIn: 'root'
})
export class PrimeraConsultaService {

  private apiUrl = 'http://127.0.0.1:8000/api/primera-consulta'; 

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

  getPrimeraConsulta(id: number): Observable<{ estado: string; consulta: PrimeraConsulta }> {
    return this.http.get<{ estado: string; consulta: PrimeraConsulta }>(`${this.apiUrl}/${id}`);
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
