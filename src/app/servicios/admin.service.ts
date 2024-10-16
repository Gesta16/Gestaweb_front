import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../modelos/admin.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class AdminService {



  private apiUrl = environment.apiUrl +'admin'; 

  constructor(private http: HttpClient) { }

  getAdmins(): Observable<{ estado: string; admin: Admin[] }> {
    return this.http.get<{ estado: string; admin: Admin[] }>(this.apiUrl);
  }

  createAdmin(admin: any): Observable<any> {
    const token = sessionStorage.getItem('token'); 
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, admin, { headers });
  }

}
