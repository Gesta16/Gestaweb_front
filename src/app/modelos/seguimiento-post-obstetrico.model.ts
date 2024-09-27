export class SeguimientoPostObstetrico {
    cod_evento: number;
    cod_metodo: number;
    con_egreso: string;
    fec_fallecimiento: string;
    fec_planificacion: string;

    constructor(
        cod_evento: number,
        cod_metodo: number,
        con_egreso: string,
        fec_fallecimiento: string,
        fec_planificacion: string,
    ){
        this.cod_evento = cod_evento;
        this.cod_metodo = cod_metodo;
        this.con_egreso = con_egreso;
        this.fec_fallecimiento = fec_fallecimiento;
        this.fec_planificacion = fec_planificacion;
    }
}
