import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ruta-gestante',
  templateUrl: './ruta-gestante.component.html',
  styleUrl: './ruta-gestante.component.css'
})
export class RutaGestanteComponent {
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Obtiene el ID como número
      console.log('ID de la gestante:', this.id);
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