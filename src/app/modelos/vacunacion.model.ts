export class Vacunacion {
    cod_vacunacion?: number;
    id_operador?: number;
    id_usuario: number;
    cod_biologico: number;
    fec_unocovid: Date | null;
    fec_doscovid: Date | null;
    fec_refuerzo: Date | null;
    fec_influenza: Date | null;
    fec_tetanico: Date | null;
    fec_dpt: Date | null;

    constructor(
        cod_vacunacion: number,
        id_operador: number,
        id_usuario: number,
        cod_biologico: number,
        fec_unocovid: Date | null,
        fec_doscovid: Date | null,
        fec_refuerzo: Date | null,
        fec_influenza: Date | null,
        fec_tetanico: Date | null,
        fec_dpt: Date | null
    ) {
        this.cod_vacunacion = cod_vacunacion;
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.cod_biologico = cod_biologico;
        this.fec_unocovid = fec_unocovid;
        this.fec_doscovid = fec_doscovid;
        this.fec_refuerzo = fec_refuerzo;
        this.fec_influenza = fec_influenza;
        this.fec_tetanico = fec_tetanico;
        this.fec_dpt = fec_dpt;
    }


}
