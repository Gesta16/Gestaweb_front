import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoPostObstetrico } from '../modelos/seguimiento-post-obstetrico.model'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root'
})
export class SeguimientoPostObstetricoService {
  private apiUrl = 'http://127.0.0.1:8000/api/seguimiento-post-obstetrico'; 

  constructor(private http: HttpClient) { }

  
  getSeguimientos(): Observable<{ estado: string; data: SeguimientoPostObstetrico[] }> {
    return this.http.get<{ estado: string; data: SeguimientoPostObstetrico[] }>(this.apiUrl);
  }

  
  crearSeguimiento(seguimiento: SeguimientoPostObstetrico): Observable<any> {
    return this.http.post(this.apiUrl, seguimiento);
  }

}
