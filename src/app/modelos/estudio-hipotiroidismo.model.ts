export class EstudioHipotiroidismo {
    cod_estudio: number;
    id_usuario:number;
    tsh: string;
    fec_resultado: string;
    t4_libre: string;
    fec_resultadot4: string;
    eve_confirmado: string;
    fec_primera: string;
    proceso_gestativo_id?: number;
    num_proceso: number;



    constructor(
        cod_estudio: number,
        id_usuario:number,
        tsh: string,
        fec_resultado: string,
        t4_libre: string,
        fec_resultadot4: string,
        eve_confirmado: string,
        fec_primera: string,
        num_proceso: number
    ){
        this.cod_estudio = cod_estudio;
        this.id_usuario = id_usuario;
        this.tsh = tsh;
        this.fec_resultado = fec_resultado;
        this.t4_libre = t4_libre;
        this.fec_resultadot4 = fec_resultadot4;
        this.eve_confirmado = eve_confirmado;
        this.fec_primera = fec_primera;
        this.num_proceso = num_proceso;
    }
}



