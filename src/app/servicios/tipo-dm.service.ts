import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDm } from '../modelos/tipo-dm.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDmService {

  private apiUrl = 'http://127.0.0.1:8000/api/tipo-dm'; 

  constructor(private http: HttpClient) { }

  
  getTipos(): Observable<{ estado: string; tipos: TipoDm[] }> {
    return this.http.get<{ estado: string; tipos: TipoDm[] }>(this.apiUrl);
  }
}
