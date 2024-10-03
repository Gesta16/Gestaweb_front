import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutaPYMS } from '../modelos/ruta-pyms.model'; 

@Injectable({
  providedIn: 'root'
})
export class RutaPYMSService {
  private apiUrl = 'http://127.0.0.1:8000/api/rutas-pyms'; 

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

}
