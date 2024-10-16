import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaboratorioIIITrimestre } from '../modelos/laboratorio-iiisemestre.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioiiisemestreService {

  private apiUrl = environment.apiUrl +'laboratorio-tercer-semestre'; 

  constructor(private http: HttpClient) { }

  getLaboratorioTercerSemestre(): Observable<{ estado: string; data: LaboratorioIIITrimestre[] }> {
    return this.http.get<{ estado: string; data: LaboratorioIIITrimestre[] }>(this.apiUrl);
  }
  

  createLaboratorioTercerSemestre(consulta: LaboratorioIIITrimestre): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(this.apiUrl, consulta, { headers });
  }

  getLaboratorioIIISemestrebyId(id: number,num_proceso:number): Observable<{ estado: string; data: LaboratorioIIITrimestre }> {
    return this.http.get<{ estado: string; data: LaboratorioIIITrimestre }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateLaboratorioIIISemestre(id:number ,laboratorio: LaboratorioIIITrimestre): Observable<any> {
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
