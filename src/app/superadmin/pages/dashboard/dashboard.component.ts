import { Component, OnInit, Renderer2 } from '@angular/core';
import { MenuService } from '../../../servicios/menu.service';
import { AuthService } from '../../../servicios/auth.service';
import { Consulta, ConteoData, ConteoResponse, DashboardService } from '../../../servicios/dashboard.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {
  isVisible: boolean = true;
  currentRolName: string | null = null;
  consultas: Consulta[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  totalIps: number = 0;
  totalAdministradores: number = 0;
  totalOperadores: number = 0;
  totalUsuarios: number = 0;
  conteoData: ConteoData = {
    ipsRegistradas: 0,
    administradores: 0,
    operadores: 0,
    usuarios: 0,
  };
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    locale: 'es',
    events: [],
    headerToolbar: {
      left: 'title', // Puedes dejar solo los botones de "prev" y "next"
      center: '',
      right: 'prev,next' // No agregues el botón "today"
    }


  };

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
    
      const userType = sessionStorage.getItem('currentRolName'); 
      if (userType == 'SuperAdministrador') { 
        this.currentRolName = '1'; 
      } else if (userType == 'Administrador')  {
        this.currentRolName = '2'; 
      } else if (userType == 'Operador'){
        this.currentRolName = '3'; 
      }else if (userType == 'Usuario'){
        this.currentRolName = '4'; 
      }
    }
    console.log(this.currentRolName)
    this.menuService.setMenuVisible(this.isVisible);
    this.cargarConsultas();
    this.cargarConteo();

  }


  cargarConsultas() {
    this.dashboardService.getCalendarioUsuario().subscribe(
      (response) => {
        if (response.estado === 'Ok') {
          this.consultas = response.data;
          this.calendarOptions.events = this.mapearConsultasAEventos(this.consultas); // Mapear las consultas a eventos
          console.log(this.calendarOptions.events);
        } else {
          this.errorMessage = response.mensaje;
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar las consultas:', error);
        this.errorMessage = 'Error al cargar las consultas';
        this.loading = false;
      }
    );
  }

  private mapearConsultasAEventos(consultas: Consulta[]): any[] {
    const colorConsultas: { [key: string]: { background: string, text: string } } = {
      "Control Prenatal": { background: "#A8E6CF", text: "#000000" },
      "Primera Consulta": { background: "#DCEDC1", text: "#000000" },
      "Laboratorios primer trimestre": { background: "#FFD3B6", text: "#000000" },
      "Laboratorios segundo trimestre": { background: "#FFAAA5", text: "#000000" },
      "Laboratorios tercer semestre": { background: "#D0E8FF", text: "#000000" },
      "Consulta Mensual": { background: "#E8DFFF", text: "#000000" },
      "Control Complementario": { background: "#A8E6CF", text: "#000000" },
      "Finalizacion Gestación": { background: "#FFD3B6", text: "#000000" }
    };

    return consultas.map(consulta => {
      const { background, text } = colorConsultas[consulta.nombre_consulta] || { background: "#D0E8FF", text: "#000000" };
      return {
        title: consulta.nombre_consulta,
        start: consulta.fecha,
        backgroundColor: background,
        textColor: text,
        eventContent: () => {
          return {
            html: `
              <div class="scrollable-container" style="background-color: ${background}; color: ${text};">
                <span class="scrollable-text">${consulta.nombre_consulta}</span>
              </div>
            `
          };
        }
      };
    });
  }

  cargarConteo() {
    this.dashboardService.getConteo().subscribe({
      next: (response: ConteoResponse) => {
        this.conteoData.ipsRegistradas = response.total_ips || 0;
        this.conteoData.administradores = response.total_administradores || 0;
        this.conteoData.operadores = response.total_operadores || 0;
        this.conteoData.usuarios = response.total_usuarios || 0;
        console.log(this.conteoData);
      },
      error: (error) => {
        console.error('Error al obtener los datos de conteo:', error);
      }
    });
  }


}