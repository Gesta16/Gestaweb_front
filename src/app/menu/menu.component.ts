import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isExpanded = false;
  menuItems: any[] = [];
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
    this.checkIfMobile();
  }

  checkIfMobile(): boolean {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  }
}