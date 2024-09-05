export class User {
    id?: number;
    documento?: string | null;
    password?: string | null;
    estado: boolean | null;
    rol_id: number;

    constructor(
        id: number,
        documento: string | null,
        password: string | null,
        estado: boolean | null,
        rol_id: number,
    ) {
        this.id = id;
        this.documento = documento;
        this.password = password;
        this.estado = estado;
        this.rol_id = rol_id;
    }
}
