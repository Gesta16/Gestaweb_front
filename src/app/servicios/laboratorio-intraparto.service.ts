import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaboratorioIntraparto } from '../modelos/laboratorio-intraparto.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioIntrapartoService {
  private apiUrl = environment.apiUrl +'laboratorio-intraparto'; 

  constructor(private http: HttpClient) { }

  
  getLaboratorios(): Observable<{ estado: string; data: LaboratorioIntraparto[] }> {
    return this.http.get<{ estado: string; data: LaboratorioIntraparto[] }>(this.apiUrl);
  }

  
  crearLaboratorio(laboratorio: LaboratorioIntraparto): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, laboratorio, {headers});
  }

  getLaboratoriobyId(id: number,num_proceso:number): Observable<{ estado: string; data: LaboratorioIntraparto }> {
    return this.http.get<{ estado: string; data: LaboratorioIntraparto }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateLaboratorioIntraparto(id: number, laboratorio: LaboratorioIntraparto): Observable<any> {
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
