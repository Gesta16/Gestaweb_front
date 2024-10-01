import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MortalidadPreparto } from '../modelos/mortalidad-preparto.model'; 

@Injectable({
  providedIn: 'root'
})
export class MortalidadPrepartoService {
  private apiUrl = 'http://127.0.0.1:8000/api/mortalidad-preparto'; 

  constructor(private http: HttpClient) { }

  getMortalidadPreparto(): Observable<{ estado: string; data: MortalidadPreparto[] }> {
    return this.http.get<{ estado: string; data: MortalidadPreparto[] }>(this.apiUrl);
  }

  crearMortalidadPreparto(mortalidadPreparto: MortalidadPreparto): Observable<any> {
    return this.http.post(this.apiUrl, mortalidadPreparto);
  }

}
