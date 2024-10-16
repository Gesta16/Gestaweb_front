import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../modelos/municipio.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private apiUrl = environment.apiUrl +'municipio'; 

  constructor(private http: HttpClient) { }

  
  getMunicipios(cod_departamento?: number): Observable<{ estado: string; Municipios: Municipio[] }> {
    if (cod_departamento) {
      return this.http.get<{ estado: string; Municipios: Municipio[] }>(`${this.apiUrl}/${cod_departamento}`);
    } else {
      return this.http.get<{ estado: string; Municipios: Municipio[] }>(this.apiUrl);
    }
  }

}
