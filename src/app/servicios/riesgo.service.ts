import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Riesgo } from '../modelos/riesgo.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class RiesgoService {

  private apiUrl = environment.apiUrl +'riesgo'; 

  constructor(private http: HttpClient) { }

  
  getRiesgos(): Observable<{ estado: string; riesgo: Riesgo[] }> {
    return this.http.get<{ estado: string; riesgo: Riesgo[] }>(this.apiUrl);
  }

}
