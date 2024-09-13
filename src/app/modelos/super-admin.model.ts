export class SuperAdmin {
    nom_superadmin: string;
    ape_superadmin: string;
    email_superadmin: string;
    tel_superadmin: number;
    cod_documento: number;
    documento_superadmin: number;

    constructor(
        nom_superadmin: string,
        ape_superadmin: string,
        email_superadmin: string,
        tel_superadmin: number,
        cod_documento: number,
        documento_superadmin: number,
    ){
        this.nom_superadmin = nom_superadmin;
        this.ape_superadmin = ape_superadmin;
        this.email_superadmin = email_superadmin;
        this.tel_superadmin = tel_superadmin;
        this.cod_documento = cod_documento;
        this.documento_superadmin = documento_superadmin;
    }

}