import { Component } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../../modelos/login';
import { User } from '../../../modelos/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  reply: LoginResponse | null = null;
  token: string | null = null;
  isSubmitting = false;
  currentRolId: string | null = null;
  user: User | null = null;

  loginForm = this.fb.group({
    documento: '',
    password: '',
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.validateToken();
    }
  }
  validateToken(): void {
    if(typeof window !== "undefined"){
      if (!this.token) {
        this.token = sessionStorage.getItem("token");
        let identityJSON = sessionStorage.getItem('identity');
  
        if (identityJSON) {
          let identity = JSON.parse(identityJSON);
          this.user = identity;
          this.currentRolId = this.user?.rol_id?.toString() || '';
        }
      }
      if (!this.token) {
        this.router.navigate(['/login']);
      } else {
        if (this.currentRolId) {
          switch (this.currentRolId) {
            case '1':
              this.router.navigate(['dashboard']);
              break;
            case '2':
              this.router.navigate(['dashboard']);
              break;
            case '3':
              this.router.navigate(['dashboard']);
              break;
            case '4':
              this.router.navigate(['dashboard']);
              break;
            default:
              this.router.navigate(['home']);
              break;
          }
        } else {
          console.error('Id de rol no está definido.');
          this.router.navigate(['/home']);
        }
      }

    }
  }

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
        this.reply = data;

        if (this.reply) {
          sessionStorage.setItem('token', this.reply.access_token);
          sessionStorage.setItem('identity', JSON.stringify(this.reply.user));
          sessionStorage.setItem('currentRolName', this.getRoleName(this.reply.user.rol_id));
          this.token = this.reply.access_token;
          console.log(this.token);
          console.log('rol login', this.currentRolId);
          alert('Ingreso exitoso!');
          // Redirigir después de login exitoso
          this.router.navigate(['/landing']);
          location.reload();
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

  getRoleName(rol_id: number | undefined | null): string {
    switch (rol_id) {
      case 1:
        return 'SuperAdministrador';
      case 2:
        return 'Administrador';
      case 3:
        return 'Operador';
      default:
        return 'Usuario';
    }
  }

}
