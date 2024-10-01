import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormaMedicion } from '../modelos/forma-medicion.model';

@Injectable({
  providedIn: 'root'
})
export class FormaMedicionService {
  private apiUrl = 'http://127.0.0.1:8000/api/forma-medicion-edad-gestacional'; 

  constructor(private http: HttpClient) { }

  getFormasMedicion(): Observable<{ estado: string; 'Forma_Medicion': FormaMedicion[] }> {
    return this.http.get<{ estado: string; 'Forma_Medicion': FormaMedicion[] }>(this.apiUrl);
  }
  
}
