import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ips } from '../modelos/ips.model'; 

@Injectable({
  providedIn: 'root'
})
export class IpsService {
  private apiUrl = 'http://127.0.0.1:8000/api/ips'; 

  constructor(private http: HttpClient) { }

  
  getIps(): Observable<{ estado: string; ips: Ips[] }> {
    return this.http.get<{ estado: string; ips: Ips[] }>(this.apiUrl);
  }

  
  createIps(ips: Ips): Observable<Ips> {
    const token = sessionStorage.getItem('token'); 
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Ips>(this.apiUrl, ips, { headers });
  }

  updateIps(ips: Ips): Observable<Ips> {
    const token = sessionStorage.getItem('token'); 
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post<Ips>(`${this.apiUrl}/${ips.cod_ips}`, ips, { headers });
  }
  
}
