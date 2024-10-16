import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Biologico } from '../modelos/biologico.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class BiologicoService {

  private apiUrl = environment.apiUrl +'biologico'; 

  constructor(private http: HttpClient) { }

  
  getBiologicos(): Observable<{ estado: string; biologico: Biologico[] }> {
    return this.http.get<{ estado: string; biologico: Biologico[] }>(this.apiUrl);
  }}
