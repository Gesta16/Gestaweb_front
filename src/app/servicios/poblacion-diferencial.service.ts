import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoblacionDiferencial } from '../modelos/poblacion-diferencial.model'; 

@Injectable({
  providedIn: 'root'
})
export class PoblacionDiferencialService {
  private apiUrl = 'http://127.0.0.1:8000/api/poblacion-diferencial'; // URL de tu API Laravel

  constructor(private http: HttpClient) { }

  getPoblacionDiferencial(): Observable<{ estado: string; poblacion: PoblacionDiferencial[] }> {
    return this.http.get<{ estado: string; poblacion: PoblacionDiferencial[] }>(this.apiUrl);
  }
  
}