import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Its } from '../modelos/its.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class ItsService {

  private apiUrl = environment.apiUrl +'its'; 

  constructor(private http: HttpClient) { }

  getIts(): Observable<{ estado: string; data: Its[] }> {
    return this.http.get<{ estado: string; data: Its[] }>(this.apiUrl);
  }

  createIts(its: Its): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, its, { headers });
  }

  getItsId(id: number,num_proceso:number): Observable<{ estado: string; data: Its }> {
    return this.http.get<{ estado: string; data: Its }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateIts(id:number, its: Its): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/${id}`, its, { headers });
  }

 }
