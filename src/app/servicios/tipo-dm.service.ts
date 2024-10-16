import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDm } from '../modelos/tipo-dm.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class TipoDmService {

  private apiUrl = environment.apiUrl +'tipo-dm'; 

  constructor(private http: HttpClient) { }

  
  getTipos(): Observable<{ estado: string; tipos: TipoDm[] }> {
    return this.http.get<{ estado: string; tipos: TipoDm[] }>(this.apiUrl);
  }
}
