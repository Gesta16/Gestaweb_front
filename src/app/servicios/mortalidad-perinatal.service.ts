import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MortalidadPerinatal } from '../modelos/mortalidad-perinatal.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class MortalidadPerinatalService {
  private apiUrl = environment.apiUrl +'mortalidad-perinatal'; 

  constructor(private http: HttpClient) { }

  getMortalidadPerinatal(): Observable<{ estado: string; 'Mortalidad Perinatal': MortalidadPerinatal[] }> {
    return this.http.get<{ estado: string; 'Mortalidad Perinatal': MortalidadPerinatal[] }>(this.apiUrl);
  }

}
