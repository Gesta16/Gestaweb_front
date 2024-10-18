import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  generarReporte(data: {}): Observable<Blob> {
    return this.http.post(this.apiUrl + 'export-usuarios', data, {
      responseType: 'blob' 
    });
  }
}
