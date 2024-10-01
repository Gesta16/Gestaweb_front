import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TamizacionNeonatal } from '../modelos/tamizacion-neonatal.model'; 

@Injectable({
  providedIn: 'root'
})
export class TamizacionNeonatalService {
  private apiUrl = 'http://127.0.0.1:8000/api/tamizaciones-neonatales'; 

  constructor(private http: HttpClient) { }

  getTamizaciones(): Observable<{ estado: string; data: TamizacionNeonatal[] }> {
    return this.http.get<{ estado: string; data: TamizacionNeonatal[] }>(this.apiUrl);
  }

  crearTamizacion(tamizacion: TamizacionNeonatal): Observable<any> {
    return this.http.post(this.apiUrl, tamizacion);
  }
}
