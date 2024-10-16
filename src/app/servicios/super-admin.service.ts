import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private apiUrl = environment.apiUrl +'superadmin'; // URL de tu API Laravel

  constructor(private http: HttpClient) { }

  getSuperAdmins(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSuperAdmin(superAdmin: any): Observable<any> {
    const token = sessionStorage.getItem('token'); // Obtén el token del almacenamiento de sesión
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, superAdmin, { headers });
  }

  updateSuperAdmin(superAdmin: any, id: number): Observable<any> {
    const token = sessionStorage.getItem('token'); // Obtén el token del almacenamiento de sesión
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/${id}`, superAdmin, { headers });
  }
  
}