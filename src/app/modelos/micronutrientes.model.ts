export class Micronutriente {
    cod_micronutriente: number;
    aci_folico: string; 
    sul_ferroso: string; 
    car_calcio: string; 
    desparasitacion: string; 

    constructor(
        cod_micronutriente: number,
        aci_folico: string,
        sul_ferroso: string,
        car_calcio: string,
        desparasitacion: string
    ) {
        this.cod_micronutriente = cod_micronutriente;
        this.aci_folico = aci_folico;
        this.sul_ferroso = sul_ferroso;
        this.car_calcio = car_calcio;
        this.desparasitacion = desparasitacion;
    }
}
