import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TerminacionGestacion } from '../modelos/terminacion-gestacion.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class TerminacionGestacionService {
  private apiUrl = environment.apiUrl +'terminacion-gestacion'; 

  constructor(private http: HttpClient) { }

  
  getTerminacionGestacion(): Observable<{ estado: string; 'Terminacion gestacion': TerminacionGestacion[] }> {
    return this.http.get<{ estado: string; 'Terminacion gestacion': TerminacionGestacion[] }>(this.apiUrl);
  }
}
