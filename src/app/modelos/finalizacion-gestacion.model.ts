export class FinalizacionGestacion {
    cod_finalizacion: number;
    cod_terminacion: number;
    fec_evento: string;

    constructor(
        cod_finalizacion: number,
        cod_terminacion: number,
        fec_evento: string,
    ){
        this.cod_finalizacion = cod_finalizacion;
        this.cod_terminacion = cod_terminacion;
        this.fec_evento = fec_evento;
    }
}
