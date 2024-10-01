import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TerminacionGestacion } from '../modelos/terminacion-gestacion.model'; 

@Injectable({
  providedIn: 'root'
})
export class TerminacionGestacionService {
  private apiUrl = 'http://127.0.0.1:8000/api/terminacion-gestacion'; 

  constructor(private http: HttpClient) { }

  
  getTerminacionGestacion(): Observable<{ estado: string; 'Terminacion gestacion': TerminacionGestacion[] }> {
    return this.http.get<{ estado: string; 'Terminacion gestacion': TerminacionGestacion[] }>(this.apiUrl);
  }
}
