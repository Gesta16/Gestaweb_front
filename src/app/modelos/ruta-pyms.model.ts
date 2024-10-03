export class RutaPYMS {
    cod_ruta: number;
    id_usuario:number;
    fec_bcg: string;
    fec_hepatitis: string;
    fec_seguimiento: string;
    fec_entrega: string;

    constructor(
        cod_ruta: number,
        id_usuario:number,
        fec_bcg: string,
        fec_hepatitis: string,
        fec_seguimiento: string,
        fec_entrega: string,
    ){
        this.cod_ruta = cod_ruta;
        this.id_usuario = id_usuario;
        this.fec_bcg = fec_bcg;
        this.fec_hepatitis = fec_hepatitis;
        this.fec_seguimiento = fec_seguimiento;
        this.fec_entrega = fec_entrega;
    }
}

