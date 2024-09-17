import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Regimen } from '../modelos/regimen.model'; 

@Injectable({
  providedIn: 'root'
})
export class RegimenService {
  private apiUrl = 'http://127.0.0.1:8000/api/regimen'; 

  constructor(private http: HttpClient) { }

  
  getRegimenes(): Observable<{ estado: string; regimen: Regimen[] }> {
    return this.http.get<{ estado: string; regimen: Regimen[] }>(this.apiUrl);
  }
}
