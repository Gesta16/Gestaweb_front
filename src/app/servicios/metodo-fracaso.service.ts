import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoFracaso } from '../modelos/metodo-fracaso.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class MetodoFracasoService {

  private apiUrl = environment.apiUrl +'metodo-fracaso'; 

  constructor(private http: HttpClient) { }

  
  getMetodos(): Observable<{ estado: string; metodo: MetodoFracaso[] }> {
    return this.http.get<{ estado: string; metodo: MetodoFracaso[] }>(this.apiUrl);
  }}
