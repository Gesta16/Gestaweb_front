import { Component } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../../modelos/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  reply: LoginResponse | null = null;
  token: string | null = null;
  isSubmitting = false;
  loginForm = this.fb.group({
    documento: '',
    password: '',
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  login() {
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;

    const documento = this.loginForm.get('documento')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    if (!documento) {
      alert("El campo de usuario es requerido");
      this.isSubmitting = false;
      return;
    }
    if (!password) {
      alert("El campo de contraseña es requerido");
      this.isSubmitting = false;
      return;
    }

    const loginRequest = new LoginRequest(documento, password);

    this.authService.login(loginRequest).subscribe(
      (data: any) => {
        if (data && data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('identity', JSON.stringify(data.user));
          this.token = data.access_token;
          console.log(this.token);
          alert('Ingreso exitoso!');
          // Redirigir después de login exitoso
          this.router.navigate(['inicio/landing']);
        } else {
          alert('Documento o contraseña incorrecta');
        }
        this.isSubmitting = false;
      },
      error => {
        console.error('Login failed', error);
        alert('Documento o contraseña incorrecta');
        this.isSubmitting = false;
      }
    );
  }

}
