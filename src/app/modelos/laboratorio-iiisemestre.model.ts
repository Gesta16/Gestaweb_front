export class LaboratorioIIITrimestre {
    cod_treslaboratorio?: number;
    id_operador: number;
    id_usuario: number;
    hemograma: string;
    fec_hemograma: string;
    pru_vih: string;
    fec_vih: string;
    pru_sifilis: string;
    fec_sifilis: string;
    ig_toxoplasma: string;
    fec_toxoplasma: string;
    cul_rectal: string;
    fec_rectal: string;
    fec_biofisico: string;
    edad_gestacional: string;
    rie_biopsicosocial: string;

    constructor(
        cod_treslaboratorio: number,
        id_operador: number,
        id_usuario: number,
        hemograma: string,
        fec_hemograma: string,
        pru_vih: string,
        fec_vih: string,
        pru_sifilis: string,
        fec_sifilis: string,
        ig_toxoplasma: string,
        fec_toxoplasma: string,
        cul_rectal: string,
        fec_rectal: string,
        fec_biofisico: string,
        edad_gestacional: string,
        rie_biopsicosocial: string
    ) {
        this.cod_treslaboratorio = cod_treslaboratorio;
        this.id_operador = id_operador;
        this.id_usuario = id_usuario;
        this.hemograma = hemograma;
        this.fec_hemograma = fec_hemograma;
        this.pru_vih = pru_vih;
        this.fec_vih = fec_vih;
        this.pru_sifilis = pru_sifilis;
        this.fec_sifilis = fec_sifilis;
        this.ig_toxoplasma = ig_toxoplasma;
        this.fec_toxoplasma = fec_toxoplasma;
        this.cul_rectal = cul_rectal;
        this.fec_rectal = fec_rectal;
        this.fec_biofisico = fec_biofisico;
        this.edad_gestacional = edad_gestacional;
        this.rie_biopsicosocial = rie_biopsicosocial;
    }
}
