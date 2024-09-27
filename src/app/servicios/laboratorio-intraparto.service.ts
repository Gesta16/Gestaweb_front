import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaboratorioIntraparto } from '../modelos/laboratorio-intraparto.model'; 

@Injectable({
  providedIn: 'root'
})
export class LaboratorioIntrapartoService {
  private apiUrl = 'http://127.0.0.1:8000/api/laboratorio-intraparto'; 

  constructor(private http: HttpClient) { }

  
  getLaboratorios(): Observable<{ estado: string; data: LaboratorioIntraparto[] }> {
    return this.http.get<{ estado: string; data: LaboratorioIntraparto[] }>(this.apiUrl);
  }

  
  crearLaboratorio(laboratorio: LaboratorioIntraparto): Observable<any> {
    return this.http.post(this.apiUrl, laboratorio);
  }

}
