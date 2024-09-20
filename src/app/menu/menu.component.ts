import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../modelos/user.model';
import { AuthService } from '../servicios/auth.service';
import { MenuService } from '../servicios/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isVisible = true;
  isExpanded = true;
  menuItems: any[] = [];
  isMobile: boolean = false;
  token: string | null = null;
  role: string | null = null;
  currentRolId: string | null = "";
  user: User | null = null;
  currentRolName: string | null = "";
  isAuthenticated: boolean = false;
  

  constructor(
    public authService: AuthService,
    private menuService: MenuService // Usamos el AuthService para manejar el estado del menú
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded; // Alterna el estado
    this.menuService.setMenuVisible(true); // Asegúrate de que el menú siga visible
}


ngOnInit() {
  this.checkIfMobile();
  this.validateToken(); // Verifica el token y ajusta la autenticación

  // Suscribirse a los cambios en la visibilidad del menú
  this.menuService.menuVisible$.subscribe(visible => {
      this.isVisible = visible; // Actualiza la visibilidad del menú
  });

  // Verificar el estado guardado de la expansión del menú
  if (typeof window !== 'undefined' && localStorage) {
      const savedState = localStorage.getItem('isMenuExpanded');
      if (savedState !== null) {
          this.authService.isMenuExpanded = savedState === 'true'; // Sincroniza con el estado guardado
      }
  }

  // Establecer la autenticación solo después de validar el token
  if (typeof window !== "undefined") {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.isVisible = this.isAuthenticated; // Hacer que el menú sea visible solo si está autenticado
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
