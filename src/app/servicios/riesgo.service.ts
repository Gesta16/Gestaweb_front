import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Riesgo } from '../modelos/riesgo.model';

@Injectable({
  providedIn: 'root'
})
export class RiesgoService {

  private apiUrl = 'http://127.0.0.1:8000/api/riesgo'; 

  constructor(private http: HttpClient) { }

  
  getRiesgos(): Observable<{ estado: string; riesgo: Riesgo[] }> {
    return this.http.get<{ estado: string; riesgo: Riesgo[] }>(this.apiUrl);
  }}
