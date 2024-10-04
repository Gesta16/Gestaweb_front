import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaboratorioITrimestre } from '../modelos/laboratorio-isemestre.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioisemestreService {

  private apiUrl = 'http://127.0.0.1:8000/api/laboratorio-primer-semestre'; 

  constructor(private http: HttpClient) { }

  getLaboratorioPrimerSemestre(): Observable<{ estado: string; data: LaboratorioITrimestre[] }> {
    return this.http.get<{ estado: string; data: LaboratorioITrimestre[] }>(this.apiUrl);
  }
  

  createLaboratorioPrimerSemestre(laboratorio: LaboratorioITrimestre): Observable<any> {
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

  getLaboratorioISemestrebyId(id: number): Observable<{ estado: string; data: LaboratorioITrimestre }> {
    return this.http.get<{ estado: string; data: LaboratorioITrimestre }>(`${this.apiUrl}/${id}`);
  }

  updateLaboratorioISemestre(id:number ,laboratorio: LaboratorioITrimestre): Observable<any> {
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

