import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrl: './list-admin.component.css'
})
export class ListAdminComponent {
  title = 'modal';
  isSmallScreen: boolean = false;

  constructor(private _matDialog: MatDialog) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = window.innerWidth < 1024;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.isSmallScreen = event.target.innerWidth < 1024;
    }
  }

  abrirModal(): void {
    this._matDialog.open(AddAdminComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }
}
