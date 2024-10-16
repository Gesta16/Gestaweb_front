import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regimen } from '../modelos/regimen.model'; 
import { environment } from '../../environment/env';

@Injectable({
  providedIn: 'root'
})
export class RegimenService {
  private apiUrl = environment.apiUrl +'regimen'; 

  constructor(private http: HttpClient) { }

  
  getRegimenes(): Observable<{ estado: string; regimen: Regimen[] }> {
    return this.http.get<{ estado: string; regimen: Regimen[] }>(this.apiUrl);
  }
}
