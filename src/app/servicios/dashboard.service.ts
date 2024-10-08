import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define la estructura de los datos que esperas recibir
export interface Consulta {
  fecha: string;
  nombre_consulta: string;
}

export interface CalendarioResponse {
  estado: string;
  mensaje: string;
  data: Consulta[];
}

export interface ConteoData {
  ipsRegistradas: number;
  administradores: number;
  operadores: number;
  usuarios: number;
}


export interface ConteoResponse {
  total_ips: number;
  total_operadores: number;
  total_administradores: number;
  total_usuarios: number;
}


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) {}

  getCalendarioUsuario(): Observable<CalendarioResponse> {

    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<CalendarioResponse>(`${this.apiUrl}/calendario-usuario`, { headers });
  }

  getConteo(): Observable<ConteoResponse> {

    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    // Cambiar el tipo de retorno a <ConteoResponse>
    return this.http.get<ConteoResponse>(`${this.apiUrl}/conteo`, { headers });
  }
  

}