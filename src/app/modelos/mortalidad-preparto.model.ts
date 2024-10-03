export class MortalidadPreparto {
    cod_mortalpreparto: number;
    id_usuario:number;
    cod_mortalidad: number;
    fec_defuncion: string;
    
    constructor(
        cod_mortalpreparto: number,
        id_usuario:number,
        cod_mortalidad: number,
        fec_defuncion: string,
    ){
        this.cod_mortalpreparto = cod_mortalpreparto;
        this.id_usuario = id_usuario;
        this.cod_mortalidad = cod_mortalidad;
        this.fec_defuncion = fec_defuncion;
    }
}
