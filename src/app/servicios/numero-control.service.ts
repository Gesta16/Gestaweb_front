import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NumeroControl } from '../modelos/numero-control.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class NumeroControlService {

  private apiUrl = environment.apiUrl +'numero-controles';

  constructor(private http: HttpClient) { }

  getNumerosControl(): Observable<{ estado: string; 'numero_controles': NumeroControl[] }> {
    return this.http.get<{ estado: string; 'numero_controles': NumeroControl[] }>(this.apiUrl);
  }  

}
