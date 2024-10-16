import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaboratorioITrimestre } from '../modelos/laboratorio-isemestre.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioisemestreService {

  private apiUrl = environment.apiUrl +'laboratorio-primer-semestre'; 

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

  getLaboratorioISemestrebyId(id: number,num_proceso:number): Observable<{ estado: string; data: LaboratorioITrimestre }> {
    return this.http.get<{ estado: string; data: LaboratorioITrimestre }>(`${this.apiUrl}/${id}/${num_proceso}`);
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

