import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.model'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://127.0.0.1:8000/api/usuario'; // URL de tu API Laravel

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
  
  
}