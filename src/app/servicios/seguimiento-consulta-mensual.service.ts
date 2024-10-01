import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoConsultaMensual } from '../modelos/seguimiento-consulta-mensual.model'; 

@Injectable({
  providedIn: 'root'
})
export class SeguimientoConsultaMensualService {
  private apiUrl = 'http://127.0.0.1:8000/api/seguimiento-consulta-mensual'; 

  constructor(private http: HttpClient) { }

  getSeguimientosConsulta(): Observable<{ estado: string; data: SeguimientoConsultaMensual[] }> {
    return this.http.get<{ estado: string; data: SeguimientoConsultaMensual[] }>(this.apiUrl);
  }

  crearSeguimientoConsulta(seguimiento: SeguimientoConsultaMensual): Observable<any> {
    return this.http.post(this.apiUrl, seguimiento);
  }

}
