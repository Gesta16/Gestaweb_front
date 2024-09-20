import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ModalDialogAlimentacionComponent } from './modal-dialog-alimentacion/modal-dialog-alimentacion.component';
import { ModalDialogEjercicioComponent } from './modal-dialog-ejercicio/modal-dialog-ejercicio.component';
import { ModalDialogCrecimientoBebeComponent } from './modal-dialog-crecimiento-bebe/modal-dialog-crecimiento-bebe.component';
import { MenuService } from '../../../servicios/menu.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'] // Corregido a styleUrls
})
export class LandingComponent implements OnInit {
  title = 'modal';
  isSmallScreen: boolean = false;

  constructor(
    private _matDialog: MatDialog,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef // Inyección de ChangeDetectorRef
  ) {    this.toggleSidebar();
  }

  ngOnInit() {
    this.checkScreenSize();
    this.cdr.detectChanges(); // Asegúrate de que los cambios se detecten
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
    this._matDialog.open(ModalDialogComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }

  abrirModalAlimentacion(): void {
    this._matDialog.open(ModalDialogAlimentacionComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }

  toggleSidebar() {
      this.menuService.setMenuVisible(false);
  }

  abrirModalEjercicio(): void {
    this._matDialog.open(ModalDialogEjercicioComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }

  abrirModalCrecimientoBebe(): void {
    this._matDialog.open(ModalDialogCrecimientoBebeComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });
  }
  
}
