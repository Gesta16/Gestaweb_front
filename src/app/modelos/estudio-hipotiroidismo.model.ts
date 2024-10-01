export class EstudioHipotiroidismo {
    cod_estudio: number;
    tsh: string;
    fec_resultado: string;
    t4_libre: string;
    fec_resultadot4: string;
    eve_confirmado: string;
    fec_primera: string;

    constructor(
        cod_estudio: number,
        tsh: string,
        fec_resultado: string,
        t4_libre: string,
        fec_resultadot4: string,
        eve_confirmado: string,
        fec_primera: string,
    ){
        this.cod_estudio = cod_estudio;
        this.tsh = tsh;
        this.fec_resultado = fec_resultado;
        this.t4_libre = t4_libre;
        this.fec_resultadot4 = fec_resultadot4;
        this.eve_confirmado = eve_confirmado;
        this.fec_primera = fec_primera;
    }
}


