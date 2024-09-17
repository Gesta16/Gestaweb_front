export class Ips {
    cod_ips: number; // bigint en Laravel
    cod_regimen: number; // int en Laravel
    cod_departamento: number; // int en Laravel
    nom_ips: string; // varchar en Laravel
    dir_ips?: string; // varchar (opcional) en Laravel
    tel_ips?: string; // int (opcional) en Laravel
    email_ips?: string; // varchar (opcional) en Laravel
    nit_ips?: string; // varchar (opcional) en Laravel
  
    constructor(
      cod_ips: number,
      cod_regimen: number,
      cod_departamento: number,
      nom_ips: string,
      dir_ips?: string,
      tel_ips?: string,
      email_ips?: string,
      nit_ips?: string
    ) {
      this.cod_ips = cod_ips;
      this.cod_regimen = cod_regimen;
      this.cod_departamento = cod_departamento;
      this.nom_ips = nom_ips;
      this.dir_ips = dir_ips;
      this.tel_ips = tel_ips;
      this.email_ips = email_ips;
      this.nit_ips = nit_ips;
    }
  }
  