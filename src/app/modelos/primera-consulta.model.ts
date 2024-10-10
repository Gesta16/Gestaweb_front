export class PrimeraConsulta {
    cod_consulta?: number;
    id_operador?: number;
    id_usuario?: number;
    cod_riesgo: number;
    cod_dm: number;
    peso_previo: string;
    tal_consulta: string;
    imc_consulta: string;
    diag_nutricional: string;
    hta: string;
    dm: string;
    fact_riesgo: string;
    expo_violencia: boolean;
    ries_depresion: boolean;
    for_gestacion: string;
    for_parto: string;
    for_cesarea: string;
    for_aborto: string;
    fec_lactancia: Date;
    fec_consejeria: Date;

    constructor(
        id_operador: number,
        id_usuario: number,
        cod_riesgo: number,
        cod_dm: number,
        peso_previo: string,
        tal_consulta: string,
        imc_consulta: string,
        diag_nutricional: string,
        hta: string,
        dm: string,
        fact_riesgo: string,
        expo_violencia: boolean,
        ries_depresion: boolean,
        for_gestacion: string,
        for_parto: string,
        for_cesarea: string,
        for_aborto: string,
        fec_lactancia: Date,
        fec_consejeria: Date
    ) {
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.cod_riesgo = cod_riesgo;
        this.cod_dm = cod_dm;
        this.peso_previo = peso_previo;
        this.tal_consulta = tal_consulta;
        this.imc_consulta = imc_consulta;
        this.diag_nutricional = diag_nutricional;
        this.hta = hta;
        this.dm = dm;
        this.fact_riesgo = fact_riesgo;
        this.expo_violencia = expo_violencia;
        this.ries_depresion = ries_depresion;
        this.for_gestacion = for_gestacion;
        this.for_parto = for_parto;
        this.for_cesarea = for_cesarea;
        this.for_aborto = for_aborto;
        this.fec_lactancia = fec_lactancia;
        this.fec_consejeria = fec_consejeria;
    }
}
