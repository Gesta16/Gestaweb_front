import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudioHipotiroidismo } from '../modelos/estudio-hipotiroidismo.model'; 

@Injectable({
  providedIn: 'root'
})
export class EstudioHipotiroidismoService {
  private apiUrl = 'http://127.0.0.1:8000/api/estudios-hipotiroidismo'; 

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

}
