import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacunacion } from '../modelos/vacunacion.model';

@Injectable({
  providedIn: 'root'
})
export class VacunacionService {

  private apiUrl = 'http://127.0.0.1:8000/api/vacunacion';

  constructor(private http: HttpClient) { }

  getVacunaciones(): Observable<{ estado: string; vacunaciones: Vacunacion[] }> {
    return this.http.get<{ estado: string; vacunaciones: Vacunacion[] }>(this.apiUrl);
  }


  createVacunacion(vacunacion: Vacunacion): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, vacunacion, { headers });
  }

  getVacunacionById(id: number): Observable<{ estado: string; vacunacion: Vacunacion }> {
    return this.http.get<{ estado: string; vacunacion: Vacunacion }>(`${this.apiUrl}/${id}`);
  }

  updateVacunacion(id:number ,vacunacion: Vacunacion): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/${id}`, vacunacion, { headers });
  }
}
