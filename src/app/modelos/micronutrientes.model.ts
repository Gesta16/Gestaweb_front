export class Micronutriente {
    cod_micronutriente: number;
    id_usuario:number;
    aci_folico: string; 
    sul_ferroso: string; 
    car_calcio: string; 
    desparasitacion: string;
    num_proceso: number;
 

    constructor(
        cod_micronutriente: number,
        id_usuario: number,
        aci_folico: string,
        sul_ferroso: string,
        car_calcio: string,
        desparasitacion: string,
        num_proceso: number

    ) {
        this.cod_micronutriente = cod_micronutriente;
        this.id_usuario = id_usuario;
        this.aci_folico = aci_folico;
        this.sul_ferroso = sul_ferroso;
        this.car_calcio = car_calcio;
        this.desparasitacion = desparasitacion;
        this.num_proceso = num_proceso;
    }
}
