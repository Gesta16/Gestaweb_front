export class Its {
    cod_its: number;
    id_operador: number;
    id_usuario: number;
    cod_vdrl: number;
    cod_rpr: number;
    eli_vih: string;
    fec_vih: Date;
    fec_vdrl: Date;
    fec_rpr: Date;
    rec_tratamiento: string;
    rec_pareja: string;

    constructor(
        cod_its: number,
        id_operador: number,
        id_usuario: number,
        cod_vdrl: number,
        cod_rpr: number,
        eli_vih: string,
        fec_vih: Date,
        fec_vdrl: Date,
        fec_rpr: Date,
        rec_tratamiento: string,
        rec_pareja: string
    ) {
        this.cod_its = cod_its;
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.cod_vdrl = cod_vdrl;
        this.cod_rpr = cod_rpr;
        this.eli_vih = eli_vih;
        this.fec_vih = fec_vih;
        this.fec_vdrl = fec_vdrl;
        this.fec_rpr = fec_rpr;
        this.rec_tratamiento = rec_tratamiento;
        this.rec_pareja = rec_pareja;
    }
}