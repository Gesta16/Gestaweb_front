import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NumSesionesCurso } from '../modelos/num-sesiones-curso.model'; 

@Injectable({
  providedIn: 'root'
})
export class NumSesionesCursoService {

  private apiUrl = 'http://127.0.0.1:8000/api/sesiones-curso-paternidad-maternidad';

  constructor(private http: HttpClient) { }

  getNumSesionesCurso(): Observable<{ estado: string; 'Sesiones Curso Paternidad Maternidad': NumSesionesCurso[] }> {
    return this.http.get<{ estado: string; 'Sesiones Curso Paternidad Maternidad': NumSesionesCurso[] }>(this.apiUrl);
  }

}
