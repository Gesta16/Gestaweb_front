import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

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

export interface UsuarioIps {
  cod_ips: number;
  nom_ips: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getCalendarioUsuario(): Observable<CalendarioResponse> {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return throwError(new Error('No se encontró el token de autenticación.'));
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      return this.http.get<CalendarioResponse>(`${this.apiUrl}/calendario-usuario`, { headers })
        .pipe(
          catchError(err => {
            // Manejo de errores aquí
            return throwError(err);
          })
        );
    } else {
      // Manejo del caso cuando no estás en el navegador
      return throwError(new Error('No se puede acceder a sessionStorage en este entorno.'));
    }
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

    return this.http.get<ConteoResponse>(`${this.apiUrl}/conteo`, { headers });
  }

  getUsuariosIps(): Observable<UsuarioIps[]> {

    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<UsuarioIps[]>(`${this.apiUrl}/usuario-ips`, { headers });
  }


}