import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlPrenatal } from '../modelos/control-prenatal.model';

@Injectable({
  providedIn: 'root'
})
export class ControlPrenatalService {

  private apiUrl = 'http://127.0.0.1:8000/api/control-prenatal'; 

  constructor(private http: HttpClient) { }

  getControles(): Observable<{ estado: string; controles: ControlPrenatal[] }> {
    return this.http.get<{ estado: string; controles: ControlPrenatal[] }>(this.apiUrl);
  }
  

  createControl(control: ControlPrenatal): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(this.apiUrl, control, { headers });
  }
}  
