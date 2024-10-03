import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../modelos/municipio.model'; 

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private apiUrl = 'http://127.0.0.1:8000/api/municipio'; 

  constructor(private http: HttpClient) { }

  
  getMunicipios(cod_departamento?: number): Observable<{ estado: string; Municipios: Municipio[] }> {
    if (cod_departamento) {
      return this.http.get<{ estado: string; Municipios: Municipio[] }>(`${this.apiUrl}/${cod_departamento}`);
    } else {
      return this.http.get<{ estado: string; Municipios: Municipio[] }>(this.apiUrl);
    }
  }

}
