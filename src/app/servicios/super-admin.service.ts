import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private apiUrl = 'http://127.0.0.1:8000/api/superadmin'; // URL de tu API Laravel

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
  
}