import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormaMedicion } from '../modelos/forma-medicion.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class FormaMedicionService {
  private apiUrl = environment.apiUrl +'forma-medicion-edad-gestacional'; 

  constructor(private http: HttpClient) { }

  getFormasMedicion(): Observable<{ estado: string; 'Forma_Medicion': FormaMedicion[] }> {
    return this.http.get<{ estado: string; 'Forma_Medicion': FormaMedicion[] }>(this.apiUrl);
  }
  
}
