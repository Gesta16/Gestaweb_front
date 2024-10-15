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
  currentRolId: string | null = "";
  user: User | null = null;
  isAuthenticated: boolean = false;
  logueado = false;

  allMenuItems = [
    { name: 'Panel de control', route: 'dashboard', icon: 'fa-solid fa-chart-pie', roles: ['superadmin', 'admin', 'operador', 'user'] },
    { name: 'Superadmin', route: 'list-superadmin', icon: 'fa-solid fa-user-tie', roles: ['superadmin'] },
    { name: 'Administradores', route: 'list-admin', icon: 'fa-solid fa-users', roles: ['superadmin', 'admin'] },
    { name: 'Operadores', route: 'list-operadores', icon: 'fa-solid fa-stethoscope', roles: ['superadmin', 'admin'] },
    { name: 'IPS', route: 'list-ips', icon: 'fa-solid fa-hospital', roles: ['superadmin', 'admin'] },
    { name: 'Usuarios', route: 'list-usuarios', icon: 'fa-solid fa-users', roles: ['superadmin', 'admin', 'operador'] },
    { name: 'Ruta seguimiento', route: 'ruta-seguimiento', icon: 'fa-solid fa-route', roles: ['user'] },
    { name: 'Reportes', route: 'reporte', icon: 'fa-solid fa-clipboard-check', roles: ['superadmin'] },
    { name: 'Perfil', route: 'perfil-superadmin', icon: 'fa-solid fa-user', roles: ['superadmin', 'admin', 'operador', 'user'] },
  ];

  constructor(
    public authService: AuthService,
    private menuService: MenuService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = this.checkIfMobile();
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.menuService.toggleExpansion();
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.menuService.setMenuVisible(this.isVisible);
  }

  ngOnInit() {
    this.checkIfMobile();
    this.validateToken();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.logueado = this.token !== null;
    
    this.menuItems = this.filterMenuItemsByRole(this.allMenuItems);
    this.menuService.isExpanded$.subscribe(visible => {
      this.isVisible = visible;
    });
  }

  validateToken(): void {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      this.token = sessionStorage.getItem("token");
  
      if (this.token) {
        const identityJSON = sessionStorage.getItem('identity');
        if (identityJSON) {
          this.user = JSON.parse(identityJSON);
          this.currentRolId = this.user?.rol_id?.toString() || '';
        }
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    } else {
      this.isAuthenticated = false; // O maneja la autenticación de otra forma
    }
  }
  
  filterMenuItemsByRole(menuItems: any[]) {
    switch (this.currentRolId) {
      case '1': // Superadmin
        return menuItems.filter(item => 
          item.route !== 'list-usuarios' && 
          item.route !== 'ruta-seguimiento'
        ); // Muestra todo menos Usuarios y Ruta seguimiento
      case '2': // Admin
        return menuItems.filter(item => 
          item.route === 'dashboard' || 
          item.route === 'list-admin' || 
          item.route === 'list-operadores' || 
          item.route === 'list-usuarios' || 
          item.route === 'perfil-superadmin'
        );
      case '3': // Operador
        return menuItems.filter(item => 
          item.route === 'dashboard' || 
          item.route === 'list-usuarios' || 
          item.route === 'perfil-superadmin'
        );
      case '4': // Usuario
        return menuItems.filter(item => 
          item.route === 'dashboard' || 
          item.route === 'ruta-seguimiento' || 
          item.route === 'perfil-superadmin'
        );
      default:
        return [];
    }
  }

  checkIfMobile(): boolean {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false; // Valor por defecto si no se puede acceder a window
  }
}
