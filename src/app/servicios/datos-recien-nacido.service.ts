import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosRecienNacido } from '../modelos/datos-recien-nacido.model'; 

@Injectable({
  providedIn: 'root'
})
export class DatosRecienNacidoService {
  private apiUrl = 'http://127.0.0.1:8000/api/datos-recien-nacido'; 

  constructor(private http: HttpClient) { }

  getDatosRecienNacido(): Observable<{ estado: string; data: DatosRecienNacido[] }> {
    return this.http.get<{ estado: string; data: DatosRecienNacido[] }>(this.apiUrl);
  }

  crearDatosRecienNacido(datosRecienNacido: DatosRecienNacido): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, datosRecienNacido, {headers});
  }

  getDatosRecienNacidobyId(id: number): Observable<{ estado: string; data: DatosRecienNacido }> {
    return this.http.get<{ estado: string; data: DatosRecienNacido }>(`${this.apiUrl}/${id}`);
  }

  updateDatosRecienNacido(id: number, datosRecienNacido: DatosRecienNacido): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/${id}`, datosRecienNacido, { headers });
  }

}
