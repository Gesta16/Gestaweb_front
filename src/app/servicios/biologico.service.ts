import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Biologico } from '../modelos/biologico.model';

@Injectable({
  providedIn: 'root'
})
export class BiologicoService {

  private apiUrl = 'http://127.0.0.1:8000/api/biologico'; 

  constructor(private http: HttpClient) { }

  
  getBiologicos(): Observable<{ estado: string; biologico: Biologico[] }> {
    return this.http.get<{ estado: string; biologico: Biologico[] }>(this.apiUrl);
  }}
