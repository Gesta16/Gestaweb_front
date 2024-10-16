import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {
  private apiUrl = environment.apiUrl +'operador'; // URL de tu API Laravel para Operadores

  constructor(private http: HttpClient) { }

  getOperadores(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createOperador(operador: any): Observable<any> {
    const token = sessionStorage.getItem('token'); // Obtén el token del almacenamiento de sesión
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, operador, { headers });
  }
}
