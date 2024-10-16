import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguimientoPostObstetrico } from '../modelos/seguimiento-post-obstetrico.model'; // Ajusta la ruta según tu estructura
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoPostObstetricoService {
  private apiUrl = environment.apiUrl +'seguimiento-post-obstetrico'; 

  constructor(private http: HttpClient) { }

  
  getSeguimientos(): Observable<{ estado: string; data: SeguimientoPostObstetrico[] }> {
    return this.http.get<{ estado: string; data: SeguimientoPostObstetrico[] }>(this.apiUrl);
  }

  
  crearSeguimiento(seguimiento: SeguimientoPostObstetrico): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, seguimiento, {headers});
  }

  getSeguimientobyId(id: number,num_proceso:number): Observable<{ estado: string; seguimiento: SeguimientoPostObstetrico }> {
    return this.http.get<{ estado: string; seguimiento: SeguimientoPostObstetrico }>(`${this.apiUrl}/${id}/${num_proceso}`);
  }

  updateSeguimientoPostObstetrico(id: number, seguimiento: SeguimientoPostObstetrico): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró el token de autenticación.');
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/${id}`, seguimiento, { headers });
  }


}
