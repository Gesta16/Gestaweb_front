export class Operador {
    id_operador: number;
    id_admin: number;
    cod_ips: number;
    nom_operador: string;
    ape_operador: string;
    tel_operador: number;
    email_operador: number;
    esp_operador: string;
    cod_documento: number;
    documento_operador: number;

    constructor(
        id_operador: number,
        id_admin: number,
        cod_ips: number,
        nom_operador: string,
        ape_operador: string,
        tel_operador: number,
        email_operador: number,
        esp_operador: string,
        cod_documento: number,
        documento_operador: number,
    ){
        this.id_operador = id_operador;
        this.id_admin = id_admin;
        this.cod_ips = cod_ips;
        this.nom_operador = nom_operador;
        this.ape_operador = ape_operador;
        this.tel_operador = tel_operador;
        this.email_operador = email_operador;
        this.esp_operador = esp_operador;
        this.cod_documento = cod_documento;
        this.documento_operador = documento_operador;
    }
}

