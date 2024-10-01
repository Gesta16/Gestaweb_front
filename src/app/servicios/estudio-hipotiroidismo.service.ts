import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudioHipotiroidismo } from '../modelos/estudio-hipotiroidismo.model'; 

@Injectable({
  providedIn: 'root'
})
export class EstudioHipotiroidismoService {
  private apiUrl = 'http://127.0.0.1:8000/api/estudios-hipotiroidismo'; 

  constructor(private http: HttpClient) { }

  getEstudiosHipotiroidismo(): Observable<{ estado: string; data: EstudioHipotiroidismo[] }> {
    return this.http.get<{ estado: string; data: EstudioHipotiroidismo[] }>(this.apiUrl);
  }

  crearEstudioHipotiroidismo(estudio: EstudioHipotiroidismo): Observable<any> {
    return this.http.post(this.apiUrl, estudio);
  }

}
