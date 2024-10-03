export class SeguimientoPostObstetrico {
    cod_evento: number;
    id_usuario:number;
    cod_metodo: number;
    con_egreso: string;
    fec_fallecimiento: string;
    fec_planificacion: string;

    constructor(
        cod_evento: number,
        id_usuario:number,
        cod_metodo: number,
        con_egreso: string,
        fec_fallecimiento: string,
        fec_planificacion: string,
    ){
        this.cod_evento = cod_evento;
        this.id_usuario = id_usuario;
        this.cod_metodo = cod_metodo;
        this.con_egreso = con_egreso;
        this.fec_fallecimiento = fec_fallecimiento;
        this.fec_planificacion = fec_planificacion;
    }
}
