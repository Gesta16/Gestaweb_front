import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Micronutriente } from '../modelos/micronutrientes.model'; 

@Injectable({
  providedIn: 'root'
})
export class MicronutrientesService {
  private apiUrl = 'http://127.0.0.1:8000/api/micronutrientes'; 

  constructor(private http: HttpClient) { }

  getMicronutrientes(): Observable<{ estado: string; data: Micronutriente[] }> {
    return this.http.get<{ estado: string; data: Micronutriente[] }>(this.apiUrl);
  }

  crearMicronutriente(micronutriente: Micronutriente): Observable<any> {
    return this.http.post(this.apiUrl, micronutriente);
  }

}
