import { Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../modelos/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + 'auth';


  login(request: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.url+"/login", request, { headers });
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getUser(): any {
    if (typeof window !== 'undefined') {
      const identityJSON = sessionStorage.getItem('identity');
      return identityJSON ? JSON.parse(identityJSON) : null;
    }
    return null;
  }
}
