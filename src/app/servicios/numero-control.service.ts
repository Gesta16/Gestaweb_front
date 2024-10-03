import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NumeroControl } from '../modelos/numero-control.model'; 

@Injectable({
  providedIn: 'root'
})
export class NumeroControlService {

  private apiUrl = 'http://127.0.0.1:8000/api/numero-controles';

  constructor(private http: HttpClient) { }

  getNumerosControl(): Observable<{ estado: string; 'numero_controles': NumeroControl[] }> {
    return this.http.get<{ estado: string; 'numero_controles': NumeroControl[] }>(this.apiUrl);
  }  

}
