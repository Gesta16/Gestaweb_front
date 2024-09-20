import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../modelos/user.model';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isExpanded = false;
  menuItems: any[] = [];
  isMobile: boolean = false;
  token: string | null = null;
  role: string | null = null;
  currentRolId: string | null = "";
  user: User | null = null;
  currentRolName: string | null = "";
  isAuthenticated: boolean = false;
  

  constructor(
    public authService: AuthService  // Usamos el AuthService para manejar el estado del menú
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('isMenuExpanded', this.isExpanded.toString());
    }
    this.authService.toggleMenu();  // Alterna el estado del menú desde AuthService
  }

  ngOnInit() {
    this.checkIfMobile();
    this.validateToken();

    if (typeof window !== 'undefined' && localStorage) {
      const savedState = localStorage.getItem('isMenuExpanded');
      if (savedState !== null) {
        this.authService.isMenuExpanded = savedState === 'true';  // Sincroniza con el estado guardado
      }
    }

    if (typeof window !== "undefined") {
      this.isAuthenticated = this.authService.isAuthenticated();
    }
  }

  validateToken(): void {
    if (typeof window !== "undefined") {
      this.token = sessionStorage.getItem("token");

      if (this.token) {
        const identityJSON = sessionStorage.getItem('identity');
        if (identityJSON) {
          this.user = JSON.parse(identityJSON);
          this.currentRolName = sessionStorage.getItem('currentRolName');
          this.currentRolId = this.user?.rol_id?.toString() || '';
          console.log(this.user);
          console.log(this.currentRolName);
        }
      }
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  checkIfMobile(): boolean {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  }
}
