import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoComplementario } from '../modelos/seguimiento-complementario.model'; 

@Injectable({
  providedIn: 'root'
})
export class SeguimientoComplementarioService {
  private apiUrl = 'http://127.0.0.1:8000/api/seguimientos-complementarios'; 

  constructor(private http: HttpClient) { }

  getSeguimientosComplementario(): Observable<{ estado: string; data: SeguimientoComplementario[] }> {
    return this.http.get<{ estado: string; data: SeguimientoComplementario[] }>(this.apiUrl);
  }

  crearSeguimientoComplementario(seguimiento: SeguimientoComplementario): Observable<any> {
    return this.http.post(this.apiUrl, seguimiento);
  }

  
}
