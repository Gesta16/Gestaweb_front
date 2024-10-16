import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoblacionDiferencial } from '../modelos/poblacion-diferencial.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class PoblacionDiferencialService {
  private apiUrl = environment.apiUrl +'poblacion-diferencial'; // URL de tu API Laravel

  constructor(private http: HttpClient) { }

  getPoblacionDiferencial(): Observable<{ estado: string; poblacion: PoblacionDiferencial[] }> {
    return this.http.get<{ estado: string; poblacion: PoblacionDiferencial[] }>(this.apiUrl);
  }
  
}