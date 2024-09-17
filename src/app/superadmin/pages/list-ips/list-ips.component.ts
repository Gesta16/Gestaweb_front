import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IpsService } from '../../../servicios/ips.service';
import { Ips } from '../../../modelos/ips.model';
import { AddIpsComponent } from '../add-ips/add-ips.component';
import { EditIpsComponent } from '../edit-ips/edit-ips.component';
import { DepartamentoService } from '../../../servicios/departamento.service';
import { Departamento } from '../../../modelos/departamento.model';

@Component({
  selector: 'app-list-ips',
  templateUrl: './list-ips.component.html',
  styleUrls: ['./list-ips.component.css']
})
export class ListIpsComponent implements OnInit {
  title = 'modal';
  isSmallScreen: boolean = false;
  ips: any[] = [];
  departamentos: Departamento[] = [];
  paginatedIps: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  constructor(
    private ipsService: IpsService,
    private departamentoService: DepartamentoService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkScreenSize();
    this.loadIps();
    this.loadDepartamentos();
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
    const dialogRef = this._matDialog.open(AddIpsComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIps();
      }
    });
  }

  abrirModalEdit(ips: Ips): void {
    const dialogRef = this._matDialog.open(EditIpsComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { ips: ips } // Pasar los datos del IPS seleccionado al modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadIps(); // Volver a cargar los IPS después de cerrar el modal
      }
    });
  }

  private loadIps(): void {
    this.ipsService.getIps().subscribe(
      (response: any) => {
        this.ips = response.ips;
        this.updatePagination();
      },
      (error: any) => {
        console.error('Error al obtener IPS:', error);
      }
    );
  }

  private loadDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe(
      response => {
        this.departamentos = response.departamento;
      },
      error => {
        console.error('Error al obtener Departamentos:', error);
      }
    );
  }

  getDepartamentoNombre(cod_departamento: number): string {
    const departamento = this.departamentos.find(dep => dep.cod_departamento === cod_departamento);
    return departamento ? departamento.nom_departamento : 'Desconocido';
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.ips.length / this.itemsPerPage);
    this.paginatedIps = this.ips.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
