import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NumSesionesCurso } from '../modelos/num-sesiones-curso.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class NumSesionesCursoService {

  private apiUrl = environment.apiUrl +'sesiones-curso-paternidad-maternidad';

  constructor(private http: HttpClient) { }

  getNumSesionesCurso(): Observable<{ estado: string; 'Sesiones_Curso': NumSesionesCurso[] }> {
    return this.http.get<{ estado: string; 'Sesiones_Curso': NumSesionesCurso[] }>(this.apiUrl);
  }

}
