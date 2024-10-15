import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuService } from '../../../servicios/menu.service';

@Component({
  selector: 'app-ruta-gestante',
  templateUrl: './ruta-gestante.component.html',
  styleUrl: './ruta-gestante.component.css'
})
export class RutaGestanteComponent {
  id: number | null = null;
  isExpanded = true;
  isVisible = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
    });
    this.menuService.isExpanded$.subscribe(isExpanded => {
      this.isExpanded = isExpanded;
    });
    this.menuService.menuVisible$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  irAControlPrenatal() {
    if (this.id !== null) {
      this.router.navigate(['/ruta-2', this.id]); // Navegar a la ruta con el ID
    }
  }

  irAnalisisPrevencion() {
    if (this.id !== null) {
      this.router.navigate(['/ruta-3', this.id]); // Navegar a la ruta con el ID
    };
  }

  irSaludIntegral(){
    if (this.id !== null) {
      this.router.navigate(['/ruta-4', this.id]); // Navegar a la ruta con el ID
    };
  }

  
  irPreparto(){
    if (this.id !== null) {
      this.router.navigate(['/ruta-5', this.id]); // Navegar a la ruta con el ID
    };
  }

  irPosparto(){
    if (this.id !== null) {
      this.router.navigate(['/ruta-6', this.id]); // Navegar a la ruta con el ID
    };
  }

  irUsuario(){
    if (this.id !== null) {
      this.router.navigate(['/add-usuarios', this.id]); // Navegar a la ruta con el ID
    };
  }

  volver() {
    this.router.navigate(['/list-usuarios']);
  }
}