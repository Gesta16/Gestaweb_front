import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../modelos/departamento.model'; 

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'http://127.0.0.1:8000/api/departamento'; 

  constructor(private http: HttpClient) { }

  
  getDepartamentos(): Observable<{ estado: string; departamento: Departamento[] }> {
    return this.http.get<{ estado: string; departamento: Departamento[] }>(this.apiUrl);
  }
}
