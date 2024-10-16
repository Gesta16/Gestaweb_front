import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl +'usuario'; 

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<{ estado: string; usuario: Usuario[] }> {
    return this.http.get<{ estado: string; usuario: Usuario[] }>(this.apiUrl);
  }

  createUsuario(usuario: Usuario): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(this.apiUrl, usuario, { headers });
  }


  crearProcesoGestativo(usuarioId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/nuevo-proceso/${usuarioId}`, {}, { headers });
  }

  contarProcesosGestativos(usuarioId: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}/contar-procesos/${usuarioId}`, { headers });
  }

  
  getUsuarioById(id: number): Observable<{ estado: string; usuario: Usuario }> {
    return this.http.get<{ estado: string; usuario: Usuario }>(`${this.apiUrl}/${id}`);
  }

  updateUsuario(id:number ,usuario: Usuario): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/${id}`, usuario, { headers });
  }
  
}