import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaboratorioIIITrimestre } from '../modelos/laboratorio-iiisemestre.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioiiisemestreService {

  private apiUrl = 'http://127.0.0.1:8000/api/laboratorio-tercer-semestre'; 

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

  getLaboratorioIIISemestrebyId(id: number): Observable<{ estado: string; data: LaboratorioIIITrimestre }> {
    return this.http.get<{ estado: string; data: LaboratorioIIITrimestre }>(`${this.apiUrl}/${id}`);
  }
}
