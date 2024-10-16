export class LaboratorioIntraparto {
    cod_intraparto: number;
    id_usuario:number;
    cod_vdrl: number;
    pru_sifilis: string;
    fec_sifilis: string;
    fec_vdrl: string;
    rec_sifilis: string;
    fec_tratamiento: string;
    pru_vih: string;
    fec_vih: string;
    num_proceso: number;


    constructor(
        cod_intraparto: number,
        id_usuario:number,
        cod_vdrl: number,
        pru_sifilis: string,
        fec_sifilis: string,
        fec_vdrl: string,
        rec_sifilis: string,
        fec_tratamiento: string,
        pru_vih: string,
        fec_vih: string,
        num_proceso: number
    ){
        this.cod_intraparto = cod_intraparto;
        this.id_usuario = id_usuario;
        this.cod_vdrl = cod_vdrl;
        this.pru_sifilis = pru_sifilis;
        this.fec_sifilis = fec_sifilis;
        this.fec_vdrl = fec_vdrl;
        this.rec_sifilis = rec_sifilis;
        this.fec_tratamiento = fec_tratamiento;
        this.pru_vih = pru_vih;
        this.fec_vih = fec_vih;
        this.num_proceso = num_proceso;
    }
}
