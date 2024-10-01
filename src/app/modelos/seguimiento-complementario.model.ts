export class SeguimientoComplementario {
    cod_segcomplementario: number;
    id_usuario:number;
    cod_sesiones: number;
    fec_nutricion: string; 
    fec_ginecologia: string; 
    fec_psicologia: string; 
    fec_odontologia: string; 
    ina_seguimiento: string;
    cau_inasistencia: string;

    constructor(
        cod_segcomplementario: number,
        id_usuario:number,
        cod_sesiones: number,
        fec_nutricion: string,
        fec_ginecologia: string,
        fec_psicologia: string,
        fec_odontologia: string,
        ina_seguimiento: string,
        cau_inasistencia: string
    ) {
        this.cod_segcomplementario = cod_segcomplementario;
        this.id_usuario = id_usuario
        this.cod_sesiones = cod_sesiones;
        this.fec_nutricion = fec_nutricion;
        this.fec_ginecologia = fec_ginecologia;
        this.fec_psicologia = fec_psicologia;
        this.fec_odontologia = fec_odontologia;
        this.ina_seguimiento = ina_seguimiento;
        this.cau_inasistencia = cau_inasistencia;
    }
}
