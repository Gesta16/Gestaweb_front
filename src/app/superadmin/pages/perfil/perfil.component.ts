import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  isEditing: boolean = false;
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
