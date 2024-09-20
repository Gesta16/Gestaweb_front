import { Component } from '@angular/core';
import { MenuService } from '../../../servicios/menu.service';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isVisible: boolean = true;

  constructor(
    private menuService: MenuService ,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.menuService.setMenuVisible(this.isVisible); 
  }
}
