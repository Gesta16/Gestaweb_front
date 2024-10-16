import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Antibiograma } from '../modelos/antibiograma.model';
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class AntibiogramaService {

  private apiUrl = environment.apiUrl +'antibiograma';

  constructor(private http: HttpClient) { }


  getAntibiogramas(): Observable<{ estado: string; antibiograma: Antibiograma[] }> {
    return this.http.get<{ estado: string; antibiograma: Antibiograma[] }>(this.apiUrl);
  }}
