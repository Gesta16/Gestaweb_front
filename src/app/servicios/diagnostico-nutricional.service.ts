import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiagnosticoNutricional } from '../modelos/diagnostico-nutricional.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoNutricionalService {

  private apiUrl = environment.apiUrl +'diagnostico-nutricional-mes'; 

  constructor(private http: HttpClient) { }

  getDiagnosticosNutricionales(): Observable<{ estado: string; 'diagnostico': DiagnosticoNutricional[] }> {
    return this.http.get<{ estado: string; 'diagnostico': DiagnosticoNutricional[] }>(this.apiUrl);
  }

}
