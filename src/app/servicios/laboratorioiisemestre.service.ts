import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaboratorioIITrimestre } from '../modelos/laboratorio-iisemestre.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioiisemestreService {
  private apiUrl = 'http://127.0.0.1:8000/api/laboratorio-segundo-semestre'; 

  constructor(private http: HttpClient) { }

  getLaboratorioSegundoSemestre(): Observable<{ estado: string; data: LaboratorioIITrimestre[] }> {
    return this.http.get<{ estado: string; data: LaboratorioIITrimestre[] }>(this.apiUrl);
  }
  

  createLaboratorioSegundoSemestre(laboratorio: LaboratorioIITrimestre): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(this.apiUrl, laboratorio, { headers });
  }

  getLaboratorioIISemestrebyId(id: number): Observable<{ estado: string; data: LaboratorioIITrimestre }> {
    return this.http.get<{ estado: string; data: LaboratorioIITrimestre }>(`${this.apiUrl}/${id}`);
  }

  updateLaboratorioIISemestre(id:number ,laboratorio: LaboratorioIITrimestre): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/${id}`, laboratorio, { headers });
  }

}
