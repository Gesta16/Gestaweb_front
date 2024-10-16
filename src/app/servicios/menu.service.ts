// menu.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private isExpandedSubject = new BehaviorSubject<boolean>(true); // Estado inicial de expansión
  isExpanded$ = this.isExpandedSubject.asObservable();

  private menuVisibleSubject = new BehaviorSubject<boolean>(true); // Estado inicial de visibilidad
  menuVisible$ = this.menuVisibleSubject.asObservable();

  // Método para cambiar solo el estado de expansión
  toggleExpansion() {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }

  // Método para cambiar solo la visibilidad del menú
  setMenuVisible(visible: boolean) {
    this.menuVisibleSubject.next(visible);
  }

  // Método para ajustar ambos estados, si es necesario
  setMenuState(isExpanded: boolean, isVisible: boolean) {
    this.isExpandedSubject.next(isExpanded);
    this.menuVisibleSubject.next(isVisible);
  }
}