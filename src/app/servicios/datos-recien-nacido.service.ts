import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosRecienNacido } from '../modelos/datos-recien-nacido.model'; 

@Injectable({
  providedIn: 'root'
})
export class DatosRecienNacidoService {
  private apiUrl = 'http://127.0.0.1:8000/api/datos-recien-nacido'; 

  constructor(private http: HttpClient) { }

  getDatosRecienNacido(): Observable<{ estado: string; data: DatosRecienNacido[] }> {
    return this.http.get<{ estado: string; data: DatosRecienNacido[] }>(this.apiUrl);
  }

  crearDatosRecienNacido(datosRecienNacido: DatosRecienNacido): Observable<any> {
    return this.http.post(this.apiUrl, datosRecienNacido);
  }

}
