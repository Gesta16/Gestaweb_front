import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MortalidadPerinatal } from '../modelos/mortalidad-perinatal.model'; 

@Injectable({
  providedIn: 'root'
})
export class MortalidadPerinatalService {
  private apiUrl = 'http://127.0.0.1:8000/api/mortalidad-perinatal'; 

  constructor(private http: HttpClient) { }

  getMortalidadPerinatal(): Observable<{ estado: string; 'Mortalidad Perinatal': MortalidadPerinatal[] }> {
    return this.http.get<{ estado: string; 'Mortalidad Perinatal': MortalidadPerinatal[] }>(this.apiUrl);
  }

}
