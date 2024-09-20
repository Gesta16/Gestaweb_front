// menu.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuVisible = new BehaviorSubject<boolean>(true); // Estado inicial: menú visible
  menuVisible$ = this.menuVisible.asObservable();

  setMenuVisible(visible: boolean) {
    this.menuVisible.next(visible);
  }
}