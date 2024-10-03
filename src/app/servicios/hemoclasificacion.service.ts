import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hemoclasificacion } from '../modelos/hemoclasificacion.model';

@Injectable({
  providedIn: 'root'
})
export class HemoclasificacionService {

  private apiUrl = 'http://127.0.0.1:8000/api/hemoclasificacion';

  constructor(private http: HttpClient) { }


  getHemoclasificaciones(): Observable<{ estado: string; Hemoclasificacion: Hemoclasificacion[] }> {
    return this.http.get<{ estado: string; Hemoclasificacion: Hemoclasificacion[] }>(this.apiUrl);
  }
}
