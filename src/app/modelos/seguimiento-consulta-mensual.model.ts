export class SeguimientoConsultaMensual {
    cod_seguimiento: number;
    id_usuario:number;
    cod_riesgo: number;
    cod_controles: number;
    cod_diagnostico: number;
    cod_medicion: number;
    fec_consulta: string;
    edad_gestacional: number;
    alt_uterina: number;
    trim_gestacional: number;
    peso: number;
    talla: number;
    imc: number;
    ten_arts: number;
    ten_artd: number;

    constructor(
        cod_seguimiento: number,
        id_usuario:number,
        cod_riesgo: number,
        cod_controles: number,
        cod_diagnostico: number,
        cod_medicion: number,
        fec_consulta: string,
        edad_gestacional: number,
        alt_uterina: number,
        trim_gestacional: number,
        peso: number,
        talla: number,
        imc: number,
        ten_arts: number,
        ten_artd: number
    ) {
        this.cod_seguimiento = cod_seguimiento;
        this.id_usuario = id_usuario;
        this.cod_riesgo = cod_riesgo;
        this.cod_controles = cod_controles;
        this.cod_diagnostico = cod_diagnostico;
        this.cod_medicion = cod_medicion;
        this.fec_consulta = fec_consulta;
        this.edad_gestacional = edad_gestacional;
        this.alt_uterina = alt_uterina;
        this.trim_gestacional = trim_gestacional;
        this.peso = peso;
        this.talla = talla;
        this.imc = imc;
        this.ten_arts = ten_arts;
        this.ten_artd = ten_artd;
    }
}
