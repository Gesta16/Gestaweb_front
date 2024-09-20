import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { MenuService } from '../servicios/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router, private menuService: MenuService) {}
  
  logout() {
    this.authService.logout();
    this.menuService.setMenuVisible(false); // Oculta el menú
    this.router.navigate(['/login']);
  }
}
