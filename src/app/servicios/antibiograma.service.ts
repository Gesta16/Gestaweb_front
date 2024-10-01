import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Antibiograma } from '../modelos/antibiograma.model';

@Injectable({
  providedIn: 'root'
})
export class AntibiogramaService {

  private apiUrl = 'http://127.0.0.1:8000/api/antibiograma';

  constructor(private http: HttpClient) { }


  getAntibiogramas(): Observable<{ estado: string; antibiograma: Antibiograma[] }> {
    return this.http.get<{ estado: string; antibiograma: Antibiograma[] }>(this.apiUrl);
  }}
